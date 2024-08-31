import React from 'react';
import styled from 'styled-components';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import { Avatar } from '@mui/material';
import { DownloadRounded } from '@mui/icons-material';
import FileSaver from 'file-saver';

const Card = styled.div`
  position: relative;
  display: flex;
  border-radius: 20px;
  box-shadow: 1px 2px 40px 8px ${({theme})=> theme.black+60};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover{
    scale: 1.05;
    box-shadow: 1px 2px 40px 8px ${({theme})=> theme.black+80};
  }
  &:nth-child(7n+1){
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  display: flex;
  flex-direction: column;
  background: rgba(0,0,0,0,0.5);
  align-items: start;
  gap: 10px;
  backdrop-filter: blur(2px);
  color: ${({theme})=> theme.white};
  transition: opacity 0.3s ease;
  border-radius: 6px;
  justify-content: end;
  padding: 16px;

  ${Card}:hover &{
    opacity: 1;
  }

`;
const Prompt = styled.div`
  font-weight: 400px;
  font-size: 15px;
  color: ${({theme})=> theme.white};
`;
const Author = styled.div`
  font-weight: 600px;
  font-size: 14px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({theme})=> theme.white};
`;

export default function ImageCard({item}) {
  return (
    <Card>
      <LazyLoadImage
        width='100%'
        src={item?.photo} />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Author>
            <Avatar style={{
              width:"32px",
              height:"32px",
            }} >{item?.author[0]}</Avatar>
            {item?.author}
          </Author>
          <DownloadRounded
            onClick={() => FileSaver.saveAs(item?.photo, "download.jpg")}
          />
        </div>
      </HoverOverlay>
    </Card>
  )
}
