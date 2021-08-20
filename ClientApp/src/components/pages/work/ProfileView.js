import React, {useEffect, useState, useContext} from 'react';
import {UserContext } from '../../../LoginMiddleware'

import '../../../style/_label.scss'
import '../../../style/staff.scss'

export function ProfileView(){
    const [data, setData] = useState({});
    const [dataView, setDataView] = useState({});
    const {user} = useContext(UserContext);
    useEffect(()=>{
       
        if(user?.id > 0){
            fetch(`User/GetById?id=${user.id}`)
            .then(r=>r.json())
            .then(res => {

                setData({...res, avatar:`data:image/png;base64,${res.avatar}`});
            });
        }
            

    },[user]);

    useEffect(()=>{
        setDataView(data);
    },[data]);
    return(
        
            <div className="container profile-container">
                <div className="profile-left">
                <div className="about"  style={{
        backgroundImage:`url(${dataView.avatar})`
        , width:'285px', height:'350px',backgroundSize: 'auto 100%',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'}}></div>
                </div>
                <div className="profile-right">
                    <div style={{textAlign:'left'}}>
                        <div className="nav-content-title profile-title">{dataView.fullName}</div>
                        <div className="mail profile-mail">{dataView.city} <div className="dot"></div> {dataView.email}</div>
                    </div>
                    <div className="content">
                        <p className="paragraph profile-bio">{dataView.bio}</p>
                    </div>
                </div>

            </div>
        
    )
}