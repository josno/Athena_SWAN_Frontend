import { shallow } from 'enzyme'
import ArticlePage from './ArticlePage'

describe('The components are rendered', () => {
  it('renders Article component without crashing', () => {
    const match = { params: { id: '1tlr8HJfbi42ml7WxXpk', name: 'one-love' } }
    shallow(<ArticlePage match={match} />)
  })
})
