import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './i18n';

const queryClient = new QueryClient();

const renderApp = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  );

describe('App shell', () => {
  it('renders home hero', () => {
    renderApp();
    expect(screen.getByText(/Estrés Hídrico Chile/i)).toBeInTheDocument();
  });
});
