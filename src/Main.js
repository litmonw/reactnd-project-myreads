import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import BookShelf from './BookShelf'
class Main extends Component {
    render() {
        return (
            <div className="list-books">
                <Header />
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
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Main