import React,{useState} from 'react'
import ReactCardFlip from "react-card-flip"
function Card({data,flip}) {
    const [isFlipped, setIsFlipped] = useState(flip);

    function handleClick(e) {
        e.preventDefault();     
        setIsFlipped(prevState => !prevState);
    }
    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
          <div className="min-h-[250px] min-w-[450px] max-w-[550px] bg-[#e53935] text-white text-xl  flex flex-col items-center px-4 justify-center rounded-lg shadow-lg relative ">
            {data?.question}
            <button 
            className="absolute bottom-0 right-0 p-2 font-semibold"
            onClick={handleClick}>Answer<span className="font-bold text-lg ">&rarr;</span></button>
          </div>
  
          <div className="min-h-[250px] min-w-[450px] max-w-[550px] bg-white flex flex-col items-center px-4 justify-center rounded-lg shadow-lg relative">
            {data?.answer}
            <button 
            className="absolute bottom-0 right-0 p-2 font-semibold"
            onClick={handleClick}>Question<span className="font-bold text-lg ">&rarr;</span></button>
          </div>
        </ReactCardFlip>
      );
}

export default Card
