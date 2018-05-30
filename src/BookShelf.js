import React, { Component } from 'react'
import Book from './Book'
class BookShelf extends Component {
    render() {
        console.log(this.props.books);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.title}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map(book => 
                            <Book
                                updateShelf={this.props.updateShelf}
                                book={book}
                                key={book.id}
                            />
                        )}
                    </ol>
                </div>
            </div>
        )
    }
}

export default BookShelf