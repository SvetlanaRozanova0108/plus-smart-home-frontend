import React from 'react';

export function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Загрузка...</p>
        </div>
      );
    }
    return <Component {...props} />;
  };
}

export default withLoading;
