import React, { Component } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Login from './component/login'
import Register from './component/register'
import { CookiesProvider } from 'react-cookie'
import App from './App'
import { withCookies } from 'react-cookie'

class MainIndex extends Component {
  render() {
    return (
      <CookiesProvider >
        <BrowserRouter>
          <div>
            <Route path='/' exact render={(props) => <Login {...props} />} />
            <Route path='/register' exact component={Register} />
            <Route path='/home' component={(props) => {
              let { cookies } = this.props
              let token = cookies.get('__ckToken')
              return token ? <App {...props} /> : <Redirect to='/' />
            }} />
          </div>
        </BrowserRouter>
      </CookiesProvider>
    )
  }
}

export default withCookies(MainIndex)
