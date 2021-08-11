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
        setCompetitionDataView({...competitionData,setData:[{ execute:(i)=>deleteCompetition(i),title:'Удалить'},
        { execute:(i)=>editCompetition(i),title:'Изменить'}]});

    },[competitionData,changeIndex]);

function deleteCompetition(i){
    if(window.confirm(`Удалить конкурс ${i.title}`)){
        fetch(`Competition/Delete`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: i.id
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

    let r = i;
    fetch(`Competition/Create`, {
        method: 'post',
        body:i
        
       }).then(r => {
           if(!r.ok){
               return;
           }
           const nextId = competitionData?.data?.length>0 ? Math.max(...competitionData?.data?.map(item => item.id)) +1: 1;
           let newItem = {...i,id:nextId};
           let newArr = [...competitionData.data,newItem];
           setCompetitionData({...competitionData,data:newArr});
       });

    
}
function competitionEdited(i){
    fetch(`Competition/Edit`, {
        method: 'post',
        body:{...i, id:competitionEditData.id}
        
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

    const testData = [{ id: 5,image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200', name: 'Лиса Лисичкова', email:'lisa@mail.ru', city:'г.Таганрог',bio:'пью виски, кушаю сосиски' },
{ id: 6,image:'https://avatars.mds.yandex.net/get-zen_doc/1219682/pub_5eaa7423102eee24419d5607_5eaa74d77e79087ec3668df9/scale_1200', name: 'Лиза Лисичкова', email:'lisa1@mail.ru', city:'г.Таганрог', bio:'пью колу, кушаю ролы' }
]
const showsTestData = [
    { id: 9, url: 'http://localhost:3000/admin', title:'Лучшая админка в мире', other:'Зайди посмотри как все удобно'},
    { id: 10, url: 'http://localhost:3000/work', title:'Хочешь бабала, иди работай', other:'читай выше'}
    ]
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
        let newArr = nominations;
        let curArr = newArr.filter(f=> f.competitionId == editCompetitionData.id);
        newArr.splice(newArr.indexOf(curArr[i]),1);
        setNominations(newArr);
        setChangeIndex(changeIndex+1);
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
               setNominations([...nominations,v]);
           });
    }
    function addMembersSubmit(m){
        let newArr = membersChecked;
        var curMembers = newArr.filter(f=> f.competitionId == editCompetitionData.id);

        curMembers.forEach(v => {
            newArr.splice(newArr.indexOf(v),1);
        })
        setMembersChecked([...newArr,...m])
    }
    function addCompetitionsShowSubmit(m){
        let newArr = showsChecked;
        var curShows = newArr.filter(f=> f.competitionId == editCompetitionData.id);
        

        curShows.forEach(v => {
            newArr.splice(newArr.indexOf(v),1);
        })
        setShowsChecked([...newArr,...m.checked]);


        let newShowNomArr = showNominationsValue;
        var curShowsNom = newShowNomArr.filter(f=> f.competitionId == editCompetitionData.id);
        curShowsNom = curShowsNom.filter(f => m.checked.map(c => c.showId).includes(f.showId));

        curShowsNom.forEach(v => {
            newShowNomArr.splice(newShowNomArr.indexOf(v),1);
        })
        setShowNominationsValue([...newShowNomArr,...m.showNominations])
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
                                return <td><a onClick={()=>editCompetition(v.id,()=>OpenMembersModal(true))}>Редактировать {membersChecked.filter(f=>f.competitionId == v.id).length}</a></td>
                            }
                            if(propKey == 'nominations'){
                                return <td><a onClick={()=>editCompetition(v.id,()=>OpenNominationModal(true))}>Редактировать {nominations.filter(f=>f.competitionId == v.id).length}</a></td>
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
        {EditNominationsListModal({competitionId: editCompetitionData.id,isOpen:isModalNominationOpen,nominations:nominationsView?.filter(f=>f.competitionId == editCompetitionData.id),add:addNominationToList,edit:editNomination,delete:deleteNomination,cancel:()=>{OpenNominationModal(false)}})}
        {EditNominationModal({isOpen:isModalNominationEditOpen,preValue:editNominationData.value,cancel:()=>{OpenNominationEditModal(false)}, submit:editNominationSubmit})}
        {AddMembersModal({competitionId: editCompetitionData.id,isOpen:isModalMembersOpen, members:members,checked:membersChecked,cancel:()=>{OpenMembersModal(false)}, submit:addMembersSubmit})}
        
        {AddCompetitionsShowModal({shows:shows,checked:showsChecked, isOpen:isModalShowCompetitionOpen, cancel:()=>OpenShowCompetitionModal(false),competitionId:editCompetitionData.id, submit:addCompetitionsShowSubmit,nominations:nominationsView, showNominationsValue:showNominationsValue, setShowNominationsValue:setShowNominationsValue})}
        
        </div>)
}