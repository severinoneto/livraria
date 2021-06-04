import React from 'react';
import styled from 'styled-components';
import {BrowserRouter} from 'react-router-dom';

const Ul = styled.ul`
  list-style: none;
  display: flex;
  li {
    padding: 18px 20px;
  }
  flex-flow: column nowrap;
  background-color: #33834a;
  position: fixed;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(100%)'};
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  padding-top: 3.5rem;
  transition: transform 0.3s ease-in-out;
  li {
    color: #fff;
  }
`;

const Redirecionamento = styled.a`
    text-decoration: none;
    font-weight: bold;
    color: #fff;
    font-size: 1.25rem;
    &:hover {
      color: #ddd;
    }
`;

export default function RightNav({ open }) {
  return (
    <BrowserRouter>
        <Ul open={open}>
            <li>
                <Redirecionamento href="#">Mais vendidos</Redirecionamento>
            </li>
            <li>
                <Redirecionamento href="#">Pré-vendas</Redirecionamento>
            </li>
            <li>
                <Redirecionamento href="#">Promoções</Redirecionamento>
            </li>
            <li>
                <Redirecionamento href="#">Sobre</Redirecionamento>
            </li>
            <li>
                <Redirecionamento href="#">Contatos</Redirecionamento>
            </li>
        </Ul>
    </BrowserRouter>
  )
}