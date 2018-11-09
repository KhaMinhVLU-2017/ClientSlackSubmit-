import React, { Component } from 'react'
import { Row, Col, Container, Form, Input, Label, FormGroup, Button } from 'reactstrap'
import bg from '../images/bg-01.jpg'

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
    render() {
        return (
            <Container fluid >
                <Row >
                    <img src={bg} style={{ width: '100vw', position: 'relative', height: '100vh', filter: 'brightness(50%)' }} alt='img' />
                    <Col style={{ position: 'absolute', maxWidth: 450, textAlign: 'center', left:0, right: 0, top: 0, bottom: 0, margin: '25vh auto' }} md={12} sm={12} xs={12}>
                        <h3 style={styleHeader}>ACCOUNT LOGIN</h3>
                        <Form style={{ background: 'white', borderRadius: 19, padding: '30px 20px' }}>
                            <FormGroup row style={{marginTop: 30, marginBottom: 30}}>
                                <Label for="username" sm={4}>Username</Label>
                                <Col sm={8}>
                                    <Input type="text" name="username" id="username" placeholder="User name" />
                                </Col>
                            </FormGroup>
                            <FormGroup row style={{marginTop: 30, marginBottom: 30}}>
                                <Label for="password" sm={4}>Password</Label>
                                <Col sm={8}>
                                    <Input type="password" name="password" id="password" placeholder="Password" />
                                </Col>
                            </FormGroup>
                            <hr />
                            <Button type='submit' id='btn_login' style={styleButton} >LOGIN</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Login
