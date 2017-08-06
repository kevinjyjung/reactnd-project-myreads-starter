import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class Search extends Component {
  state = {
    input: "",
    books: []
  }

  async onInputChange(value) {
    console.log(value)
    this.setState({input: value})
    try {
      const booksRaw = value && await BooksAPI.search(value, 20)
      if (booksRaw && booksRaw.length > 0) {
        this.setState({
          books: booksRaw.map((book) => {
              return {
                id: book.id,
                title: book.title,
                subtitle: book.subtitle,
                authors: book.authors,
                backgroundImage: `url("${book.imageLinks.smallThumbnail}")`,
                shelf: book.shelf
              }
            })
        })
      } else {
        this.setState({books: []})
      }
    } catch (err) {
      console.log("Error searching for books: "+ err);
    }
  }

  async onShelfChange(id, value) {
    try {
      await BooksAPI.update({id}, value)
    } catch (err) {
      console.log("Error updating book: " + err)
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
          <ol className="books-grid">
            {this.state.books.map(
              (book) => (
                <li key={book.id}>
                  <Book
                    backgroundImage={book.backgroundImage}
                    title={book.title}
                    authors={book.authors}
                    onShelfChange={(event) => this.onShelfChange(book.id, event.target.value)}
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

export default Search
