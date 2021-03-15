import React from 'react';

import './styles.scss';

const Container: React.FC = ({ children }) => {
  return (
    <div className="Container">
        {children}
    </div>
  );
}

export { Container };