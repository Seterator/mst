import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import {WarningMessage} from './MessageElements'
import { UserContext } from '../../LoginMiddleware';

export function VoteElement(data,estimations, userId, f){

    return(
    <span style={{display:'block', width:'390px', margin:'15px 0', float:'left',
    borderImage: 'linear-gradient(to left, #770D37, #211452) 0 0 100% 0', paddingBottom:'20px'}}>
    <Link to={`/work/${data.id}`}  style={{display:'block'}}>
    <div height='247' width='390' style={{
        backgroundImage:`url(data:image/png;base64,${data.image})`
        , width:'390px', height:'247px', position:'relative', opacity:'0.7'}}>
            <div style={{position:'absolute', bottom:'10px', left:'0', right:'0', height:'30px', textAlign:'center'}}>
            <button className="vote-button" hidden={!data.options?.some(s => s == 'notVoting')}>Без голосования</button>
            <button className="vote-button" hidden={!data.options?.some(s => s == 'viewed')} >Просмотрено</button>
            <button className="vote-button" hidden={!data.options?.some(s => s == 'estimated')} >Оценено</button>
            </div>
        
    </div>
            
            </Link>
             <p style={{fontSize: "24px", lineHeight: '34px'}}>{data.name}</p>
            <p style={{fontSize: "16px", lineHeight: '26px'}}>{data.description}</p>
            <button style={{opacity:'0.5', background:'none'}} onClick={f}>Посмотреть список номинаций</button>
            {DropDownNomination(data.showNominations, data.dropDownVisible,estimations,userId)}
            </span> 
            )
}

function DropDownNomination(data, visible,estimations, userId){

    let d = visible ? 'block' : 'none';
    return(<a style={{display:`${d}`}}>
        {data?.map((v,i) => { 
            let estimation = estimations.filter(e=>e.nominationId == v.nominationId && e.showId == v.showId && e.refereeId == userId);
            let curScore = estimation.length>0 && estimation[0].score;
            if(!curScore) return '';
            return (<div style={{fontFamily: 'Optima Cyr',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: '14px',
lineHeight: '22px',
margin:'5px 0',
letterSpacing: '0.05em',

color: '#FFFFFF'}} key={i}>{v.nomination.name} ({curScore})</div>)})}
        </a>)
}

