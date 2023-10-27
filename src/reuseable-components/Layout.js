import React from 'react'
import Container from 'react-bootstrap/container'
import styled from 'styled-components'

const Layout = (props) => {
  return <ContainerStyles>{props.children}</ContainerStyles>
}

const ContainerStyles = styled(Container)`
  min-height: 180vh;
  height: 100%;
  max-width: 100%;
  padding: 0 0 10rem 0;

  @media (min-width: 1000px) {
    min-height: 140vh;
  }
`

export default Layout
