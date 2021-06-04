import React from 'react';
import styled from 'styled-components';

const Rodape = styled.footer`
    background-color: #40a35a;
    height: 4rem;
    left: 0;
    bottom: 0;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    text-align: center;
    @media (min-width: 700px) {
        font-size: 1rem;
    }
`;

export default function Footer() {
    return <Rodape><p>Copyright © 2020 <b> Livraria Cactus </b> - Todos os direitos reservados</p></Rodape>;
}