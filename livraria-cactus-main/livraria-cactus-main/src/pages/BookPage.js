import React, { useState, useEffect } from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';

import Card from '../components/card/Card';

import firebase from '../Firebase';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const CardContainer = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;

    @media (min-width: 700px) {
        flex-wrap: nowrap;
    }
`;

const CapaLivro = styled.img`
    text-align: center;
`;

const TituloLivro = styled.p`
    font-weight: bold;
    font-size: 2rem;
    margin-top: 0.5rem;
`;

const AutorLivro = styled.p`
    font-size: 1.05rem;
    margin-top: 0.2rem;
`;

const MarcaLivro = styled(AutorLivro)``;

const ClassificacaoLivro = styled(AutorLivro)``;

const PrecoLivro = styled.h1`
    margin-top: 0.2rem;
`;

const ContainerImagem = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    border-right: 1px solid #40a35a;
    padding: 2rem;
`;

const ContainerInformações = styled.div`
    padding: 2rem;
    width: 100%;
`;

const IconPagamento = styled.img``;

const Pagamento = styled.p`
    margin-left: 0.5rem;
`;

const Boleto = styled.div`
    display: flex;
    align-items: center;
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
`;

const Cartao = styled(Boleto)``;

const CardFooter = styled(ContainerInformações)`
    padding-top: 1rem;
    text-align: justify;
`;

const Descricao = styled.h1``;

const TextoDescricao = styled.p`
    padding: 1rem;
    font-size: 1.1rem;
`;

const Caracteristicas = styled(Descricao)``;

const TextoCaracteristicas = styled.p`
    margin: 0.5rem 0;
    padding: 0.5rem 1rem;
    font-size: 1.1rem;
`;

const Botao = styled.button`
    background-color: ${props=>props.cor ? props.cor : '#40a35a'};
    width: 100%;
    height: 2.5rem;
    cursor: pointer;
    border: none;
    text-align: center;
    color: #fff;
    outline: 0;
    font-weight: bold;
    margin: 0.2rem 0;
    font-size: 1rem;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 250ms;
    
    &:hover {
        background-color: ${props=>props.cor ? '#fc0' : '#58be74'};
    }
`;

export default function BookPage() {
    const [redirecionar, setRedirecionar] = useState(false);

    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [marca, setMarca] = useState("");
    const [nota, setNota] = useState("");
    const [preco, setPreco] = useState("");
    const [isbn, setIsbn] = useState("");
    const [descricao, setDescricao] = useState("");
    const [idioma, setIdioma] = useState("");
    const [ano, setAno] = useState("");
    const [pais, setPais] = useState("");
    const [pagina, setPagina] = useState("");
    const [capa, setCapa] = useState("");
    let isbnLivro = window.location.pathname.split('/')[1];


    function auth(opcao) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                if(opcao === 1) {
                    addCarrinho(user);
                } else if(opcao === 2) {
                    addFavorito(user);
                }
            } else {
                alert('É necessário está logado! Por favor realize seu login');
                setRedirecionar(true);
            }
        });
    }

    function addCarrinho(user) {
        firebase.database().ref('carrinho').child(user.uid).push({
            isbnLivro: isbnLivro
        }).then(()=>{
            alert('Adicionado ao carrinho!')
        })
    }

    function addFavorito(user) {
        firebase.database().ref('favoritos').child(user.uid).push({
            isbnLivro: isbnLivro
        }).then(()=>{
            alert('Livro adicionado aos favoritos!')
        })
    }

    useEffect(() => {
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setMarca(snapshot.val().marca);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setPais(snapshot.val().pais);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setAno(snapshot.val().ano);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setTitulo(snapshot.val().titulo);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setAutor(snapshot.val().autor);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setNota(snapshot.val().nota);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setPreco(snapshot.val().preco);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setIsbn(snapshot.val().isbn);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setDescricao(snapshot.val().descricao);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setIdioma(snapshot.val().idioma);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setPagina(snapshot.val().paginas);
        });
        firebase.database().ref('livros').child(isbnLivro).on('value', (snapshot) => {
            setCapa(snapshot.val().capa);
        });
    }, [isbn]);

    if(redirecionar) {
        return <Redirect to="/login" />
    }

    return (
        <Div>
            <Card largura="1000px">
                <CardContainer>
                    <ContainerImagem>
                        <CapaLivro height="400px" src={capa} />
                    </ContainerImagem>
                    <ContainerInformações>
                        <TituloLivro>{titulo}</TituloLivro>
                        <AutorLivro>Autor: {autor}</AutorLivro>
                        <MarcaLivro>Marca: {marca}</MarcaLivro>
                        <ClassificacaoLivro>Nota: {nota}</ClassificacaoLivro>
                        <PrecoLivro><small>De: <del>R$ {Number(preco)+10.25}</del></small></PrecoLivro>
                        <PrecoLivro>Por: R$ {preco}</PrecoLivro>
                        <Boleto>
                            <IconPagamento width="30px" src="https://imagensemoldes.com.br/wp-content/uploads/2020/04/Imagem-Boleto-Banc%C3%A1rio-PNG-1200x792.png" />
                            <Pagamento>Boleto bancário: {preco}</Pagamento>
                        </Boleto>
                        <Cartao>
                            <IconPagamento width="35px" src="https://image.flaticon.com/icons/png/512/24/24834.png" />
                            <Pagamento>Cartão de crédito: {preco}</Pagamento>
                        </Cartao>
                        <Botao onClick={()=>{auth(1)}}>Adicionar ao carrinho</Botao>
                        <Botao cor='#fb0' onClick={()=>{auth(2)}}>Favoritar</Botao>
                    </ContainerInformações>
                </CardContainer>
                <CardFooter>
                    <Descricao>Descrição</Descricao>
                    <TextoDescricao>{descricao}</TextoDescricao>
                    <Caracteristicas>Características</Caracteristicas>
                    <TextoCaracteristicas>Ano: {ano}</TextoCaracteristicas>
                    <TextoCaracteristicas>País: {pais}</TextoCaracteristicas>
                    <TextoCaracteristicas>Idioma: {idioma}</TextoCaracteristicas>
                    <TextoCaracteristicas>Número de páginas: {pagina}</TextoCaracteristicas>
                    <TextoCaracteristicas>ISBN: {isbn}</TextoCaracteristicas>
                </CardFooter>
            </Card>
        </Div>
    );
}