import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <div>welcome!</div>
    )
  }
}

export default Index

ReactDOM.render(<Index />, document.getElementById('root'))
