import Book from './Book'
import React from 'react'

export default class Bookshelf extends React.Component{ //solved bug here with https://stackoverflow.com/questions/46703692/src-app-js-8348-54-export-default-imported-as-signup-was-not-found-in
  state = {
  }

  // render() {
  //   return (
  //     <div className="bookshelf-books">
  //       <ol className="books-grid">
  //         {this.props.booksList.forEach(bookInArray => (
  //           <li key={bookInArray.id}>
  //             <Book book={ bookInArray } />
  //             {console.log({bookInArray})}
  //           </li>
  //         ))}
  //       </ol>
  //     </div>
  //   )
  // }
  render() {
    return (
      <div className="bookshelf-books">
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
    );
  }
}
