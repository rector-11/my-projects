import { useState } from 'react';

export function renderMessageContent(content) {
  return content.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'agent',
      content: 'Hi Rohan, what can I help you with? I have access to the internet, date, time and location services, and your Canvas Courses.',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [isEndingChat, setIsEndingChat] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    const userMessage = input.trim();

    if (!userMessage || isLoading || isOffline) {
      return;
    }

    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'user', content: userMessage },
    ]);
    setInput('');
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('The agent did not respond successfully.');
      }

      const data = await response.json();
      setMessages((currentMessages) => [
        ...currentMessages,
        { role: 'agent', content: data.response },
      ]);
    } catch {
      setError('Could not reach the agent. Make sure FastAPI is running on port 8000.');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEndChat() {
    if (isEndingChat || isOffline) {
      return;
    }

    setIsEndingChat(true);
    setIsOffline(true);
    setError('');
    setMessages((currentMessages) => [
      ...currentMessages,
      { role: 'agent', content: 'Chat ended. The agent is going offline.' },
    ]);

    try {
      await fetch('http://localhost:8000/shutdown', {
        method: 'POST',
      });
    } catch {
      // The shutdown request can be interrupted as the server exits.
    } finally {
      setIsEndingChat(false);
    }
  }

  function handleInputKeyDown(event) {
    if (event.key === 'Enter' && !event.shiftKey && !isOffline) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <main className="chat-page">
      <section className="chat-shell" aria-label="AI agent chat">
        <header className="chat-header">
          <div>
            <p className="chat-eyebrow">{isOffline ? 'Agent offline' : 'Agent online'}</p>
            <h1>Agent</h1>
          </div>
          <div className="header-actions">
            <span className={`status-pill ${isOffline ? 'offline' : ''}`}>
              {isOffline ? 'Offline' : 'FastAPI'}
            </span>
            <button
              className="end-chat-button"
              type="button"
              onClick={handleEndChat}
              disabled={isEndingChat || isOffline}
            >
              {isEndingChat ? 'Ending Chat...' : 'End Chat'}
            </button>
          </div>
        </header>

        <div className="message-list" aria-live="polite">
          {messages.map((message, index) => (
            <article className={`message ${message.role}`} key={`${message.role}-${index}`}>
              <p className="message-author">{message.role === 'user' ? 'You' : 'Agent'}</p>
              <p className="message-content">{renderMessageContent(message.content)}</p>
            </article>
          ))}

          {isLoading && (
            <article className="message agent">
              <p className="message-author">Agent</p>
              <p className="message-content">Thinking...</p>
            </article>
          )}
        </div>

        {error && <p className="chat-error">{error}</p>}

        <form className="chat-form" onSubmit={handleSubmit}>
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder={isOffline ? 'Agent is offline' : 'Ask your agent anything...'}
            rows="3"
            disabled={isOffline}
          />
          <button type="submit" disabled={isLoading || isOffline || !input.trim()}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </section>
    </main>
  );
}

export default Chat;
