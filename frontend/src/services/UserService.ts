import type { editProfileRequest } from "../types/editProfile";
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

export const editUser = async (editProfileRequest: editProfileRequest) => {
    try{
        const jwt = Cookies.get("token")
        const response = await api.put('/user/edit', editProfileRequest,{
            headers:{
                Authorization: `Bearer ${jwt}`
        }
    })
      
      if (response.data.token) {
          Cookies.set('token', response.data.token);
      }

      localStorage.setItem('username',response.data.username)
      localStorage.setItem('profilePictureURL',response.data.profilePictureURL)
      localStorage.setItem('email',response.data.email)
      
      return response.data
    }catch (error) {
    
        console.error('Error logging in: ', error);
    throw error;

  }
}


export const dummyLogin = async () => {
    try{
      const response = await api.get('/user/dummyLogin')
      
      if (response.data.token) {
          Cookies.set('token', response.data.token);
      }

      localStorage.setItem('username',response.data.username)
      localStorage.setItem('profilePictureURL',response.data.profilePictureURL)
      localStorage.setItem('email',response.data.email)
      
      return response.data
    }catch (error) {
    
        console.error('Error logging in: ', error);
    throw error;

  }
}