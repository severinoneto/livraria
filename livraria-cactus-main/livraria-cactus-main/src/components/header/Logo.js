import React from 'react';
import styled from 'styled-components';

const LogoMarca = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0.3rem 0 .2rem 0;
`;

const LogoTexto = styled.a`
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
    transition: 250ms;
    &:hover {
        color: #eee;
    }
`;

export default function Logo() {
    return(
        <LogoMarca>
            <LogoTexto href="/">Livraria Cactus</LogoTexto>
        </LogoMarca>
    );
}