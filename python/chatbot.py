import os 
from langchain.memory import ConversationBufferWindowMemory

from langchain.chat_models import ChatOpenAI
from dotenv import load_dotenv 
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder 
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.output_parsers import StrOutputParser
load_dotenv()

llm_model = "gpt-5-nano"

# chain: prompt | llm | str

prompt = ChatPromptTemplate([
    ("system", (
        "You are helpful assistant."
    )),
    ("human", "{input}")
])         

llm = ChatOpenAI(model = llm_model, temperature = 0.7)
memory = ConversationBufferWindowMemory(llm=llm)

chain = prompt | llm 
history = [human, ai]
human = []
ai = []
if __name__ == "__main__" :
    user = input("\nAsk a question or insert prompt here. Prompt chat with 'quit' to end chat.\n \nUser:")
    while True: 
        human.append(user)
        if "quit" in user:
            break 
        response = chain.invoke({"input": user})
        print("\nChatGPT: " + str(response.content) + "\n")
        ai.append(response.content)
        user = input("User: ")

## tokens tell:
## how much compute, cost, resources, environmental effects
        