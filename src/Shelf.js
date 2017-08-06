import React, { Component } from 'react'
import BooksGrid from './BooksGrid'
import PropTypes from 'prop-types'
import './App.css'

class Shelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <BooksGrid
            shelf={this.props.shelf}
            onShelfChange={this.props.onShelfChange}
            books={this.props.books}
          />
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
