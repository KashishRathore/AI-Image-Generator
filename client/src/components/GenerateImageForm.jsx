import React, { useState } from 'react';
import styled from 'styled-components'
import Button from './buttons/button';
import TextInput from './Input/TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { GenerateAIImage, CreatePost } from '../api';
import { useNavigate } from "react-router-dom"

const Form = styled.div`
   flex: 1;
   padding: 16px 20px;
   display: flex;
   flex-direction: column;
   gap: 9%;
   justify-content: center;
`;

const Top = styled.div`
   display: flex;
   flex-direction: column;
   gap: 6px;
`;
const Title = styled.div`
   font-size: 28px;
   font-weight: 500;
   color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
   font-size: 17px;
   font-weight: 400;
   color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color: ${({ theme }) => theme.text_secondary}
`;
const Actions = styled.div`
    flex: 1;
    display: flex;
    gap: 8px; 
`;

const GenerateImageForm = ({
    post, setPost, createPostLoading, setCreatePostLoading, generateImageLoading, setGenerateImageLoading,
}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("")

    //Generating an Image
    const generateImageFun = async() => {
        setGenerateImageLoading(true);
        await GenerateAIImage({prompt: post.prompt}).then((res) => {
            setPost({...post, photo: `data:image/jpeg;base64,${res?.data?.photo}`})
            generateImageLoading(false);
        }).catch((error) => {
            setError(error?.response?.data?.message)
            setGenerateImageLoading(false);
        })
    }

    //Creating Post of Generated Image
    const createPostFun = async() => {
        setCreatePostLoading(true);
        await CreatePost(post)
            .then((res) => {
                setCreatePostLoading(false)
                navigate("/")
            }).catch((error) => {
                setError(error?.response?.data?.message)
                setGenerateImageLoading(false);
                navigate("/")
            })
    }
    return (
        <Form>
            <Top>
                <Title>Generate Image with Prompt</Title>
                <Desc>Write your prompt according to the image you want to generate!</Desc>
            </Top>
            <Body>
                <TextInput
                    label="Author"
                    placeholder="Enter your name..."
                    name="name"
                    value={post.name}
                    handelChange={(e) => setPost({ ...post, author: e.target.value })}
                />
                <TextInput label="Image Prompt"
                    placeholder="Write a detailed prompt about the image..."
                    name="name"
                    rows="8"
                    textArea
                    value={post.prompt}
                    handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
                />
                {error && <div style = {{color: "red"}}>{error}</div>}
                ** You can post the AI Generated Image to the Community **
            </Body>
            <Actions>
                <Button
                    text="Generate Image"
                    flex
                    leftIcon={<AutoAwesome />}
                    isLoading={generateImageLoading}
                    isDisabled={post.prompt === ""}
                    onClick={() => generateImageFun()}
                />
                <Button
                    text="Post Image"
                    flex type="secondary"
                    leftIcon={<CreateRounded />}
                    isLoading={createPostLoading}
                    isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
                    onClick={() => createPostFun()}
                />
            </Actions>
        </Form>
    )
}

export default GenerateImageForm