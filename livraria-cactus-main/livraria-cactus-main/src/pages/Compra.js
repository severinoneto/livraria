import React, { useState, useEffect } from 'react';
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

const ContainerLivro = styled.div`
    width: 100%;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    margin-bottom: 0.5rem;
`;

const CapaLivro = styled.img`
    left: 0;
    height: 50px;
    margin-right: 0.4rem;
`;

const ContentTexto = styled.p`
    color: #525252;
    width: 100%;
    padding-right: 1rem;
`;

const ContentPreco = styled(ContentTexto)`
    width: 50%;
    @media (min-width: 700px) {
        width: 21%;
    }
    
`;

const ContainerEsquerda = styled.div`
    width: 100%;
    display: flex;
    padding: 2rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContainerDireita = styled.div`
    padding: 2rem;
    width: 100%;
    @media (min-width: 700px) {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
`;

const QRContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const QRcode = styled.img`
    width: 65%;
`;

const TextoCD = styled.p`
    margin: 1rem;
    font-size: ${props=>props.total ? '1.3rem' : '1rem'};
    font-weight: bold;
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
        background-color: ${props=>props.cor ? '#ee0' : '#58be74'};
    }
`;

export default function Compra(props) {

    const [lista, setLista] = useState([]);
    const [livros, setLivros] = useState([]);
    const [resultado, setResultado] = useState(0);
    const [redirecionar, setRedirecionar] = useState(false);
    
    function auth(){
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                addCompra(user);
            } else {
                alert('É necessário está logado! Por favor realize seu login');
            }
        });
    }
    

    function addCompra(user) {
        firebase.database().ref('compra').child(user.uid).push({
            valor: resultado
        }).then(()=>{
            firebase.database().ref('carrinho').child(user.uid).remove();
            alert('Compra finalizada! Aguardaremos confirmação de pagamento.');
            setRedirecionar(true);
        })
    }

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
            let auxiliar = [...livros];
            let total = 0;
            lista.map((item)=>(
                firebase.database().ref('livros').child(item.isbnLivro).on('value', (snapshot)=> {
                    auxiliar.push({
                        capa: snapshot.val().capa,
                        titulo: snapshot.val().titulo,
                        preco: snapshot.val().preco,
                    });
                    total += Number(snapshot.val().preco);
                })
            ));
            setResultado(total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}));
            setLivros(auxiliar);
        }, 2000)
    }, [lista]);

    if(redirecionar) {
        var url = '/boleto';
        window.open(url, "_blank");
        window.location = '/CompraFinalizada';
    }
    return (
    
        <Div>
            <Card largura="1000px">
                <CardContainer>
                    <ContainerEsquerda>
                        {livros.map((item, index)=> (
                            <ContainerLivro key={index}>
                                <CapaLivro src={item.capa} />
                                <ContentTexto>{item.titulo}</ContentTexto>
                                <ContentPreco>R$ {item.preco}</ContentPreco>
                            </ContainerLivro>
                        ))}
                    </ContainerEsquerda>
                    
                    <ContainerDireita>
                        <QRContent>
                            <QRcode src='https://media.discordapp.net/attachments/654304188104441886/800570933714616320/frame_1.png?width=240&height=240' alt='' />
                        </QRContent>
                        <TextoCD>Subtotal: {resultado}</TextoCD>
                        <hr />
                        <TextoCD total={true}>Total: {resultado}</TextoCD>
                        <Botao onClick={auth}>Finalizar compra</Botao>
                    </ContainerDireita>
                </CardContainer>
            </Card>
        </Div>
    );
}