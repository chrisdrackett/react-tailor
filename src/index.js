// @flow

import * as React from 'react'
import Measure from 'react-measure'

type Props = {
  /**
   * treat the text as a single line, add an elipsis if we hit our minimum size.
   */
  isSingleLine: boolean,
  minSize: number,
  children?: React.Node,
  style?: {},
}

type State = {
  doneSizing: boolean,
  finalSize: number,
  firstRun: boolean,
}

export default class Tailor extends React.Component<Props, State> {
  innerChild = React.createRef()
  outerChild = React.createRef()

  static defaultProps = {
    isSingleLine: false,
    minSize: 11,
  }

  state = {
    doneSizing: false,
    firstRun: true,
    finalSize: 0,
  }

  componentDidMount() {
    this.processText()
  }

  componentDidUpdate() {
    this.processText()
  }

  processText = () => {
    if (!this.state.doneSizing) {
      let low, high, mid
      const content = this.innerChild.current

      const maxWidth = content.parentNode.scrollWidth

      low = this.props.minSize
      high = content.parentNode.scrollHeight
      mid = 0

      while (low <= high) {
        mid = parseInt((low + high) / 2, 10)
        content.style.fontSize = mid + 'px'

        if (content.scrollWidth <= maxWidth) {
          low = mid + 1
        } else {
          high = mid - 1
        }
      }

      const finalSize = mid - 1

      content.style.fontSize = finalSize + 'px'
      this.setState({ finalSize, doneSizing: true })
    }
  }

  render() {
    const { isSingleLine, children, style } = this.props

    const containerStyle = {
      ...style,

      // Fill whatever size our parent is
      width: '100%',
      height: '100%',
    }

    const contentStyle = {
      fontSize:
        this.state.finalSize > 0 ? `${this.state.finalSize}px` : 'inherit',
      display: this.state.doneSizing ? 'block' : 'inline-block',
      whiteSpace: isSingleLine ? 'nowrap' : 'normal',
      overflow: isSingleLine ? 'hidden' : 'visible',
      textOverflow: isSingleLine ? 'ellipsis' : 'clip',
    }

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          console.log('resize!')
          if (this.state.firstRun) {
            // We don't need to kick off a resize on the first run as
            // we'll already be doing one
            this.setState({ firstRun: false })
          } else {
            // If this isn't the first run, we do want to resize the text as
            // this elements size has changed
            this.setState({
              doneSizing: false,
              finalSize: 0,
            })
          }
        }}
      >
        {({ measureRef }) => (
          <div ref={measureRef} style={containerStyle}>
            <span ref={this.innerChild} style={contentStyle}>
              {children}
            </span>
          </div>
        )}
      </Measure>
    )
  }
}
