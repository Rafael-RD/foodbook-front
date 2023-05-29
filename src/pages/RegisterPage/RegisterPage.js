import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"

export default function RegisterPage(){
    const [form, setForm] = useState({ username: "", email: "", photo: "", bio: "", password: "", confirmPassword: "" });
    const navigate=useNavigate();

    function formSubmitHandler(e) {
        e.preventDefault();
        if(!form.username.match(new RegExp('^[a-z][a-z\d\_]+[a-z\d]$','i'))) alert("username deve conter apenas numeros, letras e underline\ne não deve começar nem terminar com underline");
        if(form.password===form.confirmPassword){
            axios.post(`${process.env.REACT_APP_API_URL}/register`, {username: form.username, email: form.email, photo: form.photo, bio: form.bio, password: form.password})
                .then(resp=>{
                    navigate("/");
                })
                .catch(resp=>{
                    console.log(resp);
                    if(resp.response.status===409){
                        alert(resp.response.data);
                    } else alert("erro "+resp.response.status);
                })
        }else {
            alert("Senhas devem ser iguais!");
            setForm({...form, password: "", confirmPassword: ""});
        }
    }

    function formChangeHandler(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    return (
        <MyMain>
            <h1>Foodbook</h1>
            <span>Cadastro</span>

            <MyForm onSubmit={formSubmitHandler} >
                <input onChange={formChangeHandler} value={form.username} type="text" name="username" placeholder="username" minLength={3} maxLength={40} required />
                <input onChange={formChangeHandler} value={form.email} type="email" name="email" placeholder="email" required />
                <input onChange={formChangeHandler} value={form.photo} type="url" name="photo" placeholder="imagem" maxLength={300} required />
                <input onChange={formChangeHandler} value={form.bio} type="text" name="bio" placeholder="bio" maxLength={200} />
                <input onChange={formChangeHandler} value={form.password} type="password" name="password" placeholder="senha" minLength={3} maxLength={40} required />
                <input onChange={formChangeHandler} value={form.confirmPassword} type="password" name="confirmPassword" placeholder="comfirme a senha" minLength={3} maxLength={40} required />
                <button>Cadastrar</button>
            </MyForm>

            <Link to="/" >Entrar</Link>
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