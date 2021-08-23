import React from "react";

export default function Table({ columns, data, setData }) {

    
    return(<div>
        <table className="admin-table">
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
                            let val = v[propKey];
                            
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