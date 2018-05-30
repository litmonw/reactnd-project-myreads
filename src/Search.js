import React, {Component} from 'react'
import { Link } from "react-router-dom";
import Book from "./Book";

class Search extends Component {

    state={
        queryStr: ''
    }

    updateQuery = (queryStr => {
        this.setState({
            queryStr: queryStr
        })
        if (queryStr.length > 0) {
            // 向父组件发送请求
            this.props.searchBook(queryStr)   
        }
    })

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={this.state.queryStr}
                            onChange={(e) => this.updateQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
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

export default Search