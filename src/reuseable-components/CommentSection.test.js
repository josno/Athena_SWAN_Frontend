import { shallow, mount } from 'enzyme'
import CommentSection from './CommentSection'
import toJson from 'enzyme-to-json'

describe('CommentSection', () => {
  it('renders comment section component without crashing', () => {
    const fakeComments = [
      {
        name: 'Test Person',
        comment: 'This is a comment',
        createdDate: {
          seconds: 1621947600,
          nanoseconds: '',
        },
      },
      {
        name: 'Test Person 2',
        comment: 'This is a comment',
        createdDate: {
          seconds: 1621947600,
          nanoseconds: '',
        },
      },
    ]
    shallow(<CommentSection comments={fakeComments} />)
  })
  it('matches the snapshot', () => {
    const fakeComments = [
      {
        name: 'Test Person',
        comment: 'This is a comment',
        createdDate: {
          seconds: 1621947600,
          nanoseconds: '',
        },
      },
      {
        name: 'Test Person 2',
        comment: 'This is a comment',
        createdDate: {
          seconds: 1621947600,
          nanoseconds: '',
        },
      },
    ]
    const wrapper = mount(<CommentSection comments={fakeComments} />)
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
