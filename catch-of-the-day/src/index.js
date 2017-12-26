import React from 'react'
import {render} from 'react-dom'
import {BrowserRouter, Match, Miss} from 'react-router'
import './css/style.css'
import StorePicker from './components/storePicker'
import App from './components/app'
import NotFound from './components/notFound'


const Root = ()=>{
  return(
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker}/>
        <Match pattern="/store/:storeId" component={App}/>
        <Miss component={NotFound}/>
      </div>
    </BrowserRouter>
  )
}

render(<Root />, document.getElementById('main'))
