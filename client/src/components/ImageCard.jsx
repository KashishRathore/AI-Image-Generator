import { DownloadRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import React from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from 'styled-components'
import FileSaver from "file-saver"

const Card = styled.div`
    position: relative;
    display: flex;
    border-radius: 20px;
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover{
        box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
        scale: 1.05;
        border-radius: 20px;
    }
    &:nth-child(7n+1){
      grid-column: auto/span 2;
      grid-row: auto/span 2;
    }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display:flex;
  flex-direction: column;
  align-items: start;
  gap: 2px;
  backdrop-filter: blur(2px);
  background: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  border-radius: 6px;
  justify-content: end;
  padding: 12px;

  ${Card}:hover & {
    opacity: 1;
  }
`;
const Prompt = styled.div`
  font-weight: 600px;
  font-size: 15px;
  color: ${({ theme }) => theme.white};
`;

const Author = styled.div`
  font-weight: 400px;
  font-size: 15px;
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.white};
`;


const ImageCard = ({ item }) => {
  return (
    <Card>
      <LazyLoadImage
        style={{ borderRadius: "12px" }}
        alt={item?.prompt}
        width="100%"
        src={item?.photo}
      />
      <HoverOverlay>
        <div style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}>
          <Prompt>{item?.prompt}</Prompt>
          <Author>
            <Avatar style={{ width: "32px", height: "32px" }}>
              {item?.name[0]}
            </Avatar>
            {item?.name}
          </Author>
          <DownloadRounded onClick={() => FileSaver.saveAs(item?.photo, "download.jpg")} />
        </div>
      </HoverOverlay>
    </Card>
  )
}

export default ImageCard
