
import type { saveURL } from "../types/saveURL";
import api from "./api";
import Cookies from "js-cookie"

export const getURLList= async () => {
  try {
    
    const jwt = Cookies.get("token")
    const response = await api.get('/url', {
        headers:{
            Authorization: `Bearer ${jwt}`
        }
    })

    return response.data;
  } catch (error) {
    
    console.error('Error getting URLs:', error);
    throw error;
    
  }
};



export const deleteURL= async (urlId:string) => {
  try {
    
    const jwt = Cookies.get("token")
    const response = await api.delete(`/url/${urlId}`, {
        headers:{
            Authorization: `Bearer ${jwt}`
        }
    })

    return response.data;
  } catch (error) {
    
    console.error('Error getting URLs:', error);
    throw error;
    
  }
};



export const addURL= async (input:saveURL) => {
  try {
    
    const jwt = Cookies.get("token")
    const response = await api.post(`/url/`, input,{
        headers:{
            Authorization: `Bearer ${jwt}`
        }
    })

    return response.data;
  } catch (error) {
    
    console.error('Error getting URLs:', error);
    throw error;
    
  }
};

export const editURL= async (input:saveURL,urlId:string) => {
  try {
    
    const jwt = Cookies.get("token")
    const response = await api.put(`/url/${urlId}`, input,{
        headers:{
            Authorization: `Bearer ${jwt}`
        }
    })

    return response.data;
  } catch (error) {
    
    console.error('Error getting URLs:', error);
    throw error;
    
  }
};
