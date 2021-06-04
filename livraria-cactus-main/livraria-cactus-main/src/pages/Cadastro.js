import React, {useState} from 'react';
import {Redirect} from 'react-router';
import styled from 'styled-components';

import Label from '../components/forms/Label';
import Card from '../components/card/Card';

import firebase from '../Firebase';

const Estados = require('../json/estados.json');

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
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

const BotaoCadastrar = styled.button`
    background-color: ${props=>props.disabled ? '#aaa' : '#40a35a'};
    width: 100%;
    height: 2.5rem;
    cursor: pointer;
    border: none;
    border-radius: 0.2rem;
    text-align: center;
    color: #fff;
    outline: 0;
    font-weight: bold;
    margin: 1.5rem 0 2rem 0;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 250ms;

    &:hover {
        background-color: ${props=>props.disabled ? '#bbb' : '#58be74'};
    }
`;

const InputForm = styled.input`
    background-color: #eee;
    display: block;
    padding: 0.95rem;
    border: none;
    border-radius: 0.2rem;
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

const SelectForm = styled.select`
    background-color: #eee;
    padding-left: 0.5rem;
    display: block;
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

const Aviso = styled.p`
    text-align: center;
    color: red;
    font-weight: bold;
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98vw;
    @media (min-width: 700px) {
        width: 70vw;
    }
`;

export default function Cadastro() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [rg, setRg] = useState("");
    const [cep, setCep] = useState("");
    const [endereco, setEndereco] = useState("");
    const [estado, setEstado] = useState("");
    const [rua, setRua] = useState("");
    const [numero, setNumero] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [senha2, setSenha2] = useState("");
    const [redirecionar, setRedirecionar] = useState(false);
    const [disabled, setDisabled] = useState(true);

    firebase.auth().signOut();

    firebase.auth().onAuthStateChanged((user)=> {
        if(user) {
            firebase.database().ref('usuarios').child(user.uid).set({
                nome: nome,
                cpf: cpf,
                rg: rg,
                cep: cep,
                endereco: endereco,
                estado: estado,
                rua: rua,
                numero: numero,
                email: email
            })
            .then(()=>{
                setRedirecionar(true);
            })
        }
    });

    function cadastrar(e) {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .catch((error) => {
            alert("Codigo de error: " + error.code);
        });

        e.preventDefault();
    }

    function verificarSenha() {
        if(senha === senha2) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }

    if(redirecionar) {
        alert("Conta criada!");
        return <Redirect to="/login" />
    }
    return(
        <Div>
            <form onSubmit={cadastrar}>
            <Card>
                <Container>
                    <CardContainer>
                        <CardTitulo>Crie sua conta</CardTitulo>
                        <Label>Nome completo</Label>
                        <InputForm placeholder="Nome completo" type="text" value={nome} onChange={e=>setNome(e.target.value)} required={true} />
                        <br />
                        <Label>CPF</Label>
                        <InputForm placeholder="Ex: 123.456.789-10" type="text" value={cpf} onChange={e=>setCpf(e.target.value)} required={true} />
                        <br />
                        <Label>RG</Label>
                        <InputForm placeholder="Ex: 1.123.456" type="text" value={rg} onChange={e=>setRg(e.target.value)} required={true} />
                        <br />
                        <Label>CEP</Label>
                        <InputForm placeholder="Ex: 12345-678" type="text" value={cep} onChange={e=>setCep(e.target.value)} required={true} />
                        <br />
                        <Label>Bairro</Label>
                        <InputForm placeholder="Ex: Endereço" type="text" value={endereco} onChange={e=>setEndereco(e.target.value)} required={true} />
                        <br />
                        <Label>Estado</Label>
                        <SelectForm value={estado} onChange={e=>setEstado(e.target.value)} required={true} >
                            <option >Selecione um estado...</option>
                            {Estados.UF.map((item)=>(
                                <option key={item.sigla} value={item.sigla}>{item.nome}</option>
                            ))}
                        </SelectForm>
                        <br />
                        <Label>Rua</Label>
                        <InputForm placeholder="Rua dos bobos" type="text" value={rua} onChange={e=>setRua(e.target.value)} required={true} />
                        <br />
                        <Label>Número</Label>
                        <InputForm placeholder="Número 0" type="number" value={numero} onChange={e=>setNumero(e.target.value)} required={true} />
                        <br />
                        <Label>Email</Label>
                        <InputForm placeholder="Exemplo@hotmail.com" type="email" value={email} onChange={e=>setEmail(e.target.value)} required={true} />
                        <br />
                        <Label>Senha</Label>
                        <InputForm placeholder="Senha" type="password" value={senha} onChange={e=>setSenha(e.target.value)} onBlur={verificarSenha} required={true} />
                        <br />
                        <Label>Confirmar senha</Label>
                        <InputForm placeholder="Digite a senha novamente" type="password" value={senha2} onChange={e=>setSenha2(e.target.value)} onBlur={verificarSenha} required={true} />
                        <br />
                        {disabled === true &&
                            <Aviso>* As senhas não correspondem *</Aviso>
                        }
                        <BotaoCadastrar disabled={disabled} type="submit">Criar conta</BotaoCadastrar>
                    </CardContainer>
                </Container>
            </Card>
            </form>
        </Div>
    );
}