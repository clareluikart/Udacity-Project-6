import React from 'react'
import * as BooksAPI from './BooksAPI'
import { search } from './BooksAPI'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import BooksList from './BooksList'
import './App.css'
import Bookshelf from './Bookshelf' //this helped me solve an error here https://stackoverflow.com/questions/44172727/home-does-not-contain-an-export-named-home

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
      showSearchPage: false ,
      allBooks: [],
      searches: [],
      currentlyReading: [] ,
      wantToRead: [] ,
      read: [] ,
      query: ""
  }

  // componentDidMount() {
  //   BooksAPI.search(this.state.query).then((books) => {
  //     this.setState({ searches: books })
  //   })
  // }

  componentDidMount() {
    BooksAPI.getAll().then((allBooks) => {
      this.setState({allBooks})
      this.bookUpdate(this.state.allBooks)
    })
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
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
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */
                  console.log(search(this.state.query))
                }
                <input type="text"
                  placeholder="Search by title or author"
                  value={this.state.query}
                  onChange={(event) => {
                    this.updateQuery(event.target.value);
                  }}/>
                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                  <BooksList
                    books={this.state.searches}
                  />
                </ol>
              </div>
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
                    <Bookshelf booksList={this.state.wantToRead} />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Currently Reading</h2>
                    <Bookshelf booksList={this.state.currentlyReading} />
                  </div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <Bookshelf booksList={this.state.read} />
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
