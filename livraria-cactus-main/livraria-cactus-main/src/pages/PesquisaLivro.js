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

export default function PesquisaLivro() {
    const [url, setUrl] = useState("");
    useEffect(() => {
        setUrl(window.location.pathname.split('/')[1]);
        
    }, []);

    const [lista, setLista] = useState([]);
    useEffect(() => {
        let aux = [...lista];
        firebase.database().ref('livros').on('value', (snapshot) => {
            snapshot.forEach((childItem) => {
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

    return (
        <Div>
            {lista.length !== 0 ?
                lista.map((item) => (
                    item.titulo.toLowerCase()
                    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
                    .replace(/([^\w]+|\s+)/g, '-')
                    .replace(/\-\-+/g, '-')
                    .replace(/(^-+|-+$)/, '').includes(url) ?
                    
                    <Redirecionamento key={item.isbn} href={"/" + item.isbn}>
                        <Card largura="250px" altura="400px">
                            <CardContainer>
                                <CapaLivro src={item.capa} width="150px" />
                                <TituloLivro >{item.titulo}</TituloLivro>
                                <AutorLivro >{item.autor}</AutorLivro>
                                <PrecoLivro >Preço: R$ {item.preco}</PrecoLivro>
                            </CardContainer >
                        </Card>
                    </Redirecionamento> : null
                )) : <MensagemBD>Carregando livros em nosso banco...</MensagemBD>}
        </Div>

    );
}