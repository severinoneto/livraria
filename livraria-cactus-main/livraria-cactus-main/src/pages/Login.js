import React, {useState} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';
import firebase from '../Firebase';

import LabelLogin from '../components/forms/Label';
import Card from '../components/card/Card';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    @media (min-width: 700px) {
        height: 80vh;
    }
`;

const CardTitulo = styled.h1`
    margin: 2rem 0 1rem 0;
    color: #40a35a;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardContainer = styled.div`
    width: 90%;
`;

const CardFooter = styled.div`
    display: flex;
    justify-content: center;
    margin: 2rem 0;
    flex: auto;
`;

const Input = styled.input`
    background-color: #eee;
    display: block;
    padding: 0.95rem;
    border: none;
    box-shadow: 0 0 0 0;
    outline: 0;
    border-radius: 0.2rem;
    font-size: 1rem;
    width: 100%;
    height: 2.5rem;
    text-decoration: none;
    margin: 0.2rem 0;
    
    &:focus {
        border-bottom: 2px solid #40a35a;
    }
`;

const BotaoLogin = styled.button`
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

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98vw;
    @media (min-width: 800px) {
        width: 45vw;
    }
`;

export default function Login() {
    
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [redirecionar, setRedirecionar] = useState(false);

    function logar() {
        firebase.auth().signInWithEmailAndPassword(email, senha)
        .then(()=> {
            setRedirecionar(true);
        })
        .catch((error)=> {
            alert('Codigo de error: ' + error.code);
        });
        
    }

    if(redirecionar) {
        alert('Usuário logado');
        return <Redirect to="/" />
    }
    return(
        <Div>
            <Card>
                <Container>
                    <CardContainer>
                        <CardTitulo>Acesse sua conta</CardTitulo>
                        <LabelLogin>Email</LabelLogin>
                        <Input placehold="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
                        <br />
                        <LabelLogin>Senha</LabelLogin>
                        <Input placehold="Senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)}/>
                        <br />
                        <BotaoLogin onClick={logar}>Entrar</BotaoLogin>
                        <CardFooter><a href="/cadastro">Não é cadastrado? Cadastre-se aqui.</a></CardFooter>
                    </CardContainer>
                    
                </Container>
            </Card>
        </Div>
    );
}