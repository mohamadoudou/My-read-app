import React,{Component} from 'react';

class WantToRead extends Component{
	constructor(props){
      super(props);
      this.state={};
    }

	render(){
      
     const wantToRead=this.props.books.filter((book)=>book.shelf==='wantToRead').map((book)=>{
     
           return (
           		  <li key={book.id}>
                      <div className="book">
                        <div className="book-top">
                          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 				                         `url(${book.imageLinks?book.imageLinks.thumbnail:1})` }}></div>
                          <div className="book-shelf-changer">
                            <select>
                              <option value="move" disabled>Move to...</option>
                              <option value="currentlyReading" onClick={(event)=>{this.props.moveTo(event,book.id)}}>Currently Reading</option>
                              <option value="wantToRead" selected={book.shelf==='wantToRead'}onClick={(event)=>{this.props.moveTo(event,book.id)}}>Want to Read</option>
                              <option value="read" onClick={(event)=>{this.props.moveTo(event,book.id)}}>Read</option>
                              <option value="none"  onClick={(event)=>{this.props.removeBook(event,book.id)}}>None</option>
                            </select>
                          </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors?book.authors.toString():''}</div>
                        </div>
                      </li>
           )
     })
    
      return (
			<div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
      			<div className="bookshelf-books">
                <ol className="books-grid">            
                  {wantToRead}
                </ol>
                </div>
			</div>
      );
    }
}

export default WantToRead;