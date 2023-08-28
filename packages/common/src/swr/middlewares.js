import {useSelector} from 'react-redux';

export function defaultParameters(useSWRNext){
  return (payload, fetcher, config) => {
    const updatedPayload = {
      method:'GET',
      ...payload
    };
    return useSWRNext(updatedPayload,fetcher, config)
  }
}
export function accessToken(useSWRNext){
  return (payload, fetcher, config) => {
    const { accessToken} = useSelector((state) => state.user);
    const updatedPayload =  {
      headers: { Authorization: `Bearer ${accessToken}` },
      ...payload
    };
    return useSWRNext(updatedPayload,fetcher, config)
  }
}
export function serialize(useSWRNext) {
  return (payload, fetcher, config) => {
    const serializedPayload =  JSON.stringify({
      ...payload
    });
    return useSWRNext(serializedPayload,fetcher, config)
  }
}

const middlewares=[defaultParameters,/*accessToken,*/serialize]
export default middlewares;