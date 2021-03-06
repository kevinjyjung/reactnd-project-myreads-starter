import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BooksGrid from './BooksGrid'
import './App.css'

/**
* @description Search page
*/
class Search extends Component {
  state = {
    input: "",
    books: []
  };

  /**
  * @description Makes API call to get all books matching search value
  * @param {string} value - Search query value
  */
  async getBooks(value) {
    try {
      const booksRaw = value && await BooksAPI.search(value, 20);
      if (booksRaw && booksRaw.length > 0) {
        Promise.all(booksRaw.map(async (book) => {
          let b = await BooksAPI.get(book.id);
          return {
            id: book.id,
            title: book.title,
            subtitle: book.subtitle,
            authors: book.authors,
            backgroundImage: `url("${book.imageLinks.smallThumbnail}")`,
            shelf: b.shelf
          };
        })).then((books) => {
          this.setState({books});
        })
      } else {
        this.setState({books: []});
      }
    } catch (err) {
      console.log("Error searching for books: "+ err);
    }
  }

  /**
  * @description Handles change in input value to update search result
  * @param {string} value - Search query value
  */
  async onInputChange(value) {
    this.setState({input: value});
    await this.getBooks(value);
  }

  /**
  * @description Handles moving books between shelves
  * @param {string} id - Book ID
  * @param {string} value - New shelf
  */
  async onShelfChange(id, value) {
    try {
      await BooksAPI.update({id}, value);
      await this.getBooks(this.state.input);
    } catch (err) {
      console.log("Error updating book: " + err);
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.onInputChange(event.target.value)}
              value={this.state.input}
            />
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            onShelfChange={(id, value) => this.onShelfChange(id, value)}
            books={this.state.books}
          />
        </div>
      </div>
    )
  }
}

export default Search;
