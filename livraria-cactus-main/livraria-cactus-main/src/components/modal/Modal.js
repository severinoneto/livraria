import React from 'react';
import styled from 'styled-components';

const ModalBackground = styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 90;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalArea = styled.div`
    background-color: #fff;
    height: 80vh;
    width: 80vw;
    overflow-x: auto;
    ::-webkit-scrollbar {
        width: 0px;
    }
`;

export default function Modal(props) {
    function fecharModal() {
        props.setVisible(false);
    }
    return(
        <>
        {props.visible === true &&
            <ModalBackground onClick={fecharModal}>
                <ModalArea>{props.children}</ModalArea>
            </ModalBackground>
        }
        </>
    );
}