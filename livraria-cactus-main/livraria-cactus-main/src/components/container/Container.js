import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Card from '../card/Card';

import Login from '../../pages/Login';
import Cadastro from '../../pages/Cadastro';
import CadastroLivro from '../../pages/CadastroLivro';
import BookPage from '../../pages/BookPage';
import PesquisaLivro from '../../pages/PesquisaLivro';
import FavPage from '../../pages/FavPage';
import CompraPage from '../../pages/Compra';
import CompraFinalizada from '../../pages/CompraFinalizada';

import firebase from '../../Firebase';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const CardContainer = styled.div`
    text-align: center;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    height: 100%;
    padding: 1rem;
    &:hover {
        background-color: #eee;
    }
`;

const CapaLivro = styled.img`
    text-align: center;
    display: block;
`;

const TituloLivro = styled.p`
    font-weight: bold;
    font-size: 1.2rem;
    margin-top: 0.5rem;
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
`;

const AutorLivro = styled.p`
    text-align: center;
    font-size: 0.9rem;
    margin-top: 0.2rem;
    width: 100%;
`;

const PrecoLivro = styled.h3`
    text-align: center;
    margin-top: 0.2rem;
    width: 100%;
`;

const Redirecionamento = styled.a`
    text-decoration: none;
    cursor: pointer;
`;

const MensagemBD = styled.h1`
    margin: 2rem;
`; 

export default function Container() {
    const [url, setUrl] = useState("");
    useEffect(()=>{
        setUrl(window.location.pathname.split('/')[1]);
    }, []);
    
    const [lista, setLista] = useState([]);
    useEffect(()=> {
        let aux = [...lista];
        firebase.database().ref('livros').on('value', (snapshot) => {
            snapshot.forEach((childItem)=>{
                aux.push({
                    titulo: childItem.val().titulo,
                    capa: childItem.val().capa,
                    autor: childItem.val().autor,
                    preco: childItem.val().preco,
                    isbn: childItem.val().isbn
                });
            });
            setLista(aux);
        });
    }, []);

    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Div>
                    {lista.length !== 0 ?
                        lista.map((item)=> (
                            <Redirecionamento key={item.isbn} href={"/" + item.isbn}>
                                <Card largura="250px" altura="400px">
                                    <CardContainer>
                                        <CapaLivro src={item.capa} width="150px" />
                                        <TituloLivro >{item.titulo}</TituloLivro>
                                        <AutorLivro >{item.autor}</AutorLivro>
                                        <PrecoLivro >Preço: R$ {item.preco}</PrecoLivro>
                                    </CardContainer >
                                </Card>
                            </Redirecionamento>
                        )) : <MensagemBD>Carregando livros em nosso banco...</MensagemBD>}
                    </Div>
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/cadastro">
                    <Cadastro />
                </Route>
                <Route path="/cadastroLivro">
                    <CadastroLivro />
                </Route>
                <Route path="/favoritos">
                    <FavPage />
                </Route>
                <Route exact path="/compra">
                    <CompraPage />
                </Route>
                {lista.map((item)=> (
                    <Route exact key={item.isbn} path={"/" + item.isbn} >
                        <BookPage isbn={item.isbn}/>
                    </Route>
                ))}
                <Route path="/CompraFinalizada">
                    <CompraFinalizada />
                </Route>
                <Route path={"/" + url}>
                    <PesquisaLivro />
                </Route>
                <Route path="*">
                    <h1>Erro 404: Página não encontrada</h1>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}