import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';


class SearchBooks extends React.Component {
  state = {
    searchedBooks:[],
    query:""
  };

  searchBooks=(query)=>{　　{/*根据输入内容搜索图书*/}

        if (!query) {　　　{/*如果没有输入，则清空状态里面的搜索数组和输入内容*/}
            this.setState({
                query: "",
                searchedBooks:[]
            });
            return;
        }
        {/*设置搜索状态*/}
        this.setState(　　　
          {
            query: query,
            searchBooks:[]
          },
          function stateUpdateComplete() {　　
              this.search();
          }.bind(this)
        );
  };
  search = () => {
      const query = this.state.query;
      if (query.trim() === "") {
          this.setState({ query: "", searchedBooks: [] });
          return;
      }

      BooksAPI.search(query).then(searchedBooks => {
          if (query !== this.state.query) return;
          if (!Array.isArray(searchedBooks)) {
                searchedBooks = [];
          }

          this.setState((prevState, props) => {
              {/*从父组件传入书架图书数据*/}
              const shelfBooks = this.props.books;
              const newSearchBooks = searchedBooks.map(searchBook => {
                  {/*如果该图书在书架中，会返回该图书，否则返回 undefined*/}
                  const searchBookInshelfBook = shelfBooks.find(
                      shelfBook => shelfBook.id === searchBook.id
                  );
              {/*同步 shelf 值，并返回该新的图书对象*/}
                  return {
                      ...searchBook,
                      shelf: searchBookInshelfBook ? searchBookInshelfBook.shelf : "none"
                  };
            });
            {/*返回新的搜索图书数据，更新界面*/}
            return {
                searchedBooks: newSearchBooks
            };
        });
      });
  };



  render() {
    return (
      <div className="search-books">
          <div className="search-books-bar">
          <Link className='close-search' to='/'>close</Link>
              <div className="search-books-input-wrapper">
                  <input
                  type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(e)=>this.searchBooks(e.target.value)}
                  />
              </div>
          </div>
          <div className="search-books-results">
              <ol className="books-grid">
              {this.state.query.length>0 && (
                  this.state.searchedBooks.map((books)=>(
                      <li key={books.id} >
                          <div className='book'>
                              <div className='book-top'>
                                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${books.imageLinks ? books.imageLinks.thumbnail:'./icons/nocover.png'})` }}></div>
                                  <div className="book-shelf-changer">
                                      <select value={books.shelf||'null'} onChange={(e) => this.props.onChangeShelf(books, e.target.value)}>
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
                  ))
              )}
              </ol>
          </div>
      </div>

    )
  }
}


export default SearchBooks
