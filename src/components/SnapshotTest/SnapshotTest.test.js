import React from 'react'
import renderer from 'react-test-renderer'
import SnapshotTest from './SnapshotTest'
import axios from 'axios'
const { act } = renderer

jest.mock('axios')

describe('<SnapshotTest/>', () => {
  beforeEach(() => {
    axios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: { name: '3333' } })
    )
  })

  it('renders correctly SnapshotTest', () => {
    const tree = renderer.create(<SnapshotTest />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('renders correctly SnapshotTest after fetch data', async () => {
    const tree = renderer.create(<SnapshotTest />)
    await act(() => Promise.resolve())
    await expect(tree.toJSON()).toMatchSnapshot()
  })
})
