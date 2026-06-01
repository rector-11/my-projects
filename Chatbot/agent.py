import geocoder
from datetime import datetime, date
from dotenv import load_dotenv
from langchain.agents import create_agent
from langchain.tools import tool
from langchain_openai import ChatOpenAI

load_dotenv()

llm_model = "gpt-4o"
user = "Rohan"


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
    """Get the current time"""
    return f"Time now: {datetime.now()}"


@tool
def datetool() -> str:
    """Get the current date"""
    return f"Today's date: {date.today()}"


@tool
def locationtool() -> str:
    """Access the user's location"""
    return f"Location: {get_user_location()}"


tools = [timetool, datetool, locationtool]

llm = ChatOpenAI(
    model=llm_model,
    temperature=0.7
)

agent = create_agent(
    model=llm,
    tools=tools,
    system_prompt=f"You are a helpful assistant. Always address the user by {user}.",
)

inputvar = 0
while True:
    if inputvar == 0:
        userinput = input("Ask me anything...\n")
        inputvar = 1
    else:
        userinput = input("")

    if userinput == "break":
        break

    response = agent.invoke({
        "messages": [
            {
                "role": "user",
                "content": userinput
            }
        ]
    })

    print(response["messages"][-1].content)