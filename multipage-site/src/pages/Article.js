import React, { useEffect } from 'react'
import { useParams,useHistory } from 'react-router-dom'
import {useFetch} from '../hooks/useFetch'
export default function Article() {
   // const params=useParams(); this is a long winded way to write the below. NOTE: u need to say params.id for this one
    const {id}=useParams();
    const url = 'http://localhost:3000/articles/'+id;
    const{data:article,isPending,error}=useFetch(url);
    const history=useHistory();
    useEffect(()=>{
        if(error){//check if theres an error or if its first load
            //redirect
      
            setTimeout(()=>{
                history.push('/');// redirect to home
            },2000)
        }
    },[error])
  return (
    <div>
        {isPending&&<div>Loading</div>}
        {error&&<div>{error}</div>}
        {article&&<div>
            <h2>{article.title}</h2>
            <p>By {article.author}</p>
            <p>{article.body}</p>
            </div>}
    </div>
  )
}
