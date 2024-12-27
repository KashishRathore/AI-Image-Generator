import { CircularProgress } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    flex:1;
    display: flex;
    gap: 16px;
    width: 100%;
    padding: 16px;
    border: 2px dashed ${({ theme }) => theme.yellow};
    color: ${({ theme }) => theme.arrow + 80};
    border-radius: 20px;
    display: flex;
    flex-direction:column;
    align-items: center;
    justify-content: center;
    min-height:300px;
`

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 24px;
    background: ${({ theme }) => theme.black + 50};
`

const Wrapper = styled.div`
    height: fit-content;
    max-width: 1200px;
    gap: 8%;
    display: flex;
    justify-content: center;
    @media (max-width: 768px){
      flex-direction: column;
    }
`

const GeneratedImageCard = ({ src, loading }) => {
    return (
        <Container>
            <Wrapper>
                {loading ? (
                    <>
                        <CircularProgress style={{ color: "inherit", width: "24px", height: "24px" }} />
                        Generating Your Image...
                    </>
                ) : (
                    <>
                        {
                            src ? <Image src={src} /> : <> Write a Prompt to generate image  </>
                        }
                    </>
                )}
            </Wrapper>
        </Container>
    )
}

export default GeneratedImageCard
