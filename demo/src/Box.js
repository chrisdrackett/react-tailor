// @flow

import * as React from 'react'

export default ({
  width,
  height,
  children,
}: {
  width: number,
  height: number,
  children: React.Node,
}) => (
  <div style={{ width, height, border: '1px solid orange', margin: 8 }}>
    {children}
  </div>
)
