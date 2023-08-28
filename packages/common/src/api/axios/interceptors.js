import store from "main/src/store";
const API = "/api";
import {
  showErrorMessages,
  showSuccessMessages
} from "common/src/components/helpers/notifications";

export const accessTokenInterceptor =function(config){
  const state=store.getState();
  const { accessToken=null }= state?.user||{};
  const newConfig=Object.assign({},config,
    {
      headers: { Authorization: `Bearer ${accessToken}`
      }
    });
  return newConfig;
};
export const urlInterceptor=function(config){
  const state=store.getState();
  const { role=null }= state?.user||{};
  const { url }=config;
  if(url.startsWith("/api/")) return config;
  const updatedUrl= role ?`${API}/${role}/${url}`: `${API}/${url}`;
  const newConfig=Object.assign({},config,{ url: updatedUrl });
  return newConfig;
};
export const successMessagesInterceptor= function(config){
  let message=config?.data?.messages?.[0];
  message = message ||config?.response?.data?.message;
  if(message) showSuccessMessages([message]);
  return config;
};

export const errorMessagesInterceptor= function(error){
  let message=error?.response?.data?.messages?.[0];
  message = message ||error?.response?.data?.message;
  if(message) showErrorMessages([message]);
  throw(error);
};

