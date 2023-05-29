import styled from "styled-components"

export default function Post({user, userPhoto, postInfo: {image, description}}){

    return(
        <MyPost>
            <div><img src={userPhoto} alt="user photo" /><span>{user}</span></div>
            <img src={image} alt="image" />
            <div><span>{description}</span></div>
        </MyPost>
    )
}

const MyPost=styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    margin-bottom: 30px;

    div:first-of-type{
        display: flex;
        align-items: center;
        height: 80px;

        img{
            height: 90%;
            width: auto;
            margin-right: 20px;
        }
        span{
            font-size: 20px;
        }
    }

    &>img{
        height: auto;
        width: auto;
    }

    div:last-of-type{
        height: 80px;
        padding: 20px;
        font-size: 16px;
    }
`;