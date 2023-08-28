function getVideoDetails() {
  const { videoDetails } = this.state
  const { _id, url, grammar, vocabulary, notes, captionUrl, language, title,description, category, level } = videoDetails
  return { _id, url, grammar, vocabulary, notes, captionUrl, language, title, description, category, level, description}
}

export default getVideoDetails;