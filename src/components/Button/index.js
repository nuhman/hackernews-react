import React from 'react';

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