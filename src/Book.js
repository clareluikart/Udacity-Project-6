import Changer from './Changer'
import React from 'react'

export default class Book extends React.Component{
  state = {
  }

  isDefined(item){
    if(item !== undefined){
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    return (
      <div className="book">
          <div className="book-top">
          {this.props.book.imageLinks !== undefined &&
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: ('url('+this.props.book.imageLinks.smallThumbnail+')') }}></div>}
            <Changer book={this.props.book} onChange={this.props.onChange}/>
        </div>

        <div className="book-title">{this.props.book.title}</div>
        {this.props.book.authors !== undefined &&
        <div className="book-authors">{this.props.book.authors.join(", ")}</div>}
      </div>
    )
  }
}
