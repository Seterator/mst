import React, { useEffect, useState, useContext } from 'react';

import { VoteElement } from '../../elements/EstimationElements';
import { WarningMessage} from '../../elements/MessageElements';
import { UserContext } from '../../../LoginMiddleware';
import { EstimationBasePart } from '../../elements/EstimationElements';

export function EstimationBase(){
    const {user} = useContext(UserContext);
    const [data, setData] = useState([]);
    const [estimations, setEstimations] = useState([]);
    const [view, setView] = useState([]);

    const [filter, setFilter] = useState('');

    const [index, setIndex] = useState(0);

    return(<div className='container' style={{maxWidth:'1291px', paddingLeft: '46px'}}>
        <input className="search-input-image" placeholder="Поиск" onChange={(e)=>setFilter(e.target.value)} />
        {EstimationBasePart()}
        <div style={{display:'inline-block'}}>
        {WarningMessage('Функция окончательного завершения голосования будет доступна с 20 сентября 2021. В данный момент кнопка «Подтвердить и отправить» неактивна.', 'show-warn')}
        <button style={{width:'1230px', height:'55px', margin:'10px 0'}}>Подтвердить и отправить</button>
        </div>

        </div>)



}
