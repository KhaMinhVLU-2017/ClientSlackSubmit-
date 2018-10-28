import React from 'react'
import { Nav, NavItem } from 'reactstrap'
import Modelhome from './modal'

export default class Navsmeo extends React.Component {
  render () {
    return (
      <div>
        <Nav pills>
          <NavItem>
            <Modelhome />
          </NavItem>
        </Nav>
      </div>
    )
  }
}
