import React, { Component } from 'react'
import Book from './Book'
import PropTypes from 'prop-types'
import './App.css'

/**
* @description BooksGrid component to render a list of books
*/
class BooksGrid extends Component {
  render() {
    return (
      <ol className="books-grid">
        {this.props.books && this.props.books.filter(
          (book) => !this.props.shelf || book.shelf === this.props.shelf).map(
          (book) => (
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
    )
  }
}

BooksGrid.propTypes = {
  shelf: PropTypes.string,
  onShelfChange: PropTypes.func.isRequired,
  books: PropTypes.array
}

export default BooksGrid;
