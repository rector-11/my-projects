# AI Chatbot and Agent

This project contains two chatbots; one simple chatbot that runs in the web browser, and an AI agent running in the terminal. To run either, you need a **WORKING OPENAI API KEY**. Other API keys may work, though you will have to modify the Langchain code and imports.

**USE YOUR OWN API KEY**
You will need to create your own .env file with a current API key to run this code.
In the .env file, you must name the API key: OPENAI_API_KEY = 'sk-'

## Running the chatbot/agent

Pip install requirements.txt (pip install -r requirements.txt)
You can run the file by using the run button or running it manually in your terminal.
The chatbot should provide a link in the terminal, and the agent will directly prompt you.

## Customization

You can customize the chatbot to address you by your name by changing the "name" variable. By default, it will address the user as "user". You can get location-specific and customized answers, as well as tailor the chatbot to your needs by chagning the prompt. All of this can be done in the chatbot.py file.

# Development

1. Expanding tools and functionality
2. Implement **Gradio** chat interface
