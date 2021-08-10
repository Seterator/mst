import React, { Component, useEffect, useState} from 'react';
import App from './App'
import { MainNavMenu } from './components/MainNavMenu';
import {Login} from './Login'

import './style/_style.scss'

export const UserContext = React.createContext()
export const USER_EMAIL = 'userEmailMst';
export const USER_ID = 'userIdMst';

export function LoginMiddleware() {

    const [isLogin, setLogin] = useState(false)
    const [user, setUser] = useState({ id: -1, visibleName: '', email:'', role:'' })

    const testData = { id: 5, visibleName: 'Лиса Лисичкова', email:'lisa@mail.ru', role:'Admin' }

    useEffect(() => {
        if (user.id && user.id !== 0 && user.id !== -1 && user.id !== null) {
            setLogin(true)

            setUser(testData);
            //Get('User/GetById?user_id=' + user.id)
            //    .then(res => setUser(res))
        }
    }, [user.id])

    useEffect(() => {
        const id = localStorage.getItem(USER_ID)

        setUser({
            id: id && id != null ? parseInt(id) : 0
        })

    }, [])

    const login = (l, p) => {

        if(l == 'lisa@mail.ru'){
            localStorage.setItem(USER_ID, 5);
            setUser({
                id: 5
            })
            setLogin(true)

        }

        //Get('User/Login/' + l + '/' + p).then(res => {
        //    if (res) {
        //        localStorage.setItem(USER_ID, res.id)

        //        setUser({
        //            id: res.id
        //        })
        //        setLogin(true)
        //    }
        //})
    }

    const logout = () => {
        localStorage.setItem(USER_ID, 0)
        setLogin(false)
    }


    return (
        <UserContext.Provider value={{
            user: user
        }} >
            <div>
            <MainNavMenu />
            <div>

            {user.id == -1 ? <div>Loading...</div> : isLogin ?<App logout={logout}/>: <Login login={login} />}
            </div>
            
            </div>
        </UserContext.Provider >
    )






}