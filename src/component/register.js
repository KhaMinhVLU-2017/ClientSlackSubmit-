import React, { Component } from 'react'
import { Row, Col, Container, Form, Input, Label, FormGroup, Button } from 'reactstrap'
import bg from '../images/bg-01.jpg'
import axios from 'axios'
import { api } from '../config'

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
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = { username: '', password: '', email: '', check: false }
        this.onSubmitServer = this.onSubmitServer.bind(this)
        this.onHandlerChange = this.onHandlerChange.bind(this)
    }
    onSubmitServer(e) {
        e.preventDefault()
        let username = this.state.username
        let password = this.state.password
        let email = this.state.email
        let self = this
        axios.post(api.url + '/api/register', { username, password, email })
            .then(response => {
                if (response.data.status === 200) {
                    self.setState({check: true})
                }
                console.log(response)
            })
            .catch(err => {
                if (err) console.log(err)
            })

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
                    {this.state.check ?
                        <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
                            <h3 style={styleHeader}>Please verify email...!</h3>
                        </Col>
                        :
                        <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left: 0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
                            <h3 style={styleHeader}>ACCOUNT LOGIN</h3>
                            <Form onSubmit={this.onSubmitServer} style={{ background: 'white', borderRadius: 19, padding: '30px 20px' }}>
                                <FormGroup row style={{ marginTop: 30, marginBottom: 30 }}>
                                    <Label for="username" sm={4}>Username</Label>
                                    <Col sm={8}>
                                        <Input value={this.state.username} onChange={this.onHandlerChange} type="text" name="username" id="username" placeholder="User name" />
                                    </Col>
                                </FormGroup>
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
                                <Button type='submit' id='btn_login' style={styleButton} >LOGIN</Button>
                            </Form>
                        </Col>
                    }
                </Row>
            </Container>
        )
    }
}

export default Register
