import React from 'react'
import { Table, Button, Badge } from 'reactstrap'
import axios from 'axios'
import { api } from '../config'
import { connect } from 'react-redux'

class TabelStaff extends React.Component {
  constructor(props) {
    super(props)
    this.state = { taskL: [] }
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
            <th>Datetime</th>
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
                <td>{item.status === 'Done' ?
                  <Badge color='success'>Done</Badge> :
                  <Badge color='primary'>Doing</Badge>
                }</td>
                <td><Button color='danger'>X</Button></td>
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
