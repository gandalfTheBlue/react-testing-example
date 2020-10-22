import React from 'react'
import renderer from 'react-test-renderer'
import SnapshotTest from './SnapshotTest'

it('renders correctly SnapshotTest', () => {
  const tree = renderer.create(<SnapshotTest />).toJSON()
  expect(tree).toMatchSnapshot()
})
