import { addNewWordToVocabulary } from "common/src/old-api/languageActions";
import { fetchVideoDetails } from "common/src/old-api/videosActions";

async function addToVocabulary({ word, definition }) {
  const { accessToken, role } = this.props;
  const { videoDetails: { _id: video_id } } = this.state
  const isAdded = await addNewWordToVocabulary({
    accessToken,
    role,
    video_id,
    word,
    definition
  })
  if (isAdded) {
    const videoDetails = await fetchVideoDetails({ accessToken, role, video_id })
    this.setState({ videoDetails })
  }
}


export default addToVocabulary;