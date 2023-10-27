import React from 'react'
//imprt react as a first step and then create a component for the home page to build the site
//Notice that it uses HTML elements within the component "Home Page"
import styled from 'styled-components'

import Carousel from 'react-bootstrap/carousel'
import Card from 'react-bootstrap/card'

import TechWomen from '../assets/women_intech.jpeg'
import CafePhoto from '../assets/cafe_photo.jpeg'

import CategoryDescriptions from '../Store/category-descriptions'

const Homepage = () => {
  return (
    <ContainerStyles>
      <CarouselStyles interval={null}>
        <Carousel.Item className="carousel-image-one">
          <Carousel.Caption>
            <h1>Celebrating Equality, Diversity and Inclusion For Women</h1>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="carousel-image-two">
          <Carousel.Caption>
            <h1>Lorem Ipsum</h1>
          </Carousel.Caption>
        </Carousel.Item>
      </CarouselStyles>
      <SectionStyles>
        <h1>We Are Here For You</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </SectionStyles>
      <SectionStyles>
        <h1>Our Forums</h1>
        <ForumContainerStyles>
          {CategoryDescriptions.map((cat) => {
            return (
              <Card style={{ width: '18rem', margin: '1rem' }} key={cat.name}>
                <Card.Body>
                  <Card.Title>{cat.title}</Card.Title>

                  <Card.Text>{cat.description}</Card.Text>
                  <Card.Link href={`/chat-forum/${cat.name}`}>
                    Chat Forum
                  </Card.Link>
                </Card.Body>
              </Card>
            )
          })}
        </ForumContainerStyles>
      </SectionStyles>
    </ContainerStyles> // <></> is a react fragment tag that allows you to have more than one element within a component.
  )
}

const ContainerStyles = styled.div`
  padding: 2rem 0 5rem 0;
`
const SectionStyles = styled.section`
  padding: 1rem 2rem;
  @media (min-width: 1000px) {
    padding: 2rem 5rem;
  }
`

const ForumContainerStyles = styled.div`
  display: flex;
  max-width: 90%;
  margin: 0 auto;
  flex-wrap: wrap;
  justify-content: space-around;
`

const CarouselStyles = styled(Carousel)`
  padding: 0;
  width: 100%;
  .carousel-item {
    background-size: 200%;
    background-position: center;
    background-repeat: no-repeat;
    height: 500px;
  }
  .carousel-image-one {
    background-image: url(${TechWomen});
  }

  .carousel-caption {
    bottom: none;
  }

  .carousel-image-two {
    background-image: url(${CafePhoto});
  }
  @media (min-width: 748px) {
    .carousel-item {
      background-color: black;
      background-size: 100%;
    }
  }
`
//The next step would be to export component so we can import it into the app.js file
export default Homepage
