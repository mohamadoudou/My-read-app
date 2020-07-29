import React,{Component} from 'react'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'

class Search extends Component{

    state={
      searchResult:[],
      query:''
    }
    
 	
  	handleChange=(event)=>{
        event.persist();
        this.setState((prevState)=>({
             query:(event.target.value)
        }));
    	BooksAPI.search(event.target.value)
        .then((searchResult)=>{
            console.log(searchResult);
        	this.setState((prevState)=>({
              searchResult:searchResult
            }));
         })
	}
    
  	sendToCollection=(event,id)=>{
        const addOrMoveCheck=this.props.books.filter((book)=>book.id===id)[0];
      
        if(addOrMoveCheck){
        	this.props.moveTo(event,id);
        }else{
            const newbook=this.state.searchResult.filter((book)=>book.id===id)[0];
        	newbook.shelf=event.target.value;
      		this.props.addToCollection(newbook);
        }
    }

  	render(){
      var books=[];
      if(Array.isArray(this.state.searchResult)&&!(this.state.query==='')){
          books=this.state.searchResult.map((book)=>{
            this.props.books.forEach((existBook, key) => {
                  if (existBook.id === book.id) {
                      book.shelf = existBook.shelf
                  }
            });
            return (
             <li key={book.id}>
               <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 				                                                						`url(${book.imageLinks?book.imageLinks.thumbnail:1})`}}>
                  </div>
                  <div className="book-shelf-changer">
                    <select>
                      <option value="move" disabled>Move to...</option>
         <option value="currentlyReading"selected={book.shelf==='currentlyReading'}onClick={(event)=>{this.sendToCollection(event,book.id)}}>Currently Reading</option>
                       <option value="wantToRead" selected={book.shelf==='wantToRead'} onClick={(event)=>{this.sendToCollection(event,book.id)}}>Want to Read</option>
                       <option value="read" selected={book.shelf==='read'} onClick={(event)=>{this.sendToCollection(event,book.id)}}>Read</option>
                       <option value="none" selected={!book.shelf||book.shelf==='none'} onClick={(event)=>{this.props.removeBook(event,book.id)}}>None</option>
                      </select>
                     </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                      <div className="book-authors">{book.authors?book.authors.toString():''}</div>
                    </div>
                   </li>
          	  )
          })
		}else{
			books=<div><h4>No Result</h4></div>;	
		}


    	return( 
           <div className="search-books">
              <div className="search-books-bar">
                <Link className="close-search" to='/'>Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text" placeholder="Search by title or author" value={this.state.query} name="query" onChange={this.handleChange}/>
                  {/*JSON.stringify(this.state.query)*/}
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">{ books}</ol>
              </div>
           </div>
        );
    }
}

export default Search;