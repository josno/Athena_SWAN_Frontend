import React from 'react'
import styled from 'styled-components'
import Spinner from 'react-bootstrap/Spinner'

export default function LoadScreen() {
  return (
    <SpinnerContainerStyle>
      <Spinner style={{ margin: '0 auto' }} animation="border" variant="info" />
    </SpinnerContainerStyle>
  )
}

const SpinnerContainerStyle = styled.div`
  display: flex;
  height: 30vh;
  align-items: flex-end;
`
