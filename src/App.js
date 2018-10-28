import React, { Component } from 'react'
import './App.css'
import { Container, Col, Row, Alert } from 'reactstrap'
import TabelStaff from './component/table'
import 'bootstrap/dist/css/bootstrap.min.css'
import Welcome from './component/welcome'
import Navsmeo from './component/nav'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'

class App extends Component {
  render () {
    let selft = this
    if (this.props.booltask === true) {
      setTimeout(() => {
        selft.props.increTask(false)
      }, 2000)
    }
    return (
      <Container fluid>
        <Row>
          <Col md={12} xs={12}>
            <Welcome />
          </Col>
          <Container>
            <Row>
              {this.props.booltask && <Col sm='12' md='12'><Alert color='success'>Save task complete</Alert></Col>}
              <Navsmeo />
              <TabelStaff />
            </Row>
          </Container>
        </Row>
      </Container>
    )
  }
}
const mapStatetoProps = state => ({
  booltask: state.task
})
const mapDispatch = dispatch => ({
  increTask: btask => dispatch.task.increTask(btask)
})
export default connect(mapStatetoProps, mapDispatch)(App)
