import React, {useState} from 'react';
import styled from 'styled-components';

import Label from '../components/forms/Label';
import Card from '../components/card/Card';

import firebase from '../Firebase';

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
    margin-bottom: 2rem;
`;

const CardTitulo = styled.h1`
    margin: 2rem 0 1rem 0;
    color: #40a35a;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const CardContainer = styled.div`
    width: 90%;
`;

const BotaoCadastrar = styled.button`
    background-color: #40a35a;
    width: 100%;
    height: 2.5rem;
    cursor: pointer;
    border: none;
    border-radius: 0.2rem;
    text-align: center;
    color: #fff;
    outline: 0;
    font-weight: bold;
    font-size: 1rem;
    margin: 2rem 0;
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 250ms;

    &:hover {
        background-color: #58be74;
    }
`;

const InputForm = styled.input`
    background-color: #eee;
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

    &:focus {
        border-bottom: #40a35a;
    }
`;

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 98vw;
    @media (min-width: 700px) {
        width: 70vw;
    }
`;

export default function Cadastro() {
    const [titulo, setTitulo] = useState("");
    const [capa, setCapa] = useState("");
    const [autor, setAutor] = useState("");
    const [marca, setMarca] = useState("");
    const [nota, setNota] = useState("");
    const [preco, setPreco] = useState("");
    const [descricao, setDescricao] = useState("");
    const [ano, setAno] = useState("");
    const [pais, setPais] = useState("");
    const [idioma, setIdioma] = useState("");
    const [paginas, setPaginas] = useState("");
    const [isbn, setIsbn] = useState("");
    
    function cadastrarLivro(e) {
        let obj = firebase.database().ref('livros');
        let isbn_chave = isbn
        obj.child(isbn_chave).set({
            titulo: titulo,
            capa: capa,
            autor: autor,
            marca: marca,
            nota: nota,
            preco: preco,
            descricao: descricao,
            ano: ano,
            pais: pais,
            idioma: idioma,
            paginas: paginas,
            isbn: isbn
        }).then(()=>{
            alert('Livro Cadastrado!');
            setTitulo("");
            setCapa("");
            setAutor("");
            setMarca("");
            setNota("");
            setPreco("");
            setDescricao("");
            setAno("");
            setPais("");
            setIdioma("");
            setPaginas("");
            setIsbn("");
        });
        
        e.preventDefault();
    }
    return(
        <Div>
            <form onSubmit={cadastrarLivro}>
            <Card>
                <Container>
                    <CardContainer>
                        <CardTitulo>Cadastrar Livro</CardTitulo>
                        <Label>Titulo</Label>
                        <InputForm placeholder="Nome do livro" type="text" value={titulo} onChange={e=>setTitulo(e.target.value)} required={true} />
                        <br />
                        <Label>Capa</Label>
                        <InputForm placeholder="Link da capa do livro" type="text" value={capa} onChange={e=>setCapa(e.target.value)} required={true} />
                        <br />
                        <Label>Autor</Label>
                        <InputForm placeholder="Nome dos escritores" type="text" value={autor} onChange={e=>setAutor(e.target.value)} required={true} />
                        <br />
                        <Label>Marca</Label>
                        <InputForm placeholder="Nome da marca" type="text" value={marca} onChange={e=>setMarca(e.target.value)} required={true} />
                        <br />
                        <Label>Nota</Label>
                        <InputForm placeholder="Nota do livro" type="number" pattern="[0-9]+([,\.][0-9]+)?" step="any" value={nota} onChange={e=>setNota(e.target.value)} required={true} />
                        <br />
                        <Label>Preco</Label>
                        <InputForm placeholder="Preço" type="number" pattern="[0-9]+([,\.][0-9]+)?" step="any" value={preco} onChange={e=>setPreco(e.target.value)} required={true} />
                        <br />
                        <Label>Descricao</Label>
                        <InputForm placeholder="Sinopse do livro" type="text" value={descricao} onChange={e=>setDescricao(e.target.value)} required={true} />
                        <br />
                        <Label>Ano</Label>
                        <InputForm placeholder="Ano de publicação" type="text" value={ano} onChange={e=>setAno(e.target.value)} required={true} />
                        <br />
                        <Label>Pais</Label>
                        <InputForm placeholder="País de origem" type="text" value={pais} onChange={e=>setPais(e.target.value)} required={true} />
                        <br />
                        <Label>Idioma</Label>
                        <InputForm placeholder="Idioma do livro" type="text" value={idioma} onChange={e=>setIdioma(e.target.value)} required={true} />
                        <br />
                        <Label>Número de páginas</Label>
                        <InputForm placeholder="Ex: 500" type="number" value={paginas} onChange={e=>setPaginas(e.target.value)} required={true} />
                        <br />
                        <Label>ISBN</Label>
                        <InputForm placeholder="ISBN referente ao livro" type="number" value={isbn} onChange={e=>setIsbn(e.target.value)} required={true} />
                        <BotaoCadastrar type="submit" cor="#40a35a" hover="#58be74" largura="100%">Cadastrar Livro</BotaoCadastrar>
                    </CardContainer>
                </Container>
            </Card>
            </form>
        </Div>
    );
}