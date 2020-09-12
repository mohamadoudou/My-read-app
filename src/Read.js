import React from 'react';

function Read(props){

      
     const read=props.books.filter((book)=>book.shelf==='read').map((book)=>{
     
           return (
           		  <li key={book.id}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage:`url(${book.imageLinks?book.imageLinks.thumbnail:1})` }}></div>
                            <div className="book-shelf-changer">
                              <select onChange={(event)=>{props.moveTo(event,book.id)}}>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read" selected={book.shelf==='read'}>Read</option>
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
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">            
                  {read}
                </ol>
            </div>
		</div>
      );
}

export default Read;