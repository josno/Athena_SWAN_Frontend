import React from 'react'
import styled from 'styled-components'
import ListGroup from 'react-bootstrap/ListGroup'
import Image from 'react-bootstrap/image'
import { Link } from 'react-router-dom'
import { FaTwitter, FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa'
import Athena from './assets/Athena_Swan_Logo_Simple.jpeg'

const Footer = () => {
  return (
    <FooterStyles>
      <div className="div-wrapper">
        <div className="logo-div">
          <Image style={{ width: '100%' }} src={Athena} fluid />
        </div>

        <ListGroup className="social-div" horizontal>
          <ListGroup.Item action href="#">
            <FaTwitter size={30} stroke="#fff" fill="#fff" />
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaFacebook size={30} stroke="#fff" fill="#fff" />
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaInstagram size={30} stroke="#fff" fill="#fff" />
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaYoutube size={30} stroke="#fff" fill="#fff" />
          </ListGroup.Item>
        </ListGroup>
      </div>
      <p>
        Report Issues{' '}
        <Link to="/report-issues" style={{ color: '#fff' }}>
          Here
        </Link>
        .
      </p>

      <div>
        <p>© {new Date().getFullYear()} Athen Swan. All rights reserved.</p>
      </div>
    </FooterStyles>
  )
}

const FooterStyles = styled.footer`
  position: absolute;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  bottom: 0;
  height: fit-content;
  display: flex;
  flex-direction: column;
  width: 100%;
  text-align: center;
  margin-top: 2rem;
  color: #fff;
  background-color: #0e5871;
  font-size: 0.7rem;

  .logo-div {
    height: 6rem;
    width: 8rem;
    display: flex;
    align-items: center;
  }

  .div-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: 0 2rem;
    align-items: center;
    @media (min-width: 1000px) {
      flex-direction: row;
    }
  }

  .list-group-item {
    background-color: transparent !important;
    border: none;
    transform: 0.2s;
    :hover {
      transform: scale(1.2);
    }
  }
`
export default Footer
