import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Card from 'react-bootstrap/card'
import Utilities from '../Utils/Utilities'
import { BsHeart } from 'react-icons/bs'

//this component allows me to create a resable articles list page
//It also gives a breif extract of the page

function slugify(content) {
  return content
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
}

const ArticlesList = ({ articles, handleLikes, feature }) => (
  <ArticlesContainerStyles>
    {articles.map((article, key) => (
      <ArticleCardStyles key={key}>
        <Card.Img variant="top" src={article.photoUrl} />

        <Card.Body>
          <Link
            className="article-list-item"
            to={`/article/${slugify(article.name)}/${article.id}`}
          >
            <Card.Title>{article.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {article.writtenBy} | {Utilities.convertDate(article.createdDate)}{' '}
            </Card.Subtitle>
            <Card.Text>{article.content[0].substring(0, 150)}..</Card.Text>
          </Link>
          {feature && (
            <button
              onClick={() => handleLikes(article.id, article.likes)}
              className="likes-btn"
            >
              <BsHeart className="likes-icon" size={30} />
              <span>{article.likes}</span>
            </button>
          )}
        </Card.Body>
      </ArticleCardStyles>
    ))}
  </ArticlesContainerStyles>
)
const ArticlesContainerStyles = styled.div`
  padding: 1rem;
  padding-bottom: 2rem;
`

const ArticleCardStyles = styled(Card)`
  margin: 2rem 0 2rem 0;
  border: 0px;

  .card-body {
    padding: 1.25rem 0;
  }

  .likes-btn {
    z-index: 99;
    background: transparent;
    border: none;
    color: black;
    margin: 0.5rem 0.5rem 0.5rem 0;
    padding: 0;
    span {
      margin: 0 0.5rem;
    }
    transition: 0.2s;
    :hover {
      transform: scale(1.1);
    }
  }

  @media (min-width: 720px) {
    flex-direction: row;
    img {
      width: 300px;
      max-height: 200px;
      object-fit: cover;
    }
    .card-title {
      font-size: 1.5rem;
    }
    .card-body {
      padding: 0 1.25rem;
    }
  }
`
export default ArticlesList
