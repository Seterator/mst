import React, { useEffect, useState } from 'react';
import AddScoreModal from '../modal/AddScoreModal'

export default function ScorePanel(){

    const [data,setData] = useState([]);
    const [isOpen,setIsOpen] = useState(false);

    const [dataView,setDataView] = useState([]);
    const [change,setChange] = useState(1);

    const [editedShow, setEditedShow] = useState({});


    useEffect(()=>{

        fetch('Nomination/GetAll').then(res => res.ok&&res.json())
        .then(json =>{
            json&&setData(json);
        })
        
        setEditedShow({});
        
    },[]);

    useEffect(()=>{

        setDataView(data);
        
    },[data,change]);

    useEffect(()=>{
        if(editedShow && editedShow.nominationId && editedShow.showId && !isOpen){
            setIsOpen(true);

        }
    },[editedShow])

    useEffect(()=>{
        !isOpen&&setEditedShow({});
    },[isOpen]);

    
    function addScore(d){
        let newArr = dataView;
        let editedNom = newArr.filter(f=>f.nominationId == d.editedShow.nominationId)[0];
        let editedShow = editedNom.show.filter(f=>f.id == d.editedShow.showId)[0]
        editedShow.score.push({fullName:"Добавленная администратором", refereeId:-2,value:d.score});

        setData(newArr)
    }

    function setToDelete(d){
        let newArr = dataView;
        let editedNom = newArr.filter(f=>f.nominationId == d.nominationId)[0];
        let editedShow = editedNom.show.filter(f=>f.id == d.showId)[0]
        let index = editedShow.score.indexOf(editedShow.score.filter(f=>f.refereeId == d.refereeId)[0]);

        editedShow.score.splice(index,1);

        setData(newArr);
        setChange(change+1)
    }

    return(<div>
        {dataView.map(m=>ScoreNomination(m, setEditedShow, setToDelete))}
        {AddScoreModal({isOpen: isOpen, cancel:()=>setIsOpen(false), submit:addScore, editedShow:editedShow})}
    </div>)
} 

function ScoreNomination(nom, setEdited, setToDelete){

    

    function addScore(nomId, showId){
        setEdited({nominationId:nomId, showId:showId})

    }
    function deleteScore(nomId, showId,refereeId){
        setToDelete({nominationId:nomId, showId:showId, refereeId:refereeId})
    }
    function dropdown(id){
        let el = document.getElementById(`dropdown${id}`);
        if(el.classList.contains('visibility-hidden')){
            el.classList.replace('visibility-hidden','visibility-visible')
        } else if(el.classList.contains('visibility-visible')){
            el.classList.replace('visibility-visible','visibility-hidden');
        }

    } 

    function placeToScore(i){
        if(i == 1){
            return 3;
        }
        if(i == 2){
            return 2;
        }
        if(i == 3){
            return 1;
        }
    }

    function getScoreSum(scores){
        return scores && scores.map(m=>m.score).reduce((a, b) => a + placeToScore(b), 0)
    }

    return(<div>
        <div className="score-show-row"  onClick={()=>{dropdown(nom.id)}}><a id={nom.id}>{nom.name}</a></div>
        <div className="visibility-hidden" id={`dropdown${nom.id}`}>
            <table  className="borderless">
                <thead>
                    <tr>
                        <th style={{width:'40%'}}>Спектакли</th>
                        <th style={{width:'40%'}}>Пользователь</th>
                        <th style={{width:'10%'}}>Оценка</th>
                        <th style={{width:'10%'}}>Баллов</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                {nom.showNominations?.map((sn,i)=>{
                    let m = sn?.show;

                    const content = (<tr><td colSpan="4">
                        <table className="borderless" style={{width:'100%'}} >
                            <col style={{width:'100%'}}></col>
                            <tbody>
                                <tr className="score-show-row">
                                    <td>
                                        <table className="borderless">
                                        <colgroup>
                            <col style={{width:'40%'}}></col>
                            <col style={{width:'40%'}}></col>
                            <col style={{width:'10%'}}></col>
                            <col style={{width:'10%'}}></col>
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td>{m?.name}</td>
                                    <td></td>
                                    <td></td>
                                    <td>{getScoreSum(m?.estimations)}</td>
                                    <td></td>
                                    <td><a onClick={()=>addScore(nom?.id,m?.id)}>Добавить оценку</a></td>
                                </tr>
                                {m?.estimations?.map((s,i) => {
                                    return(<tr className="score-row">
                                        <td></td>
                                        <td>{s?.refereeId?.fullName}</td>
                                        <td><div>{s?.score}</div></td>
                                        <td></td>
                                        <td><a style={{color:'black'}} onClick={()=>deleteScore(nom?.id,m?.id,s?.refereeId)}>X</a></td>
                                    </tr>)
                                })}
                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr className="spacer"></tr>
                            </tbody>

                        </table>
                        
                        </td>
                        <td><a onClick={()=>addScore(nom?.id,m?.id)}>Добавить оценку</a></td>
                        </tr>)

                        return(content)

})}

                    
                </tbody>
            </table>
        </div>
    </div>)
}