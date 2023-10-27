import { shallow, mount } from 'enzyme'
import ArticleSection from './ArticleSection'
import toJson from 'enzyme-to-json'

describe('Article Section', () => {
  it('renders Article section component without crashing', () => {
    const fakeProps = {
      content: ['Lorem', 'ipsum'],
      by: 'Test Person',
      date: new Date().toLocaleDateString(),
      categories: ['race', 'age'],
      title: 'Test Article',
    }
    shallow(
      <ArticleSection
        content={fakeProps.content}
        by={fakeProps.by}
        date={fakeProps.date}
        categories={fakeProps.categories}
        title={fakeProps.title}
      />
    )
  })
  it('matches the snapshot', () => {
    const fakeProps = {
      content: ['Lorem', 'ipsum'],
      by: 'Test Person',
      date: new Date().toLocaleDateString(),
      categories: ['race', 'age'],
      title: 'Test Article',
    }
    const wrapper = mount(
      <ArticleSection
        content={fakeProps.content}
        by={fakeProps.by}
        date={fakeProps.date}
        categories={fakeProps.categories}
        title={fakeProps.title}
      />
    )
    expect(toJson(wrapper)).toMatchSnapshot()
  })
})
