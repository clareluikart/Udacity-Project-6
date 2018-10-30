import React from 'react'
import Book from './Book'

export default class Search extends React.Component {

  state = {
  }

  alreadyInAllBooks = function(book){
    var returnVar = "none"
    this.props.allBooks.forEach((allBook) => {
      if(allBook.id === book.id){
        returnVar = allBook.shelf
      }
    })
    return returnVar
  }

  render(){
    return(
      <div className="search-books-results">
        <ol className="books-grid">
          {this.props.booksList.length > 0 &&
          this.props.booksList.map(bookInArray => {
            bookInArray.shelf = this.alreadyInAllBooks(bookInArray)
              return (
                <li key={bookInArray.id}>
                <Book onChange={this.props.onChange} book={bookInArray} />
                </li>
              );}
            )
          }
        </ol>
      </div>
    )
  }
}
