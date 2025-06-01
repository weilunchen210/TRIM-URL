import type { loginUserDetails } from "../types/loginUser";
import type { newUser } from "../types/newUser";
import api from "./api";
import Cookies from "js-cookie"

export const registerUser = async (newUser:newUser) => {
  try {
    
    const response = await api.post('/user/register', newUser, {
        headers:{
            'Content-Type' : 'application/json'
        }
    });
    
    return response.data;
  } catch (error) {
    
    console.error('Error registering: ', error);
    throw error;
    
  }
};


export const loginUser = async (loginUserDetails: loginUserDetails) => {
    try{
      const response = await api.post('/user/login', loginUserDetails)
      
      if (response.data.token) {
          Cookies.set('token', response.data.token);
      }

      console.log(response.data)

      localStorage.setItem('username',response.data.username)
      localStorage.setItem('profilePictureURL',response.data.profilePictureURL)
      localStorage.setItem('email',response.data.email)
      
      return response.data
    }catch (error) {
    
        console.error('Error logging in: ', error);
    throw error;

  }
}