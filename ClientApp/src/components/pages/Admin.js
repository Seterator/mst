import React, { Component, useEffect, useState } from 'react';
import { EstimationListView } from '../elements/admin/EstimationListView';
import { ProfileListView } from '../elements/admin/ProfileListView';
import { NominationListView } from '../elements/admin/NominationListView';

export function Admin(){
    const [activePage, setActivePage] = useState(1)


    return(<div style={{textAlign:'center'}}>
        <h2>Панель администратора</h2>
        <div style={{ display:'flex'}}>
        <div style={{ display:'block'}}>
            <a className='admin' onClick={()=>setActivePage(1)}>Пользователи</a>
            <a className='admin' onClick={()=>setActivePage(2)}>Конкурсанты</a>
            <a className='admin' onClick={()=>setActivePage(3)}>Номинации</a>
        </div>
        <div style={{ display:'table'}}>
        <div className='admin-content' style={{display:`${activePage == 1 ? 'block':'none'}`}}>
        {ProfileListView()}
        </div>
        <div className='admin-content' style={{display:`${activePage == 2 ? 'block':'none'}`}}>
            {EstimationListView()}
        </div>
        <div className='admin-content' style={{display:`${activePage == 3 ? 'block':'none'}`}}>
            {NominationListView()}
        </div>
        </div>
        </div>
    </div>)
}
