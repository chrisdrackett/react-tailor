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
  needsSecondPass: boolean,
  doneSizing: boolean,

  minTextSize: number,

  maxWidth: number,
  maxHeight: number,

  low: number,
  high: number,

  finalTextSize: number,
}

export default class Tailor extends React.Component<Props, State> {
  resizeTimer: TimeoutID
  innerChild = React.createRef()
  outerChild = React.createRef()

  static defaultProps = {
    isSingleLine: false,
    minSize: 11,
  }

  state = {
    firstRun: true,
    needsSecondPass: false,
    doneSizing: false,

    minTextSize: 0,

    maxWidth: 0,
    maxHeight: 0,

    low: 0,
    high: 0,

    finalTextSize: 0,
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    return {
      ...prevState,
      minTextSize: nextProps.minSize,
    }
  }

  componentDidMount() {
    this.causeResize()

    // window.addEventListener('resize', this.handleWindowResize)
  }

  componentDidUpdate() {
    this.processText()
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.handleWindowResize)
  }

  handleWindowResize = () => {
    clearTimeout(this.resizeTimer)
    this.resizeTimer = setTimeout(() => {
      if (this.state.needsSecondPass) {
        this.causeResize()
      }
    }, 250)
  }

  causeResize = () => {
    const parent = this.innerChild.current.parentNode

    this.setState({
      doneSizing: false,

      maxWidth: parent.scrollWidth,
      maxHeight: parent.scrollHeight,

      low: this.state.minTextSize,
      high: parent.scrollHeight,

      finalTextSize: 0,
    })
  }

  processText = () => {
    if (!this.state.doneSizing) {
      this.setState((state) => {
        let low = state.low
        let high = state.high
        let doneSizing = state.doneSizing
        let finalTextSize = state.finalTextSize

        if (low > high) {
          doneSizing = true

          finalTextSize = finalTextSize - 1
        }

        if (!doneSizing) {
          // if this isn't the first pass do some adjustments
          if (finalTextSize > 0) {
            if (this.innerChild.current.scrollWidth <= state.maxWidth) {
              low = finalTextSize + 1
            } else {
              high = finalTextSize - 1
            }
          }

          finalTextSize = parseInt((low + high) / 2, 10)
        }

        return {
          low,
          high,

          finalTextSize,

          doneSizing,
        }
      })
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
        this.state.finalTextSize > 0
          ? `${this.state.finalTextSize}px`
          : 'inherit',
      display: this.state.doneSizing ? 'block' : 'inline-block',
      whiteSpace: isSingleLine ? 'nowrap' : 'normal',
      overflow: isSingleLine ? 'hidden' : 'visible',
      textOverflow: isSingleLine ? 'ellipsis' : 'clip',
    }

    return (
      <Measure
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
