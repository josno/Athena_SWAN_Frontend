import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import Form from 'react-bootstrap/form'
import Row from 'react-bootstrap/row'
import Col from 'react-bootstrap/col'
import Button from 'react-bootstrap/button'

import ApiService from '../Services/api-service'

import FAQ from '../reuseable-components/FAQ'
import faqs from '../Store/FAQ_data'

// Form on page to submit issues
const ReportIssuesPage = () => {
  // We create object states for the form input values
  // And errors for validation
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})

  // useRef is use when you don't want to render the DOM again
  // but want to update the components
  // here we will use useRef to clean the form without re-rendering
  const formRef = useRef(null)

  // This function will reset the form
  // empty the field when submit is clicked
  // and we have a successful post to the server
  const handleReset = () => {
    formRef.current.reset()
  }

  // This will check for errors in the form when submit is clicked
  const checkErrors = () => {
    const { firstName, lastName, email, subject, text } = form
    const newErrors = {}
    // name errors
    if (!firstName || firstName === '') {
      newErrors.firstName = 'Cannot be blank'
    }

    if (!lastName || lastName === '') {
      newErrors.lastName = 'Cannot be blank'
    }

    // email errors
    if (!email || email === '') {
      newErrors.email = 'Email is missing'
    } else if (!email.includes('@') || !email.includes('.')) {
      // Check for correct email format
      newErrors.email = 'Wrong email format. Try: xxx@xxx.com'
    }

    // subject errors
    if (!subject || subject === '' || subject === 'Choose...') {
      newErrors.subject = 'Select a subject.'
    }
    // comment errors
    if (!text || text === '') {
      newErrors.text = 'Cannot be blank'
    }

    return newErrors
  }

  // When a someone types into an input field, we will add a key value pair to the form state
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

  // Validate on submit
  // If the form the valid, we will make a POST request to the server
  // We will also call handleReset() here to clear the form
  // After a successful post, we provide a confirmation for submission
  const handleSubmit = async (e) => {
    e.preventDefault()

    const newErrors = checkErrors()
    if (Object.keys(newErrors).length > 0) {
      // We have errors!
      setErrors(newErrors)
    } else {
      const res = await ApiService.addIssue(form)
      handleReset()
      alert(res.msg)
    }
  }

  // Form for submitting issues
  // When form input updates, we use hooks to capture the change
  const renderForm = () => {
    return (
      <Form ref={formRef} noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="formGroupName">
          <Row>
            <Col>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="First name"
                onChange={(e) => setField('firstName', e.target.value)}
                required
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                placeholder="Last name"
                onChange={(e) => setField('lastName', e.target.value)}
                required
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group controlId="formGroupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setField('email', e.target.value)}
            required
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGroupSubject">
          <Form.Label>Subject</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setField('subject', e.target.value)}
            required
            placeholder="Select"
            isInvalid={!!errors.subject}
          >
            <option>Choose...</option>
            <option>Subject #1</option>
            <option>Subject #2</option>
            <option>Subject #3</option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">
            {errors.subject}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          controlId="formGroupTextArea"
          onChange={(e) => setField('text', e.target.value)}
        >
          <Form.Label>Write your comments here</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            required
            isInvalid={!!errors.text}
          />
          <Form.Control.Feedback type="invalid">
            {errors.text}
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    )
  }
  const renderFAQ = () => {
    return faqs.map((item, index) => (
      <FAQ key={index} title={item.title} content={item.content} />
    ))
  }

  return (
    <ReportIssuesStyles>
      <section className="section">
        <FormSectionStyles>
          <h2>Submit Site Issues In The Form Below</h2>
          {renderForm()}
        </FormSectionStyles>
        <FAQSectionStyles>
          <h2>Frequently Asked Questions</h2>
          {renderFAQ()}
        </FAQSectionStyles>
      </section>
    </ReportIssuesStyles>
  )
}

const ReportIssuesStyles = styled.div`
  .section {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;

    @media (min-width: 1000px) {
      flex-direction: row;
    }
  }
`

const FAQSectionStyles = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 5rem;
  padding-bottom: 5rem;
  @media (min-width: 1000px) {
    padding-top: 0px;
    width: 50rem;
    padding-left: 5rem;
  }
`

const FormSectionStyles = styled.div`
  @media (min-width: 1000px) {
    width: 800px;
  }
`

export default ReportIssuesPage
