// @flow

import * as React from 'react'
import Measure from 'react-measure'

type Props = {
  /**
   * treat the text as a single line, add an elipsis if we hit our minimum size.
   */
  isSingleLine: boolean,
  /**
   * The minimum size text will be sized down to
   */
  minSize: number,

  children?: React.Node,
  style?: {},
}

type State = {
  firstRun: boolean,
  doneSizing: boolean,

  finalSize: number,
}

export default class Tailor extends React.Component<Props, State> {
  resizeTimer: TimeoutID
  innerChild = React.createRef()

  static defaultProps = {
    isSingleLine: false,
    minSize: 11,
  }

  state = {
    firstRun: true,

    doneSizing: false,
    finalSize: 0,
  }

  componentDidMount() {
    this.processText()
  }

  componentDidUpdate() {
    this.processText()
  }

  causeResize = () => {
    this.setState({
      doneSizing: false,
      finalSize: 0,
    })
  }

  processText = () => {
    if (!this.state.doneSizing) {
      let low, high, mid
      const content = this.innerChild.current
      const maxWidth = content.parentNode.scrollWidth

      const startSize = parseFloat(
        window.getComputedStyle(content, null).getPropertyValue('font-size'),
      )

      low = this.props.minSize
      high = content.parentNode.scrollHeight

      let finalSize = startSize / content.scrollWidth * maxWidth - 2

      if (finalSize < low) {
        finalSize = low
      }

      content.style.fontSize = finalSize + 'px'

      this.setState((state) => ({
        finalSize,
        doneSizing: true,
      }))
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
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    }

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          if (this.state.firstRun) {
            // We don't need to kick off a resize on the first run as
            // we'll already be doing one
            this.setState({ firstRun: false })
          } else {
            // If this isn't the first run, we do want to resize the text as
            // this elements size has changed
            this.causeResize()
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
