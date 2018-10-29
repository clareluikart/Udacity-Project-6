import React from 'react'

export default class Changer extends React.Component{
  state = {
    value: this.props.book.shelf
  }

  onChange = (event) => {
    this.setState({value: event.target.value})
    console.log("on change! this.props.book:"+this.props.book+" event.target.value:"+event.target.value+" this.state.value:"+this.state.value)
    this.props.onChange(this.props.book, event.target.value)
  }

render() {
  return (
    <div className="book-shelf-changer">
      <select value={this.state.value} onChange={this.onChange}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
    )
  }
}
