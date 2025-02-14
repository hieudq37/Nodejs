import React, { Fragment, useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {routes} from './routes'
import DefaultComponent from './components/DefaultComponent/DefaultComponent'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { isJsonString } from './utils'
import { jwtDecode } from "jwt-decode";

import * as UserService from './services/UserService'
import {useDispatch, useSelector}  from 'react-redux'
import { updateUser } from './redux/slides/userSlide'
import { refreshToken } from './services/UserService';




function App() {

  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const user = useSelector((state)=>state.user)

  useEffect(()=>{
    setIsLoading(true) 
    const {storageData, decoded} =   handleDecoded()
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id, storageData)
        }
    },[])

    const handleDecoded = () =>{
      let storageData =   localStorage.getItem('access_token')
      let decoded = {}
    console.log('storageData',storageData,isJsonString(storageData))
    if(storageData && isJsonString(storageData)){
      storageData = JSON.parse(storageData)
       decoded = jwtDecode(storageData)
      }
      return {decoded, storageData}
    } 
    
    UserService.axiosJWT.interceptors.request.use(async (config) => {
      // Do something before request is sent
      const currentTime= new Date()
      const {decoded} =   handleDecoded()
      if(decoded?.exp<currentTime.getTime()/1000){
        const data = await UserService.refreshToken()
        config.headers['token'] = `Bearer$${data?.access_token}`
      }
      return config;
    },  (err) => {
      // Do something with request error
      return Promise.reject(err);
    });

  const handleGetDetailsUser = async (id, token) =>{
    const res = await UserService.getDetailsUser(id, token)
    dispatch(updateUser({...res?.data, access_token:token}))
    setIsLoading(false)
}

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const ischeckAuth = !route.isPrivate || user.isAdmin
            const Layout = route.isShowHeader ? DefaultComponent: Fragment
            return (
              <Route key={route.path} path={ischeckAuth ? route.path : undefined} 
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router> 
    </div>
  );
}

export default App