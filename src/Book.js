import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class Book extends Component {
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: this.props.backgroundImage
            }}>
          </div>
          <div className="book-shelf-changer">
            <select value={this.props.shelf} onChange={this.props.onShelfChange}>
              <option value="" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.title}</div>
        <div className="book-authors">{this.props.authors && this.props.authors.join(", ")}</div>
      </div>
    );
  }
}

Book.propTypes = {
  backgroundImage: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  authors: PropTypes.array,
  onShelfChange: PropTypes.func.isRequired,
  shelf: PropTypes.string.isRequired
}

export default Book;
