import ReactDom from 'react-dom/client'
import React from 'react'
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'

import Clock from './clock'
import Mathematics from './routes/mathematics'
import Physics from './routes/physics'

const app = ReactDom.createRoot(document.getElementById('app'))

app.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={ <Clock name="Mark"/> }>
        <Route path="mathematics" element={ <Mathematics /> }></Route>
        <Route path="physics" element={ <Physics /> }></Route>
      </Route>
    </Routes>
  </BrowserRouter>
)
