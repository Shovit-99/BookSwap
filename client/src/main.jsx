import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import axios from 'axios'

// Set global Axios base URL
// Overrides any stale Render URL (like 7daz) or localhost in production
let apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl || apiUrl.includes('7daz') || (import.meta.env.PROD && apiUrl.includes('localhost'))) {
  apiUrl = 'https://bookswap-58eh.onrender.com';
}
axios.defaults.baseURL = apiUrl;
// Allow credentials (cookies) to be sent with cross-origin requests
axios.defaults.withCredentials = true;

import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'red', background: '#222', minHeight: '100vh', fontFamily: 'monospace' }}>
          <h1>Something went wrong.</h1>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
