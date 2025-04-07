'use client'
import axios from "axios";
import { redirect, useParams } from "next/navigation";
import { useEffect, useState } from "react";


    function Produto(){

        const id = useParams().id

        const [produtos, setProdutos] = useState([])

        async function buscaPorID( id ) {

            const response = await axios.get("http://localhost:3000/api/produtos/"+id)
            setProdutos(response.data)
    
         }

         useEffect(()=> {
            if(id){
                buscaPorID(id)
            }
         }, [id])

    return ( 
        <div>
            <h1>Detalhes do produto { useParams().id } </h1>

            <hr/>

            {
                produtos.length > 0 &&
                <div>
                    <p><strong>{produtos[0].nome}</strong></p>
                    <p>R$ <strong>{produtos[0].preco.toFixed(2)}</strong></p>
                    <p>Quantidade em estoque: <strong>{produtos[0].quantidade}</strong></p>
                    <button onClick={()=> redirect("/")}>Voltar</button>
                </div>
            }



        </div>

     );
    }

export default Produto;
