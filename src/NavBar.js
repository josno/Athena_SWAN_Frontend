import React from 'react'
import styled from 'styled-components'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'

import { BsBoxArrowInLeft, BsBoxArrowRight } from 'react-icons/bs'

import { auth, signInWithGoogle } from './firebase.js'
import { useAuthState } from 'react-firebase-hooks/auth'

import Athena from './assets/Athena_Swan_logo.png'

// const is used to create react components

const NavBar = () => {
  const [user] = useAuthState(auth)

  return (
    <NavStyles expand="lg">
      <Navbar.Brand className="a-brand" href="/">
        <Image src={Athena} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbar-nav" />
      <Navbar.Collapse id="navbar-nav">
        <Nav className="ml-auto">
          {user ? (
            <AuthenticationStyles>
              <Nav.Link
                className="nav-link-auth"
                onClick={() => auth.signOut()}
              >
                <BsBoxArrowRight size={30} />
                Logout
              </Nav.Link>
            </AuthenticationStyles>
          ) : (
            <AuthenticationStyles>
              <Nav.Link className="nav-link-auth" onClick={signInWithGoogle}>
                <BsBoxArrowInLeft size={30} />
                Login
              </Nav.Link>
            </AuthenticationStyles>
          )}

          <NavDropdown title="Chatroom Forums" id="basic-nav-dropdown">
            <NavDropdown.Item href="/chat-forum/age">Age</NavDropdown.Item>
            <NavDropdown.Item href="/chat-forum/disability">
              Disability
            </NavDropdown.Item>
            <NavDropdown.Item href="/chat-forum/marriage-and-civil-partnership">
              Marriage And Civil Partnership
            </NavDropdown.Item>
            <NavDropdown.Item href="/chat-forum/gender-reassignment">
              Gender Reassignment
            </NavDropdown.Item>
            <NavDropdown.Item href="/chat-forum/pregnancy-and-maternity">
              Pregnancy And Maternity
            </NavDropdown.Item>
            <NavDropdown.Item href="/chat-forum/race">Race</NavDropdown.Item>
            <NavDropdown.Item href="/chat-forum/religion-or-belief">
              Religion or Belief
            </NavDropdown.Item>
            <NavDropdown.Item href="/chat-forum/sex">Sex </NavDropdown.Item>
            <NavDropdown.Item href="/chat-forum/sexual-orientation">
              Sexual Orientation
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Item>
            <Nav.Link href="/articles-list">Articles</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </NavStyles>
  )
}

const NavStyles = styled(Navbar)`
  .navbar-brand:hover,
  padding: 0px;
  padding-top: 1rem;
  border: none;

  a:hover {
   background: none;
   }
   .a-brand {
    display: block;
    height: 4rem;
    width: 8rem;
    :hover {
      color: #f59800;
   }
   img {
     width: 100%;
   }
  }

   a.nav-link:hover {
      opacity: 3;
   }

  .navbar-brand {
    padding: 0px;
  }

`

const AuthenticationStyles = styled(Nav.Item)`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f59800;
  border-radius: 10px;
  width: 8rem;
  margin: 0 auto;
  padding: 0.2rem;

  a.nav-link-auth {
    color: #fff !important;
    padding: 0.2rem;
    :hover {
      color: #000 !important;
      opacity: 2;
    }
  }
`

export default NavBar
