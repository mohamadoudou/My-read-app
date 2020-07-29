import React from 'react'
import {Link,Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import CurrentRead from './CurrentRead'
import WantToRead from './WantToRead'
import Read from './Read'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books:[]
  }


componentDidMount(){
	BooksAPI.getAll()
      .then((books)=>{
      	this.setState(()=>({
   				books:books
		}));
      })
};


moveTo=(event,id)=>{
      const books=this.state.books.map((book)=>{
      	if(book.id===id){
          book.shelf=event.target.value;
          BooksAPI.update(book,book.shelf);
          return book}
      	else{return book}
      });
      this.setState((prevState)=>({
            books:books
      }));
      
}

removeBook=(event,id)=>{
    const books=this.state.books.filter((book)=>book.id!==id);
    console.log(event.target.value,id);
    this.setState((prevState)=>({
         books:books
    }));
  	const book=this.state.books.filter((book)=>book.id===id)[0];
  	book.shelf=event.target.value;
    console.log(book);
  	BooksAPI.update(book,book.shelf);
}

addToCollection=(newBook)=>{
      
      this.setState((prevState)=>({
      	books:prevState.books.concat(newBook)
      }));
      BooksAPI.update(newBook,newBook.shelf);
}

  render() {
    
    return (
   
     <div className="app">
      <Route path='/search' render={()=>(<Search books={this.state.books} moveTo={this.moveTo} addToCollection={this.addToCollection} removeBook={this.removeBook}/>)}/>
      <Route exact path='/' render={()=>(
           <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                  <div>
                      <CurrentRead books={this.state.books} moveTo={this.moveTo} removeBook={this.removeBook}/>
                      <WantToRead books={this.state.books} moveTo={this.moveTo} removeBook={this.removeBook}/>
                      <Read books={this.state.books} moveTo={this.moveTo} removeBook={this.removeBook}/>
                  </div>
                </div>
                <div className="open-search">
                  <Link to='/search'>Add a book</Link>
                </div>
              </div>
            )}/>
    </div>
    )
  }
}

export default BooksApp
