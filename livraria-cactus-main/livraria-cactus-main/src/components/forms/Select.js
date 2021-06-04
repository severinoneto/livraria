import React from 'react';
import styled from 'styled-components';

const SelectComponent = styled.select`
    padding-left: 0.3rem;
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
    @media (min-width: 700px) {
        width: ${props=>props.largura ? props.largura : '100%'}
    }

    &:focus {
        border-bottom: 2px solid ${props=>props.linha ? props.linha : '#40a35a'} ;
    }
`;

export default function Select(props) {
    return (
        <SelectComponent>
            {props.children}
        </SelectComponent>
    );
}