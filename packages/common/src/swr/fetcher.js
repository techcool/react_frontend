import axios from 'common/src/api/axios';
export default async function fetcher(payload){
  const parsePayload=JSON.parse(payload)
  return axios({
    ...parsePayload
  }).then((response, )=> response.data)
  .catch(error=>{
    if(error.response){
      throw new Error(error?.response?.data?.message)
    }else{
      throw new Error('Unknow error');
    }
  });
}