import * as React from 'react'
import { render } from 'react-dom'

import Box from './Box'

import Tailor from '../../src'

class Demo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box width={300} height={160}>
          <Tailor isSingleLine>Short</Tailor>
        </Box>
        <Box width={100} height={160}>
          <Tailor isSingleLine>Much Longer Text</Tailor>
        </Box>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
