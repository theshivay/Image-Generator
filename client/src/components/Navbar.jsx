import React from 'react';
import styled from 'styled-components';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './button';
import { AddRounded, ExploreRounded } from '@mui/icons-material';

const Container = styled.div`
    flex:1;
    background:${({ theme }) => theme.navbar};
    color : ${({ theme })=> theme.text_primary};
    font-weight: bold;
    font-size: 22px;
    padding: 14px 50px;
    display: flex;
    justify-content: space-between;
    alien-item:center;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    @media only screen and (max-width: 600px){
        padding : 10px 12px;
    }

`;

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split("/");
    return (
        <Container>
            GenAI
            {
                path[1] === "post" ? 
                    (<Button 
                    text="Explore Posts"
                    leftIcon={
                        <ExploreRounded
                            style={{
                                FontSize: "18px",
                            }} 
                        />
                    } 
                    type="secondary"
                    onClick={()=>navigate('/')}
                />)    
                :
                (<Button 
                    text="Create New Post"
                    leftIcon={
                        <AddRounded
                            style={{
                                FontSize: "18px",
                            }} 
                        />
                    } 
                    onClick={()=>navigate('/post')}
                />)
            }
        </Container>
    )
}
