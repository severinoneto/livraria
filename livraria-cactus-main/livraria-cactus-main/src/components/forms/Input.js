import React from 'react';
import styled from 'styled-components';

const InputComponent = styled.input`
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
    @media (min-width: 700px) {
        width: ${props=>props.largura ? props.largura : '100%'}
    }

    &:focus {
        border-bottom: 2px solid ${props=>props.linha ? props.linha : '#40a35a'} ;
    }
`;

export default function Input(props) {
    return <InputComponent linha={props.linha} largura={props.largura} placeholder={props.placehold} type={props.type} />;
}