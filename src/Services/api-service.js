import config from '../config'

const ApiService = {
  getArticles() {
    return fetch(`${config.API_ENDPOINT}/articles`).then((res) =>
      res.ok ? res.json() : null
    )
  },
  getArticleById(id) {
    return fetch(`${config.API_ENDPOINT}/article/${id}`).then((res) =>
      res.ok ? res.json() : null
    )
  },
  updateArticleById(id, data) {
    const toUpdate = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return fetch(`${config.API_ENDPOINT}/article/${id}`, toUpdate).then((res) =>
      res.ok ? res.json() : null
    )
  },
  addIssue(data) {
    const toAdd = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return fetch(`${config.API_ENDPOINT}/issues`, toAdd).then((res) =>
      res.ok ? res.json() : null
    )
  },
  addComment(data) {
    const toAdd = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return fetch(`${config.API_ENDPOINT}/comments`, toAdd).then((res) =>
      res.ok ? res.json() : null
    )
  },
  updateCommentById(articleId, commentId, data) {
    const toUpdate = {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    }
    return fetch(
      `${config.API_ENDPOINT}/comments/${articleId}/${commentId}`,
      toUpdate
    ).then((res) => (res.ok ? res.json() : null))
  },
  getCommentsByRefArticle(articleId) {
    return fetch(`${config.API_ENDPOINT}/comments/${articleId}`).then((res) =>
      res.ok ? res.json() : null
    )
  },
}

export default ApiService
