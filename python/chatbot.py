import os 
from langchain.memory import ConversationBufferWindowMemory
from langchain_community.chat_models import ChatOpenAI
from datetime import datetime, date, timedelta
from dotenv import load_dotenv 
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder 
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser
load_dotenv()

llm_model = "gpt-5-nano"
history = []

# chain: prompt | llm | str
now = datetime.now()
day = date.today()
name = "TEST"

prompt = ChatPromptTemplate([
    ("system", (
        f'''
        You are an assistant. \n 
        Your user is in the San Francisco Bay Area. \n
        The time is {now}, and the date is {day}. \n
        You should address the user by {name} \n 
        '''
    )),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])         

llm = ChatOpenAI(model = llm_model, temperature = 0.7)
memory = ConversationBufferWindowMemory(llm=llm)

chain = prompt | llm 


if __name__ == "__main__" :
    print (now, day)
    user = input("\nAsk a question or insert prompt here. Prompt chat with 'quit' to end chat.\n \nUser:")
    while True: 
        history.append(HumanMessage(content=user))
        if "quit" in user:
            break 
        response = chain.invoke({"input": user, "history": history} )
        print("\nChatGPT: " + str(response.content) + "\n")
        history.append(AIMessage(content=response.content))
        user = input("User: ")

## tokens tell:
## how much compute, cost, resources, environmental effects
        