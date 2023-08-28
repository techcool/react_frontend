import useSWR from "swr";
import ROUTES  from "common/src/constants/apis";
import fetcher from '../../fetcher';

export function useMyClasses({
  limit,
  page,
}){
  const params= {
    limit,
    page,
  }
  const payload={
    url:ROUTES.TEACHER.V0.CLASSES.LIST,
    params,
  }
  const { data, error } = useSWR(payload,fetcher);
  return {
    data,
    error,
    isLoading:!data&&!error
  }
}

const students={
  useMyClasses
}

export default students;