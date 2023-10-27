import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/button'
import Collapse from 'react-bootstrap/collapse'

const FAQ = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FAQStyles>
      <ButtonStyles
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="example-collapse-text"
        aria-expanded={isOpen}
      >
        {props.title}
      </ButtonStyles>
      <Collapse in={isOpen}>
        <div id="example-collapse-text">{props.content}</div>
      </Collapse>
    </FAQStyles>
  )
}

const FAQStyles = styled.div`
  margin: 10px 10px 10px 0px;
`

const ButtonStyles = styled(Button)`
  width: 100%;
  text-align: left;
`

export default FAQ
