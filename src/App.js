import React from 'react'
import { Route } from 'react-router-dom'
import Main from './Main'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search />
        )}/>
        <Route exact path="/" render={() => (
          <Main />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
