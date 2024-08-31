import React from 'react';
import styled from 'styled-components';
import Button from './button';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';

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
    color : ${({theme}) => theme.text_primary};
`;
const Desc = styled.div`
    font-size: 17px;
    font-weight: 400;
    color : ${({theme}) => theme.text_secondary};
`;
const Body = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 12px;
    font-weight: 400;
    color : ${({theme}) => theme.text_secondary};
`;
const Actions = styled.div`
    flex: 1;
    display: flex;
    gap: 8px;
`;

export default function GenerateImageForm(
    {
        post,
        setPost,
        createPostLoading,
        setCreatePostLoading,
        generateImageLoading,
        setGenerateImageLoading,
    }
) {
    const generateImageFun = ()=>{
        setGenerateImageLoading(true);
    };
    const createPostFun = ()=>{
        setCreatePostLoading(true);
    };
  return (
    <Form>
        <Top>
            <Title>Generate image from Prompt</Title>
            <Desc>
                Write a prompt to generate desire image that whatever you want to Generate!
            </Desc>
        </Top>
        <Body>
            <TextInput label="Author" placeholder="Enter your Name . . . " name="name"
                value={post.name}
                handelChange={(e)=> setPost({...post,name: e.target.value })}
                required
            />
            <TextInput
                label="Image Prompt"
                placeholder="Write a detailed prompt about the image that you want to generate . . . "
                rows="8"
                textArea
                value={post.prompt}
                handelChange={(e)=> setPost({...post,prompt: e.target.value })}
                required/>
            ** You can post the AI Generated Image to the Community **
        </Body>
        <Actions>
            <Button
                text = "Generate Image" 
                flex leftIcon={<AutoAwesome/>}
                isLoading={createPostLoading}
                isDisabled={post.prompt === ""}
                onClick={()=> generateImageFun()}
            />
            <Button
                text = "Post Image" 
                flex type="secondary" 
                leftIcon={<CreateRounded/>}
                isLoading={createPostLoading}
                isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
                onClick={()=> createPostFun()}
            />
        </Actions>
    </Form>
  )
}
