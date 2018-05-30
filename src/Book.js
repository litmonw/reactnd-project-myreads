import React, {Component} from 'react'

class Book extends Component {

    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{
                            width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'}`}}></div>
                        <div className="book-shelf-changer">
                            <select
                                onChange={(e) => {
                                    this.props.updateShelf(this.props.book, e.target.value)
                                }}
                                value={this.props.book.shelf || "none"}>
                                <option disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{this.props.book.title ? this.props.book.title : 'unknown'}</div>
                    <div className="book-authors">{this.props.book.authors ? this.props.book.authors : 'unknown'}</div>
                </div>
            </li>
        )
    }
}

export default Book