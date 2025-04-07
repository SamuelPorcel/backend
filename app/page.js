'use client'
import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function Home() {

    const [produtos, setprodutos] = useState([])

    const [editando, setEditando] = useState(0)
    const [pesquisa, setPesquisa] = useState("")

    const [nome, setnome] = useState([])
    const [preco, setpreco] = useState([])
    const [quantidade, setquantidade] = useState([])

    async function buscaTodos() {
        const response = await axios.get("http://localhost:3000/api/produtos")
        setprodutos(response.data)
    }

    async function buscaPorID( id ) {

        const response = await axios.get("http://localhost:3000/api/produtos/"+id)
        setprodutos(response.data)

     }

    function buscaPorNome() { }

    async function insereProduto() {

        const obj = {
            nome: nome,
            preco: preco,
            quantidade: quantidade
        }

        const response = await axios.post("http://localhost:3000/api/produtos", obj)
        console.log(response)

        buscaTodos()
    }

    async function atualizaProduto() {

        const obj = {
            nome: nome,
            preco: preco,
            quantidade: quantidade
        }

        const response = await axios.put("http://localhost:3000/api/produtos/"+editando, obj)

        buscaTodos()

        setEditando(0)
        setnome("")
        setpreco("")
        setquantidade("")

     }

    async function removeProduto( id ) {
        await axios.delete("http://localhost:3000/api/produtos/"+id)
        buscaTodos()
     }

    function formataData(valor) {
        let data = valor.split("T")[0]
        let hora = valor.split("T")[1]

        data = data.split("-")
        data = data.reverse()
        data = data.join("/")

        hora = hora.split(".")[0]
        hora = hora.split(":")
        hora = hora[0] + ":" + hora[1]

        return data + " às " + hora
    }

    function montaEdicao( produto ){
        setEditando(produto.id)
        setnome(produto.nome)
        setpreco(produto.preco)
        setquantidade(produto.quantidade)
    }

    function enviaFormulário(e){
        e.preventDefault()

        if( editando == 0 ){
            insereProduto()
        }else{
            atualizaProduto()
        }
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

            <p>Busca por ID</p>
            <input onChange={(e)=> setPesquisa(e.target.value)}/>
            <button onClick={()=> buscaPorID(pesquisa)}>Pesquisar</button>

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
                                    <td>{formataData(i.registro)}</td>

                                    <td> 
                                        <button onClick={()=> redirect("/produto/"+i.id)}>Ver</button>
                                        <button onClick={()=> montaEdicao(i)}>Editar</button>
                                        <button onClick={()=> removeProduto(i.id)}>Remover</button>
                                    </td>
                                </tr>
                            )
                        }

                    </table>
                    :
                    <p>Carregando...</p>

            }


            <h2>Cadastro</h2>

            <form onSubmit={(e) => enviaFormulário(e)}>
                <label>Digite o nome do produto: <br /> <input onChange={(e) => setnome(e.target.value)} value={nome} /> </label>
                <br />
                <label>Digite o preço: <br /> <input onChange={(e) => setpreco(e.target.value)} value={preco} /> </label>
                <br />
                <label>Digite a quantidade: <br /> <input onChange={(e) => setquantidade(e.target.value)} value={quantidade} /> </label>
                <br />
                <button>Salvar</button>
            </form>

            <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        </div>

    );
}

export default Home;