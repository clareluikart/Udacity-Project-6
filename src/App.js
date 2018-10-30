import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Search from './Search'
import './App.css'
import Bookshelf from './Bookshelf' //this helped me solve an error here https://stackoverflow.com/questions/44172727/home-does-not-contain-an-export-named-home

class BooksApp extends React.Component {
  state = {
      showSearchPage: false ,
      allBooks: [],
      searches: [],
      currentlyReading: [] ,
      wantToRead: [] ,
      read: [] ,
      query: ""
  }

  updateSearches() {
    BooksAPI.search(this.state.query).then((searches) => {
      this.setState({ searches })
    })
  }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks})
      this.bookUpdate(this.state.allBooks)
    })
  }

  shelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((allBooks) => {
        this.bookUpdate(allBooks)
        this.setState({allBooks})
    })}
  )}

  updateSearches = (query) => {
    this.setState({ query })
    BooksAPI.search(query).then((searches) => {
      this.setState({searches})
    })
  }

  bookUpdate = (allBooks) => {
    var cR = []
    var wTR = []
    var r = []
    allBooks.forEach((book) => {
        if(book.shelf === "currentlyReading"){
          cR.push(book)
        }
        else if (book.shelf === "wantToRead"){
          wTR.push(book)
        }
        else if (book.shelf === "read"){
          r.push(book)
        }
      })
      this.setState({currentlyReading: cR})
      this.setState({wantToRead: wTR})
      this.setState({read: r})
    }

  render() {
    return (
      <div className="app">
        <Route exact path="/search" render = {() => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to={{
                    pathname: "/" ,
                    state: { showSearchPage: false }
                  }} className="close-search" >Close</Link>
                <div className="search-books-input-wrapper">
                {
                }
                <input type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => {
                    this.updateSearches(event.target.value)
                  }}/>
                </div>
              </div>
              {this.state.searches !== undefined && this.state.searches[0] !== undefined &&
              <Search onChange={this.shelfChange} booksList={this.state.searches} allBooks={this.state.allBooks}/>}
            </div>
            )}/>
            <Route exact path = "/" render = {() => (
            <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Want to Read</h2>
                    <Bookshelf onChange={this.shelfChange} booksList={this.state.wantToRead} />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <Bookshelf onChange={this.shelfChange} booksList={this.state.currentlyReading} />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <Bookshelf onChange={this.shelfChange} booksList={this.state.read} />
                </div>
              </div>
            </div>
          </div>
            <div className = "open-search">
              <Link to={{
                  pathname: "/search" ,
                  state: { showSearchPage: true }
                }}>
                Add a book
              </Link>
          </div>
        </div>
        )}/>
        </div>
    )
  }
}

export default BooksApp
