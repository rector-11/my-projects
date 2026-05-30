import os 
from langchain.memory import ConversationBufferWindowMemory
from langchain_community.chat_models import ChatOpenAI
from datetime import datetime, date, timedelta
from dotenv import load_dotenv 
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder 
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser
from langchain.agents import create_agent
from langchain.tools import tool
import gradio as gr

##config 
llm_model = "gpt-5-nano"
history = []
now = datetime.now()
day = date.today()
name = "user"
load_dotenv()
 
#tools 
@tool 
def timetool():
    """Get the current time"""
    return f"Time now: {str(datetime.now())}"

agent = create_agent(
    model = llm_model, 
    tools = [timetool], 
    system_prompt = f'''
        You are an assistant. 
        You have access to one tool, called "timetool". It can get the current date and time at the user's location.
        You should address the user by {name}.
    '''
    )


llm = ChatOpenAI(model = llm_model, temperature = 0.7)
memory = ConversationBufferWindowMemory(llm=llm)

# chain = prompt | llm 


# def chat(user_input, gradio_history):
#     history.append(HumanMessage(content=user_input))
#     response = chain.invoke({"input": user_input, "history": history})
#     history.append(AIMessage(content=response.content))
#     return response.content
 
 
# if __name__ == "__main__":
#     print(now, day)
#     gr.ChatInterface(fn=chat, title="Chatbot", type="tuples", fill_height=True, theme=gr.themes.Monochrome(), chatbot=gr.Chatbot(height=400, scale=1)).launch()