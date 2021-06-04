import React, { useEffect } from 'react';
import styled from 'styled-components';
import firebase from '../Firebase';
import Card from '../components/card/Card';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const CardContainer = styled.div`
    background-color: #fbfbfc;
    text-align: center;
    width: 100%;
`;

const Texto = styled.p`
    color: #40a35a;
    font-weight: bold;
    font-size: 2rem;
    margin-bottom: 3.5rem;
`;

export default function CompraFinalizada() {
    
    useEffect(()=> {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.database().ref('carrinho').child(user.uid).remove();
            }
        });
    }, [])

    return(
        <Div>
            <Card largura="600px">
                <CardContainer>
                    <img src="https://media.discordapp.net/attachments/654304188104441886/800878805584445480/confirm.gif?width=320&height=240"/>
                    <Texto>Compra finalizada!</Texto>
                </CardContainer>
            </Card>
        </Div>
        );
}