import React from 'react'
import * as BooksAPI from './BooksAPI'
import Main from './Main';
import './App.css'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false
  }

  componentDidMount() {
      BooksAPI.getAll().then(books => this.setState({ books }))
  }

  updateShelf = (book, shelf) => {
      // 当 shelf 为 none，从书架中移除该 book
      if (shelf === 'none') {
          BooksAPI.update(book, shelf).then(() => {
              book.shelf = shelf
              let updateBooks = this.state.books.concat([book])
              this.setState(() => ({
                  books: updateBooks
              }))
          })
      } else {
          /* 如果 book shelf 不为 none，则更新 book 的 shelf */
          // 根据书的 id 查找需要修改的数据索引
          const index = this.state.books.map(book => book.id).indexOf(book.id)
          BooksAPI.update(book, shelf).then(() => {
              let books = this.state.books
              // 改变 book 的 shelf 位置
              books[index].shelf = shelf
              this.setState({books})
          })
      }
  }

  render() {
    // console.log(this.state.books);
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
            <Main
                books={this.state.books}
                updateShelf = {this.updateShelf}
            />
        )}
      </div>
    )
  }
}

export default BooksApp