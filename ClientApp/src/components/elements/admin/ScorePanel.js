import React, { useEffect, useState } from 'react';
import AddScoreModal from '../modal/AddScoreModal'

export default function ScorePanel(){

    const refereeTestData = [
        {id:1, fullName:"Галина Евгеньевна8"},
        {id:2, fullName:"Галина Евгеньевна7"},
        {id:3, fullName:"Галина Евгеньевна66"},
        {id:4, fullName:"Галина Евгеньевна5"},
        {id:6, fullName:"Галина Евгеньевна4"},
        {id:5, fullName:"Галина Евгеньевна3"},
        {id:7, fullName:"Галина Евгеньевна2"},
        {id:8, fullName:"Галина Евгеньевна1"}
    ]

    const [data,setData] = useState([]);
    const [isOpen,setIsOpen] = useState(false);

    const [dataView,setDataView] = useState([]);
    const [change,setChange] = useState(1);

    const [editedShow, setEditedShow] = useState({});


    const testData = [
        {nominationId:1, nominationName:"qqwrqwrqr", 
            show:[
                {id:2, name:"showTitle", 
                    score:[
                        {refereeId:4, fullName:"Галина Евгеньевна4", value:2},
                        {refereeId:5, fullName:"Галина Евгеньевна5", value:1}
                    ] 
                },
                {id:3, name:"showTitle2", 
                    score:[
                        {refereeId:4, fullName:"Галина Евгеньевна4", value:1},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1}
                    ] 
                },
                {id:4, name:"showTitle5", 
                    score:[
                        {refereeId:1, fullName:"Галина Евгеньевна1", value:3},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1},
                        {refereeId:2, fullName:"Галина Евгеньевна2", value:1},
                        {refereeId:3, fullName:"Галина Евгеньевна3", value:2},
                        {refereeId:5, fullName:"Галина Евгеньевна5", value:1}
                    ] 
                },
            ]
        },
        {nominationId:2, nominationName:"ttttttttt", 
            show:[
                {id:2, name:"showTitle555", 
                    score:[
                        {refereeId:1, fullName:"Галина Евгеньевна1", value:3},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1},
                        {refereeId:2, fullName:"Галина Евгеньевна2", value:1},
                    ] 
                },
                {id:4, name:"showTitle5", 
                    score:[
                        {refereeId:1, fullName:"Галина Евгеньевна1", value:3},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1},
                        {refereeId:2, fullName:"Галина Евгеньевна2", value:1},
                        {refereeId:3, fullName:"Галина Евгеньевна3", value:2},
                        {refereeId:5, fullName:"Галина Евгеньевна5", value:1}
                    ] 
                },
            ]
        },
        {nominationId:3, nominationName:"qyyyyyyyyyyy", 
            show:[
                {id:2, name:"showTitle", 
                    score:[
                        {refereeId:5, fullName:"Галина Евгеньевна5", value:1},
                        {refereeId:7, fullName:"Галина Евгеньевна7", value:3}
                    ] 
                },
                {id:3, name:"showTitle2", 
                    score:[
                        {refereeId:4, fullName:"Галина Евгеньевна4", value:1},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1}
                    ] 
                },
                {id:4, name:"showTitle23", 
                    score:[
                        {refereeId:1, fullName:"Галина Евгеньевна1", value:3},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1}
                    ] 
                },
            ]
        },
        {nominationId:4, nominationName:"nnnnnnnnnnnn", 
            show:[
                {id:2, name:"showTitle", 
                    score:[
                        {refereeId:4, fullName:"Галина Евгеньевна4", value:2},
                        {refereeId:5, fullName:"Галина Евгеньевна5", value:1}
                    ] 
                },
                {id:3, name:"showTitle2", 
                    score:[
                        {refereeId:4, fullName:"Галина Евгеньевна4", value:1},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1}
                    ] 
                },
                {id:3, name:"showTitle3", 
                    score:[
                        {refereeId:4, fullName:"Галина Евгеньевна4", value:1},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1}
                    ] 
                },
                {id:3, name:"showTitle5", 
                    score:[
                        {refereeId:4, fullName:"Галина Евгеньевна4", value:1},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1}
                    ] 
                },
                {id:4, name:"showTitle9", 
                    score:[
                        {refereeId:1, fullName:"Галина Евгеньевна1", value:3},
                        {refereeId:8, fullName:"Галина Евгеньевна8", value:1},
                        {refereeId:2, fullName:"Галина Евгеньевна2", value:1},
                        {refereeId:3, fullName:"Галина Евгеньевна3", value:2},
                        {refereeId:5, fullName:"Галина Евгеньевна5", value:1}
                    ] 
                },
            ]
        },
    ]
 
    useEffect(()=>{

        fetch('Nomination/GetAll').then(res => res.ok&&res.json())
        .then(json =>{
            json&&setData(json);
        })
        //fetch score
        
        setEditedShow({});
        
    },[]);

    useEffect(()=>{

        // let newArr = data.map(m=>{return{...m,show:m.show.map(s=>{return{...s, score: s.score.map(c=>{
        //     let num = getScoreSum(s.score);
        //     return{...c,place:'', warn:false}
        // })}})}});
        // let editedNom = newArr.filter(f=>f.nominationId == d.nominationId)[0];
        // let editedShow = editedNom.show.filter(f=>f.id == d.showId)[0]
        // setDataView([...data, show:[...data.show,score:[]]]);
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
        return scores.map(m=>m.score).reduce((a, b) => a + placeToScore(b), 0)
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