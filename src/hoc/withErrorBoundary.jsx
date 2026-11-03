import React from 'react';

export function withErrorBoundary(Component) {
  return class WithErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Error caught by HOC:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="error-state">
            <h2>Произошла ошибка</h2>
            <p>Попробуйте обновить страницу</p>
          </div>
        );
      }

      return <Component {...this.props} />;
    }
  };
}

export default withErrorBoundary;
