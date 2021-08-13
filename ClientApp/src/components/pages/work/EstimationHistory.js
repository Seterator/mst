import React, { Component, useEffect, useState } from 'react';

export default function EstimationHistory(){

    const [showNomination, setShowNomination] = useState([]);


    useEffect(()=>{
        setShowNomination([{nominationName:"Лучший вася на деревне",nominationId:1, 
        show:[
            {id:2, showName:"Деревня на диком западе", score:3, fullName:"Андрей Васильевич"},
            {id:3, showName:"Деревня на диком востоке", score:2, fullName:"Андрей Андреевич"},
            {id:4, showName:"Деревня на диком севере", score:1, fullName:"Василий Васильевич"},
        ] 
    },
    {nominationName:"Средненькая катя по селу",nominationId:2, 
        show:[
            {id:2, showName:"Деревня на диком западе", score:2, fullName:"Антон Васильевич"},
            {id:8, showName:"Осел сел в лесу", score:1, fullName:"Екатерина Екатериновна"},
            {id:4, showName:"Деревня на диком севере", score:3, fullName:"Василий Васильевич"},
        ] 
    },
    ,
    {nominationName:"Самый плохой оленевод",nominationId:4, 
        show:[
            {id:2, showName:"Деревня на диком западе", score:1, fullName:"Антон Васильевич"},
            {id:8, showName:"Осел сел в лесу", score:3, fullName:"Екатерина Екатериновна"},
            {id:99, showName:"Чукотский волк", score:2, fullName:"Собякин"},
        ] 
    }
    ]);

    },[])

    return(<div className="container hist-container">
        <h1 className="hist-title" >Полный список оценивания</h1>
        {showNomination.map(m=>HistoryElement(m))}
        <button className="hist-send" onClick={()=>{}}>Отправить</button>
        </div>)
}

function HistoryElement(data){
    return(<div className="hist-nom-container">
        <div className="hist-nom-title">{data.nominationName}</div>
        <div className="hist-show-container">
        {data.show?.sort((a,b)=>{
            return a?.score - b?.score;
        }).map(m=>{
            return(<div className="hist-nom-panel">
                    <div className={`hist-nom-score score${m?.score}` }>{m?.score}</div>
                    <div className="hist-show-panel">
                        <div className="hist-show-name">{m?.showName}</div>
                        <div className="hist-show-memb">{m?.fullName}</div>
                    </div>
                </div>)

        })}
        </div>
        
    </div>)

}