import { render, screen } from '@testing-library/react';
import App from './App';
import { renderMessageContent } from './Chat';

test('renders the chat app', () => {
  render(<App />);

  expect(screen.getByRole('heading', { name: /agent/i })).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/ask your agent anything/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /end chat/i })).toBeInTheDocument();
});

test('renders markdown bold markers as bold text', () => {
  render(<p>{renderMessageContent('Search returned **[Result]** today.')}</p>);

  const boldResult = screen.getByText('[Result]');
  expect(boldResult).toBeInTheDocument();
  expect(boldResult.tagName).toBe('STRONG');
});
