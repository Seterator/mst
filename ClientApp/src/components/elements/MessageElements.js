import React from 'react';

export function WarningHorizontMessage(text){
    return WarningMessage(text,null,250)
}

export function WarningVerticalMessage(text){
    return WarningMessage(text,250)
}

export function WarningMessage(text, className){
    return(<div className={`${className}`}><div><img src={require('../../img/Group.svg')}/></div>{text}</div>)
    
}