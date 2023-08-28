import axios from "common/src/api/axios";
import {API as api } from './config'

const getPronunciation = async ({word, language }) => {
  const url = `language/pronunciation`;
  try {
    let response = await axios.get(url, {
      params: { word, language },
    });
    return response.data;
  } catch (err) {
    return {};
  }
};

const getTranslation = async ({ word, language }) => {
  const url = `language/translation`;
  try {
    let response = await axios.get(url, {
      params: { word, language },
    });
    return response.data;
  } catch (err) {
    return {};
  }
};

const addNewWordToVocabulary = async ({
  video_id,
  word,
  definition,
}) => {
  const url = `videos/${video_id}/vocabulary`;

  try {
    const response = await axios({
      method: "POST",
      url,
      data: { word, definition },
    });
    return true;
  } catch (err) {
    return false;
  }
};

const deleteFromVocabulary = async ({ word_id }) => {
  const url = `videos/vocabulary`;
  try {
    const response = await axios({
      method: "DELETE",
      url,
      data: { word_id },
    });
    return true;
  } catch (err) {
    return false;
  }
};

export {
  getPronunciation,
  getTranslation,
  addNewWordToVocabulary,
  deleteFromVocabulary,
};
