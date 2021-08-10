import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'
import SetShowNominationModal from './SetShowNominationModal';


Modal.setAppElement('#root')

export default function AddCompetitionsShowModal(props) {

    const {isOpen, checked, shows, cancel, submit, nominations, showNominationsValue} = props;

    const [filter, setFilter] = useState('');
    const [buttonDisable, setButtonDisable] = useState(false)
    const [tempChecked, setTempChecked] = useState([])

    const [editShowData, setEditShowData] = useState({});
    const [nominationsData, setNominationsData] = useState({});


    const [isModalShowNominationOpen, OpenShowNominationModal] = useState(false);
    const [showNominationsModalData, setShowNominationsModalData] = useState([]);

    const [toSubmit, setToSubmit] = useState([]);

    useEffect(()=>{
        setTempChecked(checked);
        setToSubmit(showNominationsValue);
        setNominationsData(nominations);
    },[checked, showNominationsValue, nominations])

    useEffect(()=>{
        let newArr = showNominationsModalData.map(m=>{return {showId:editShowData.id, nominationTitle:m.title,nominationValue:m.value }});

        let submitTemp = toSubmit;
        var curShowsNom = submitTemp?.filter(f=> f.showId == editShowData.id);
        

        curShowsNom.forEach(v => {
            submitTemp.splice(submitTemp.indexOf(v),1);
        })

        setToSubmit([...submitTemp,...newArr]);

    },[showNominationsModalData]);

    useEffect(()=>{
        
        if(editShowData && editShowData.id && !isModalShowNominationOpen){
            setShowNominationsModalData(toSubmit.filter(f=>f?.showId == editShowData.id)
            .map(m => {return{title:m?.nominationTitle, value:m?.nominationValue}}));
            OpenShowNominationModal(true);
        }
    },[editShowData])

    const handleSubmit = () => {
        setButtonDisable(true);
        //Post('api/Main/InsertUser', { Title: inputTitle, Login: inputLogin, Pass: inputPass, Name: inputName, LastName: inputLastName, Email: inputEmail })
        //    .then(res => {
        //        if (res.ok)
        //            props.cancel();
        //        else
        //            alert("error InsertUser");

        //        setButtonDisable(false);
        //    })
            setButtonDisable(false)
            submit({checked:tempChecked, showNominations:toSubmit});
            setFilter('');
            cancel();
    }

    function onCancel(){
        setFilter('');
        cancel();
    }

    function handleEditNominations(e){
        let id = e.target.getAttribute('id');
        setEditShowData({id:id});
    }

    function handleShowNominationsSubmit(v){
        let newArr = v.map(m=>{return {showId:editShowData.id, nominationTitle:m.title,nominationValue:m.value }});

        let submitTemp = toSubmit;
        var curShowsNom = submitTemp?.filter(f=> f.showId == editShowData.id);
        

        curShowsNom.forEach(v => {
            submitTemp.splice(submitTemp.indexOf(v),1);
        })

        setToSubmit([...submitTemp,...newArr]);

    }

    function handleCheck(e){
        let val = e.target.checked;
        let id = e.target.getAttribute('id');
        if(val){
            if(tempChecked.indexOf(id)<0){
                setTempChecked([...tempChecked, id]);

                let newArr = nominationsData.map(m => {return {showId:id,nominationTitle:m.value, nominationValue:'' }});
                setToSubmit([...toSubmit,...newArr]);
            }           
        }
        else{
            if(tempChecked.indexOf(id)>-1){
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
                <div style={{display:'grid', padding:'20px', backgroundColor: '#2B111B'}}> 
                <h2>Добавление спектаклей</h2>

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="Название" value={filter} onChange={(e)=>setFilter(e.target.value)} />
                <table>
                    <thead>
                        <tr>
                        <th></th>
                            <th>Email</th>
                            <th>ФИО</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shows?.filter(f=>f.title.toLowerCase().includes(filter.toLowerCase())).map((m,i)=>{
                            return(<tr>
                                <td><input type='checkbox' defaultChecked={tempChecked.includes(`${m.id}`)} id={m.id} onChange={handleCheck}/></td>
                                <td>{m.other}</td>
                                <td>{m.title}</td>
                                <td><a id={m.id} style={{display:`${tempChecked.includes(`${m.id}`)?'block':'none'}`}} onClick={handleEditNominations}>Номинации</a></td>
                            </tr>)
                        })}

                    </tbody>
                </table>

                

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={onCancel}>Отмена</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={handleSubmit}>Ок</button>
                </div>
            </Modal>
            {SetShowNominationModal({isOpen:isModalShowNominationOpen, showNominations:showNominationsModalData, setShowNominations:handleShowNominationsSubmit, cancel:()=>OpenShowNominationModal(false)})}
        </div>
    );

    
}