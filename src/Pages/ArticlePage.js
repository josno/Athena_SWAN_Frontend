import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import NotFoundPage from './NotFoundPage'

import ArticlesList from '../reuseable-components/ArticlesList'
import ArticleSection from '../reuseable-components/ArticleSection'
import SideBar from '../reuseable-components/SideBar'
import CommentSection from '../reuseable-components/CommentSection'

import ApiService from '../Services/api-service'
import Utilities from '../Utils/Utilities'

//We want to link an article to display using URL Parameter
//in the construction we use the {match} params property to find out the current url and if it matches the match route
const ArticlePage = ({ match }) => {
  const [comments, setComments] = useState()
  const [article, setArticle] = useState()
  const [otherArticles, setOtherArticles] = useState([])
  const [error, setError] = useState(false)

  const id = match.params.id

  // We run useEffect to get data for article and article comments
  useEffect(() => {
    // We create a function inside useEffect for to make synchronous calls
    // To keep the call contained because if we use the async function through useEffect
    // in the happenstance you add something else where it requires a new dependency
    // the order of the asynchronous may not be in the order you expect
    // so write async function separately and then call them in the order you need

    // In this specific case, we want to get all the information at the same time
    // So we put all the await function together in one try block
    // Comments cannot render without their specific article and other articles cannot
    // render when there is no Article to filter out
    // There's no point of an Article if the article for the page doesn't exist
    // Error will be set to true if any of these calls fail and render a Not Found Page

    async function getData() {
      try {
        const articleRes = await ApiService.getArticleById(id)
        const commentsRes = await ApiService.getCommentsByRefArticle(id)
        const otherArticlesRes = await ApiService.getArticles()

        // Let's convert the firebase timestamp to a readable string
        const formattedDate = Utilities.convertDate(articleRes.createdDate)
        articleRes.createdDate = formattedDate

        // Let's filter out our current articles to create the other articles array
        const remainingArticles = otherArticlesRes.filter((a) => a.id !== id)

        // sort comments by date so they appear in order of post
        // Oldest is on top
        const sortedComments = Utilities.sortComments(commentsRes)

        // Set all our formatted data that can be passed to child components
        setArticle(articleRes)
        setComments(sortedComments)
        setOtherArticles(remainingArticles)
      } catch (error) {
        setError(true)
      }
    }

    getData()
  }, [id])

  // This function is passed down to the comments section component
  // When a form is submmitte, a comment object is created and sent to the server
  // The response returns an updates array of all comments with new information
  // set this new data to state
  const addComment = async (commentObj) => {
    // Set the refArticle parameter required by the server to send to the database
    // This is the article id
    commentObj.refArticle = id

    const response = await ApiService.addComment(commentObj)

    // We need to sort the comments so the newest comments appear at the bottom
    const sortedComments = Utilities.sortComments(response)

    // Update the comments
    setComments(sortedComments)
  }

  // This function is passed down to the comments section component
  // When it is clicked on a call is made to the server and updates the comment
  // The response returns an updates array of all comments with new information
  // set this new data to state
  const incrementVote = async (type, commentId) => {
    const target = comments.find((c) => c.id === commentId)

    target[type] = parseInt(target[type]) + 1

    const response = await ApiService.updateCommentById(id, commentId, target)

    // We need to sort the comments so the newest comments appear at the bottom
    const sortedComments = Utilities.sortComments(response)

    setComments(sortedComments)
  }

  // If there is an error we render the Not Found Page
  if (error) {
    return <NotFoundPage />
  }

  // Here we return and render the article page if the all state updates with fetched data
  return (
    <ArticlePageStyles>
      {article && (
        <>
          <ArticleSectionStyles>
            <ArticleSection
              content={article.content}
              name={article.name}
              by={article.writtenBy}
              date={article.createdDate}
              categories={article.categories}
              title={article.title}
            />
            <h3> Other Articles</h3>
            <ArticlesList articles={otherArticles} />
            <CommentSection
              articleId={id}
              comments={comments}
              addComment={addComment}
              incrementVote={incrementVote}
            />
          </ArticleSectionStyles>

          <SideBar />
        </>
      )}
    </ArticlePageStyles>
  )
}

const ArticleSectionStyles = styled.div`
  max-width: 1000px;
  border-right: 0px;
  padding-bottom: 10rem;
  h3 {
    margin-bottom: 0 !important;
  }
  @media (min-width: 1000px) {
    border-right: 1px solid #eee;
    padding-bottom: 20rem;
  }
`
const ArticlePageStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem;

  h3 {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  @media (min-width: 1000px) {
    flex-direction: row;
  }
`
export default ArticlePage
