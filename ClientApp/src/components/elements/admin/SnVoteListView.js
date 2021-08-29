import React, { useEffect, useState } from 'react';

export function SnVoteListView() {
    const [сhecked, setChecked] = useState([])
    const [shows, setShows] = useState([])

    useEffect(()=>{
        fetch('Show/GetAll').then(r => r.json()).then(json =>{
            setShows(json);
         });
    },[])

    useEffect(()=>{
        if(shows.length>0){

            let newArr =[];
            shows.map(m=>{if(m.showNominations.some(s=>s.nominationId == 99)) return newArr.push(m.id)});
            setChecked(newArr)
        }
    },[shows])

    function handleCheck(e){
        let val = e.target.checked;
        let id = Number.parseInt(e.target.getAttribute('id'));
        if(val){
            if(сhecked.indexOf(id)<0){
                fetch(`Nomination/AddShowToSnVote?showId=${id}`,{
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    
                   }).then(r=>{
                       if(!r.ok) return;
                    
                       setChecked([...сhecked, id]);
                    })  
            }           
        }
        else{
            if(сhecked.indexOf(id)>-1){
                fetch(`Nomination/RemoveShowFromSnVote?showId=${id}`,{
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    
                   }).then(r=>{
                       if(!r.ok) return;
                    
                       let newArr = сhecked;
                        newArr.splice(newArr.indexOf(id),1);
                        setChecked(newArr);
                    })  
                
            }
        }
    }


    return (<>
                <table>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Id</th>
                            <th>Название</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shows?.map((m,i)=>{
                            let kk = m.showNominations.some(s=>s.nominationId == 99);
                            return(<tr>
                                <td><input type='checkbox' defaultChecked={kk} id={m.id} onChange={handleCheck}/></td>
                                <td>{m.id}</td>
                                <td>{m.name}</td>
                            </tr>)
                        })}

                    </tbody>
                </table>
                </>)

}