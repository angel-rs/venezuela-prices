import React from 'react';
import './content.styles.css';

const Content = (props) => {
  const {
    children,
    center,
  } = props;

  return (
    <div className={`pretty-content ${center ? "center" : ''}`} {...props}>
      {children}
    </div>
  )
};

export default Content;
