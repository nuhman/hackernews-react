import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import PropTypes from 'prop-types';

const Button = ({children, onClick, className}) =>  {  
    return(
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );  
};

Button.defaultProps = {
  className : ''
}

Button.protoTypes = {
  onClick : PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Button;