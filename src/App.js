import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import AwesomeDebouncePromise from 'awesome-debounce-promise';

// Hacker News API constants

const DEFAULT_QUERY = "blockchain";
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';
let url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


// higher order functions
const searchAPI = url => {  
  return fetch(url);
}

const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 500);


class App extends Component {

  constructor(props){
    super(props);
  
    this.state = {      
      result: null,
      searchText: DEFAULT_QUERY,
    };  

    // binding class methods
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);    
    this.setSearchText = this.setSearchText.bind(this);
  }

  // class methods

  setSearchTopStories(result){    
    this.setState({
      result
    });
  }

  fetchSearchTopStories = async searchText => {
    url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchText}`;        
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result));
      //return await searchAPIDebounced(url);
      //console.log(result);
      //console.log(result.json());
      //result.json().then(res => this.setSearchTopStories(res));
  }

  setSearchText(e){
    this.setState({
      searchText: e.target.value
    });
  }

  handleSearch(){        
    this.fetchSearchTopStories(this.state.searchText);      
  }

  handleRemove(id){   
    let hits =  this.state.result.hits.filter(item => item.objectID !== id);
    this.setState({
      result: {...this.state.result, hits}
    });          
  }

  // lifecycle methods

  componentDidMount(){
    const {
      searchText
    } = this.state;
    this.fetchSearchTopStories(searchText);    
  }


  render() {
    const {      
      result,
      searchText
    } = this.state;    

    return (
      <div className="App">
        <header className="App-header"> 
          <img src={logo} className="App-logo" alt="logo" />                    
          <Search value={searchText} onChange={this.setSearchText} handleSearch={this.handleSearch} />
          {result ? 
            (
              result.hits.length ? 
                <Table hits={result.hits} searchText={searchText} handleRemove={this.handleRemove}/>
                  :
                <p>No Results</p>
            ) 
            :
            (
              <p>Loading... Please Wait!</p>
            )
          }          
        </header>
      </div>
    );
  }
}
 
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
}


export default App;
