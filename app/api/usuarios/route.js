


export async function GET (){

    const usuarios = [
        {nome: "Conradito", idade: 15},
        {nome: "Pedrita", idade: 22},
        {nome: "Josélito", idade: 19},
    ]





    return new Response(
        JSON.stringify(usuarios) ,
        {
            status: 200,
            headers: { "content-type": "application/json" } 
        }
    )
}