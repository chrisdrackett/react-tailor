import * as React from 'react'
import { render } from 'react-dom'

import Box from './Box'

import Tailor from '../../src'

class Demo extends React.Component {
  render() {
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box width={800} height={200}>
          <Tailor isSingleLine>Short Text</Tailor>
        </Box>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
