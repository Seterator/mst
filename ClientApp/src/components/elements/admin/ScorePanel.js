import React, { useEffect, useState } from 'react';
import AddScoreModal from '../modal/AddScoreModal'

export default function ScorePanel(){

    const [data,setData] = useState([]);
    const [dataShow,setDataShow] = useState([]);
    const [dataUser,setDataUser] = useState([]);
    const [isOpen,setIsOpen] = useState(false);

    const [dataView,setDataView] = useState([]);
    const [change,setChange] = useState(1);

    const [editedShow, setEditedShow] = useState({});


    useEffect(()=>{

        const ff = async () =>{

        
        let query = [`Nomination/GetAll`, `Show/GetAll`, 'User/GetAll']
            let results = await Promise.all( query.map(async q =>{

                return await fetch(q).then(r=>r.ok&&r.json());
              
            }))

            let users = results[2];
            users.push({id:-2, fullName:'Добавленная администратором'})
            setData(results[0]);
            setDataShow(results[1]);
            setDataUser(users)

        setEditedShow({});
        }
        ff();
        
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
        let newArr = dataShow;

        let editedShow = newArr.filter(f=>f.id == d.editedShow.showId)[0]
        editedShow.estimations.push({showId:d.editedShow.showId, refereeId:-2,nominationId:d.editedShow.nominationId, score:d.score});

        setDataShow(newArr)
    }

    function setToDelete(d){
        let newArr = dataShow;
        let editedShow = newArr.filter(f=>f.id == d.showId)[0];
        let index = editedShow.estimations.indexOf(editedShow.estimations.filter(f=>f.refereeId == d.refereeId && f.nominationId == d.nominationId)[0]);

        editedShow.estimations.splice(index,1);

        setDataShow(newArr);
        setChange(change+1)
    }

    return(<div>
        {dataView.map(m=>ScoreNomination(m, setEditedShow, setToDelete, dataShow, dataUser))}
        {AddScoreModal({isOpen: isOpen, cancel:()=>setIsOpen(false), submit:addScore, editedShow:editedShow})}
    </div>)
} 

function ScoreNomination(nom, setEdited, setToDelete, dataShow, dataUser){

    

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
                    let m = dataShow.length > 0 && dataShow.filter(f=>f.id == sn?.showId)[0];

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
                                    <td>{getScoreSum(m?.estimations.filter(f=>f.nominationId == nom?.id))}</td>
                                    <td></td>
                                    <td><a onClick={()=>addScore(nom?.id,m?.id)}>Добавить оценку</a></td>
                                </tr>
                                {m?.estimations?.filter(f=>f.nominationId == nom?.id).map((s,i) => {
                                    let ref =dataUser.length > 0 && dataUser.filter(f=>f.id == s?.refereeId)[0];
                                    return(<tr className="score-row">
                                        <td></td>
                                        <td>{ref?.fullName}</td>
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