export function EstimationBlock(showId, nominations, score){

    const [choosenNomination, chooseNomination] = useState(-1);
    const [choosenPlace, choosePlace] = useState(-1);

    const [scoredData, setScoredData] = useState([]);

    const {user} = useContext(UserContext);

    useEffect(()=>{
        chooseNomination(-1);
        choosePlace(-1);
    },[showId])

    useEffect(()=>{
        setScoredData(score);
    },[score])

    function nominationClick(nomId){
        choosenNomination == nomId 
        ?chooseNomination(-1)
        :chooseNomination(nomId);
        choosePlace(-1)
    }

    function placeClick(placeId){
        if(choosenNomination ==-1){
            return;
        }

        choosenPlace == placeId 
        ?choosePlace(-1)
        :choosePlace(placeId);
    }

    function saveClick(){ //Оценка заблокирована
        if(choosenPlace ==-1 || choosenNomination ==-1){
            return;
        }
        fetch(`Show/Estimate`, {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body:JSON.stringify({score:choosenPlace, nominationId:choosenNomination, showId:showId, refereeId:user.id })
            
           }).then(r => {
            if(!r.ok){
                
                return;
            }
        
        let newData = scoredData;
        let alreadyScored = newData.filter(f=>f.score == choosenPlace);
        let index = alreadyScored.length>0 ? newData.indexOf(alreadyScored[0]) : -1;


        
        if(index>-1 && newData[index].nominationId !=choosenNomination && window.confirm(`Оценка ${choosenPlace} уже была поставлена. Заменить?`)){

            newData.splice(index,1);
            let anotherScore = newData.filter(f=>f.nominationId == choosenNomination);
            let j = anotherScore.length>0 ? newData.indexOf(anotherScore[0]) : -1;
            if(j == -1){
                setScoredData([...newData, {nominationId:choosenNomination, score:choosenPlace}]);
            } 
            else{
                newData[j].score =choosenPlace;
                setScoredData(newData);
            }
            

        }
        else{
            let anotherScore = newData.filter(f=>f.nominationId == choosenNomination);
            let j = anotherScore.length>0 ? newData.indexOf(anotherScore[0]) : -1;
            if(j == -1){
                setScoredData([...newData, {nominationId:choosenNomination, score:choosenPlace}]);
            } 
            else{
                newData[j].score =choosenPlace;
                setScoredData(newData);
            }
            
        }

        choosePlace(-1);
        chooseNomination(-1);
    })
    }

    return (<div><div>
        <p className="show-nomination-main-title">Выбор номинации для оценивания:</p>
        {WarningMessage('Внезапно, непосредственные участники технического прогресса в равной степени предоставлены сами себе. Значимость этих проблем настолько очевидна, что сложившаяся структура организации представляет собой интересный эксперимент проверки новых принципов формирования материально-технической и кадровой базы.','show-warn')}
        <div className="show-nomination-container">
        {nominations?.map((v,i)=>{
        let scored = scoredData.map(m=>m.nominationId).includes(v.nominationId);
        let score = scored && scoredData.filter(m=>m.nominationId == v.nominationId)[0].score;
        let classList = `${scored?'visible':'hidden'} ${scored?`score${score}`:''}`
        return(<div  className="show-nomination-panel"><div className="show-nomination" onClick={()=>nominationClick(v.nominationId)} style={{opacity:`${choosenNomination !== -1 && choosenNomination !== v.nominationId?'0.4':'1'}`, background:`${choosenNomination == v.nominationId?'radial-gradient(180.91% 1388.43% at 100% 7.27%, #770D37 0%, #211452 100%)':'#770D37'}`}} key={i}>
            <div className="show-nomination-title">{v.nomination.name}</div>
            <div className="show-nomination-name">{v.person}</div>
            </div><div className={`show-nomination-score ${classList}`}>{score}</div></div>)
        
        })}

            
        </div>
    </div>
    <div className="estimate-btn-container" style={{opacity:`${choosenNomination==-1?'0.4':'1'}`}}>
                <p style={{fontSize: '24px',lineHeight: '34px'}}>Оцените работу</p>
                <div>
                <button className="estimate-btn" onClick={()=>placeClick(1)} style={{background:'linear-gradient(138.95deg, #BBA151 -28.75%, #F4DE9D 60.24%, #E3C877 76.72%)', opacity:`${choosenPlace==2 || choosenPlace==3?'0.4':'1'}`}}>1</button>
                <button className="estimate-btn" onClick={()=>placeClick(2)} style={{background:'linear-gradient(138.95deg, #DCDCDC -28.75%, #B2B0AA 60.24%, #6F6E6B 76.72%)', opacity:`${choosenPlace==1 || choosenPlace==3?'0.4':'1'}`}}>2</button>
                <button className="estimate-btn" onClick={()=>placeClick(3)} style={{background:'linear-gradient(138.95deg, #FFFFFF -28.75%, #F3B378 45.77%, #DF8D2D 76.72%)', opacity:`${choosenPlace==2 || choosenPlace==1?'0.4':'1'}`}}>3</button>
                <button onClick={()=>{}} style={{float:'right',width: '168px',marginTop: '20px', height: '55px', background:`${choosenPlace==1?'linear-gradient(138.95deg, #BBA151 -28.75%, #F4DE9D 60.24%, #E3C877 76.72%)':choosenPlace==2?'linear-gradient(138.95deg, #DCDCDC -28.75%, #B2B0AA 60.24%, #6F6E6B 76.72%)':choosenPlace==3?'linear-gradient(138.95deg, #FFFFFF -28.75%, #F3B378 45.77%, #DF8D2D 76.72%)':'#111111'}` , borderRadius: '5px', opacity:`${choosenPlace==-1?'0.4':'1'}`}}>Сохранить</button>
                </div>
                
                </div>
                <p className="estimate-note">*Напоминаем, что данный раздел отвечает лишь за оценивание работы по конкретным номинациям, для того чтобы Ваши оценки были учтены Вам необходимо перейти в раздел История оценивания и подтвердить отправку результата на сервер.</p>
    </div>)
}

export function EstimationBasePart(id){
   
const [data, setData] = useState([]);
    const [view, setView] = useState([]);
    const [index, setIndex] = useState(0);
    const [estimations, setEstimations] = useState([]);
    const {user} = useContext(UserContext);

    useEffect(()=>{
        
        fetch('Show/GetAll').then(res=>res.json()).then(json => {
            setData(json.filter(f=>f.id != id));
            let estArr = [];
            json.map(m=>{

                m.estimations.map(e=>{
                    estArr.push({showId:e.showId, nominationId:e.nominationId, score:e.score, refereeId:e.refereeId});
                })
            })

            setEstimations(estArr);
        });

    },[id]);
    useEffect(()=>{
        const v = (
            <div   style={{width:'100%', display:'table'}}>
                <div style={{width:'33%', float:'left'}}>
    
                {data && data?.map((v,i) => i%3==0&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
                </div>
                <div style={{width:'33%', float:'left'}}>
                {data && data?.map((v,i) => i%3==1&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
                </div>
                <div style={{width:'33%', float:'left'}}>
                {data && data?.map((v,i) => i%3==2&&VoteElement(v,estimations, user.id,() => dropDownClick(i)))}
                </div>
                
            
            
            </div>);
        setView(v);
    },[data, index]);

    const dropDownClick = (i) =>{
        data[i].dropDownVisible = !data[i].dropDownVisible;
        setData(data);
        setIndex(index+1);
    }

    return(view)
}