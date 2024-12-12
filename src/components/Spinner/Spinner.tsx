import React from 'react';

export const Spinner: React.FC = () => {
  return (
    <div className="spinner-wrapper">
      <div className="spinner-border text-info" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
};
