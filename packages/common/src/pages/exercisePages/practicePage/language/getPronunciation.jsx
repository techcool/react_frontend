import {getPronunciation as getPronunciationAction} from "common/src/old-api/languageActions";

async function getPronunciation({ word }) {
  const { accessToken, role } = this.props
  const {language}=this.getVideoDetails();
  return  await getPronunciationAction({ accessToken, role, word,language });
}

export default getPronunciation;