import { shallow, mount } from 'enzyme'
import ArticlesList from './ArticlesList'
import toJson from 'enzyme-to-json'
import { BrowserRouter as Router } from 'react-router-dom'

describe('ArticlesList', () => {
  it('renders Articles list component without crashing', () => {
    const articles = [
      {
        name: 'One Love',
        id: '1tlr8HJfbi42ml7WxXpk',
        createdDate: {
          seconds: 1621947600,
          nanoseconds: '',
        },
        writtenBy: 'Bob Marley',
        likes: 30,
        content: ['lorem', 'ipsum'],
        photoUrl:
          'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      },
    ]
    shallow(
      <Router>
        <ArticlesList articles={articles} feature={true} />
      </Router>
    )
  })
  it('matches the snapshot', () => {
    const articles = [
      {
        name: 'One Love',
        id: '1tlr8HJfbi42ml7WxXpk',
        createdDate: {
          seconds: 1621947600,
          nanoseconds: '',
        },
        writtenBy: 'Bob Marley',
        likes: 30,
        content: ['lorem', 'ipsum'],
        photoUrl:
          'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
      },
    ]
    const wrapper = mount(
      <Router>
        <ArticlesList articles={articles} feature={true} />
      </Router>
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
