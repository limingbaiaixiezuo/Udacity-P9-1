import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';

class BooksApp extends React.Component {
  state = {
    books:[]
  };

  getAllBooks(){　　{/*获取主页面的书的数据*/}
      BooksAPI.getAll().then((books)=> {
          this.setState({ books:books });
    });
  };

  componentDidMount(){
    this.getAllBooks();
  };

  
  updateBookShelf=(books,bookshelf)=>{　　　{/*更新书架状态*/}
        books.shelf = bookshelf;
        BooksAPI.update(books, bookshelf).then(()=>{
            this.getAllBooks();
        });
    };

  render() {
    return (
      <div className="app">
          <Route exact　path="/" render={() => (
              <ListBooks
                  books = {this.state.books}
                  onChangeShelf={this.updateBookShelf}
              />
          )}/>
          <Route　path="/search" render={() => (
              <SearchBooks
                  onChangeShelf={this.updateBookShelf}
                  books = {this.state.books}
              />
          )}/>
      </div>

    )
  }
}

export default BooksApp
