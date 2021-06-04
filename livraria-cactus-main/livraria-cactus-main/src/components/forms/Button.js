import React from 'react';
import styled from 'styled-components';

const ButtonComponent = styled.a`
    background-color: ${props=>props.cor ? props.cor : '#7abf8d'};
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
    @media (min-width: 700px) {
        width: ${props=>props.largura ? props.largura : '10rem'};
        font-size: 1rem;
        border-radius: 0.2rem;
    }

    &:hover {
        background-color: ${props=>props.hover ? props.hover : '#8bd69f'};
    }
`;

export default function Button(props) {
    return <ButtonComponent type={props.type} cor={props.cor} hover={props.hover} largura={props.largura} href={props.href}>{props.children}</ButtonComponent>;
}