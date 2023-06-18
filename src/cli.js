#!/usr/bin/env node

import chalk from "chalk";
import fs from "fs"
import pegaArquivo from "./index.js";
import listaValidada from "./http-validacao.js";

async function imprimeLista(valida, resultado, identificador = '') {

    if (valida) {
        console.log(
            chalk.blueBright('lista validada'), 
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));

    } else {
        console.log(
            chalk.blueBright('lista de links'), 
            chalk.black.bgGreen(identificador),
            resultado);
    }

}

const caminho = process.argv;

async function processaTexto(argumentos) {
    const caminho = argumentos[2];
    const valida = argumentos[3] === "--valida"; // --valida sendo true ou false 
    

    try {
        fs.lstatSync(caminho);
    } catch(erro) {
        if(erro.code === "ENOENT") {
            console.log("arquivo ou diretório não existe");
            return;
        }
    }

    if (fs.lstatSync(caminho).isFile()) {
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(caminho).isDirectory()) {
        const arquivos = await fs.promises.readdir(caminho)
        arquivos.forEach(async(nomeDeArquivo) => {
            const lista= await pegaArquivo(`${caminho}/${nomeDeArquivo}`)
            imprimeLista(valida, lista, nomeDeArquivo); 
        })
    }
}

processaTexto(caminho);

