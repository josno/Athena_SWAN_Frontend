// Export functions we can use throughout the application
// Add to this list of objects as you see patterns in formatting, etc.

const Utilities = {
  convertDate(date) {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }

    let timestamp = new Date(date.seconds * 1000).toLocaleDateString(
      undefined,
      options
    )
    return timestamp
  },
  convertDateToTime(date) {
    let timestamp = new Date(date.seconds * 1000).toLocaleTimeString()
    timestamp = timestamp.slice(0, -6) + timestamp.slice(-3)
    return timestamp
  },
  sortComments(data) {
    const sortedData = data.sort(
      (a, b) => a.createdDate.seconds - b.createdDate.seconds
    )
    return sortedData
  },
}

export default Utilities
