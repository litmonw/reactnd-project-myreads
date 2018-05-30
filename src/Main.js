import React, { Component } from 'react'
import BookShelf from './BookShelf'
class Main extends Component {
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <BookShelf
                            title="Currently Reading"
                            books={this.props.books.filter(book => book.shelf === 'currentlyReading')}
                            updateShelf={this.props.updateShelf}
                        />
                        <BookShelf
                            title="Want to Read"
                            books={this.props.books.filter(book => book.shelf === 'wantToRead')}
                            updateShelf={this.props.updateShelf}                            
                        />
                        <BookShelf
                            title="read"
                            books={this.props.books.filter(book => book.shelf === 'read')}
                            updateShelf={this.props.updateShelf}                                                   
                        />
                    </div>
                </div>
                <div className="open-search">
                    <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
                </div>
            </div>
        )
    }
}

export default Main