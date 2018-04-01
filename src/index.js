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
  width: number,
  height: number,
  doneSizing: boolean,
  finalSize: number,
}

export default class Tailor extends React.Component<Props, State> {
  innerChild = React.createRef()

  static defaultProps = {
    isSingleLine: false,
    minSize: 11,
  }

  state = {
    width: 0,
    height: 0,
    doneSizing: false,
    finalSize: 0,
  }

  componentDidUpdate() {
    if (!this.state.doneSizing) {
      let low, high, mid
      const content = this.innerChild.current
      // process our size

      low = this.props.minSize
      high = this.state.height
      mid = 0

      while (low <= high) {
        mid = parseInt((low + high) / 2, 10)
        content.style.fontSize = mid + 'px'
        if (content.scrollWidth <= this.state.width) {
          low = mid + 1
        } else {
          high = mid - 1
        }
      }

      this.setState({ finalSize: mid - 1, doneSizing: true })
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
      display: this.state.doneSizing ? 'block' : 'inline-block',
      whiteSpace: isSingleLine ? 'nowrap' : 'normal',
      overflow: isSingleLine ? 'hidden' : 'visible',
      textOverflow: isSingleLine ? 'ellipsis' : 'clip',
    }

    return (
      <Measure
        bounds
        onResize={(contentRect) => {
          this.setState({
            width: contentRect.bounds.width,
            height: contentRect.bounds.height,
            doneSizing: false,
          })
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
