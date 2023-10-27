import React from 'react'
import { BsFillPersonFill, BsClockFill, BsFolderFill } from 'react-icons/bs'

const ArticleSection = ({ content, by, date, categories = [], title }) => {
  return (
    <>
      <h1>{title}</h1>
      <p style={{ color: '#525252' }}>
        <BsFillPersonFill /> {by} | <BsClockFill /> {date} | <BsFolderFill />{' '}
        {categories.map((cat) =>
          cat !== categories[categories.length - 1] ? (
            <span key={cat}> {cat}, </span>
          ) : (
            <span key={cat}>{cat}</span>
          )
        )}
      </p>
      {content.map((paragraph, key) => (
        <p key={key}>{paragraph}</p>
      ))}
    </>
  )
}

export default ArticleSection
