import { shallow, mount } from 'enzyme'
import HomePage from './HomePage'
import toJson from 'enzyme-to-json'

describe('Homepage', () => {
  it('renders Homepage component without crashing', () => {
    shallow(<HomePage />)
  })
  it('matches App the snapshot', () => {
    const wrapper = mount(<HomePage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
