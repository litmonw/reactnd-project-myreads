import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Main from './Main'
import './App.css'
import Search from './Search';

class BooksApp extends React.Component {
    state = {
        books: [],
        searchBooks: [],
        showSearchPage: false
    }

    /**
     * componentDidMount 生命周期，用于后台获取数据
     */
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
            const index = this.state.books.map((x => x.id)).indexOf(book.id)
            BooksAPI.update(book, shelf).then(() => {
                let books = this.state.books
                // 判断是否存在于 books 中
                if (index === -1) {
                    book.shelf = shelf
                    let updateBooks = this.state.books.concat([book])
                    this.setState({
                        books: updateBooks
                    })
                } else {
                    // 改变 book 的 shelf 位置
                    books[index].shelf = shelf
                    this.setState({ books })
                }
            })
        }
    }

    searchBook = (queryStr) => {
        // 调用 BooksAPI search
        BooksAPI.search(queryStr).then(books => {
            let searchBooks = books.map(book => {
                let exist = false
                let searchBook = {}
                this.state.books.forEach((existBook, index) => {
                    if (existBook.id === book.id) {
                        exist = true
                        searchBook = this.state.books[index]
                    }
                })

                // 判断是否存在当前的书架中，如果不存在则 shelf 为 none
                if (exist) {
                    return searchBook
                } else {
                    book.shelf = 'none'
                    return book
                }
            })

            this.setState({searchBooks})
        })
        .catch(() => {
            // 异常处理
            this.setState({
                searchBooks: []
            })
        })
    }

    render() {

        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <Main
                        books={this.state.books}
                        updateShelf={this.updateShelf}
                    />
                )} />
                <Route exact path="/search" render={() => (
                    <Search
                        books={this.state.searchBooks}
                        updateShelf={this.updateShelf}
                        searchBook={this.searchBook}
                    />
                )}
                />
            </div>
        )
    }
}

export default BooksApp