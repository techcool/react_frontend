import useSWR from "swr";
import ROUTES  from "common/src/constants/apis";
import fetcher from '../../fetcher';

export function useStudentList({class_id=null,page=1,limit=10,sortBy=null,sortOrder=null}){
  const params={
    page,
    limit,
    class_id,
    sortBy,
    sortOrder
  }
  const payload={
    url:ROUTES.TEACHER.V0.STUDENTS.LIST,
    params,
  }
  const { data, error,mutate } = useSWR(payload,fetcher);
  
  return ({
    data,
    error,
    isLoading: !data && !error,
    mutate,
  });
    
}

const students={
  useStudentList
}

export default students;