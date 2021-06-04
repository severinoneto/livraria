import React from 'react';
import styled from 'styled-components';

const CardComponent = styled.div`
    //background-color: #ebecf0;
    background-color: #fff;
    width: 22rem;
    height: ${props=>props.altura ? props.altura : 'auto'};
    border-top: 20px solid #40a35a;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 700px) {
        -webkit-box-shadow: 12px 10px 8px rgba(50, 50, 50, 0.77);
	    -moz-box-shadow: 12px 10px 8px rgba(50, 50, 50, 0.77);
	    box-shadow: 12px 10px 8px rgba(50, 50, 50, 0.77);
        width: ${props=>props.largura ? props.largura : 'auto'};
    }
`;

export default function Card(props) {
    return <CardComponent altura={props.altura} largura={props.largura}>{props.children}</CardComponent>;
}