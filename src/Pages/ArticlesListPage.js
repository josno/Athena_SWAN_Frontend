import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import ApiService from '../Services/api-service'

import ArticlesList from '../reuseable-components/ArticlesList'
import NotFoundPage from './NotFoundPage'

const ArticlesListPage = () => {
  // Create an empty state for articles that will be fetched from the server
  const [articles, setArticles] = useState([])
  const [error, setError] = useState(false)

  useEffect(() => {
    // Import the API service module with functions and we call
    // getArticles() here to set to state

    // We create a function inside useEffect  to make synchronous calls
    // To keep the call contained because if we use the async function through useEffect
    // in the happenstance you add something else where it requires a new dependency
    // the order of the asynchronous may not be in the order you expect
    // so write async function separately and then call them in the order you need
    async function getList() {
      try {
        const res = await ApiService.getArticles()
        setArticles(res)
      } catch (error) {
        setError(true)
      }
    }

    getList()

    // Since we will only run once to generate the articles
    // We pass an empty array parameter here to render only once
  }, [])

  // We update the voting here
  // When someone clicks on a like, the number will increment
  // We change the information on the database too
  // This is passed to the Articles List child component where the button lives
  // in the button onClick attribute; this function will be called and update the articles state here
  const handleLikes = async (articleId, like) => {
    // Create an object to pass into the PUT request
    const incrementLike = { likes: parseInt(like) + 1 }

    // Call the PUT request
    const res = await ApiService.updateArticleById(articleId, incrementLike)

    // Create a new set of data without checking state first
    // Update only that specific articles
    let newData = articles.map((a) => {
      if (a.id === articleId) {
        return (a = res)
      }
      return a
    })

    // Update state with the changed article here
    setArticles(newData)
  }

  return (
    <ArticlePageContainerStyle>
      <h1>Articles</h1>

      {/* Pass the articles inside Articles list as props 
      If there are no articles we render the not found page */}
      {error ? (
        <NotFoundPage />
      ) : (
        <ArticlesList
          articles={articles}
          handleLikes={handleLikes}
          feature={true}
        />
      )}
    </ArticlePageContainerStyle>
  )
}

const ArticlePageContainerStyle = styled.div`
  padding: 2rem;
  h1 {
    border-bottom: 1px solid #bbb;
  }
`
export default ArticlesListPage
