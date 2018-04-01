import React from 'react'
import { render } from 'react-dom'

import Tailor from '../../src'

class Demo extends React.Component {
  render() {
    return (
      <div>
        <h1>tailor Demo</h1>
        <Tailor />
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
