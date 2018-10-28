import React from 'react';
import Button from '../Button';

const Search = ({value, onChange, handleSearch}) => {  
    return(
      <div>
          <input type="text" 
              placeholder="search by title" 
              value={value}
              onChange={onChange}
            />
            <Button onClick={handleSearch}>
              Search
          </Button>
        </div> 
    );  
  }

export default Search;