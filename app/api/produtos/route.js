import conexao from "@/app/lib/conexao";

export async function GET(){

    const [results] = await conexao.execute("SELECT * FROM produtos");
    return new Response(JSON.stringify(results));

}

// Nível 1, inserção manual simples
//export async function POST2(request){
    
    //const body = await request.json();
    
    //const produto = {
        //id_fornecedor: body.id_fornecedor,
        //nome: body.nome,
        //descricao: body.descricao,
       //preco: body.preco,
        //quantidade: body.quantidade,
    //}

    //const [results] = await conexao.execute(
       //`
            //INSERT INTO produtos
                //(id_fornecedor, nome, descricao, preco, quantidade)
                //VALUES
                //(${produto.id_fornecedor}, '${produto.nome}', '${produto.descricao}', ${produto.preco}, ${produto.quantidade});
        //`
    //)

    //return new Response(JSON.stringify(results));

//}

// Nível 2, inserção automática por referencia
export async function POST(request){
    
    const body = await request.json();

    const produto = {
        id: body.id,
        id_fornecedor: body.id_fornecedor,
        nome: body.nome,
        descricao: body.descricao,
        preco: body.preco,
        quantidade: body.quantidade,
    }

    const [results] = await conexao.execute(
        `
            INSERT INTO produtos
                (id, id_fornecedor, nome, descricao, preco, quantidade)
                VALUES
                (?, ?, ?, ?, ?, ?);
        `,
        [produto.id, produto.id_fornecedor, produto.nome, produto.descricao, produto.preco, produto.quantidade]
    )

    return new Response(JSON.stringify(results.insertId));

}