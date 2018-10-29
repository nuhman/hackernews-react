import React from 'react';
import PropTypes from 'prop-types';
import Button from '../Button';
import {SORTBY} from '../../constants';
import 'materialize-css/dist/css/materialize.min.css';
import './index.css';

const Table = ({hits, handleRemove, handleSort, sortKey}) => {    
    return(
      <div>
        <div>
          <p>Sort By:</p>          
          <Button className='btn' onClick={() => handleSort('NONE')}>NONE</Button>
          <Button className='btn' onClick={() => handleSort('TITLE')}>TITLE</Button>
          <Button className='btn' onClick={() => handleSort('AUTHOR')}>AUTHOR</Button>
          <Button className='btn' onClick={() => handleSort('COMMENTS')}>COMMENTS</Button>
          <Button className='btn' onClick={() => handleSort('POINTS')}>POINTS</Button>
        </div>
        {//hits.filter(isSearched(searchText)).map(item => {
          SORTBY[sortKey](hits).map(item => {
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

  Table.protoTypes = {
    handleRemove : PropTypes.func.isRequired
  };

export default Table;