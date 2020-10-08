import React from 'react';
import ReactDOM from 'react-dom';
import './style.css'

const HelloReact = () => {
  return <div className="react">Hello React!</div>
};

ReactDOM.render(<HelloReact />, document.getElementById('root'));
