import axios from "axios"
import {accessTokenInterceptor,
  urlInterceptor,
  errorMessagesInterceptor,
  successMessagesInterceptor
} from "./interceptors"

axios.interceptors.request.use(accessTokenInterceptor);
axios.interceptors.request.use(urlInterceptor);
axios.interceptors.response.use(successMessagesInterceptor,errorMessagesInterceptor);
export const axiosWithoutInterceptors=axios.create();
export default axios;