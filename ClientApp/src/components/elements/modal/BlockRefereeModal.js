import React, { useEffect, useState } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root')

export default function BlockRefereeModal(props) {

    const [membersData, setMembersData] = useState([])
    const [tempChecked, setTempChecked] = useState([])
    const [filter, setFilter] = useState('');
    const {members, checked, isOpen, cancel, showId, submit} = props;

    const [buttonDisable, setButtonDisable] = useState(false)
    useEffect(()=>{
        setTempChecked(checked.filter(f=>f?.showId == showId).map(m => m?.refereeId));
        setMembersData(members);
    },[checked,members,showId])

    function handleCheck(e){
        let val = e.target.checked;
        let id = Number.parseInt(e.target.getAttribute('id'));
        if(val){
            if(tempChecked.indexOf(id)<0){
                setTempChecked([...tempChecked, id]);
            }           
        }
        else{
            if(tempChecked.indexOf(id)>-1){
                let newArr = tempChecked;
                newArr.splice(newArr.indexOf(id),1);
                setTempChecked(newArr);
            }
        }
        //setChangeIndex(changeIndex+1);
    }
    const handleSubmit = () => {
            submit(tempChecked.map(m=>{return {showId:showId,refereeId:m}}));
            setFilter('');
            cancel();
    }

    function onCancel(){
        setFilter('');
        cancel();
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
                <h2>???????????????????? ????????????????????????</h2>

                <input style={{margin:'10px 0', height:'55px'}} type="text" placeholder="??????" value={filter} onChange={(e)=>setFilter(e.target.value)} />
                <table>
                    <thead>
                        <tr>
                        <th></th>
                            <th>Email</th>
                            <th>??????</th>
                        </tr>
                    </thead>
                    <tbody>
                        {membersData?.filter(f=>f.fullName?.toLowerCase()?.includes(filter?.toLowerCase()) || f.email?.toLowerCase()?.includes(filter?.toLowerCase())).map((m,i)=>{
                            return(<tr>
                                <td><input type='checkbox' defaultChecked={tempChecked.includes(m.id)} id={m.id} onChange={handleCheck}/></td>
                                <td>{m.email}</td>
                                <td>{m.fullName}</td>
                            </tr>)
                        })}

                    </tbody>
                </table>

                

                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={onCancel}>????????????</button>
                <button style={{margin:'10px 0', height:'55px'}} disabled={buttonDisable} onClick={handleSubmit}>????</button>
                </div>
            </Modal>
        </div>
    );
}