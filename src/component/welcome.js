import React from 'react'
import { Container, Jumbotron } from 'reactstrap'
import { withCookies } from 'react-cookie'

class Welcome extends React.Component {
  render () {
    let username = this.props.cookies.get('__username')
    let _id = this.props.cookies.get('__id')
    if (_id === '5be540b812a54d29528611db') {
      return (
        <div>
          <Jumbotron style={{ textAlign: 'center' }} fluid>
            <Container fluid>
              <h1 className='display-3 text-primary'>Welcome to Website</h1>
              <p className='lead text-success'>Website builded for submit task to Slack</p>
              <p className='lead text-success'><em>Create by JudasFate</em></p>
            </Container>
          </Jumbotron>
        </div>
      )
    } else {
      return (
        <div>
          <Jumbotron style={{ textAlign: 'center' }} fluid>
            <Container fluid>
              <h1 className='display-3 text-primary'>Welcome to Website</h1>
              <p className='lead text-success'>Website builded for submit task to Slack</p>
              <p className='lead text-success'><em>Create by JudasFate</em></p>
              <hr />
              <p className='lead text-info'>Hi {username}...!</p>
              <p className='lead text-info'>You are read only JudasFate'task</p>
            </Container>
          </Jumbotron>
        </div>
      )
    }
  }
}

export default withCookies(Welcome)
