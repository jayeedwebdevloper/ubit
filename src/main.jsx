import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Context from './Context/Context.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Context>
  </React.StrictMode>,
)
