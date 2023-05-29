import styled from "styled-components"
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/auth.context.js";

export default function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const {userInfo, setUserInfo}=useContext(AuthContext);
    const navigate=useNavigate();


    function formSubmitHandler(e) {
        e.preventDefault();
        console.log("submit");
        axios.post(`${process.env.REACT_APP_API_URL}/login`, {email: form.email, password: form.password})
            .then(resp=>{
                console.log(resp);
                setUserInfo(resp.data);
                navigate("/me");
            })
            .catch(resp=>{
                console.log(resp);
            })
    }

    function formChangeHandler(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <MyMain>
            <h1>Foodbook</h1>
            <span>Login</span>

            <MyForm onSubmit={formSubmitHandler} >
                <input onChange={formChangeHandler} value={form.email} type="email" name="email" placeholder="email" required />
                <input onChange={formChangeHandler} value={form.password} type="password" name="password" placeholder="senha" minLength={3} maxLength={40} required />
                <button>Entrar</button>
            </MyForm>

            <Link to="/register" >Cadastrar-se</Link>
        </MyMain>
    )
}

const MyMain = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    padding: 50px 0 20px 0;

    h1{
        text-align: center;
        font-size: 80px;
        margin-bottom: 50px;
    }

    span{
        text-align: center;
        font-size: 40px;
    }

    a{
        margin-top: 10px;
        text-align: center;
        text-decoration: underline;
        cursor: pointer;
        font-size: 18px;
        color: black;
    }

    /* background-color: red; */
`;

const MyForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 10px 0;
    gap: 5px;

    input{
        margin: 10px 0;
        height: 40px;
        background: #f0f0f0;
        border: solid 1px #e8e8e8;
        border-radius: 9px;
        padding: 10px;
        font-size: 20px;
    }

    button{
        height: 50px;
        background: #f0f0f0;
        border: solid 1px #e8e8e8;
        border-radius: 9px;
        font-size: 20px;
        cursor: pointer;
    }
`;