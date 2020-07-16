import React from 'react'
import { render, screen } from '@testing-library/react'
import { Router, Link, Route } from 'react-router-dom'
import { createMemoryHistory } from 'history'
import userEvent from '@testing-library/user-event'
import FragmentSupportingSwitch from './FragmentSupportingSwitch'

const About = () => <h1>You are on the about page</h1>
const Home = () => <h1>You are home</h1>
const NoMatch = () => <h1>404 Not Found</h1>

function TestComponent() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <FragmentSupportingSwitch>
        <Route exact path="/" component={Home} />
        <>
          <Route path="/about" component={About} />
          <Route component={NoMatch} />
        </>
      </FragmentSupportingSwitch>
    </div>
  )
}
describe('fragment supporting switch testing', () => {
  test('loading home page by default', () => {
    const history = createMemoryHistory()
    const { getByRole } = render(
      <Router history={history}>
        <TestComponent />
      </Router>
    )
    expect(getByRole('heading')).toHaveTextContent('You are home')
  })

  test('navigating to about page', () => {
    const history = createMemoryHistory()
    const { getByRole, getByText } = render(
      <Router history={history}>
        <TestComponent />
      </Router>
    )
    userEvent.click(getByText(/about/i))
    screen.debug()
    expect(getByRole('heading')).toHaveTextContent('You are on the about page')
    // expect(container.innerHTML).toMatch('You are on the about page');
  })

  test('landing on a bad page shows 404 page', () => {
    const history = createMemoryHistory()
    history.push('/some/bad/route')
    const { getByRole } = render(
      <Router history={history}>
        <TestComponent />
      </Router>
    )
    expect(getByRole('heading')).toHaveTextContent('404 Not Found')
  })
})
