import React, { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { useParams, useLocation } from 'react-router-dom'
import axios from 'axios'

export default function LoginSN(){
    const search = useLocation().search;
    const showId = new URLSearchParams(search).get('showId');
    const status = new URLSearchParams(search).get('status');
    const [showData, setShowData] = useState({});
    const [showImage, setShowImage] = useState({});

    useEffect(()=>{
        const ff = async () =>{
                let sd = await fetch(`Show/GetById?id=${showId}`).then(r=>r.ok&&r.json())
                setShowData(sd);

                let si = await fetch(`Show/GetImage?showId=${showId}`).then(r=>r.ok&&r.json())
                setShowImage({image:si});
            }
            
        if(showId){
            ff();
        }
    },[])

    function getStatusMessage(st) {

        if (st == 'success') {
            return 'Спасибо, Ваш голос учтен!'
        }
        else if (st == 'exists') {
            return 'Вы уже голосовали за данную работу!'
        } else {
            return 'Что-то пошло не так.. попробуйте позже'
        }
    }

    function authSnHandle(provider) {
        window.open(`/Show/VoteOAuth?provider=${provider}&showId=${showId}`, "_self");
    }

    return(<div><div className="container">
        <div className="sn-image" style={{backgroundImage:`url(data:image/png;base64,${showImage.image})`}}></div>
       
        <h1 className="sn-title">{showData.name}</h1>
        
        <div className="sn-description">{showData.description}</div>
        {status?<div className="sn-status">{getStatusMessage(status)}</div>:<div className="sn-auth">Авторизироваться<img onClick={()=>authSnHandle('Google')} src={require('./img/ok.svg')}/><img onClick={()=>authSnHandle('Facebook')} src={require('./img/fb.svg')}/><img onClick={()=>authSnHandle('Vkontakte')} style={{marginTop:'5px'}} src={require('./img/vk2.svg')}/></div>}
        
    
    </div>
    <Footer/>
    </div>)
}