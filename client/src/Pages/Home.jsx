import React, { useState, useEffect } from "react";
import { Button, Header, Footer } from "../components/index.js";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Card from "../components/Card.jsx";
import { Outlet } from "react-router-dom";

function Home() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const allData = useSelector((state) => state.posts);
  useEffect(() => {
    allData
      ? setData(allData)
      : axios
          .get("https://tufcards.onrender.com/api/post/get-questions")
          .then((res) => {
            console.log(res.data);
            setData(res.data);
            // dispatch(setCards(res.data));
          });
  }, []);

  const handleNext = () => {
    if (index + 1 > data.length) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };
  const handlePrev = () => {
    if (index - 1 < 0) {
      setIndex(data.length - 1);
    } else {
      setIndex(index - 1);
    }
  };
  console.log(data[index]);

  return (
    <div className="w-full h-screen bg-[#b39ddb] flex justify-center items-center flex-col relative">
      <Card data={data[index]} flip={false}/>
      <div className="w-[450px] flex justify-between px-4 mt-2">
        <Button onClick={handlePrev} className="w-[100px]" children="Prev" />
        <Button onClick={handleNext} className="w-[100px]" children="Next" />
      </div>
    </div>
  );
  
}

export default Home;
