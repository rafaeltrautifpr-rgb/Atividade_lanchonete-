
let nomesProdutos = [];
let precosProdutos = [];
let totaisVendas = [];

function cadastrarProduto() {
    let nome = prompt("Digite o nome do produto:");

    if (nome == null || nome.trim() == "") {
        alert("Nome inválido!");
        return;
    }

    for (let i = 0; i < nomesProdutos.length; i++) {
        if (nomesProdutos[i].toLowerCase() == nome.trim().toLowerCase()) {
            alert("Este produto já está cadastrado!");
            return;
        }
    }

    let preco = Number(prompt("Digite o preço do produto:"));

    if (isNaN(preco) || preco <= 0) {
        alert("Preço inválido! Deve ser maior que zero.");
        return;
    }

    nomesProdutos.push(nome.trim());
    precosProdutos.push(preco);

    alert("Produto cadastrado com sucesso!");
}

function listarProdutos() {
    if (nomesProdutos.length == 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    let mensagem = "PRODUTOS CADASTRADOS\n\n";

    for (let i = 0; i < nomesProdutos.length; i++) {
        mensagem += "Código: " + (i + 1) + "\n";
        mensagem += "Produto: " + nomesProdutos[i] + "\n";
        mensagem += "Preço: R$ " + precosProdutos[i].toFixed(2) + "\n\n";
    }

    alert(mensagem);
}

function calcularTotalVenda(preco, quantidade) {
    let total = preco * quantidade;
    return total;
}

function calcularDesconto(total) {
    let desconto = 0;

    if (total > 50) {
        desconto = total * 0.10;
    }

    return desconto;
}

function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {
    let total = subtotal - desconto;

    let mensagem = "RESUMO DA VENDA\n\n";
    mensagem += "Produto: " + nome + "\n";
    mensagem += "Preço unitário: R$ " + preco.toFixed(2) + "\n";
    mensagem += "Quantidade: " + quantidade + "\n";
    mensagem += "Subtotal: R$ " + subtotal.toFixed(2) + "\n";
    mensagem += "Desconto: R$ " + desconto.toFixed(2) + "\n";
    mensagem += "Valor final: R$ " + total.toFixed(2);

    alert(mensagem);
}

function realizarVenda() {
    if (nomesProdutos.length == 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    listarProdutos();

    let codigo = Number(prompt("Digite o código do produto desejado:"));

    if (isNaN(codigo) || codigo < 1 || codigo > nomesProdutos.length || !Number.isInteger(codigo)) {
        alert("Código de produto inválido!");
        return;
    }

    let quantidade = Number(prompt("Digite a quantidade desejada:"));

    if (isNaN(quantidade) || quantidade <= 0 || !Number.isInteger(quantidade)) {
        alert("Quantidade inválida!");
        return;
    }

    let posicao = codigo - 1;

    let nome = nomesProdutos[posicao];
    let preco = precosProdutos[posicao];

    let subtotal = calcularTotalVenda(preco, quantidade);
    let desconto = calcularDesconto(subtotal);
    let total = subtotal - desconto;

    exibirResumoVenda(nome, preco, quantidade, subtotal, desconto);

    let confirmar = confirm("Deseja concluir esta venda?");

    if (confirmar) {
        totaisVendas.push(total);
        alert("Venda concluída com sucesso!");
    } else {
        alert("Venda cancelada!");
    }
}

function obterTotalVendasDia() {
    let total = 0;

    for (let i = 0; i < totaisVendas.length; i++) {
        total += totaisVendas[i];
    }

    return total;
}

function exibirTotalVendasDia() {
    if (totaisVendas.length == 0) {
        alert("Não existem vendas registradas.");
        return;
    }

    let total = obterTotalVendasDia();

    let mensagem = "TOTAL DE VENDAS DO DIA\n\n";
    mensagem += "Quantidade de vendas: " + totaisVendas.length + "\n";
    mensagem += "Valor total vendido: R$ " + total.toFixed(2);

    alert(mensagem);
}

function exibirMenu() {
    let mensagem = "SISTEMA DE CAIXA - LANCHONETE\n\n";
    mensagem += "1. Cadastrar produto\n";
    mensagem += "2. Listar produtos cadastrados\n";
    mensagem += "3. Realizar venda\n";
    mensagem += "4. Consultar total de vendas do dia\n";
    mensagem += "5. Encerrar sistema";

    return Number(prompt(mensagem));
}

function iniciarSistema() {
    let opcao = 0;

    while (opcao != 5) {
        opcao = exibirMenu();

        switch (opcao) {
            case 1:
                cadastrarProduto();
                break;

            case 2:
                listarProdutos();
                break;

            case 3:
                realizarVenda();
                break;

            case 4:
                exibirTotalVendasDia();
                break;

            case 5:
                alert("Sistema encerrado!");
                break;

            default:
                alert("Opção inválida!");
                break;
        }
    }
}

iniciarSistema();
