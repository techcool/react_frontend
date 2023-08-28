import useSWR from "swr";
import ROUTES from "common/src/constants/apis";
import fetcher from '../../fetcher';

export function useVideoList({
  skip = 0,
  limit = 10,
  month = null,
  favorites = null,
  watched = null,
  recommended = null,
  keywords = null,
  category = null,
  type = null,
  region = null,
  level = null,
  structure = null,
  authenticTasks = null
}) {
  const params = {
    skip,
    limit,
    month,
    favorites,
    watched,
    recommended,
    keywords,
    category,
    type,
    region,
    level,
    structure,
    authenticTasks
  }
  const payload = {
    url: ROUTES.V1.TEACHER.VIDEOS.LIST,
    params,
  }
  const { data, error } = useSWR(payload, fetcher);
  return {
    data,
    error,
    isLoading: !data && !error
  }
}

const videos = {
  useVideoList
}

export default videos;