import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input, Button } from "./index.js";
import axios from "axios"
import {useSelector,useDispatch} from "react-redux"
import {setCards} from "../features/cardsSlice.js"

function Signup() {
const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    axios
    .get("http://localhost:4000/api/post/get-questions")
    .then( res => {
      // console.log(res.data);  
      dispatch(setCards(res.data));
    })
  }, [])

  const create = async()=>{}
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border border-black/10 bg-gray-100 rounded-xl p-4 w-7/12 max-w-md">
        <div className="w-full text-center mt-3">
          <h1 className="font-bold text-2xl">Create Account</h1>
          <p className="mt-2 text-center text-black/60 text-sm">
            Already have any account?&nbsp;
            <Link
              to="/login"
              className="font-medium text-primary transition-all duration-200 hover:underline hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
        <form className="mt-5 w-full" onSubmit={handleSubmit(create)} >
          <Input
            label="Full Name: "
            type="text"
            placeholder="enter your name"
            {...register("username", {
              required: true,
            })}
          />
          <Input
            label="Email: "
            type="email"
            placeholder="enter your email"
            {...register("email", {
              required: true,
            })}
          />
          <Input
            label="Password: "
            type="password"
            placeholder="enter your passowrd"
            {...register("password", {
              required: true,
            })}
          />
          {error && <p className="text-lg text-center text-red-500">{error}</p>}
          <div className="w-full flex justify-center mt-4">
            <Button type="submit">Create Account</Button>
          </div>
        </form>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default Signup;
