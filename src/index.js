// @flow

import * as React from 'react'
import Measure from 'react-measure'

type Props = {
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
    // we process on first mount to avoid as much flashing as possible.
    this.processText()
  }

  causeResize = () => {
    this.setState(
      {
        doneSizing: false,
        finalSize: 0,
      },
      () => {
        this.processText()
      },
    )
  }

  processText = () => {
    if (!this.state.doneSizing) {
      const content = this.innerChild.current

      const maxWidth = content.parentNode.scrollWidth
      const initialHeight = content.parentNode.scrollHeight

      const startSize = parseFloat(
        window.getComputedStyle(content, null).getPropertyValue('font-size'),
      )

      // guess the final size and subtract 2 to reduce and/or eleminate false ellipses
      let finalSize = startSize / content.scrollWidth * maxWidth - 2

      // the above got us at the correct width, but the height might be off

      content.style.fontSize = finalSize + 'px'

      const maxHeight = parseFloat(
        window
          .getComputedStyle(content.parentNode, null)
          .getPropertyValue('height'),
      )

      // only do height calc if we're in a fixed height element
      if (content.scrollHeight > maxHeight && maxHeight === initialHeight) {
        finalSize = finalSize / content.scrollHeight * maxHeight
      }

      if (finalSize < this.props.minSize) {
        finalSize = this.props.minSize
      }

      this.setState({
        finalSize,
        doneSizing: true,
      })
    }
  }

  render() {
    const { children, style, ...otherProps } = this.props

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
        onResize={() => {
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
          <div ref={measureRef} style={containerStyle} {...otherProps}>
            <span ref={this.innerChild} style={contentStyle}>
              {children}
            </span>
          </div>
        )}
      </Measure>
    )
  }
}
