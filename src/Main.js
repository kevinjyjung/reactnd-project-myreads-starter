import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import './App.css'

/**
* @description Main page showing shelves
*/
class Main extends Component {
  state = {
    books: []
  };

  /**
  * @description Populates books when page first loads
  */
  async componentDidMount() {
    await this.getBooks();
  }

  /**
  * @description Makes API call to get all books on shelves
  */
  async getBooks() {
    try {
      const booksRaw = await BooksAPI.getAll();
      this.setState({
        books: booksRaw.map((book) => {
            return {
              id: book.id,
              title: book.title,
              subtitle: book.subtitle,
              authors: book.authors,
              backgroundImage: `url("${book.imageLinks.smallThumbnail}")`,
              shelf: book.shelf
            };
          })
      });
    } catch (err) {
      console.log("Error getting books in bookshelf");
    }
  }

  /**
  * @description Handles moving books between shelves
  * @param {string} id - Book ID
  * @param {string} value - New shelf
  */
  async onShelfChange(id, value) {
    try {
      await BooksAPI.update({id}, value);
      await this.getBooks();
    } catch (err) {
      console.log("Error updating books");
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
              shelf="currentlyReading"
              shelfTitle="Currently Reading"
              onShelfChange={(id, value) => this.onShelfChange(id, value)}
              books={this.state.books}
            />
            <Shelf
              shelf="wantToRead"
              shelfTitle="Want to Read"
              onShelfChange={(id, value) => this.onShelfChange(id, value)}
              books={this.state.books}
            />
            <Shelf
              shelf="read"
              shelfTitle="Read"
              onShelfChange={(id, value) => this.onShelfChange(id, value)}
              books={this.state.books}
            />
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

export default Main;