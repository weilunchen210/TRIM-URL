
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

    console.log(response.data)
    
    return response.data;
  } catch (error) {
    
    console.error('Error getting URLs:', error);
    throw error;
    
  }
};
