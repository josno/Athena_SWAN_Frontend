import { shallow, mount } from 'enzyme'
import ReportIssuesPage from './ReportIssuesPage'
import toJson from 'enzyme-to-json'

describe('Report Issues Page', () => {
  it('renders Issue page component without crashing', () => {
    shallow(<ReportIssuesPage />)
  })
  it('matches the snapshot', () => {
    const wrapper = mount(<ReportIssuesPage />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
