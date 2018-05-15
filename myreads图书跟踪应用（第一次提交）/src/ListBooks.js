import React from 'react'
import { Link } from 'react-router-dom'

class ListBooks extends React.Component {

  render() {
    const { books,onChangeShelf } = this.props//用解构的方式提取对象中的值
    return (
      <div className="list-books">
          <div className="list-books-title">
              <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
              <div>
                  <div className="bookshelf">
                      <h2 className="bookshelf-title">Currently Reading</h2>
                      <div className="bookshelf-books">
                          <ol className='books-grid'>
                              {books.filter((c) => c.shelf === "currentlyReading").map((books)=>(
                                  <li key={books.id} >
                                      <div className='book'>
                                          <div className='book-top'>
                                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks ? books.imageLinks.thumbnail:'./icons/nocover.png'})` }}></div>
                                              <div className="book-shelf-changer">
                                                  <select value={books.shelf||'null'} onChange={(e) => onChangeShelf(books, e.target.value)}>
                                                      <option value="none" disabled>Move to...</option>
                                                      <option value="currentlyReading">Currently Reading</option>
                                                      <option value="wantToRead">Want to Read</option>
                                                      <option value="read">Read</option>
                                                      <option value="none">None</option>
                                                  </select>
                                              </div>
                                              </div>
                                         <div className="book-title">{books.title}</div>
                                         <div className="book-authors">{books.authors}</div>
                                     </div>
                                  </li>
                              ))}
                          </ol>
                     </div>
                 </div>
                  <div className="bookshelf">
                      <h2 className="bookshelf-title">wantToRead</h2>
                      <div className="bookshelf-books">
                          <ol className='books-grid'>
                              {books.filter((c) => c.shelf === "wantToRead").map((books)=>(
                                  <li key={books.id} >
                                      <div className='book'>
                                          <div className='book-top'>
                                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks ? books.imageLinks.thumbnail:'./icons/nocover.png'})` }}></div>
                                              <div className="book-shelf-changer">
                                                  <select value={books.shelf||'null'} onChange={(e) => onChangeShelf(books, e.target.value)}>
                                                      <option value="none" disabled>Move to...</option>
                                                      <option value="currentlyReading">Currently Reading</option>
                                                      <option value="wantToRead">Want to Read</option>
                                                      <option value="read">Read</option>
                                                      <option value="none">None</option>
                                                  </select>
                                              </div>
                                              </div>
                                         <div className="book-title">{books.title}</div>
                                         <div className="book-authors">{books.authors}</div>
                                     </div>
                                  </li>
                              ))}
                          </ol>
                     </div>
                 </div>
                  <div className="bookshelf">
                      <h2 className="bookshelf-title">Read</h2>
                      <div className="bookshelf-books">
                          <ol className='books-grid'>
                              {books.filter((c) => c.shelf === "read").map((books)=>(
                                  <li key={books.id} >
                                      <div className='book'>
                                          <div className='book-top'>
                                              <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks ? books.imageLinks.thumbnail:'./icons/nocover.png'})` }}></div>
                                              <div className="book-shelf-changer">
                                                  <select value={books.shelf||'null'} onChange={(e) => onChangeShelf(books, e.target.value)}>
                                                      <option value="none" disabled>Move to...</option>
                                                      <option value="currentlyReading">Currently Reading</option>
                                                      <option value="wantToRead">Want to Read</option>
                                                      <option value="read">Read</option>
                                                      <option value="none">None</option>
                                                  </select>
                                              </div>
                                              </div>
                                         <div className="book-title">{books.title}</div>
                                         <div className="book-authors">{books.authors}</div>
                                     </div>
                                  </li>
                              ))}
                          </ol>
                     </div>
                 </div>
             </div>
         </div>
        <div className="open-search">
            <Link to='/search' className='open-search'>Add a book</Link>
        </div>
    </div>
    )
  }
}

export default ListBooks
