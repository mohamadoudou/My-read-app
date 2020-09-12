import React from 'react';

function CurrentRead(props){
      
     const currentReading=props.books.filter((book)=>book.shelf==='currentlyReading').map((book)=>{
     
           return (
           		  <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                   <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks?book.imageLinks.thumbnail:1})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(event)=>{props.moveTo(event,book.id)}}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading" selected={book.shelf==='currentlyReading'} >Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
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
                  <h2 className="bookshelf-title">Currently Reading</h2>
               	  <div className="bookshelf-books">
                  <ol className="books-grid">            
                    {currentReading}
                  </ol>
                  </div>
				</div>
      );
}

export default CurrentRead;