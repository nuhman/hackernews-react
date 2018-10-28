import React from 'react';
import 'materialize-css/dist/css/materialize.min.css';

const Button = ({children, onClick, className=''}) =>  {  
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

export default Button;