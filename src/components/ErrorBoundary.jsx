import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('App error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback" role="alert">
          <h2>Something went wrong</h2>
          <p>Try refreshing the app.</p>
          <button onClick={() => window.location.reload()}>
            Reload App
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
