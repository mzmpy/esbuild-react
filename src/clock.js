import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default class Clock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      status: true
    }
  }

  componentDidMount() {
    this.timer = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  tick() {
    this.setState({
      date: new Date()
    })
  }

  toggle = () => {
    if(this.state.status) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => this.tick(), 1000)
    }

    this.setState((state) => {
      return {
        status: !state.status
      }
    })
  }

  render() {
      return <>
        <h1>Hello, { this.props.name }!</h1>
        <h2>It is { this.state.date.toLocaleTimeString() } now.</h2>
        <button type="button" onClick={ this.toggle }>{ this.state.status ? 'stop' : 'react' }</button>
        <div>
          <Link to="/mathematics">Mathematics</Link> | <Link to="/physics">Physics</Link>
        </div>
        <Outlet />
      </>
  }
}
