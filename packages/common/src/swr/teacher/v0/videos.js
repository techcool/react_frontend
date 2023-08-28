import useSWR from "swr";
import ROUTES  from "common/src/constants/apis";
import fetcher from '../../fetcher';

export function useVideoList({
  preferredMonth=null,
  limit,
  page,
}){
  const params= {
    preferredMonth,
    limit,
    page,
  }
  const payload={
    url:ROUTES.TEACHER.V0.VIDEOS.LIST,
    params,
  }
  const { data, error } = useSWR(payload,fetcher);
  return {
    data,
    error,
    isLoading:!data&&!error
  }
}


export function useVideoSearch({
  keywords
}){
  const params= {keywords}
  const payload={
    url:ROUTES.V0.TEACHER.VIDEOS.SEARCH,
    params,
    METHOD:"POST",
    data:{keywords }

  }
  const { data, error } = useSWR(payload,fetcher);
  return {
    data,
    error,
    isLoading:!data&&!error
  }
}
const videos= {
  useVideoList
}

export default videos;
