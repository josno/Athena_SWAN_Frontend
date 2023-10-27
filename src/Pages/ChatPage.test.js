import { shallow } from 'enzyme'
import ChatPage from './ChatPage'

describe('Chatpage', () => {
  it('renders Article component without crashing', () => {
    const match = { params: { room: 'race' } }
    shallow(<ChatPage match={match} />)
  })
})
