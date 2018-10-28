import React from 'react';
import Button from '../Button';
import './index.css';

const Search = ({value, onChange, handleSearch}) => {  
    return(
      <div className='search-div'>
          <input type="text" 
              placeholder="search by title" 
              value={value}
              onChange={onChange}
            />
            <Button onClick={handleSearch} className='btn-floating btn-large waves-effect waves-light red'>
              <i className='material-icons'>search</i>
          </Button>
        </div> 
    );  
  }

export default Search;