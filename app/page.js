'use client'
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {

    const [produtos, setprodutos] = useState([])

    const [nome, setnome] = useState([])
    const [preco, setpreco] = useState([])
    const [quantidade, setquantidade] = useState([])

    async function buscaTodos() {
        const response = await axios.get("http://localhost:3000/api/produtos")
        setprodutos(response.data)
    }

    function buscaPorID() { }
    function buscaPorNome() { }

    async function insereProduto(e) { 

        e.preventDefault()
        
        const obj = {
            nome: nome,
            preco: preco,
            quantidade: quantidade
        }

        const response = await axios.post("http://localhost:3000/api/produtos", obj)
        console.log(response)

        buscaTodos()
    }

    function atualizaProduto() { }
    function removeProduto() { }

    function formataData( valor ){
        let data = valor.split("T")[0]
        let hora = valor.split("T")[1]

        data = data.split("-")
        data = data.reverse()
        data = data.join("/")

        hora = hora.split(".")[0]
        hora = hora.split(":")
        hora = hora[0]+":"+hora[1]

        return data + " às "+hora
    }

    useEffect(() => {
        buscaTodos()
    }, [])

    return (
        <div>

            <style>
                {` td{border: 1px solid grey} `}
            </style>

            <style>
                {`table{border: 1px solid black}`}
            </style>

            <h1>Gereciamento de produtos</h1>

            <button>Listagem</button>
            <button>Cadastro</button>

            <hr />

            <h2>Listagem</h2>

            {
                produtos.length > 0 ?
                    <table>
                        <tr>
                            <td>ID</td>
                            <td>Nome</td>
                            <td>Preço</td>
                            <td>Quantidade</td>
                            <td>Registro</td>
                        </tr>

                        {
                            produtos.map(i =>

                                <tr>
                                    <td>{i.id}</td>
                                    <td>{i.nome}</td>
                                    <td>R$ {i.preco.toFixed(2)}</td>
                                    <td>{i.quantidade}</td>
                                    <td>{ formataData(i.registro)}</td>
                                </tr>
                            )
                        }

                    </table>
                    :
                    <p>Carregando...</p>

            }


            <h2>Cadastro</h2>

            <form onSubmit={(e)=>insereProduto(e)}>
                <label>Digite o nome do produto: <br /> <input onChange={(e)=> setnome(e.target.value)}/> </label>
                <br />
                <label>Digite o preço: <br /> <input onChange={(e)=> setpreco(e.target.value)}/> </label>
                <br />
                <label>Digite a quantidade: <br /> <input onChange={(e)=> setquantidade(e.target.value)}/> </label>
                <br />
                <button>Salvar</button>
            </form>

        </div>



    );
}

export default Home;