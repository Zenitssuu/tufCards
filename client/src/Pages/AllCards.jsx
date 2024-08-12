import React,{useState,useEffect} from 'react'
import {Table} from "../components/index.js"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import {setCards} from "../features/cardsSlice.js"

function AllCards() {
    const dispatch = useDispatch();
    const [data, setData] = useState([])
    const allData = useSelector(state => state.posts);
    useEffect(() => {
        allData ? setData(allData) : axios.get('https://tufcards.onrender.com/api/post/get-questions').then(res => {
            setData(res.data);
            dispatch(setCards(res.data));
        })
    }, [])
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <Table data={data}/>
        </div>
    )
}

export default AllCards
