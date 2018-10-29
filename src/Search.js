import React from 'react'
import Book from './Book'

export default class Search extends React.Component {

  state = {

  }

  render(){
    return(
      <div className="search-books-results">
        <ol className="books-grid">
          {this.props.booksList.map(bookInArray => {
            return (
                <li key={bookInArray.id}>
                  <Book onChange={this.props.onChange} book={bookInArray} />
                </li>
            );
          })}
        </ol>
      </div>
    )
  }
}
