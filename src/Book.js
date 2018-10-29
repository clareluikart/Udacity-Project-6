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
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ('url('+this.props.book.imageLinks.smallThumbnail+')') }}></div>
            <Changer book={this.props.book} onChange={this.props.onChange}/>
        </div>
        <div className="book-title">{this.props.book.title}</div>
        <div className="book-authors">{this.props.book.authors[0]}</div>
      </div>
    )
  }
}
