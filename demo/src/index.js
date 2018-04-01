import * as React from 'react'
import { render } from 'react-dom'

import Box from './Box'

import Tailor from '../../src'

class Demo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box width={800} height={200}>
          <Tailor isSingleLine>Short</Tailor>
        </Box>
        <Box width={160} height={200}>
          <Tailor isSingleLine>Much Longer Text</Tailor>
        </Box>
        <Box width={160} height={200}>
          <Tailor isSingleLine>Much Much Longer Text</Tailor>
        </Box>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
