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
        {WarningMessage('На данный момент доступен только просмотр работ без возможности оценивания. Совсем скоро Вы сможете оценить доступные работы по шкале от первого до третьего места.', 'show-warn')}
        {/* изменён текст предупреждения */}
        <button style={{width:'1230px', height:'55px', margin:'10px 0'}}>Подтвердить и отправить</button>
        </div>

        </div>)



}