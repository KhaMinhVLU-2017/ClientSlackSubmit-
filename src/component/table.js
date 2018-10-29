import React from 'react'
import { Table, Button, Badge } from 'reactstrap'
import axios from 'axios'
import { api } from '../config'
import { connect } from 'react-redux'
import loadimg from '../images/load.gif'

class TabelStaff extends React.Component {
  constructor(props) {
    super(props)
    this.state = { taskL: [], loaded: false, id_load: '' }
    this.evenRmTask = this.evenRmTask.bind(this)
  }
  componentDidMount() {
    this.getTastList()
  }
  getTastList() {
    let self = this
    axios.get(api.url + '/api/taskList')
      .then(response => {
        let payload = response.data.data
        self.setState({ taskL: payload })
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  evenRmTask(e) {
    let id = e.target.id
    let self = this
    this.setState({ loaded: true, id_load: id })
    axios.get(api.url + '/api/Task' + id)
      .then((response) => {
        if (response.status === 200) {
          setTimeout(() => { self.setState({ loaded: false }); self.getTastList() }, 1000)
        }
        console.log(response)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  render() {
    if (this.props.booltask) {
      this.getTastList()
    }
    return (
      <Table dark hover style={{ marginTop: '50px' }}>
        <thead>
          <tr>
            <th>#</th>
            <th>Content</th>
            <th>Description</th>
            <th>Done Time</th>
            <th>Status</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {
            this.state.taskL.length > 0 ? this.state.taskL.map((item, index) =>
              <tr key={index}>
                <td >{index + 1}</td>
                <td>{item.content}</td>
                <td>7:00AM every day except Sunday</td>
                <td>{item.date === 'waiting' ? <Badge color='warning'>{item.date}</Badge> : item.date}</td>
                <td>{item.status === 'Done' ?
                  <Badge color='success'>Done</Badge> : <Badge color='primary'>Doing</Badge>
                }</td>
                <td>{item.status !== 'Done' ? <Button onClick={this.evenRmTask} id={item._id} color='danger'> X </Button> : ''}
                  &ensp; {this.state.loaded && item._id === this.state.id_load && <img style={{ width: 40 }} alt='loaded' className='img-responsive' src={loadimg} />}
                </td>
              </tr>
            ) : (<tr key='1'>
              <td >0</td>
              <td>null</td>
              <td>null</td>
              <td>null</td>
              <td><Button color='danger'>X</Button></td>
            </tr>)
          }
        </tbody>
      </Table>
    )
  }
}

const mapStatetoProps = state => ({
  booltask: state.task
})

export default connect(mapStatetoProps)(TabelStaff)
