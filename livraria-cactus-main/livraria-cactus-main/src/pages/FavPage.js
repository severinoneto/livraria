import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import Card from '../components/card/Card';

import firebase from '../Firebase';

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

export default function FavPage() {

    const [listaFavoritos, setListaFavoritos] = useState([]);
    useEffect(() => {
        let aux = [...listaFavoritos];
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                firebase.database().ref('favoritos').child(user.uid).on('child_added', (snapshot) => {
                    aux.push({
                        isbnLivro: snapshot.val().isbnLivro
                    });
                });
                setListaFavoritos(aux);
            }
        });
    }, []);

    const [favoritos, setFavoritos] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            let auxiliar = [...favoritos];
            listaFavoritos.map((item) => (
                firebase.database().ref('livros').child(item.isbnLivro).on('value', (snapshot) => {
                    auxiliar.push({
                        capa: snapshot.val().capa,
                        titulo: snapshot.val().titulo,
                        autor: snapshot.val().autor,
                        preco: snapshot.val().preco
                    });
                })
            ));
            setFavoritos(auxiliar);
        }, 2000)
    }, [listaFavoritos]);

    return (
        <Div>
            {
                listaFavoritos.length !== 0 ?
                    favoritos.map((item, index) => (
                        <Redirecionamento key={index} href={"/" + item.isbn}>
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

    );
}