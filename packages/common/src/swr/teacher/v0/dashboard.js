import useSWR from "swr";
import ROUTES  from "common/src/constants/apis";
import fetcher from '../../fetcher';

export function useFetchCount({
}){
  const payload={
    url:ROUTES.V0.TEACHER.DASHBOARD.COUNT,
  }
  const { data, error } = useSWR(payload,fetcher);
  return {
    data,
    error,
    isLoading:!data&&!error
  }
}

const dashboard={
  useFetchCount
}

export default dashboard;