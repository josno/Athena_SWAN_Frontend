import { shallow, mount } from 'enzyme'
import App from './App'
import toJson from 'enzyme-to-json'

describe('App', () => {
  it('renders App component without crashing', () => {
    shallow(<App />)
  })
  it('matches App the snapshot', () => {
    const wrapper = mount(<App />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
