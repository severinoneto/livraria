import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {createGlobalStyle} from 'styled-components';

import Header from './components/header/Header';
import Container from './components/container/Container';
import Footer from './components/footer/Footer';

import Boleto from './pages/Boleto';

const Site = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        background-color: #4bbf6c;
    }
`;

export default function App() {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/boleto">
                    <Boleto />
                </Route>
                <Route path="/">
                    <Site />
                    <Header />
                    <Container />
                    <Footer />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}