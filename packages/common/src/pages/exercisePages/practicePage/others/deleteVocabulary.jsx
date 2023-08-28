import { deleteFromVocabulary } from "common/src/old-api/languageActions"
import { fetchVideoDetails } from "common/src/old-api/videosActions"

async function deleteVocabulary( word_id ) {
  const { accessToken, role } = this.props

  const isDeleted = await deleteFromVocabulary({ accessToken, role, word_id })
  
  if (isDeleted) {
    const { _id: video_id } = this.getVideoDetails()
    const videoDetails = await fetchVideoDetails({ accessToken, role, video_id })
    this.setState({ videoDetails })
  }

}
export default deleteVocabulary;