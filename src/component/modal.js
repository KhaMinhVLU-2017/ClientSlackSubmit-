import React from 'react'
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
  Form, FormGroup, Label, Input, Col
} from 'reactstrap'
import axios from 'axios'
import { api } from '../config'
import { connect } from 'react-redux'
import { withCookies } from 'react-cookie'
import { Redirect } from 'react-router-dom'

class Modelhome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      content: '',
      redirect: false
    }
    this.toggle = this.toggle.bind(this)
    this.eventOnchange = this.eventOnchange.bind(this)
    // this.checKeyDown = this.checKeyDown.bind(this)
    this.toggleSubmit = this.toggleSubmit.bind(this)
    this.handlerlogout = this.handlerlogout.bind(this)
  }
  handlerlogout () {
    let {cookies} = this.props
    cookies.remove('__id')
    cookies.remove('__ckToken')
    cookies.remove('__username')
    cookies.remove('__email')
    this.setState({redirect: true})
  }
  eventOnchange(e) {
    let name = e.target.id
    let value = e.target.value
    this.setState({ [name]: value })
  }
  toggle () {
    let { cookies } = this.props
    if (cookies.get('__ckToken')) {
      this.setState({
        modal: !this.state.modal, content: ''
      })
    } else {
      this.setState({ redirect: true })
    }
  }
  toggleSubmit(e) {
    e.preventDefault()
    let self = this
    let content = this.state.content
    let status = 'Doing'
    console.log(content)
    axios.post(api.url + '/api/task', {
      'content': content,
      'status': status
    })
      .then(response => {
        console.log('Submit Task Complete')
        self.props.increTask(true) // check notification on view
        self.setState({ modal: false })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const closeBtn = <button className='close' onClick={this.toggle}>&times;</button>
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
    let { cookies } = this.props
    let _id = cookies.get('__id')
    console.log(cookies)
    return (
      <div>
        {_id === '5be540b812a54d29528611db' ? <Button color='info' onClick={this.toggle}>Add Task </Button> : <Button disabled> Add Task </Button>}
        <Button style={{margin: '0 20px'}} color='danger' onClick={this.handlerlogout}>Logout</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle} close={closeBtn}>Add your task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label for='content' sm={2}>Content</Label>
                <Col sm={10}>
                  <Input value={this.state.content} type='textarea' name='text' onChange={this.eventOnchange} id='content' />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.toggleSubmit}>Submit</Button>{' '}
            <Button color='secondary' onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }
}

const mapDispatchtoProps = dispatch => ({
  increTask: task => dispatch.task.increTask(task)
})

export default connect(null, mapDispatchtoProps)(withCookies(Modelhome))
