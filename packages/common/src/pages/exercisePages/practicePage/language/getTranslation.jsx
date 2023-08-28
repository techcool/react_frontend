import { getTranslation as getTranslationAction } from "common/src/old-api/languageActions";

async function getTranslation({ word }) {
  const { accessToken, role } = this.props;
  const { language } = this.getVideoDetails();

  return await getTranslationAction({
    accessToken,
    role,
    word,
    language: (language === 'es') ? 'en' : 'es',
  })
}

export default getTranslation;