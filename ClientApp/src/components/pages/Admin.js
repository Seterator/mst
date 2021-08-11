import React, { Component, useEffect, useState } from 'react';
import { ShowListView } from '../elements/admin/ShowListView';
import { ProfileListView } from '../elements/admin/ProfileListView';
import { CompetitionListView } from '../elements/admin/CompetitionListView';
import Container from 'reactstrap/lib/Container';

export function Admin(){
    const [activePage, setActivePage] = useState(1)


    return(<Container style={{textAlign:'center'}}>
        <h2>Панель администратора</h2>
        <div style={{ display:'flex'}}>
        <div style={{ display:'block'}}>
            <a className='admin' onClick={()=>setActivePage(1)}>Пользователи</a>
            <a className='admin' onClick={()=>setActivePage(2)}>Спектакли</a>
            <a className='admin' onClick={()=>setActivePage(3)}>Конкурсы</a>
        </div>
        <div style={{ display:'table'}}>
        <div className='admin-content' style={{display:`${activePage == 1 ? 'block':'none'}`}}>
        {ProfileListView()}
        </div>
        <div className='admin-content' style={{display:`${activePage == 2 ? 'block':'none'}`}}>
            {ShowListView()}
        </div>
        <div className='admin-content' style={{display:`${activePage == 3 ? 'block':'none'}`}}>
            {CompetitionListView()}
        </div>
        </div>
        </div>
    </Container>)
}
