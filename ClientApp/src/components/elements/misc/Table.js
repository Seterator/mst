import React from "react";

export default function Table({ columns, data, setData }) {

    
    return(<div>
        <table>
            <thead>
                <tr>
                    {columns?.map((v,i)=><th key={`${v?.key}${i}`}>{v?.value||v}</th>)}
                    {setData && setData.length > 0 &&<th>Действия</th>}
                </tr>
            </thead>
            <tbody>
                {data?.map((v,i)=>{
                    return <tr>
                        {columns?.map((v1,i1)=>{
                            const propKey = v1?.key||v1;
                            const propVal = v[propKey];
                            let val = v[propKey];
                            if(Array.isArray(propVal)){
                                let cur = propVal[0];
                                let keys = Object.keys(cur);
                                val = Table({columns: keys,data:propVal});
                            }
                            else if(typeof propVal === 'object'){
                                let keys = Object.keys(propVal);
                                let vals = [];
                                vals.push(propVal);
                                val = Table({columns: keys,data:vals});
                            }
                            return <td>{val}</td>
                        })}
                        <td>
                            {setData?.map(d => <a onClick={()=>d.execute(v)}>{d.title}</a>)}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        </div>)
  }