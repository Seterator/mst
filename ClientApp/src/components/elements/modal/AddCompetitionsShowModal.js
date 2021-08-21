import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import SetShowNominationModal from './SetShowNominationModal';


Modal.setAppElement('#root')

export default function AddCompetitionsShowModal(props) {

    const {isOpen, checked, shows, cancel, competitionId, submit, nominations, showNominationsValue} = props;

    const [filter, setFilter] = useState('');
    const [buttonDisable, setButtonDisable] = useState(false)
    const [tempChecked, setTempChecked] = useState([])

    const [editShowData, setEditShowData] = useState({});
    const [nominationsData, setNominationsData] = useState([]);


    const [isModalShowNominationOpen, OpenShowNominationModal] = useState(false);
    const [showNominationsModalData, setShowNominationsModalData] = useState([]);

    const [toSubmit, setToSubmit] = useState([]);

    useEffect(()=>{
        let nomIds = nominations.filter(f=>f?.competitionId == competitionId).map(m=>m.id);
        setTempChecked(checked.filter(f=>f.competitionId == competitionId).map(m=>m.showId));
        setToSubmit(showNominationsValue.filter(f=>nomIds.includes(f.nominationId)));
        setNominationsData(nominations.filter(f=>f?.competitionId == competitionId));
    },[checked, showNominationsValue, nominations, competitionId])

    useEffect(()=>{
        if(!isModalShowNominationOpen){
         setShowNominationsModalData([]);
        }

    },[isModalShowNominationOpen]);

    useEffect(()=>{

        showNominationsModalData?.length >0 && OpenShowNominationModal(true);
    },[showNominationsModalData])

    useEffect(()=>{
        
        if(editShowData && editShowData.id && !isModalShowNominationOpen){
            setShowNominationsModalData(toSubmit.filter(f=>f?.showId == editShowData.id)
            .map(m => {return{name:m?.nominationTitle, value:m?.nominationValue, id:m?.nominationId}}));
        }
    },[editShowData])

    const handleSubmit = () => {
            submit({checked:tempChecked, showNominations:toSubmit});
            setTempChecked([]);
            setToSubmit([]);
            setFilter('');
            cancel();
    }

    function onCancel(){
        setFilter('');
        cancel();
    }

    function handleEditNominations(e){
        let id = e.target.getAttribute('id');
        setEditShowData({id:id.slice(-1)});
    }

    function handleShowNominationsSubmit(v){
        let newArr = v.map(m=>{return {showId:editShowData.id,nominationId:m.id, nominationTitle:m.name,nominationValue:m.value }});

        let submitTemp = toSubmit;
        var curShowsNom = submitTemp?.filter(f=> f.showId == editShowData.id);
        

        curShowsNom.forEach(v => {
            submitTemp.splice(submitTemp.indexOf(v),1);
        })

        setToSubmit([...submitTemp,...newArr]);

    }

    function handleCheck(e){
        let val = e.target.checked;
        let id = Number.parseInt(e.target.getAttribute('id'));
        if(val){
            if(tempChecked.indexOf(id)<0){
                let el = document.getElementById(`show-nomination${id}`);
                el.classList.toggle('visibility-visible');
                el.classList.remove('visibility-hidden');

                setTempChecked([...tempChecked, id]);

                let newArr = nominationsData.map(m => {return {showId:id, nominationId:m?.id,nominationTitle:m?.name, nominationValue:'' }});
                setToSubmit([...toSubmit,...newArr]);
            }           
        }
        else{
            if(tempChecked.indexOf(id)>-1){

                let el = document.getElementById(`show-nomination${id}`);
                el.classList.remove('visibility-visible');
                el.classList.toggle('visibility-hidden');

                let newArr = tempChecked;
                newArr.splice(newArr.indexOf(id),1);
                setTempChecked(newArr);

                let tempToSubmit = toSubmit;
                let curShowsNom = tempToSubmit?.filter(f=> f.showId == id);
        

                curShowsNom.forEach(v => {
                    tempToSubmit.splice(tempToSubmit.indexOf(v),1);
                });

                setToSubmit(tempToSubmit);
            }
        }
        //setChangeIndex(changeIndex+1);
    }



    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            border: '5px solid black',
            backgroundColor: '#2B111B'
        }
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Example Modal"
                shouldCloseOnOverlayClick={false}
            >
                <div style={{display:'grid', padding:'20px', backgroundColor: '#2B111B', overflowX:'auto', maxHeight:'500px'}}> 
                <h2>Добавление спектаклей</h2>

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Название" value={filter} onChange={(e)=>setFilter(e.target.value)} />
                <table>
                    <thead>
                        <tr>
                        <th></th>
                            <th>Короткое описание</th>
                            <th>Название</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shows?.filter(f=>f.name?.toLowerCase()?.includes(filter?.toLowerCase())).map((m,i)=>{
                            return(<tr>
                                <td><input type='checkbox' defaultChecked={tempChecked.includes(m.id)} id={m.id} onChange={handleCheck}/></td>
                                <td>{m.shortDescription}</td>
                                <td>{m.name}</td>
                                <td><a id={`show-nomination${m.id}`} className={tempChecked.includes(m.id)?'visibility-visible':"visibility-hidden"} onClick={handleEditNominations}>Номинации</a></td>
                            </tr>)
                        })}

                    </tbody>
                </table>

                

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={onCancel}>Отмена</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={handleSubmit}>Ок</button>
                </div>
            </Modal>
            {SetShowNominationModal({isOpen:isModalShowNominationOpen, showNominations:showNominationsModalData, setShowNominations:handleShowNominationsSubmit, cancel:()=>OpenShowNominationModal(false), nominations:nominationsData})}
        </div>
    );

    
}