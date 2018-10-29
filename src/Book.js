import Changer from './Changer'
import React from 'react'

export default class Book extends React.Component{
  state = {
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          {console.log(this.props.book)}
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=1wy49i-gQ…=frontcover&img=1&zoom=5&edge=curl&source=gbs_api")' }}></div>
            <Changer />
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors[0]}</div>
      </div>
    )
  }
}
