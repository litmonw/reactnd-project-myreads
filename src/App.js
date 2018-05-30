import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Main from './Main'
import './App.css'
import Search from './Search';

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
            const index = this.state.books.map(book => book.id).indexOf(book.id)
            BooksAPI.update(book, shelf).then(() => {
                let books = this.state.books
                // 改变 book 的 shelf 位置
                books[index].shelf = shelf
                this.setState({ books })
            })
        }
    }

    render() {
        // console.log(this.state.books);

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
                    />
                )}
                />
            </div>
        )
    }
}

export default BooksApp