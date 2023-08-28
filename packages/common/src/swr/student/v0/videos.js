import ROUTES  from "common/src/constants/apis";
import useSWR from "swr";
import fetcher from "../../fetcher";

export function useVideoList({
  preferredMonth=null,
  limit,
  page
}){
  const params= {
    preferredMonth,
    limit,
    page
  };
  const payload={
    url:ROUTES.STUDENT.V0.VIDEOS.LIST,
    params
  };
  const { data, error } = useSWR(payload,fetcher);
  return {
    data,
    error,
    isLoading:!data&&!error
  };
}

const videos={
  useVideoList
};

export default videos;
