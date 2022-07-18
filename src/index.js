import ReactDom from "react-dom/client"
import React from 'react'

import Clock from "./clock"

const app = ReactDom.createRoot(document.getElementById('app'))

app.render(<Clock name="Mark"/>)
