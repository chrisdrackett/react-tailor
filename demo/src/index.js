import * as React from 'react'
import { render } from 'react-dom'

import Box from './Box'

import Tailor from '../../src'

class Demo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Tailor isSingleLine>
          <h1>Large Headline</h1>
        </Tailor>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <Box width={800} height={200}>
            <Tailor isSingleLine>Short Text</Tailor>
          </Box>
          <Box width={800} height={200}>
            <Tailor isSingleLine>Shorty</Tailor>
          </Box>
          <Box width={800} height={200}>
            <Tailor isSingleLine>Short Texty</Tailor>
          </Box>
          <Box width={160} height={200}>
            <Tailor isSingleLine>Much Longer Text</Tailor>
          </Box>
          <Box width={160} height={200}>
            <Tailor isSingleLine>Much Much Much Longer Text</Tailor>
          </Box>
        </div>
      </React.Fragment>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
