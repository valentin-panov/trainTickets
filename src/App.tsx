import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles/common.scss';
import Error404 from './components/Error404/Error404';
import { Wrapper } from './components/Wrapper';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Main } from './components/Main';
import { LandingPage } from './components/LandingPage';
import { Success } from './components/Success';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { SelectionScreen } from './components/SelectionScreen';
import { Loading } from './components/Loading';
import './App.css';

export const appURL = '/trainTickets';
export const serverURL = 'https://fe-diplom.herokuapp.com';

function App() {
  return (
    <Router basename={appURL}>
      <ScrollToTop />
      <Wrapper>
        <Header />
        <Main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/select" element={<SelectionScreen />} />
            <Route path="/success" element={<Success />} />
            <Route path="/items/:id.html" element={<Error404 />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="*" element={<Error404 />} />
          </Routes>
        </Main>
        <Footer />
      </Wrapper>
    </Router>
  );
}

export default App;
