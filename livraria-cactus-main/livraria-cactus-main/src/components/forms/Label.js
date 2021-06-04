import React from 'react'; 
import styled from 'styled-components';

const LabelComponent = styled.label`
    font-weight: bold;
    font-size: 1.1rem;
    margin: 0.2rem 0;
`;

export default function Label(props) {
    return <LabelComponent>{props.children}</LabelComponent>;
}