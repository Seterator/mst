import React, { Component, useEffect, useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { ShowListView } from '../elements/admin/ShowListView';
import { ProfileListView } from '../elements/admin/ProfileListView';
import { SnVoteListView } from '../elements/admin/SnVoteListView';
import { CompetitionListView } from '../elements/admin/CompetitionListView';
import Container from 'reactstrap/lib/Container';
import { UserContext } from '../../LoginMiddleware'
import ScorePanel from '../elements/admin/ScorePanel';

export function Admin(){
    const [activePage, setActivePage] = useState(1)
    const h = useHistory();
    const {user} = useContext(UserContext);
    useEffect(()=>{
        if(user.id != -2){
            h.push('/');
        }

    },[])


    return(<Container style={{textAlign:'center'}}>
        <h2>Панель администратора</h2>
        <div style={{ display:'flex'}}>
        <div style={{ display:'block'}}>
            <a className='admin' onClick={()=>setActivePage(1)}>Пользователи</a>
            <a className='admin' onClick={()=>setActivePage(2)}>Спектакли</a>
            <a className='admin' onClick={()=>setActivePage(3)}>Конкурсы</a>
            <a className='admin' onClick={()=>setActivePage(4)}>Оценки</a>
            <a className='admin' onClick={()=>setActivePage(5)}>Зрительское голосование</a>
        </div>
        <div style={{ display:'table'}}>
        <div className='admin-content' style={{display:`${activePage == 1 ? 'table':'none'}`}}>
        {ProfileListView()}
        </div>
        <div className='admin-content' style={{display:`${activePage == 2 ? 'table':'none'}`}}>
            {ShowListView()}
        </div>
        <div className='admin-content' style={{display:`${activePage == 3 ? 'table':'none'}`}}>
            {CompetitionListView()}
        </div>
        <div className='admin-content' style={{display:`${activePage == 4 ? 'table':'none'}`}}>
            {ScorePanel()}
        </div>
        <div className='admin-content' style={{display:`${activePage == 5 ? 'table':'none'}`}}>
            {SnVoteListView()}
        </div>
        </div>
        </div>
    </Container>)
}
