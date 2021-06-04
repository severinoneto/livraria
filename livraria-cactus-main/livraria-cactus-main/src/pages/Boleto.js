import React, { useState, useEffect } from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import firebase from '../Firebase';

const Site = createGlobalStyle`
    * {
        border: 0;
        margin: 0;
        box-sizing: border-box;
    }

    
`;

const Div = styled.div`
    margin: 0.2rem;
`;

const Cabecalho = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Logo = styled.p`
    font-size: 1.5rem;
    font-weight: bold;
`;

const Recibo = styled(Logo)``;

const Corpo = styled.div`
    margin-top: 0.5rem;
    border: 1px solid black;
    display: flex;
`;

const ContainerEsquerdo = styled.div`
    width: 75%;
`;

const ContainerDireito = styled.div`
    width: 25%;
`;

const Linha = styled.div`
    height: 60px;
    padding: 0.5rem;
    border: 1px solid black;
`;

const LinhaGrande = styled(Linha)`
    height: 120px;
`;

const CodeBarContainer = styled.div`
    height: 120px;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
`;

const CodeBar = styled.img`
    width: 100%;
`;

const Titulo = styled.b`
    margin: 0.05rem;
`;

const Texto = styled.p`
    margin: 0.3rem;
`;

const Aviso = styled.span`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    font-weight: bold;
`;

var data = new Date();
var dia = data.getDate();
var mes = data.getMonth()+1;
var ano = data.getFullYear();
var str_data = dia + "/" + mes + "/" + ano;
var diaVenc = data.getDate() + 1;
var mesVenc = data.getMonth() + 1;
var anoVenc = data.getFullYear();
var str_vencimento = diaVenc + "/" + mesVenc + "/" + anoVenc;

export default function Boleto() {
    const [valor, setValor] = useState(0);
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");

    useEffect(()=>{
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                firebase.database().ref('compra').child(user.uid).on('child_added', (snapshot) => {
                    setValor(snapshot.val().valor)
                });
                firebase.database().ref('usuarios').child(user.uid).once('value', (snapshot)=> {
                    setNome(snapshot.val().nome)
                    setEndereco(snapshot.val().endereco)
                })
            }
        });
    }, []);
    
    console.log(valor)

    function imprimir() {
        setTimeout(()=> {
            window.print();
        }, 2000)
    }
    return (
        <>
        <Site />
        <Div onLoad={imprimir}>
        <Cabecalho>
            <Logo>Livraria Cactus</Logo>
            <Recibo>00000.00000 00000.00000 00000.00000 0 0000</Recibo>
        </Cabecalho>
        <Corpo>
            <ContainerEsquerdo>
                <Linha>
                    <Titulo>Local do pagamento</Titulo>
                    <Texto>Pagável em qualquer banco até o vencimento</Texto>
                </Linha>
                    
                <Linha>
                    <Titulo>Endereço</Titulo>
                    <Texto>{endereco}</Texto>
                </Linha>
                    
                <Linha>
                    <Titulo>Data de emissão</Titulo>
                    <Texto>{str_data}</Texto>
                </Linha>

                <Linha>
                    <Titulo>Espécie Moeda</Titulo>
                    <Texto>R$</Texto>
                </Linha>

                <LinhaGrande>
                    <Titulo>Instruções</Titulo>
                    <ul>Senhor(a) caixa:
                        <li>Não aceitar pagamento em cheque;</li>
                        <li>Não aceitar mais de um pagamento com o mesmo boleto;</li>
                        <li>Em caso de vencimento no fim de semana ou feriado, aceitar o pagamento até o primeiro dia útil após o vencimento.</li>
                    </ul>
                </LinhaGrande>
                <LinhaGrande>
                    <Titulo>Pagador: </Titulo>
                    <Texto>{nome}</Texto>
                </LinhaGrande>
                
            </ContainerEsquerdo>
            <ContainerDireito>
                <Linha>
                    <b>Vencimento</b>
                    <p>{str_vencimento}</p>
                </Linha>
                <Linha>
                    <b>Outros Acréscimos</b>
                    <p>R$ 0,00</p>
                </Linha>
                <Linha>
                    <b>Desconto</b>
                    <p>R$ 0,00</p>
                </Linha>
                <Linha>
                    <b>Agência</b>
                    <p>1234 013 12345678-9</p>
                </Linha>
                <Linha>
                    <b>Multa</b>
                    <p>R$ 0,00</p>
                </Linha>
                <Linha>
                    <b>Valor total: </b>
                    <p>{valor}</p>
                </Linha>
                <CodeBarContainer>
                    <CodeBar heigth="90%" src="https://cdn.discordapp.com/attachments/654304188104441886/799466495876530186/cc7bcc05-c2ce-4a29-8724-8d252c15ef43.png" />
                </CodeBarContainer>
            </ContainerDireito>
        </Corpo>
        <Aviso>*NÃO PAGUE! ESSE BOLETO É APENAS DEMONSTRATIVO*</Aviso>
        </Div>
        </>
    );
}