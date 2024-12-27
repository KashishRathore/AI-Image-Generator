import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Theme.js"
import Home from "./components/pages/Home.jsx"
import CreatePost from "./components/pages/CreatePost.jsx"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar/Navbar.jsx";


const Container = styled.div`
  width: 100%;
  display: flex;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text_primary};
  overflow-x: hidden;
  overflow-y: hidden;
  transition: all 0.2s ease;
  height: 100%;
  `

const Wrapper = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 3;
`

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        <Wrapper>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} exact />
              <Route path='/post' element={<CreatePost />} exact />
            </Routes>
          </BrowserRouter>
        </Wrapper>
      </Container>
    </ThemeProvider>
  );
}

export default App;
