import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import firebase from '../Firebase';

const Cart = styled.div``;

const Cabecalho = styled.div`
    background-color: #40a35a;
    height: 75px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    font-size: 20px;
`;

const Carrinho = styled.img`
    margin-left: 0.3rem;
`;

const Content = styled.div`
    display: flex;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContentTitulo = styled.p`
    font-weight: bold;
    margin-bottom: 0.5rem;
`;

const ContentTexto = styled.p`
    color: #525252;
    text-align: justify;
`;

const ContainerLivro = styled.div`
    width: 100%;
    left: 0;
    display: flex;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const CapaLivro = styled.img`
    height: 50px;
    margin-right: 0.4rem;
`;

const BotaoCompra = styled.a`
    background-color: #40a35a;
    width: 100%;
    height: 2.5rem;
    cursor: pointer;
    border: none;
    border-radius: 0.2rem;
    text-align: center;
    color: #fff;
    outline: 0;
    font-size: 1rem;
    font-weight: bold;
    margin: 0.2rem 0;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 250ms;

    &:hover {
        background-color: #58be74;
    }
`;


export default function CartPage() {
    
    const [lista, setLista] = useState([]);
    const [livros, setLivros] = useState([]);

    useEffect(()=> {
        let aux = [...lista];
        firebase.auth().onAuthStateChanged((user)=> {
            if(user) {
                firebase.database().ref('carrinho').child(user.uid).on('child_added', (snapshot) => {
                    aux.push({
                        isbnLivro: snapshot.val().isbnLivro
                    });
                });
                setLista(aux);
            }
        });

    }, []);

    useEffect(()=> {
        setTimeout(()=> {
            let aux = [...livros];
            lista.map((item)=>(
                firebase.database().ref('livros').child(item.isbnLivro).on('value', (snapshot)=> {
                    aux.push({
                        capa: snapshot.val().capa,
                        titulo: snapshot.val().titulo,
                    });
                })
            ));
            setLivros(aux);
        }, 2000)
    }, [lista]);


    return(
        <Cart>
            <Cabecalho>
                Carrinho de compras
                <Carrinho height="30px" src="https://media.discordapp.net/attachments/715964767436537897/792459981743194133/263142_1.png?width=434&height=434" />
            </Cabecalho>
            <Content>
                {lista.length === 0 ?
                    <>
                    <ContentTitulo>SEU CARRINHO ESTÁ VAZIO</ContentTitulo>
                    <ContentTexto>Para continuar comprando, navegue pelas categorias do site ou faça uma busca pelo seu produto.</ContentTexto>
                    </> :
                    <>
                    <ContentTitulo>HÁ {lista.length} ITENS EM SEU CARRINHO</ContentTitulo>
                    <br />
                    {livros.map((item, index)=> (
                        <ContainerLivro key={index}>
                        <CapaLivro src={item.capa} />
                        <ContentTexto> - {item.titulo}</ContentTexto>
                        </ContainerLivro>
                    ))}
                    <BotaoCompra href="/compra">Finalizar compra</BotaoCompra>
                    </>
                }
            </Content>
        </Cart>
    );
}