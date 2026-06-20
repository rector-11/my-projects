# AI Chatbot and Agent

This project contains two chatbots; one simple chatbot that runs in the web browser, and an AI agent running in the terminal. To run either, you need a **WORKING OPENAI API KEY**. Other API keys may work, though you will have to modify the Langchain code and imports.

**USE YOUR OWN API KEYS**

You will need to create your own .env file with a current API key to run this code. To use Canvas tools, you have to add your own working Canvas Token and URL.
In the .env file, you must name the API key: OPENAI_API_KEY = 'sk-'

## Running the chatbot/agent

1. Run "pip install -r requirements.txt"
2. Run "make dev" in terminal

This should start the servers and open a webpage in your default browser.

To shutdown the bot and take servers offline, press "End Chat" or run "make stop" in terminal.

Additional shortcuts are available in the Makefile.

## Customization

You can customize the chatbot to address you by your name by changing the "name" variable. By default, it will address the user as "user". You can get location-specific and customized answers, as well as tailor the chatbot to your needs by chagning the prompt. All of this can be done in the chatbot.py file.

# Development
