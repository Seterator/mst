import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import {WarningMessage} from './MessageElements'
import { UserContext } from '../../LoginMiddleware';
import { ModalConfirmContext } from '../Layout'; 

export function VoteElement(data,estimations, userId,blockedShows,images, f){

    let arr = images.filter(f=>f.showId == data.id);
    let img = arr.length>0 && arr[0].image;
    return(
    <span style={{display:'block', width:'390px', margin:'15px 0', float:'left',
    borderImage: 'linear-gradient(to left, #770D37, #211452) 0 0 100% 0', paddingBottom:'20px'}}>
    <Link to={`/work/${data.id}`}  style={{display:'block'}}>
    <div height='247' width='390' style={{
        backgroundImage:`url(data:image/png;base64,${img})`
        , width:'390px', height:'247px', position:'relative', opacity:'0.7',backgroundSize: 'cover'}}>
            <div style={{position:'absolute', bottom:'10px', left:'0', right:'0', height:'30px', textAlign:'center'}}>
            <button className="vote-button" hidden={!blockedShows?.some(s => s.showId == data.id)}>Без голосования</button>
            <button className="vote-button" hidden={!data.options?.some(s => s == 'viewed')} >Просмотрено</button>
            <button className="vote-button" hidden={!data.options?.some(s => s == 'estimated')} >Оценено</button>
            </div>
        
    </div>
            
            </Link>
             <p style={{fontSize: "24px", lineHeight: '34px'}}>{data.name}</p>
            <p style={{fontSize: "16px", lineHeight: '26px'}}>{data.shortDescription}</p>
            <button style={{opacity:'0.5', background:'none'}} onClick={f}>Посмотреть список номинаций</button>
            {DropDownNomination(data.showNominations.map(n=>n.nomination), data.dropDownVisible,estimations,userId, data.id)}
            </span> 
            )
}

function DropDownNomination(nominations, visible,estimations, userId, showId){

    let d = visible ? 'block' : 'none';
    return(<a style={{display:`${d}`}}>
        {nominations?.map((v,i) => { 
            let estimation = estimations.filter(e=>e.nominationId == v.id && e.showId == showId && e.refereeId == userId);
            let curScore = (estimation.length>0 && estimation[0].score) || 0;
            
            return (<div style={{fontFamily: 'Optima Cyr',
fontStyle: 'normal',
fontWeight: 'normal',
fontSize: '14px',
lineHeight: '22px',
margin:'5px 0',
letterSpacing: '0.05em',

color: '#FFFFFF'}} key={i}>{v.name} ({curScore})</div>)})}
        </a>)
}

