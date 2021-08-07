import React from 'react';

export function WarningHorizontMessage(text){
    return WarningMessage(text,null,250)
}

export function WarningVerticalMessage(text){
    return WarningMessage(text,250)
}

export function WarningMessage(text, width, height){
    return(<div style={{backgroundColor:'grey', width:`${width}`, height:`${height}`, padding:'15px 10px'}}>{text}</div>)
    
}