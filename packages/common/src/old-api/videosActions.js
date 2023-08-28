import axios from "common/src/api/axios";

const fetchVideos = async ({  filter, isStats }) => {
  const url = isStats
    ? "videos/stats_listing"
    : "videos";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: filter
    });
    return response.data;
  } catch (err) {
    if (err.response && err.response.data) {
      return [];
    }
  }
};
const fetchVideosMonth = async ({
  startDate,
  endDate,
  preferredMonth,
  limit,
  page
}) => {
  const url = "videos";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: {
        startDate: startDate,
        endDate: endDate,
        preferredMonth: preferredMonth,
        limit,
        page
      }
    });
    return response.data;
  } catch (err) {
    return [];
  }
};
const fetchVideoCategories = async () => {
  const url = "videos/categories";
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const fetchPracticeExercises = async ({ video_id,context="practice" }) => {
  const url = `videos/${video_id}/practice_exercises?context=${context}`;
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const fetchSuggestedExercises = async ({  video_id }) => {
  const url = `videos/${video_id}/suggested_exercises`;
  try {
    let response = await axios({
      method: "GET",
      url
    });
    return response.data;
  } catch (err) {
    return [];
  }
};
const fetchVideoDetails = async ({
  video_id,
  isStats,
  params
}) => {
  const url = isStats
    ? `videos/${video_id}/stats`
    : `videos/${video_id}`;
  try {
    let response = await axios({
      method: "GET",
      url,
      params: params
    });
    return response.data;
  } catch (err) {
    return {};
  }
};
const createVideoNotes = async ({ video_id, notes }) => {
  const url = `videos/${video_id}/notes`;
  try {
    const response = await axios({
      method: "POST",
      url,
      data: { notes }
    });
    return true;
  } catch (err) {
    return false;
  }
};
const updateVideoNotes = async ({
  video_id,
  notes,
  notes_id
}) => {
  const url = `videos/${video_id}/update_notes`;
  try {
    const response = await axios({
      method: "PUT",
      url,
      data: { notes, notes_id }
    });
    return true;
  } catch (err) {
    return false;
  }
};
const deleteVideoNotes = async ({ video_id, notes_id }) => {
  const url = `videos/${video_id}/delete_notes`;
  try {
    const response = await axios({
      method: "DELETE",
      url,
      data: { notes_id }
    });
    return true;
  } catch (err) {
    return false;
  }
};

const deleteVideo = async ({ video_id }) => {
  const url = "videos";
  try {
    const response = await axios({
      method: "DELETE",
      url,
      data: { video_id }
    });
    return true;
  } catch (err) {
    return false;
  }
};

const createVideo = async ({  video }) => {
  const url = "videos";  
  try {
    const response = await axios({
      method: "POST",
      url,
      data: video
    });
    return true;
  } catch (err) {
    return false;
  }
};

const updateVideo = async ({ video_id, video }) => {
  const url = `videos/${video_id}`;
  try {
    const response = await axios({
      method: "PATCH",
      url,
      data: video
    });
    return true;
  } catch (err) {
    return false;
  }
};
const deleteFavorite = async ({ video_id }) => {
  const url = `videos/${video_id}/favourite`;
  try {
    const response = await axios({
      method: "DELETE",
      url
    });
    return true;
  } catch (err) {
    return false;
  }
};
const createFavorite = async ({ video_id }) => {
  const url = `videos/${video_id}/favourite`;
  try {
    const response = await axios({
      method: "POST",
      url
    });
    return true;
  } catch (err) {
    return false;
  }
};
const fetchMyVideos = async ({  params }) => {
  const url = "videos/my_videos";
  try {
    let response = await axios({
      method: "GET",
      url,
      params: params
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

const searchVideos = async ({ keywords }) => {
  const url = "videos/search";
  try {
    let response = await axios({
      method: "POST",
      url,
      data:{
        keywords : keywords
      }
    });
    return response.data;
  } catch (err) {
    return [];
  }
};

export {
  fetchVideos,
  fetchVideoDetails,
  fetchVideoCategories,
  fetchPracticeExercises,
  fetchSuggestedExercises,
  createVideoNotes,
  deleteVideo,
  createVideo,
  updateVideo,
  fetchVideosMonth,
  createFavorite,
  deleteFavorite,
  fetchMyVideos,
  updateVideoNotes,
  deleteVideoNotes,
  searchVideos
};
