import React from 'react'
import { Container, Jumbotron } from 'reactstrap'

class Welcome extends React.Component {
  render () {
    return (
      <div>
        <Jumbotron style={{textAlign: 'center'}} fluid>
          <Container fluid>
            <h1 className='display-3 text-primary'>Welcome to Website</h1>
            <p className='lead text-success'>Website builded for submit task to Slack</p>
          </Container>
        </Jumbotron>
      </div>
    )
  }
}

export default Welcome
