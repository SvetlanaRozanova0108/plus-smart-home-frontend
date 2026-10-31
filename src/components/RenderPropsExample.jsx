import React from 'react';

export function DataProvider({ render, children }) {
  const data = {
    example: 'Данные из Render Props',
  };
  
  if (typeof render === 'function') {
    return render(data);
  }
  
  if (typeof children === 'function') {
    return children(data);
  }
  
  return null;
}

export default DataProvider;
