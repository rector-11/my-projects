import os 
from langchain.memory import ConversationBufferWindowMemory
from langchain_community.chat_models import ChatOpenAI
from datetime import datetime, date, timedelta
from dotenv import load_dotenv 
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder 
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser
import gradio as gr

##config 
llm_model = "gpt-5-nano"
history = []
now = datetime.now()
day = date.today()
name = "user"
load_dotenv()
 

# chain: prompt | llm | str

prompt = ChatPromptTemplate.from_messages([
    ("system", (
        f'''
        You are an assistant. \n 
        Your user is in the San Francisco Bay Area. \n
        You should address the user by {name} \n 
        '''
    )),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])         

llm = ChatOpenAI(model = llm_model, temperature=1.0)
memory = ConversationBufferWindowMemory(llm=llm)

chain = prompt | llm 


def chat(user_input, gradio_history):
    history.append(HumanMessage(content=user_input))
    response = chain.invoke({"input": user_input, "history": history})
    history.append(AIMessage(content=response.content))
    return response.content
 
 
if __name__ == "__main__":
    print(now, day)
    gr.ChatInterface(fn=chat, title="Chatbot", type="tuples", fill_height=True, theme=gr.themes.Monochrome(), chatbot=gr.Chatbot(height=400, scale=1)).launch()
 
## tokens tell:
## how much compute, cost, resources, environmental effects
 
