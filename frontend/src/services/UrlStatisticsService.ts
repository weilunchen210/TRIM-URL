import type { loginUserDetails } from "../types/loginUser";
import type { newUser } from "../types/newUser";
import api from "./api";
import Cookies from "js-cookie"

export const getStatistics= async () => {
  try {
    
    const jwt = Cookies.get("token")
    const response = await api.get('/statistics', {
        headers:{
            Authorization: `Bearer ${jwt}`
        }
    })

    console.log(response.data)
    
    return response.data;
  } catch (error) {
    
    console.error('Error getting Statistics:', error);
    throw error;
    
  }
};
