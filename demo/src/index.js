import * as React from 'react'
import { render } from 'react-dom'

import { css } from 'glamor'

import Box from './Box'

import Tailor from '../../src'

class Demo extends React.Component {
  render() {
    const styles = {
      grid: {
        maxWidth: 1200,
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        gridTemplateRows: 'auto',
        gridTemplateAreas: '"header header" "sidebar content" "footer footer"',
      },
      header: {
        gridArea: 'header',
      },
      sidebar: {
        gridArea: 'sidebar',
      },
      content: {
        gridArea: 'content',
      },
      footer: {
        gridArea: 'footer',
      },
    }

    return (
      <div {...css(styles.grid)}>
        <section {...css(styles.header)}>
          <h1>
            <Tailor>React Tailor</Tailor>
          </h1>
        </section>
        <section {...css(styles.sidebar)}>
          <ul>
            <li>
              <Tailor>Short</Tailor>
            </li>
            <li>
              <Tailor>Longer</Tailor>
            </li>
            <li>
              <Tailor>Even Longer</Tailor>
            </li>
            <li>
              <Tailor>Short</Tailor>
            </li>
          </ul>
        </section>
        <section {...css(styles.content)}>Content</section>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
