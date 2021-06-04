import React from 'react';
import styled from 'styled-components';

import Burguer from './Burguer';

const NavDiv = styled.div`
    width: 100%;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Ul = styled.ul`
    width: 90%;
    display: flex;
    list-style: none;
    flex-wrap: wrap;
`;

const Li = styled.li`
    display: flex;
    align-items: center;
`;

const Categoria = styled.a`
    display: flex;
    align-items: center;
    font-weight: bold;
    color: #40a35a;
    font-size: 1.2rem;
    text-decoration: none;
    padding: 1rem;
    transition: 250ms;
    &:hover {
        color: #6be38b;
    }
`;

export default function NavBar() {
    return(
        <NavDiv>
            <Ul>
                <Li>
                    <Burguer />
                </Li>
                <Li>
                    <Categoria href="#">Lançamentos</Categoria>
                </Li>
            </Ul>
        </NavDiv>
    );
}