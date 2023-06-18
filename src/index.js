import fs from 'fs';
import chalk from "chalk";

function extraiLinks(texto) {
    const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm; //selecionando links atraves das expressoes regulares
    const capturas = [...texto.matchAll(regex)];
    const resultados = capturas.map(captura => ({[captura[1]]: captura[2]}))
    return resultados.length !==0 ? resultados : "não há links no arquivo";
}

function trataErro(erro) {
    console.log(erro);
    throw new Error(chalk.red(erro.code, 'não há arquivo no diretório'));
}

//Na resolução de promessas, existem dois métodos mais utilizados: o .then() e as palavras-chave async e await.

//promises com async(assincrona) e await(aguardar)
async function pegaArquivo(caminhoDoArquivo) { 
    try {
        const encoding = 'utf8';
        const texto = await fs.promises.readFile(caminhoDoArquivo, encoding) 
        return extraiLinks(texto);
    } catch(erro) {
        trataErro(erro);
    } finally {
        console.log(chalk.blue('Abrindo arquivo'));
    }
}

export default pegaArquivo;


