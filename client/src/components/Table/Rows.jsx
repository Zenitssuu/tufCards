import React,{useState} from "react";
import axios from "axios";

function Rows({item}) {
    const [isEditable, setIsEditable] = useState(false);
    const [question, setQuestion] = useState(item.question);
    const [answer, setAnswer] = useState(item.answer);
    const Edit = async () => {
      await axios.post(`http://localhost:4000/api/post/edit-question/${item.id}`, {question, answer}).then((res) => {
        console.log(res);      
      });
      setIsEditable(false);
    };
  return (
    <tr key={item.id} className="bg-white border-b hover:bg-gray-50">
      <td className="px-6 py-4">{item.id}</td>
      <td className="px-6 py-4">
        <input type="text" 
   
        readOnly={!isEditable}
        onChange={e => setQuestion(e.target.value)}
        defaultValue={question} 
        />
      </td>
      <td className="px-6 py-4">
        <input type="text" 
       
        readOnly={!isEditable} 
        onChange={e => setAnswer(e.target.value)}
        defaultValue={answer} 
        />
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => {
            if (isEditable) {
              Edit();
              setIsEditable(false);
            } else {
              setIsEditable(true);
            }
          }}
          className="font-medium text-blue-600 hover:underline"
        >
         {isEditable ? "Save" : "Edit"}
        </button>
      </td>
      <td className="px-6 py-4">
        <button className="font-medium text-red-600 hover:underline">
          Delete
        </button>
      </td>
    </tr>
  );
}

export default Rows;
