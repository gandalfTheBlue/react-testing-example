import React from 'react'
import { cleanup } from '@testing-library/react'
import renderer from 'react-test-renderer'
import AutoPayCancellation from './AutoPayCancellation'

describe('<AutoPayCancellation />', () => {
  afterEach(cleanup)
  // test('#render', () => {
  //   const tree = renderer.create(<AutoPayCancellation />)
  //   expect(tree).toMatchSnapshot()
  // })

  test('#render2', () => {
    jest.mock('../../../../localization/i18n') // this happens automatically with automocking
    const i18n = require('../../../../localization/i18n')
    i18n.mockImplementation(() => {
      const t = (i18n) => i18n
      return { t }
    })

    const tree = renderer.create(<AutoPayCancellation />)
    expect(tree).toMatchSnapshot()
  })
})