export function EstimationBlock(showId, showNominations, score, isBlocked){

    const [choosenNomination, chooseNomination] = useState(-1);
    const [choosenPlace, choosePlace] = useState(-1);

    const [scoredData, setScoredData] = useState([]);
    const [scoredDataView, setScoredDataView] = useState([]);


    const {user} = useContext(UserContext);
    const { setModalOpen, setConfirmModal } = useContext(ModalConfirmContext);

    useEffect(()=>{
        chooseNomination(-1);
        choosePlace(-1);
    },[showId])

    useEffect(()=>{
        setScoredData(score);
    },[score])

    useEffect(()=>{     
        setScoredDataView(scoredData);

    },[scoredData])


    async function confirm(showId){
        
        let res = await fetch(`Show/GetById?id=${showId}`);
        let json = await res.json();

        return new Promise((resolve,reject)=>{
            setConfirmModal({
                title: "Предупреждение!",
                content: (<div><div className="modal-warn">Выбранное вами место в данной номинации
                занимает уже работа:</div><div className="modal-text">{json?.name}</div></div>),
                saveTitle: "Изменить на выбранную",
                cancelTitle: "Не изменять",
                save: () => {
                    setModalOpen(false);
                    resolve(true);
                },
                cancel:()=>{
                    setModalOpen(false);
                    resolve(false);
                }
            });
        })
        
    }
    

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

    async function saveClick(){ 
        if(choosenPlace ==-1 || choosenNomination ==-1){
            return;
        }
        
        let anotherShowScored = showNominations.filter(f=>f.nominationId == choosenNomination)[0].nomination.estimations
                            .filter(f=>f.score == choosenPlace && f.nominationId == choosenNomination);
        let toDelete = anotherShowScored.length > 0;

        let newData = scoredData;

        if(toDelete && await confirm(anotherShowScored[0].showId)||!toDelete){
            
            fetch(`Show/Estimate`, {
                method: 'post',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({score:choosenPlace, nominationId:choosenNomination, showId:showId, refereeId:user.id })
                
               }).then(r => {
                if(!r.ok){
                    choosePlace(-1);
                    chooseNomination(-1);
                    return;
                }

                let anotherScore = newData.filter(f=>f.nominationId == choosenNomination);
                let j = anotherScore.length>0 ? newData.indexOf(anotherScore[0]) : -1;
                if(j == -1){
                    setScoredData([...newData, {nominationId:choosenNomination, score:choosenPlace}]);
                } 
                else{
                    newData[j].score =choosenPlace;
                    setScoredData(newData);
                }

                choosePlace(-1);
                chooseNomination(-1);
      
            })
        }
    }

    return (<div className={isBlocked&&'disabled'}><div>
        <p className="show-nomination-main-title">Выбор номинации для оценивания:</p>
        {WarningMessage(`Для оценки выберете номинацию, затем - место, которого по Вашему мнению заслуживает спектакль в этой номинации и нажмите 'Сохранить'. Вы можете поставить не более 3 оценок в каждой номинации.`,'show-warn')}
        <div className="show-nomination-container">
        {showNominations?.map((v,i)=>{
            if(v.person ===''){
                return;
            }
        let scored = scoredDataView.map(m=>m.nominationId).includes(v.nominationId);
        let score = scored && scoredDataView.filter(m=>m.nominationId == v.nominationId)[0].score;
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
                <button onClick={()=>saveClick()} style={{float:'right',width: '168px',marginTop: '20px', height: '55px', background:`${choosenPlace==1?'linear-gradient(138.95deg, #BBA151 -28.75%, #F4DE9D 60.24%, #E3C877 76.72%)':choosenPlace==2?'linear-gradient(138.95deg, #DCDCDC -28.75%, #B2B0AA 60.24%, #6F6E6B 76.72%)':choosenPlace==3?'linear-gradient(138.95deg, #FFFFFF -28.75%, #F3B378 45.77%, #DF8D2D 76.72%)':'#111111'}` , borderRadius: '5px', opacity:`${choosenPlace==-1?'0.4':'1'}`}}>Сохранить</button>
                </div>
                
                </div>
                <p className="estimate-note">*Напоминаем, что данный раздел отвечает за оценивание работы по конкретным номинациям, и все проставленные оценки учитываются автоматически.</p>
    </div>)
}

export function EstimationBasePart(id, filter){
   
const [data, setData] = useState([]);
    const [view, setView] = useState([]);
    const [index,setIndex] = useState(0);
    const [estimations, setEstimations] = useState([]);
    const [blockedShows, setBlockedShows] = useState([]);

    const [images, setImages] = useState([])
    const {user} = useContext(UserContext);

    useEffect(()=>{
        const ff = async()=>{

            if(user?.id>0){
    
                let query = ['Show/GetAll?onlyShow=false', `User/AvailableCompetitions?refereeId=${user.id}`]
                let results = await Promise.all( query.map(async q =>{
    
                    return await fetch(q).then(r=>r.ok&&r.json());
                  
                }))
       
    
                let json = results[0];
                let availableCompetitions = results[1];
    
                let blocked = [];

                let arr =[];
                json.map(f=>{
                    f.showNominations.map(s=>{
                        if(availableCompetitions.map(a=>a?.competitionId).includes(s.nomination?.competitionId)){
                        arr.push(f.id) 
                        }
                    })
                    f.blockedReferees.filter(f=>f.refereeId == user?.id).map(b=>blocked.push(b));
                })
      
                setBlockedShows(blocked);
                let sourceData = json.filter(f=>arr.includes(f.id));

                if(id){
                    sourceData = sourceData.filter(f=>f.id != id)
                }
    
                
                setData(sourceData);
    
                let estArr = [];
                sourceData.map(m=>{
    
                    m.estimations.map(e=>{
                        estArr.push({showId:e.showId, nominationId:e.nominationId, score:e.score, refereeId:e.refereeId});
                    })
                })
    
                setEstimations(estArr);
                let arrImg =[];
                let results1 = await Promise.all(sourceData.map(async m =>{
                    let res = await fetch(`Show/GetImage?showId=${m.id}`);
                    let json = await res.json();
                    arrImg.push({showId:m.id, image:json});
                    
                }))
                setImages(arrImg);
    
            }
        }

        ff();

    },[id, user]);


    useEffect(()=>{
        const v = (
            <div   style={{width:'100%', display:'table'}}>
                <div style={{width:'33%', float:'left'}}>
    
                {data && data?.map((v,i) => i%3==0&&VoteElement(v,estimations, user.id, blockedShows, images,() => dropDownClick(i)))}
                </div>
                <div style={{width:'33%', float:'left'}}>
                {data && data?.map((v,i) => i%3==1&&VoteElement(v,estimations, user.id,blockedShows, images,() => dropDownClick(i)))}
                </div>
                <div style={{width:'33%', float:'left'}}>
                {data && data?.map((v,i) => i%3==2&&VoteElement(v,estimations, user.id,blockedShows, images,() => dropDownClick(i)))}
                </div>
                
            
            
            </div>);
        setView(v);
    },[data, index,images]);

    const dropDownClick = (i) =>{
        data[i].dropDownVisible = !data[i].dropDownVisible;
        setData(data);
        setIndex(index+1);
    }

    return(view)
}
