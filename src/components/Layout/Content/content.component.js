import React from 'react';
import './content.styles.css';

const Content = (props) => {
  const {
    children,
    center,
    ...rest
  } = props;
  const className= `pretty-content ${!!center ? 'center' : ''}`
  return (
    <div className={className} {...rest}>
      {children}
    </div>
  )
};

export default Content;
