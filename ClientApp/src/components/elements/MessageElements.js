import React from 'react';

export function WarningHorizontMessage(text){
    return WarningMessage(text,null,250)
}

export function WarningVerticalMessage(text){
    return WarningMessage(text,250)
}

export function WarningMessage(text, width, height){
    return(<div style={{backgroundColor:'grey', width:`${width}`, height:`${height}`, padding:'15px 10px', display:'flex'}}><div style={{margin: '15px 30px 0 30px'}}><img src={require('../../img/Group.svg')}/></div>{text}</div>)
    
}