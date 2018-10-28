import React from 'react';
import Button from '../Button';

const Table = ({hits, handleRemove}) => {    
    return(
      <div>
        {//hits.filter(isSearched(searchText)).map(item => {
          hits.map(item => {
          return (
            <div key={item.objectID}>
              <p><a href={item.url}>{item.title}</a></p>
              <p>By {item.author}</p>
              <p>{item.points} Likes, {item.num_comments} Comments</p>                        
              <p>
              <Button onClick={() => handleRemove(item.objectID)}>
                  Remove
              </Button>
              </p>
            </div>
          )                    
        })}
      </div>
    );  
  }

export default Table;