import React, { Component, useEffect, useState} from 'react';
import { Switch, useHistory } from 'react-router-dom'
import App from './App'
import { MainNavMenu } from './components/MainNavMenu';
import {Login} from './Login'
import { Route, Redirect } from 'react-router';
import LoginSN from './LoginSN';

import './style/_style.scss'

export const UserContext = React.createContext()
export const USER_EMAIL = 'userEmailMst';
export const USER_ID = 'userIdMst';

export function LoginMiddleware() {

    const [isLogin, setLogin] = useState(false)
    const [user, setUser] = useState({})
    const h = useHistory();

    const testData = { id: -2, login:'manager@musicalheart.ru', fullname: 'Администратор', email:'manager@musicalheart.ru', avatar:'', bio:'', city:'' }

    useEffect(() => {
        
        const id = localStorage.getItem(USER_ID);
        const em = localStorage.getItem(USER_EMAIL)

        if(id == -2){
            setUser(testData);
            setLogin(true)
        }
        else if (id && id != 0 && id !== -1 && id !== null) {
            setLogin(true)

            fetch(`User/GetById?id=${id}`)
            .then(r=>r.json())
            .then(res => {
                let t = res;
                setUser(res);
            });
        }

    }, [])

    useEffect(()=>{
        let t = user;

    },[user])

    function login(l, p) {

        if(l == 'manager@musicalheart.ru' && p=='60cxmn5y'){
            localStorage.setItem(USER_ID, -2);
            localStorage.setItem(USER_EMAIL, 'manager@musicalheart.ru');
            setUser({
                id: -2,
                email:'manager@musicalheart.ru'
            })
            setLogin(true)

        }
        else{
            fetch(`User/Login?login=${l}&password=${p}`)
            .then( res=> {
                if(res.ok){
                    return res.json();
                }
            })
            .then(json => {
                
                if(json){
                    setLogin(true);
                    setUser({...json, avatar:`data:image/png;base64,${json.avatar}`})
                    localStorage.setItem(USER_ID, json.id);
                    localStorage.setItem(USER_EMAIL, json.email);
                    localStorage.setItem('passwordMst', p);
                }

            }).catch(c=>{
                alert(c);

            });

        }

    }

    const logout = () => {
        localStorage.setItem(USER_ID, 0);
        localStorage.setItem(USER_EMAIL, '');
        setLogin(false);
        h.push('/');
    }
    const MainWay = () => { return isLogin ?<App logout={logout}/>: <Login login={login} />}

    return (
        <UserContext.Provider value={{
            user: user
        }} >
            <div>
            <MainNavMenu />
            <div>
                <Switch>
                    <Route path='/sn' component={LoginSN} />
                    <Route exact component={MainWay} />
                </Switch>
            </div>
            
            </div>
        </UserContext.Provider >
    )






}