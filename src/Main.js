import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import './App.css'

class Main extends Component {
  state = {
    books: []
  }

  async componentDidMount() {
    try {
      let books = {}
      const booksRaw = await BooksAPI.getAll()
      console.log(booksRaw)
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
    } catch (err) {
      console.log("Error getting books in bookshelf")
    }
  }

  onShelfChange(id, value) {
    this.setState({
      books: this.state.books.map((book) => {
        if (book.id === id) {
          book.shelf = value
        }
        return book
      })
    })
  }

  getShelf(shelf, shelfTitle) {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.state.books
              .filter((book) => book.shelf === shelf)
              .map((book) => (
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

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {this.getShelf("currentlyReading", "Currently Reading")}
            {this.getShelf("wantToRead", "Want to Read")}
            {this.getShelf("read", "Read")}
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}

export default Main