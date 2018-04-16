import * as React from 'react'
import { render } from 'react-dom'
import Markdown from 'react-markdown'

import Typography from 'typography'
import usWebDesignStandardsTheme from 'typography-theme-us-web-design-standards'

import { css } from 'glamor'

import Tailor from '../../src'

css.global('html, body', { padding: 0, margin: 0 })
css.global('body', {
  backgroundColor: '#18d7fd',
  fontFamily:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif',
})

const typography = new Typography({
  baseFontSize: '18px',
  baseLineHeight: 1.5,
})
typography.injectStyles()

const content = `
## Intro

This is a demo page for [React Tailor](https://github.com/chrisdrackett/react-tailor), a react component that will size a single line of text to fit its container.

## Uses

### Headers

By default Tailor won't grow text past its initial size. However if you are using Tailor for headers (like the main header on this page) you might want to use the \`canGrow\` prop to let the text take up as much space as is available.

### List Items

Tailor can be used to size long list items down to fit (see left). By default it won't size text below 11px, but you can override this using the \`minSize\` prop.
`

class Demo extends React.Component {
  render() {
    const white = '#ffffff'
    const background = '#f5f9fc'

    const styles = {
      grid: {
        backgroundColor: white,

        maxWidth: 1200,
        height: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'grid',
        gridTemplateColumns: '230px auto',
        gridTemplateRows: 'auto',
        gridTemplateAreas: '"header header" "sidebar content"',
      },
      header: {
        gridArea: 'header',

        padding: 16,

        textAlign: 'center',

        borderBottom: `1px solid ${background}`,
      },
      sidebar: {
        gridArea: 'sidebar',

        '& ul': {
          listStyleType: 'none',
          margin: 0,
          padding: 0,

          '& li': {
            height: 50,

            fontSize: 22,

            margin: 0,
            paddingLeft: 16,
            paddingRight: 16,

            lineHeight: '50px',

            '& + li': {
              borderTop: `1px solid ${background}`,
            },
          },
        },
      },
      content: {
        gridArea: 'content',

        backgroundColor: background,

        padding: 32,
      },
    }

    return (
      <div {...css(styles.grid)}>
        <section {...css(styles.header)}>
          <h1>
            <Tailor canGrow>React Tailor ✂️</Tailor>
          </h1>
        </section>
        <section {...css(styles.sidebar)}>
          <ul>
            <li>
              <Tailor>Short Text</Tailor>
            </li>
            <li>
              <Tailor>Longer Text</Tailor>
            </li>
            <li>
              <Tailor>Even Longer Text</Tailor>
            </li>
            <li>
              <Tailor>Super Duper Long Text</Tailor>
            </li>
            <li>
              <Tailor>Super Duper Long Text That Will Always Overflow</Tailor>
            </li>
          </ul>
        </section>
        <section {...css(styles.content)}>
          <Markdown source={content} />
        </section>
      </div>
    )
  }
}

render(<Demo />, document.querySelector('#demo'))
