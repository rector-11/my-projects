import os 
import geocoder
from datetime import datetime, date, timedelta
from dotenv import load_dotenv 
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder 
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser

# 1. FIXED: Correct LangChain/LangGraph agent import
from langchain.agents import create_agent
from langchain.tools import tool

# 2. FIXED: Correct partner package import for ChatOpenAI
from langchain_openai import ChatOpenAI
import gradio as gr

## config 
llm_model = "gpt-4o"  # Note: Use your valid OpenAI model name here
history = []
now = datetime.now()
day = date.today()
name = "user"
load_dotenv()
 

def get_user_location():
        g = geocoder.ip("me")

        return {
             "city": g.city,
             "state": g.state,
             "country": g.country,
             "latlng": g.latlng
        }
# tools 
@tool 
def timetool() -> str:
    """Get the current time"""
    return f"Time now: {str(datetime.now())}"

@tool
def datetool() -> str:
    """Get the current date"""
    return f"Today's date: {str(date.today)}"

@tool
def locationtool() -> str:
     """Access the user's location"""
     return f"Location: {get_user_location()}"


tools = [timetool, datetool, locationtool]

# 3. FIXED: Create the LLM object correctly
llm = ChatOpenAI(model=llm_model, temperature=0.7)
user = "Rohan"

# Init
agent = create_agent(
    model=llm,  # 4. FIXED: Pass the actual LLM instance object, not a string string name
    tools=tools,
    system_prompt=f"You are a helpful assistant. Always address the user by {user}.",
)

userinput = input("Ask me anything...\n")

response = agent.invoke({
    "messages": [
        {"role": "user", "content": userinput}
    ]
})

print(response["messages"][-1].content)
