import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import Form from 'react-bootstrap/form'
import Button from 'react-bootstrap/Button'
import { BsPeopleCircle } from 'react-icons/bs'
import { FiThumbsDown, FiThumbsUp } from 'react-icons/fi'

import Utilities from '../Utils/Utilities'

// Function props are passed down from the ArticlePage component
// The logic lives in that component because that is where
// We make updates to the comments and the article
// All logic specific to this component (form) sits in here
// But to actually add and update the comments props we need to send
// it back up to the parent component
const CommentSection = ({ comments, addComment, incrementVote }) => {
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  // Same as issues page, we use useRef to clearn the form without re-rendering
  const formRef = useRef(null)

  // These are handler function for the form
  // Resets the comment form after a submit
  const handleReset = () => {
    formRef.current.reset()
  }

  // Function to check errors inside submit
  const checkErrors = () => {
    const { name, comment } = form
    const newErrors = {}
    // name errors
    if (!name || name === '') {
      newErrors.name = 'Cannot be blank'
    }

    if (!comment || comment === '') {
      newErrors.comment = 'Cannot be blank'
    }

    return newErrors
  }

  // Updates the state based on input
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    })
    // Check and see if errors exist, and remove them from the error object
    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = checkErrors()
    if (Object.keys(newErrors).length > 0) {
      // We have errors!
      setErrors(newErrors)
    } else {
      // Calls the function passed down from Article Page
      addComment(form)
      handleReset()
    }
  }

  // Returns the comment form
  const renderForm = () => {
    return (
      <Form
        ref={formRef}
        noValidate
        className="comment-section__form"
        onSubmit={handleSubmit}
      >
        <Form.Group controlId="formGroupName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            placeholder="Name"
            onChange={(e) => setField('name', e.target.value)}
            required
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGroupTextArea">
          <Form.Label>Write your comments here</Form.Label>
          <Form.Control
            style={{ marginBottom: '0' }}
            as="textarea"
            rows={4}
            onChange={(e) => setField('comment', e.target.value)}
            required
            isInvalid={!!errors.comment}
          />
          <Form.Control.Feedback type="invalid">
            {errors.comment}
          </Form.Control.Feedback>
        </Form.Group>
        <Button
          className="comment-section__button"
          variant="primary"
          type="submit"
        >
          Submit
        </Button>
        <Button
          className="comment-section__button"
          variant="danger"
          onClick={() => handleReset()}
        >
          Cancel
        </Button>
      </Form>
    )
  }

  // Returns all comments
  const renderComments = () => {
    return comments.map((c, index) => (
      <div className="comment-div" key={index}>
        <div className="comment-div__div">
          <h5>
            <span className="comment-div__icon">
              <BsPeopleCircle size={42} />
            </span>
            {c.name}
          </h5>
          <h5>{Utilities.convertDate(c.createdDate)}</h5>
        </div>

        <div>
          <p>{c.comment}</p>
        </div>
        <div className="comment-div__voting">
          <div className="comment-likes__div">
            <span
              className="comment-likes__span "
              onClick={() => incrementVote('dislikes', c.id)}
            >
              <FiThumbsDown className="icon dislike " />
            </span>
            <span className="comment-count">
              {c.dislikes === 0 ? '' : c.dislikes}
            </span>
          </div>
          <div className="comment-likes__div">
            <span
              className="comment-likes__span "
              onClick={() => incrementVote('likes', c.id)}
            >
              <FiThumbsUp className="icon like" />
            </span>
            <span className="comment-count">
              {c.likes === 0 ? '' : c.likes}
            </span>
          </div>
        </div>
      </div>
    ))
  }

  // Here we render the elements for comments and comment form
  // If there are comments, render the comments section, if not do not render
  // If a comment is added, the parent component will get the new data and pass it down

  return (
    <CommentSectionStyles>
      <h2> Article Comments</h2>
      {!comments ? '' : renderComments()}
      {renderForm()}
    </CommentSectionStyles>
  )
}

const CommentSectionStyles = styled.div`
  border-bottom: 1px solid light-gray;
  h5 {
    font-size: 0.9rem;
    font-weight: bold;
  }
  .comment-div {
    border-bottom: 1px solid gray;
    margin-right: 1rem;
  }

  .comment-div__icon {
    margin-right: 1rem;
  }

  .comment-section__form {
    margin-right: 1rem;
  }

  .comment-section__form .form-label {
    margin-top: 2rem;
  }

  .comment-div__div {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }
  .comment-section__button {
    margin: 1rem;
    float: right;
  }

  .comment-div__voting {
    margin-bottom: 1rem;
    display: flex;
  }

  .comment-likes__div {
    margin-left: 0.5rem;
    width: 3.5rem;
  }

  .comment-likes__span {
    transition: 0.2s;
    :hover {
      cursor: pointer;
    }

    .icon:hover {
      transform: scale(1.1) !important;
    }

    .like:hover {
      color: green;
    }

    .dislike:hover {
      color: red;
    }
  }

  .comment-count {
    margin: 0 0.5rem;
    width: 2rem;
  }
`
export default CommentSection
