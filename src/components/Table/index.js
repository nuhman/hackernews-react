import React from 'react';
import Button from '../Button';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

const Table = ({hits, handleRemove}) => {    
    return(
      <div>
        {//hits.filter(isSearched(searchText)).map(item => {
          hits.map(item => {
          return (
            <div className='col s12 m12 l12 card' key={item.objectID}>
              <div className='card-stacked'>
                <div className='card-content'>
                  <p><a href={item.url}>{item.title}</a></p>
                </div>
                <div className='card-action news-details'>                  
                    <span><i className='material-icons left'>person</i>{item.author}</span>
                    <span><i className='material-icons left'>thumb_up</i>{item.points} Likes</span>                                          
                    <span><i className='material-icons left'>comment</i>{item.num_comments} Comments</span>
                    <span>
                      <Button onClick={() => handleRemove(item.objectID)}
                          className="btn-small waves-effect waves-light red"
                      >
                      <i className='material-icons'>delete</i>
                      </Button>
                    </span>                  
                </div>
              </div>              
            </div>
          )                    
        })}
      </div>
    );  
  }

export default Table;