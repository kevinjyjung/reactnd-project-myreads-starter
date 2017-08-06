import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import './App.css'

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books
              .filter((book) => book.shelf === this.props.shelf)
              .map((book) => (
                <li key={book.id}>
                  <Book
                    backgroundImage={book.backgroundImage}
                    title={book.title}
                    authors={book.authors}
                    onShelfChange={(event) => this.props.onShelfChange(book.id, event.target.value)}
                    shelf={book.shelf}
                  />
                </li>
              ))}
          </ol>
        </div>
      </div>
    )
  }
}

Shelf.propTypes = {
  shelf: PropTypes.string.isRequired,
  shelfTitle: PropTypes.string.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  books: PropTypes.array
}

export default Shelf
