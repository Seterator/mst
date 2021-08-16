import React, { useEffect, useState } from 'react';
import Table from '../misc/Table';
import AddMembersModal from '../modal/AddMembersModal';
import AddCompetitionModal from '../modal/AddCompetitionModal'
import EditNominationModal from '../modal/EditNominationModal';
import EditNominationsListModal from '../modal/EditNominationsListModal';
import AddCompetitionsShowModal from '../modal/AddCompetitionsShowModal';

export function CompetitionListView(){
    const [isModalAddOpen, OpenAddModal] = useState(false);
    const [isModalEditOpen, OpenEditModal] = useState(false);
    const [competitionData, setCompetitionData] = useState({})
    const [competitionEditData, setCompetitionEditData] = useState({})
    const [competitionDataView, setCompetitionDataView] = useState({})
    const [filter, setFilter] = useState('');
    const [changeIndex, setChangeIndex] = useState(1);
    useEffect(()=>{
        fetch('Competition/GetAll').then(r => r.json()).then(json =>{
            setCompetitionData({data:json, columns:[{key:'id', value:'Id'},{key:'name', value:'Название'},{key:'link', value:'Ссылка'},{key:'beginDate', value:'Дата начала'},{key:'endDate', value:'Дата окончания'},{key:'members', value:'Жюри'},{key:'nominations', value:'Номинации'},{key:'shows', value:'Спектакли'}],
            setData:[{ execute:(i)=>deleteCompetition(i),title:'Удалить'},
            { execute:(i)=>editCompetition(i),title:'Изменить'}]});
        });

    },[])
    useEffect(()=>{
        competitionEditData&&competitionEditData.id&&OpenEditModal(true);
    },[competitionEditData]);

    useEffect(()=>{
        !isModalEditOpen&&setCompetitionEditData({});
    },[isModalEditOpen]);

    useEffect(()=>{
        setCompetitionDataView({...competitionData,setData:[{ execute:(i)=>deleteCompetition(i),title:'Удалить'},
        { execute:(i)=>editCompetition(i),title:'Изменить'}]});

    },[competitionData,changeIndex]);

function deleteCompetition(i){
    if(window.confirm(`Удалить конкурс ${i.name}`)){
        fetch(`Competition/Delete?id=${i.id}`, {
            method: 'post'
           }).then(res=>{
               if(!res?.ok){
                   return;
               }
               let toDelete = competitionData?.data?.filter(f => f.id == i.id)[0]
               let index = competitionData?.data?.indexOf(toDelete);
               let newData = competitionData.data;
               newData.splice(index,1);
               setCompetitionData({...competitionData,data: newData});
               setChangeIndex(changeIndex+1)
           }); 
    }
}
function editCompetition(i){
    setCompetitionEditData(i);
}

function competitionAdded(i){

    fetch(`Competition/Create`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(i)
        
       }).then(r => {
           if(!r.ok){
               return;
           }
           return r.json();
           
       })
       .then(json=>{
        let newArr = [...competitionData.data,json];
        setCompetitionData({...competitionData,data:newArr});
       });

    
}
function competitionEdited(i){
    const editData = {...i, id:competitionEditData.id}
    fetch(`Competition/Edit`, {
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body:JSON.stringify(editData)
        
       }).then(r => {
        if(!r.ok){
            return;
        }
        let newArr = competitionData?.data;
        let toEdit = newArr?.filter(f => f.id == competitionEditData.id)[0]
        let index = newArr?.indexOf(toEdit);
        let newData = {...newArr[index],...i};
        newArr[index] = newData;
        setCompetitionData({...competitionData,data: newArr});
    });
    
}



    return(<div>
        <div><a onClick={()=>{OpenAddModal(true)}}>Добавить Конкурс</a></div>
        {CompetitionTable(competitionDataView)}
        {AddCompetitionModal({submit:competitionAdded,cancel:()=>OpenAddModal(false),isOpen:isModalAddOpen})}
        {AddCompetitionModal({submit:competitionEdited,cancel:()=>OpenEditModal(false),isOpen:isModalEditOpen, preValue:competitionEditData})}

        </div>)



}




