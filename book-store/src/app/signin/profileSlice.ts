'use client'

import { ACTIVATION_PATH, LOGIN_PATH, ME_PATH, URL_API, USER_PATH } from "@/app/const";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  id: number,
  username: string,
  email: string,
  isActivationNeeded: boolean,
  isActivationCompleted: boolean
}

const initialState: InitialStateType = {
  id: 0,
  username: "",
  email: "",
  isActivationNeeded: false,
  isActivationCompleted: false
}

export const me = async (access: string) => {
const myHeaders = new Headers();
myHeaders.append("accept", "application/json");
myHeaders.append("Authorization", `Bearer ${access}` );

const requestOptions = {
  method: "GET",
  headers: myHeaders,
};

const response = await fetch(URL_API + ME_PATH, requestOptions)
  const result = await response.json()
  return result
}



export const login = createAsyncThunk("profile/login", async ({ email, password }: { email: string, password: string }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    email,
    password
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(URL_API + LOGIN_PATH, requestOptions);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  const res:{access:string, refresh: string} = await response.json()
  localStorage.setItem("access", res.access)
  localStorage.setItem("refresh", res.refresh)
  const user: InitialStateType  = await me(res.access)
  return user
});

export const getUser = createAsyncThunk('profile/getUser', async() => {
    const accessToken = localStorage.getItem("access")
    if(accessToken){
       const user = await me(accessToken)
       return user
    }
    return {}
})

export const register = createAsyncThunk("profile/register", async ({ email, password, username}: { email: string, password: string, username: string }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    email,
    password,
    username
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(URL_API + USER_PATH, requestOptions);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return true
});

export const activate = createAsyncThunk("profile/activate", async ({ uid, token}: { uid: string, token: string }) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const raw = JSON.stringify({
    uid, 
    token
  });
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(URL_API + USER_PATH + ACTIVATION_PATH, requestOptions);
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return true
});


const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    logout: (state) => {
        state.email = ''
        localStorage.removeItem("access")
        localStorage.removeItem("refresh")
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.email = action.payload.email
        console.log('fulfilled', action)
      })
      .addCase(login.pending, (state, action) => {
        console.log('pending')
      })
      .addCase(login.rejected, (state, action) => {
        console.log('rejected')
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.email = action.payload.email
        console.log('getUser')
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isActivationNeeded = true
        console.log('register')
      })
      .addCase(register.pending, (state, action) => {
        // state.email = action.payload.email
        console.log('register pending')
      })
      .addCase(register.rejected, (state, action) => {
        state.isActivationNeeded = false
        console.log('register rejected')
      })
      .addCase(activate.fulfilled, (state, action) => {
        state.isActivationNeeded = true
        state.isActivationCompleted = true
        console.log('activate')
      })
  }
})

export const {logout} = profileSlice.actions
export default profileSlice.reducer