import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Button from './components/Button';
import Table from './components/Table';
import Search from './components/Search';


//import AwesomeDebouncePromise from 'awesome-debounce-promise';

// Hacker News API constants

import {
  DEFAULT_QUERY,
  DEFAULT_PAGE,
  PATH_BASE,
  PATH_SEARCH,
  PARAM_SEARCH,
  PARAM_PAGE,  
} from './constants';

let url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


// higher order functions
// const searchAPI = url => {  
//   return fetch(url);
// }

// const searchAPIDebounced = AwesomeDebouncePromise(searchAPI, 500);


class App extends Component {

  constructor(props){
    super(props);
  
    this.state = {      
      result: null,
      searchText: DEFAULT_QUERY,
      cacheKey: '',
      sortKey: 'NONE'
    };  

    // binding class methods
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setSearchTopStories = this.setSearchTopStories.bind(this);
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);    
    this.setSearchText = this.setSearchText.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  // class methods

  handleSort(sortKey){
    this.setState({sortKey});
  }

  setSearchTopStories(result){    
    this.setState({
      result
    });
  }

  fetchSearchTopStories = (searchText, page) => {
    if(page < 0) page = 0;
    url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchText}&${PARAM_PAGE}${page}`;        
    fetch(url)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result));      
  }

  setSearchText(e){
    this.setState({
      searchText: e.target.value
    });
  }

  handleSearch(){       
    this.setState({
      cacheKey: this.state.searchText
    }); 
    this.fetchSearchTopStories(this.state.searchText, DEFAULT_PAGE);      
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
    this.setState({
      cacheKey: searchText
    });
    this.fetchSearchTopStories(searchText, DEFAULT_PAGE);    
  }


  render() {
    const {      
      result,
      searchText,
      sortKey
    } = this.state;
    const page = (result && result.page) || 0;
    return (
      <div className="App">
        <header className="App-header"> 
          <img src={logo} className="App-logo" alt="logo" />                    
          <Search value={searchText} onChange={this.setSearchText} handleSearch={this.handleSearch} />
          {result ? 
            (
              result.hits.length ? 
                (
                  <div className='container'>
                    <Table hits={result.hits} searchText={searchText} handleRemove={this.handleRemove} sortKey={sortKey} handleSort={this.handleSort}/>
                    <Button className='btn waves-effect waves-light btnPrev'onClick={() => this.fetchSearchTopStories(searchText, page - 1)}>
                        Previous<i className='material-icons left'>navigate_before</i>
                    </Button>
                    <Button className='btn waves-effect waves-light' onClick={() => this.fetchSearchTopStories(searchText, page + 1)}>
                        Next<i className='material-icons right'>navigate_next</i>
                    </Button>
                  </div>
                )
                  :
                <p>No Results</p>
            ) 
            :
            (
              <p>Loading... <i className='material-icons right'>loop</i></p>
            )
          }          
        </header>
      </div>
    );
  }
}

export default App;
