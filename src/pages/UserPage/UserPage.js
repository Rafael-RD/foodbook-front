import styled from "styled-components"
import Header from "../components/Header.js"
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/auth.context.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Post from "./components/Post.js";

export default function UserPage() {
    const { userInfo: {token, username, photo } } = useContext(AuthContext);
    const [profile, setProfile]=useState({});
    const navigate=useNavigate();

    useEffect(()=>{
        if(!token) navigate("/");
        axios.get(`${process.env.REACT_APP_API_URL}/${username}`, {headers:{Authorization: `Bearer ${token}`}})
            .then(resp=>{
                console.log(resp);
                setProfile(resp.data);
            })
            .catch(resp=>{
                console.error(resp);
            })
    },[])

    return (
        <>
            <Header />
            <CreatePostButton>+</CreatePostButton>
            <MyMain>
                <UserCard>
                    <img src={profile.photo} alt="photo" />
                    <div>
                        <h2>{profile.username}</h2>
                        <span>{profile.bio}</span>
                        <div>
                            <button>seguidores</button>
                            <button>seguidos</button>
                        </div>
                    </div>
                </UserCard>
                <UserPosts>
                    {profile.posts?.map(e=><Post user={profile.username} userPhoto={profile.photo} postInfo={e} />)}
                </UserPosts>
            </MyMain>
        </>
    )
}

const MyMain = styled.main`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1000px;
    align-items: center;
`;

const UserCard = styled.div`
    display: flex;
    width: 100%;
    height: 200px;
    border: 1px solid black;
    align-items: center;
    padding: 20px;
    margin-bottom: 40px;

    img{
        height: 90%;
        width: auto;
        margin-right: 50px;
    }

    &>div{
        display: flex;
        flex-direction: column;
        height: 90%;
        justify-content: space-between;

        h2{
            font-size: 20px;
            font-weight: 700;
        }

        span{
            font-size: 18px;
        }

        div{
            display: flex;
            gap: 20px;

            button{
                background: #f0f0f0;
                border: solid 1px #e8e8e8;
                border-radius: 9px;
                padding: 5px 10px;
                font-size: 14px;
                cursor: pointer;
            }
        }
    }
`;

const UserPosts=styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
`;

const CreatePostButton=styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    height: 50px;
    width: 50px;
    border-radius: 100%;
    background: #f0f0f0;
    border: solid 1px red;
    font-size: 40px;
    bottom: 50px;
    right: 50px;
    cursor: pointer;
`;