function CompetitionTable({ columns, data, setData }){

    const [changeIndex, setChangeIndex] = useState(1);

    const [nominations, setNominations] = useState([]);
    const [nominationsView, setNominationsView] = useState([]);

    const [editNominationData, setEditNominationData] = useState({});
    const [editCompetitionData, setEditCompetitionData] = useState({});
    

    const [isModalNominationOpen, OpenNominationModal] = useState(false);
    const [isModalNominationEditOpen, OpenNominationEditModal] = useState(false);
    const [isModalShowCompetitionOpen, OpenShowCompetitionModal] = useState(false);


    const [members, setMembers] = useState([]);
    const [membersChecked, setMembersChecked] = useState([]);
    const [isModalMembersOpen, OpenMembersModal] = useState(false);

    const [shows, setShows] = useState([]);
    const [showsChecked, setShowsChecked] = useState([]);
    const [showNominationsValue, setShowNominationsValue] = useState([]);
    
 

    useEffect(()=>{
        fetch('Show/GetAll').then(r => r.json()).then(json =>{
           setShows(json);
        });
        fetch('User/GetAll').then(r => r.json()).then(json =>{
            setMembers(json);
            let arr =[];
            json.map(m=>{
                m.availableCompetitions.map(a=>{
                    arr.push({competitionId:m.id, refereeId:a.refereeId})
                })
            })
            setMembersChecked(arr);
        });

        
    },[])

    useEffect(()=>{
        data&&data?.map(m=>m.nominations).length>0&&setNominations([].concat.apply([], data?.map(m=>m.nominations)));

    },[data])

    useEffect(()=>{
        if(editNominationData?.value != undefined &&editNominationData?.value != '' && !isModalNominationEditOpen){
            OpenNominationEditModal(true);
        }
 
    },[editNominationData])

    useEffect(()=>{
        if(editCompetitionData?.id != undefined &&editCompetitionData?.id != ''){
            editCompetitionData.exec();
        }
 
    },[editCompetitionData])

    useEffect(()=>{
        setNominationsView(nominations);
        let checkedArr = [];
        let valArr = [];
        nominations.map(m=>{
            m?.showNominations && m.showNominations.map(s=>{
                checkedArr.push({competitionId:m.competitionId, showId:`${s.showId}`});
                valArr.push({showId:s.showId,nominationId:m.id, nominationTitle:m.name,nominationValue:s.person })
            })
        });

        setShowsChecked(checkedArr)
        setShowNominationsValue(valArr)
    },[nominations,changeIndex])

    useEffect(()=>{
        !isModalNominationEditOpen && setEditNominationData({});
    },[isModalNominationEditOpen])

    useEffect(()=>{
        !isModalNominationOpen && setEditCompetitionData({});
    },[isModalNominationOpen])

    

    function editNomination(v,i){
        setEditNominationData({value:v, index:i});
    }

    function editNominationSubmit(v){
        if(v&&v!=''){
        fetch(`Nomination/Edit`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify(v)
            
           }).then(r => {
            if(!r.ok){
                return;
            }
            let newArr = nominations;
            newArr[newArr.indexOf(newArr.filter(f=> f.id == editNominationData.value.id)[0])] = {...editNominationData.value,name:v.name};

            setNominations(newArr);
            setEditNominationData({});
        });

        
            
        }
    }

    function deleteNomination(i){
        fetch(`Nomination/Delete?id=${i}`, {
            method: 'post',
            headers: {'Content-Type':'application/json'}
           }).then(res=>{
               if(!res?.ok){
                   return;
               }
               let newArr = nominations;
               let curArr = newArr.filter(f=> f.competitionId == editCompetitionData.id);
               newArr.splice(newArr.indexOf(curArr[i]),1);
               setNominations(newArr);
               setChangeIndex(changeIndex+1);

           });

    }

    function editCompetition(id, exec){
        setEditCompetitionData({id:id, exec:exec});

    }
    function addNominationToList(v){
        fetch(`Nomination/Create`, {
            method: 'post',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(v)
            
           }).then(r => {
               if(!r.ok){
                   return;
               }
               return r.json()
               
           }).then(json =>{
            setNominations([...nominations,{...v, id:json}]);
           });
    }
     async function addMembersSubmit(m){

     

          let results = await Promise.all( m.map(async member =>{

            
            return await fetch('Competition/AddReferee',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify(member)
                
               }).then(r=>r.ok);
              
            }))

            


            if(!results.some(s=>s == false)){
                let newArr = membersChecked;
            var curMembers = newArr.filter(f=> f.competitionId == editCompetitionData.id);
    
            curMembers.forEach(v => {
                newArr.splice(newArr.indexOf(v),1);
            })
            setMembersChecked([...newArr,...m])

            }
        
  
    }
    async function addCompetitionsShowSubmit(m){


        let results = await Promise.all( m.map(async a =>{

            return await fetch('Nomination/AddShow',{
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({showId: a.showId,nominationId: a.nominationId,person: a.nominationValue})
                
               }).then(r=>r.ok);
              
            }))

        if(!results.some(s=>s == false)){
            let newArr = showsChecked;
            var curShows = newArr.filter(f=> f.competitionId == editCompetitionData.id);
            
    
            curShows.forEach(v => {
                newArr.splice(newArr.indexOf(v),1);
            })
            let newChecked = m.checked.map(c => {return {showId:c, competitionId:editCompetitionData.id}})
            setShowsChecked([...newArr,...newChecked]);
    
    
            let newShowNomArr = showNominationsValue;
            var curShowsNom = newShowNomArr.filter(f=> f.competitionId == editCompetitionData.id);
            curShowsNom = curShowsNom.filter(f => m.checked.includes(f.showId));
    
            curShowsNom.forEach(v => {
                newShowNomArr.splice(newShowNomArr.indexOf(v),1);
            })
            setShowNominationsValue([...newShowNomArr,...m.showNominations])  
        }  
        
           
    }


    return(<div>
        <table>
            <thead>
                <tr>
                    {columns?.map((v,i)=><th key={`${v?.key}${i}`}>{v?.value||v}</th>)}
                    {setData && setData.length > 0 &&<th>Действия</th>}
                </tr>
            </thead>
            <tbody>
                {data?.map((v,i)=>{
                    return <tr>
                        
                        {columns?.map((v1,i1)=>{
                            
                            const propKey = v1?.key||v1;
                            const propVal = v[propKey];
                            let val = v[propKey];

                            if(propKey == 'members'){
                                return <td><a onClick={()=>editCompetition(v.id,()=>OpenMembersModal(true))}>Редактировать {membersChecked?.filter(f=>f?.competitionId == v.id)?.length}</a></td>
                            }
                            if(propKey == 'nominations'){
                                return <td><a onClick={()=>editCompetition(v?.id,()=>OpenNominationModal(true))}>Редактировать {nominations?.filter(f=>f?.competitionId == v.id)?.length}</a></td>
                            }
                            if(propKey == 'shows'){
                                return <td><a onClick={()=>editCompetition(v.id,()=>OpenShowCompetitionModal(true))}>Редактировать</a></td>
                            }
                            return <td>{val}</td>
                        })}
                        <td>
                            {setData?.map(d => <a onClick={()=>d.execute(v)}>{d.title}</a>)}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        {EditNominationsListModal({competitionId: editCompetitionData.id,isOpen:isModalNominationOpen,nominations:nominationsView && nominationsView.filter(f=>f?.competitionId == editCompetitionData.id),add:addNominationToList,edit:editNomination,delete:deleteNomination,cancel:()=>{OpenNominationModal(false)}})}
        {EditNominationModal({isOpen:isModalNominationEditOpen,preValue:editNominationData.value,cancel:()=>{OpenNominationEditModal(false)}, submit:editNominationSubmit})}
        {AddMembersModal({competitionId: editCompetitionData.id,isOpen:isModalMembersOpen, members:members,checked:membersChecked,cancel:()=>{OpenMembersModal(false)}, submit:addMembersSubmit})}
        
        {AddCompetitionsShowModal({shows:shows,checked:showsChecked,competitionId:editCompetitionData?.id, isOpen:isModalShowCompetitionOpen, cancel:()=>OpenShowCompetitionModal(false), submit:addCompetitionsShowSubmit,nominations:nominationsView, showNominationsValue:showNominationsValue, setShowNominationsValue:setShowNominationsValue})}
        
        </div>)
}