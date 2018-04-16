## React Tailor ✂️

[![npm version](https://badge.fury.io/js/react-tailor.svg)](https://badge.fury.io/js/react-tailor)
[![Dependency Status](https://david-dm.org/chrisdrackett/react-tailor.svg)](https://david-dm.org/chrisdrackett/react-tailor)

[demo](https://dist-bhlbtmkxgy.now.sh)

Tailor adjusts the size of text within its children to try and fit it within the available horizontal and vertical space.

Currently tailor only works (and enforces) a single line of non-wrapping text. This might change in the future, but there are also other solution that work with multiple lines of text (see `Similar Projects` below).

Uses [React Measure](https://github.com/souporserious/react-measure) to resize an element only if its size changes.

## Install

`yarn add react-tailor`

## Tailor Component

Wrap any child component and calculate its client rect.

### Props

#### `minSize`: number

_default: 11_

The minimum size (in px) that text will be sized down to fit. Once text has reached this size and ellipsis will be added to any text cut off.

### Example

```javascript
import Tailor from 'react-tailor'

class Tailor extends Component {
  render() {
    return (
      <div>
        <h1>
          <Tailor>Title Text</Tailor>
        </h1>
        <ul>
          <li>
            <Tailor>List Item</Tailor>
          </li>
          <li>
            <Tailor>List Item 2</Tailor>
          </li>
        </ul>
      </div>
    )
  }
}
```

## Running the demo locally

1.  clone repo

    `git clone git@github.com:chrisdrackett/react-tailor.git`

2.  install dependencies

    `yarn`

3.  run dev mode

    `yarn start`

4.  open your browser and visit: `http://localhost:3000/`

## Similar Projects

* [React FitText](https://github.com/gianu/react-fittext)

  similar, but resizes all elements on browser resize even if their parent is the same size. Does not calculate best size automatically.

* [React TextFit](https://github.com/malte-wessel/react-textfit)

  Supports paragraphs but is heavier.
