import React, {useState} from 'react';
import styled from 'styled-components';

import Logo from './Logo';
import Botao from '../forms/Button';
import NavBar from '../navbar/NavBar';
import Modal from '../modal/Modal';

import CartPage from '../../pages/CartPage';

import firebase from '../../Firebase';

const Cabecalho = styled.div`
    background-color: #40a35a;
    height: auto;
    padding-bottom: 0.7rem;
    padding-top: 0.5rem;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    width: 93%;
    @media (min-width: 700px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`;

const BotaoIcons = styled.button`
    background-color: #7abf8d;
    border: none;
    outline: 0;
    width: 100%;
    margin: 0.2rem 0;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 250ms;
    &:hover {
        background-color: #8bd69f;
    }
    @media (min-width: 700px) {
        width: 3rem;
        border-radius: 0.2rem;
    }
`;

const ContainerIcons = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media (min-width: 700px) {
        width: 7rem;
    }
`;

const Logout = styled.button`
    background-color: #7abf8d;
    width: 100%;
    height: 2.5rem;
    cursor: pointer;
    border: none;
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
    @media (min-width: 700px) {
        width: 15rem;
    }
    &:hover {
        background-color: #8bd69f;
    }
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchBox = styled.input`
    display: block;
    padding: 0.95rem;
    border: none;
    box-shadow: 0 0 0 0;
    outline: 0;
    border-bottom-left-radius: 0.2rem;
    border-top-left-radius: 0.2rem;
    font-size: 1rem;
    width: 100%;
    height: 2.5rem;
    text-decoration: none;
    margin: 0.2rem 0;
    &:focus {
        border-bottom: 2px solid #7abf8d;
    }
    @media (min-width: 700px) {
        width: 35rem;
    }
`;

const BotaoPesquisar = styled.a`
    background-color: #7abf8d;
    width: 16%;
    height: 2.5rem;
    cursor: pointer;
    border: none;
    border-radius: 0.2rem;
    text-align: center;
    color: #fff;
    outline: 0;
    font-weight: bold;
    margin: 0.2rem 0;
    border-top-right-radius: 0.2rem;
    border-bottom-right-radius: 0.2rem;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 250ms;
    @media (min-width: 700px) {
        width: 45px;
    }

    &:hover {
        background-color: #8bd69f;
    }
`;

const BotaoFav = styled(BotaoPesquisar)`
    width: 100%;
    @media (min-width: 700px) {
        width: 45px;
    }
`;

const FavoritosIcon = styled.img``;

const CarrinhoIcon = styled(FavoritosIcon)``;

const PesquisaIcon = styled(FavoritosIcon)``;

export default function Header(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [usuario, setUsuario] = useState(null);

    firebase.auth().onAuthStateChanged((user)=> {
        if(user) {
            setUsuario(user);
        }
    })

    function abrirModal() {
        setModalVisible(true);
    }
    
    const [favIcon, setFavIcon] = useState(false);
    const [cartIcon, setCartIcon] = useState(false);
    const [pesquisaIcon, setPesquisaIcon] = useState(false);
    
    const [pesquisa, setPesquisa] = useState("");

    function sair() {
        firebase.auth().signOut()
        .then(()=> {
            setUsuario(null);
            alert("Usuario deslogado com sucesso!");
        });
    }

    return(
        <>
            <Cabecalho>
                <Content>
                    <Logo />
                    <SearchContainer>
                    <SearchBox placeholder="Digite o nome de um livro" value={pesquisa} onChange={e=>setPesquisa(e.target.value)} />
                    <BotaoPesquisar largura="45px" href={"/" + pesquisa
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .replace(/([^\w]+|\s+)/g, '-')
                    .replace(/\-\-+/g, '-').toLowerCase()}>
                        <PesquisaIcon src={pesquisaIcon ? "https://media.discordapp.net/attachments/715964767436537897/796054730803511356/64e14fe0195557e3f18ea3becba3169b-lupa-de-pesquisa-by-vexels_1.png?width=402&height=402" : "https://media.discordapp.net/attachments/715964767436537897/796054713942278164/64e14fe0195557e3f18ea3becba3169b-lupa-de-pesquisa-by-vexels.png?width=402&height=402"} onMouseEnter={()=>setPesquisaIcon(true)} onMouseOut={()=>setPesquisaIcon(false)} height="30px"/>
                    </BotaoPesquisar>
                    </SearchContainer>
                    {usuario == null ? <Botao largura="12rem" href="/login">Entre ou Cadastre-se</Botao> : <Logout onClick={sair}>Sair</Logout> }
                    <ContainerIcons>
                        <BotaoFav href="/favoritos">
                            <FavoritosIcon src={favIcon ? "https://media.discordapp.net/attachments/715964767436537897/792453155140796466/coracao_1.png?width=434&height=434" : "https://media.discordapp.net/attachments/715964767436537897/792452635365736458/coracao.png?width=434&height=434"} onMouseEnter={()=>setFavIcon(true)} onMouseOut={()=>setFavIcon(false)} height="30px" />
                        </BotaoFav>
                        <BotaoIcons onClick={abrirModal}>
                            <CarrinhoIcon height="30px" src={cartIcon ? "https://media.discordapp.net/attachments/715964767436537897/792459981743194133/263142_1.png?width=434&height=434" : "https://media.discordapp.net/attachments/715964767436537897/792459339482923038/263142.png?width=402&height=402"} onMouseEnter={()=>setCartIcon(true)} onMouseOut={()=>setCartIcon(false)} />
                        </BotaoIcons>
                        <Modal visible={modalVisible} setVisible={setModalVisible}>
                            <CartPage />
                        </Modal>
                    </ContainerIcons>
                </Content>
            </Cabecalho>
            <NavBar />
        </>
    );
}