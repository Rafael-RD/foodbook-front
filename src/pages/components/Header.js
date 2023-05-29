import { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../../context/auth.context.js";

export default function Header(){
    const {userInfo: {username, photo}}=useContext(AuthContext);

    return(
        <MyHeader>
            <span>Foodbook</span>
            <button>logout</button>
            <div>
                <span>{`Ola, ${username}`}</span>
                <img src={photo} alt="photo" />
            </div>
        </MyHeader>
    )
}

const MyHeader=styled.header`
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    background: white;
    justify-content: space-between;
    padding: 0 10px;
    margin-bottom: 20px;
    border-bottom: solid 1px black;
    position: sticky;
    left: 0;
    top: 0;

    span{
        font-size: 30px;
    }

    button{
        background: #f0f0f0;
        border: solid 1px #e8e8e8;
        border-radius: 9px;
        padding: 5px 10px;
        font-size: 20px;
        cursor: pointer;
    }

    div{
        display: flex;
        align-items: center;
        justify-content: space-between;

        span{
            margin-right: 15px;
            font-size: 20px;
        }
    
        img{
            height: 40px;
            width: 40px;
            background-color: #000000;
            border-radius: 100%;
        }
    }


`;