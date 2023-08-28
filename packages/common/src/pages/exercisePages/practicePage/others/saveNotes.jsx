import {
  fetchVideoDetails,
  createVideoNotes,
} from "common/src/old-api/videosActions"

async function saveNotes({ notes }) {

  const { accessToken, role } = this.props
  const { _id: video_id } = this.getVideoDetails()
 
  await createVideoNotes({
    accessToken,
    role,
    video_id,
    notes
  })
  const videoDetails = await fetchVideoDetails({ accessToken, role, video_id })
  this.setState({ videoDetails })
}
export default saveNotes;