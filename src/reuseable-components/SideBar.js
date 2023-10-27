import React from 'react'
import styled from 'styled-components'
import Nav from 'react-bootstrap/Nav'
import { Timeline } from 'react-twitter-widgets'
import articleContent from '../Pages/article-content'

const SideBar = () => {
  let categoryCount = {}
  articleContent
    .map((cat) => cat.categories)
    .flat()
    .forEach((c) =>
      categoryCount[c] ? (categoryCount[c] += 1) : (categoryCount[c] = 1)
    )

  return (
    <SideBarStyles>
      <h4>Categories</h4>
      <StyledSideNav className="flex-column">
        {Object.entries(categoryCount).map((cat, index) => {
          return (
            <Nav.Link key={index} href="/home">
              {cat[0][0].toUpperCase() + cat[0].slice(1, cat[0].length)} (
              {cat[1]})
            </Nav.Link>
          )
        })}
      </StyledSideNav>

      <Timeline
        dataSource={{
          sourceType: 'profile',
          screenName: 'Athena_SWAN',
        }}
        options={{
          height: '600',
        }}
      />
    </SideBarStyles>
  )
}

const SideBarStyles = styled.div`
  padding-bottom: 20rem;
  @media (min-width: 1000px) {
    padding-left: 2rem;
    font-size: 0.9rem;
  }
`

const StyledSideNav = styled(Nav)`
  margin-bottom: 20px;

  a.nav-link {
    color: #000;
    border-bottom: 1px solid #eee;
    :hover {
      color: #f95000;
      background: none;
    }
  }
`

export default SideBar
