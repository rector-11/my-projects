import os
import geocoder
import requests
from datetime import datetime, date
from dotenv import load_dotenv

from langchain.agents import create_agent
from langchain.tools import tool
from langchain_openai import ChatOpenAI
from langchain_tavily import TavilySearch
from langchain_core.chat_history import InMemoryChatMessageHistory

load_dotenv()

CANVAS_TOKEN = os.getenv("CANVAS_TOKEN")
CANVAS_URL = os.getenv("CANVAS_URL")

HEADERS = {
    "Authorization": f"Bearer {CANVAS_TOKEN}"
}

llm_model = "gpt-4o"
user = "Rohan"
history = InMemoryChatMessageHistory()

search = TavilySearch(max_results=5)


def get_user_location():
    g = geocoder.ip("me")
    return {
        "city": g.city,
        "state": g.state,
        "country": g.country,
        "latlng": g.latlng
    }


@tool
def timetool() -> str:
    """Get the date and time at the user's location"""
    return f"Time now: {datetime.now()}"


@tool
def datetool() -> str:
    """Get today's date"""
    return f"Today's date: {date.today()}"


@tool
def locationtool() -> str:
    """Get the user's current location"""
    return f"Location: {get_user_location()}"


@tool
def websearch(query: str) -> str:
    """Search the web for useful information"""
    searchresult = search.invoke({"query": query})
    return f"Result: {searchresult}"


@tool
def get_assignments() -> str:
    """Check the user's upcoming Canvas Assignments"""
    url = f"{CANVAS_URL}/api/v1/users/self/upcoming_events"

    r = requests.get(url, headers=HEADERS)
    data = r.json()

    assignments = []

    for item in data:
        assignments.append(
            f"{item.get('title')} - due {item.get('start_at')}"
        )

    return "\n".join(assignments) if assignments else "No assignments found."


@tool
def get_grades() -> str:
    """Check the user's current course grades"""
    headers = {
        "Authorization": f"Bearer {CANVAS_TOKEN}"
    }

    courses_url = f"{CANVAS_URL}/api/v1/courses?enrollment_state=active"
    courses = requests.get(courses_url, headers=headers).json()

    course_map = {}
    for c in courses:
        if "id" in c:
            course_map[c["id"]] = c.get("name", "Unknown Course")

    enroll_url = f"{CANVAS_URL}/api/v1/users/self/enrollments"
    enrollments = requests.get(enroll_url, headers=headers).json()

    results = []

    for e in enrollments:
        course_id = e.get("course_id")
        course_name = course_map.get(course_id, f"Course {course_id}")

        grades = e.get("grades") or {}
        score = grades.get("current_score")

        if score is not None:
            results.append(f"{str(course_name)}: {score}")
        else:
            results.append(f" {str(course_name)}: N/A")

    return "\n".join(results) if results else "No grades found."


tools = [timetool, datetool, locationtool, websearch, get_assignments, get_grades]

llm = ChatOpenAI(
    model=llm_model,
    temperature=0.7
)

agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt=f"""
You are a helpful assistant. Always address the user by {user}.
Prefer imperial units unless specified otherwise.
"""
)

inputvar = 0
while True:
    if inputvar == 0:
        userinput = input("Ask me anything...\n")
        history.add_user_message(userinput)
        inputvar = 1
    else:
        userinput = input("")
        history.add_user_message(userinput)

    if userinput == "break":
        break

    response = agent.invoke({
        "messages": history.messages
    })

    history.add_ai_message(response["messages"][-1].content)
    print(response["messages"][-1].content)