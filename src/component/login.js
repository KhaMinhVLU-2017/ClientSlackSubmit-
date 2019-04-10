import React, { Component } from 'react'
import { Row, Col, Container, Form, Input, Label, FormGroup, Button, Alert } from 'reactstrap'
import bg from '../images/bg-01.jpg'
import axios from 'axios'
import { api } from '../config'
import { Link, Redirect } from 'react-router-dom'
import jwt from 'jsonwebtoken'
import { withCookies } from 'react-cookie'
import loadIMG from '../images/loading.gif'

const styleButton = {
  width: 100,
  background: 'linear-gradient(to left, #a445b2, #d41872, #fa4299)',
  color: 'white',
  fontWeight: 'bold'
}
const styleHeader = {
  fontWeight: 'bold',
  color: 'white',
  marginBottom: 30
}
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = { email: '', password: '', color: '', message: '', login: false, stIMG: false, percent: 0 }
    this.onSubmitServer = this.onSubmitServer.bind(this)
    this.onHandlerChange = this.onHandlerChange.bind(this)
  }
  onSubmitServer(e) {
    e.preventDefault()
    const { cookies } = this.props
    let self = this
    let email = this.state.email
    let password = this.state.password
    this.setState({stIMG: true})
    if (email !== '' || password !== '') {
      axios.post(api.url + '/api/login', { email, password },{
        onUploadProgress: function (progressEvent) {
          //console.log("upload :" , progressEvent)
        },
        onDownloadProgress: function (progressEvent) {
          //console.log("download :" , progressEvent)
        }
      })
        .then(response => {
          if (response.data.status === 200) {
            let decode = jwt.verify(response.data.token, api.keyToken)
            cookies.set('__ckToken', response.data.token, { path: '/' })
            cookies.set('__email', decode.email, { path: '/' })
            cookies.set('__username', decode.username, { path: '/' })
            cookies.set('__id', decode._id, { path: '/' })
            self.setState({ login: true,stIMG: false })
          } else {
            self.setState({ color: 'danger', message: response.data.message,stIMG: false  })
          }
        })
        .catch(err => {
          if (err) console.log(err)
        })
    } else {
      this.setState({ color: 'danger', message: 'Please input field', stIMG: false })
    }
  }
  onHandlerChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    if (this.state.login) {
      return <Redirect to='/home' />
    }
    return (
      <Container fluid >
        <Row >
          <img src={bg} style={{ width: '100vw', position: 'relative', height: '100vh', filter: 'brightness(50%)' }} alt='img' />
          <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
            <h3 style={styleHeader}>ACCOUNT LOGIN</h3>
            <Form onSubmit={this.onSubmitServer} style={{ background: 'white', borderRadius: 19, padding: '30px 20px' }}>
              <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                <Label for='email' sm={4}>Email</Label>
                <Col sm={8}>
                  <Input value={this.state.email} onChange={this.onHandlerChange} type='email' name='email' id='email' placeholder='Email' />
                </Col>
              </FormGroup>
              <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                <Label for='password' sm={4}>Password</Label>
                <Col sm={8}>
                  <Input value={this.state.password} onChange={this.onHandlerChange} type='password' name='password' id='password' placeholder='Password' />
                </Col>
              </FormGroup>
              <hr />
              <Alert color={this.state.color}>{this.state.message}</Alert>
              {this.state.stIMG ? <span><img alt="loading MEO" src={loadIMG} style={{ width: 50 }} /></span> :
                <Button type='submit' id='btn_login' style={styleButton} >LOGIN</Button>
              }
            </Form>
            <Link to='/register'><p style={{ float: 'right' }}>Are you not account ?</p></Link>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withCookies(Login)
