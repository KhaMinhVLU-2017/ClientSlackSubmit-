import React, { Component } from 'react'
import { Row, Col, Container, Form, Input, Label, FormGroup, Button, Alert } from 'reactstrap'
import bg from '../images/bg-01.jpg'
import axios from 'axios'
import { api } from '../config'
import { Link } from 'react-router-dom'

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
        this.state = { email: '', password: '', color: '', message: '' }
        this.onSubmitServer = this.onSubmitServer.bind(this)
        this.onHandlerChange = this.onHandlerChange.bind(this)
    }
    onSubmitServer(e) {
        e.preventDefault()
        let self = this
        let email = this.state.email
        let password = this.state.password
        if (email !== '' || password !== '') {
            axios.post(api.url + '/api/login', { email, password })
                .then(response => {
                    if (response.data.status === 200) {

                    } else {
                        self.setState({ color: 'danger', message: response.data.message })
                    }
                    console.log(response)
                })
                .catch(err => {
                    if (err) console.log(err)
                })
        } else {
            this.setState({ color: 'danger', message: 'Please input field' })
        }
    }
    onHandlerChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        return (
            <Container fluid >
                <Row >
                    <img src={bg} style={{ width: '100vw', position: 'relative', height: '100vh', filter: 'brightness(50%)' }} alt='img' />
                    <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
                        <h3 style={styleHeader}>ACCOUNT LOGIN</h3>
                        <Form onSubmit={this.onSubmitServer} style={{ background: 'white', borderRadius: 19, padding: '30px 20px' }}>
                            <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                                <Label for="email" sm={4}>Email</Label>
                                <Col sm={8}>
                                    <Input value={this.state.email} onChange={this.onHandlerChange} type="email" name="email" id="email" placeholder="Email" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                                <Label for="password" sm={4}>Password</Label>
                                <Col sm={8}>
                                    <Input value={this.state.password} onChange={this.onHandlerChange} type="password" name="password" id="password" placeholder="Password" />
                                </Col>
                            </FormGroup>
                            <hr />
                            <Alert color={this.state.color}>{this.state.message}</Alert>
                            <Button type='submit' id='btn_login' style={styleButton} >LOGIN</Button>
                        </Form>
                        <Link to="/register"><p style={{ float: 'right' }}>You are not account ?</p></Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login
