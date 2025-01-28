import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { styleText } from 'node:util';
import fs from 'node:fs'
const rl = readline.createInterface({ input, output });


const alunos = [];


async function salvarDados() {
    const caminhoArquivo = 'escolinha.json';
    const alunosString = JSON.stringify(alunos);
    fs.writeFileSync(caminhoArquivo, alunosString);
}

function mostrarAzul(mostrar) {
    console.log(styleText(['bold', 'blue'], mostrar))
}

function linhaEmbaixo(mostrar) {
    console.log(styleText(['underline', 'italic'], mostrar))
}

function mostrarVerde(mostrar) {
    console.log(styleText(['bold', 'green'], mostrar))
}

function mostrarVermelho(mostrar) {
    console.log(styleText(['bold', 'red'], mostrar))
}

async function buscarAluno(texto) {
    console.clear();
    const nome = await rl.question('Coloque o nome do Aluno corretamente conforme está na lista\n\n' + texto);
    const alunosEncontrados = [];
    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].nome.toLowerCase().indexOf(nome.toLowerCase()) !== -1) {
            alunosEncontrados.push(alunos[i])
            mostrarAzul('ID:' + alunos[i].id + ' ' + alunos[i].nome + ', ' + alunos[i].idade + ',' + ' sala: ' + alunos[i].sala)
        }
    }
    if (alunosEncontrados.length == 0) {
        mostrarVermelho('Não encontrou aluno')
        return false
    }
    return true
}


async function atualizarAluno() {
    console.clear();
    const encontrou = await buscarAluno('Buscar aluno que deseja alterar: ');
    if (encontrou == false) {
        return
    }
    let encontrouAluno = false

    const idAlterar = await rl.question('Digite o ID do aluno que deseja alterar: ')

    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].id == idAlterar) {
            encontrouAluno = true

            const interfaceAlterar = await rl.question('PARA ALTERAR NOME DO ALUNO (1)\n\nPARA ALTERAR IDADE DO ALUNO (2)\n\nPARA ALTERAR SALA DO ALUNO (3)\n\nDigite a opção desejada: ');
            if (interfaceAlterar == '1') {
                const novoNome = await rl.question('Digite o novo nome do aluno: ');
                const antigoNome = alunos[i].nome
                alunos[i].nome = novoNome
                mostrarVerde('Você alterou o nome de ' + antigoNome + ' Para ' + novoNome)
            }
            if (interfaceAlterar == '2') {
                const antigaIdade = alunos[i].idade
                const novaIdade = await rl.question('Digite para qual idade alterar: ')
                alunos[i].idade = novaIdade
                mostrarVerde('Você alterou idade de ' + alunos[i].nome + ' Para ' + novaIdade)
            }
            if (interfaceAlterar == '3') {
                const antigaSala = alunos[i].sala
                const novaSala = await rl.question('Digite para qual sala alterar: ')
                alunos[i].sala = novaSala
                mostrarVerde('Você alterou a sala de' + alunos[i].nome + ' Para ' + novaSala)
            }
        }

    }
    if (encontrouAluno == false) {
        mostrarVermelho('Aluno nao encontrado, lembre-se de escrever o nome corretamente!')
    }

}

let id = 1
async function cadastrarAluno() {
    console.clear();
    const nome = await rl.question('Digite o nome completo do aluno: ');
    mostrarVerde('Você cadastrou nome: ' + nome)
    const idade = await rl.question('Digite a idade do aluno: ')
    mostrarVerde('Você cadastrou a idade de: ' + nome + ' a idade é: ' + idade)
    const sala = await rl.question('Digite a sala do Aluno: ')
    mostrarVerde('Você cadastrou: ' + nome + ' na sala: ' + sala)
    alunos.push({
        id: id,
        nome: nome,
        idade: idade,
        sala: sala,
        nota: {
            matematica1: 0,
            matematica2: 0,
            portugues1: 0,
            portugues2: 0,
            portugues2: 0,
            historia1: 0,
            historia2: 0,
            fisica1: 0,
            fisica2: 0,
            biologia1: 0,
            biologia2: 0,
            quimica1: 0,
            quimica2: 0,
            geografia1: 0,
            geografia2: 0,
            filosofia1: 0,
            filosofia2: 0,
            sociologia1: 0,
            sociologia2: 0,
            linguas1: 0,
            linguas2: 0,
        },
    })
    await salvarDados();

    id++
    const opcoes = await rl.question('Aperte (1) para Cadastrar outro aluno\nAperte (2) para Sair\nDigite: ')
    if (opcoes == '1') {
        await cadastrarAluno();
    }
}

function listarAlunos() {
    console.clear();
    for (let i = 0; i < alunos.length; i++) {
        mostrarAzul('ID:' + alunos[i].id + ' ' + alunos[i].nome + ', ' + alunos[i].idade + ' sala: ' + alunos[i].sala)
    }
}

async function removerAluno() {
    console.clear();
    let confirmacao = await rl.question('Deseja apagar um aluno? (S)sim/ (N)não: ')
    confirmacao = confirmacao.toLowerCase();
    if (confirmacao == 's') {
        const encontrou = await buscarAluno('Buscar aluno que deseja remover: ');
        if (encontrou == false) {
            return
        }
        const idAlterar = await rl.question('Digite o ID do aluno que deseja alterar: ')

        for (let i = 0; i < alunos.length; i++) {
            if (alunos[i].id == idAlterar) {
                const interfaceAlterar = await rl.question('Para remover (1)\n\nPara voltar (2)\n Digite:');
                if (interfaceAlterar == '1') {
                    const antigoNome = alunos[i].nome
                    alunos.splice(i, 1)
                    mostrarVerde('Você removeu ' + antigoNome)
                }
            }
        }

    }
    else if (confirmacao == 'n') {
        return
    }
}
async function cadastrarNotas() {

    const interfaceNotas = await rl.question('PARA REGISTRAR NOTAS APERTE (1)\nPARA SAIR APERTE (2)\n\nDigite: ');

    if (interfaceNotas == '1') {
        const buscaAluno = await buscarAluno('Buscar aluno que deseja cadastrar Notas: ');
        if (buscaAluno == false) {
            return;
        }
        const idAlterar = await rl.question('Digite o ID do aluno que deseja alterar: ');

        for (let i = 0; i < alunos.length; i++) {
            if (alunos[i].id == idAlterar) {
                linhaEmbaixo('\nMATEMÁTICA\nLINGUA PORTUGUÊSA\nHISTÓRIA\nFISÍCA\nBIOLOGIA\nQUÍMICA\nGEOGRAFIA\nFILOSOFIA\nSOCIOLOGIA\nLINGUAS ESTRANGEIRAS\nDigite a matéria que deseja cadastrar notas: ');
                let escolherMateria = await rl.question('Escolha a matéria: ');
                escolherMateria = escolherMateria.toLowerCase();

                if (escolherMateria == 'matematica' || escolherMateria == 'matemática') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaMatematica1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Matemática: ');
                        notaMatematica1 = parseInt(notaMatematica1);
                        if (notaMatematica1 >= 0 && notaMatematica1 <= 10) {
                            alunos[i].nota.matematica1 = notaMatematica1
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em matemática semestre 1 sua nota é: ' + alunos[i].nota.matematica1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaMatematica2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Matemática: ');
                        notaMatematica2 = parseInt(notaMatematica2);
                        if (notaMatematica2 >= 0 && notaMatematica2 <= 10) {
                            alunos[i].nota.matematica2 = notaMatematica2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em matemática semestre 2 sua nota é: ' + alunos[i].nota.matematica2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
                if (escolherMateria == 'lingua portuguesa' || escolherMateria == 'portugues' || escolherMateria == 'português' || escolherMateria == 'lingua portuguesa') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaPortugues1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Língua Portuguesa: ');
                        notaPortugues1 = parseInt(notaPortugues1);
                        if (notaPortugues1 >= 0 && notaPortugues1 <= 10) {
                            alunos[i].nota.portugues1 = notaPortugues1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em português semestre 1 sua nota é: ' + alunos[i].nota.portugues1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaPortugues2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Língua Portuguesa: ');
                        notaPortugues2 = parseInt(notaPortugues2);
                        if (notaPortugues2 >= 0 && notaPortugues2 <= 10) {
                            alunos[i].nota.portugues2 = notaPortugues2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em português semestre 2 sua nota é: ' + alunos[i].nota.portugues2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
                if (escolherMateria == 'historia' || escolherMateria == 'história') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaHistoria1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em História: ');
                        notaHistoria1 = parseInt(notaHistoria1);
                        if (notaHistoria1 >= 0 && notaHistoria1 <= 10) {
                            alunos[i].nota.historia1 = notaHistoria1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em história semestre 1 sua nota é: ' + alunos[i].nota.historia1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaHistoria2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em História: ');
                        notaHistoria2 = parseInt(notaHistoria2);
                        if (notaHistoria2 >= 0 && notaHistoria2 <= 10) {
                            alunos[i].nota.historia2 = notaHistoria2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em história semestre 2 sua nota é: ' + alunos[i].nota.historia2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10. ');
                        }
                    }
                }
                if (escolherMateria == 'fisica' || escolherMateria == 'física') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaFisica1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Física: ');
                        notaFisica1 = parseInt(notaFisica1);
                        if (notaFisica1 >= 0 && notaFisica1 <= 10) {
                            alunos[i].nota.fisica1 = notaFisica1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em física semestre 1 sua nota é: ' + alunos[i].nota.fisica1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaFisica2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Física: ');
                        notaFisica2 = parseInt(notaFisica2);
                        if (notaFisica2 >= 0 && notaFisica2 <= 10) {
                            alunos[i].nota.fisica2 = notaFisica2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em física semestre 2 sua nota é: ' + alunos[i].nota.fisica2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
                if (escolherMateria == 'biologia') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaBiologia1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Biologia: ');
                        notaBiologia1 = parseInt(notaBiologia1);
                        if (notaBiologia1 >= 0 && notaBiologia1 <= 10) {
                            alunos[i].nota.biologia1 = notaBiologia1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em biologia semestre 1 sua nota é: ' + alunos[i].nota.biologia1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaBiologia2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Biologia: ');
                        notaBiologia2 = parseInt(notaBiologia2);
                        if (notaBiologia2 >= 0 && notaBiologia2 <= 10) {
                            alunos[i].nota.biologia2 = notaBiologia2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em biologia semestre 2 sua nota é: ' + alunos[i].nota.biologia2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
                if (escolherMateria == 'quimica') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaQuimica1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Química: ');
                        notaQuimica1 = parseInt(notaQuimica1);
                        if (notaQuimica1 >= 0 && notaQuimica1 <= 10) {
                            alunos[i].nota.quimica1 = notaQuimica1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em química semestre 1 sua nota é: ' + alunos[i].nota.quimica1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaQuimica2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Química: ');
                        notaQuimica2 = parseInt(notaQuimica2);
                        if (notaQuimica2 >= 0 && notaQuimica2 <= 10) {
                            alunos[i].nota.quimica2 = notaQuimica2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em química semestre 2 sua nota é: ' + alunos[i].nota.quimica2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
                if (escolherMateria == 'geografia') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaGeografia1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Geografia: ');
                        notaGeografia1 = parseInt(notaGeografia1);
                        if (notaGeografia1 >= 0 && notaGeografia1 <= 10) {
                            alunos[i].nota.geografia1 = notaGeografia1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em geografia semestre 1 sua nota é: ' + alunos[i].nota.geografia1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaGeografia2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Geografia: ');
                        notaGeografia2 = parseInt(notaGeografia2);
                        if (notaGeografia2 >= 0 && notaGeografia2 <= 10) {
                            alunos[i].nota.geografia2 = notaGeografia2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em geografia semestre 2 sua nota é: ' + alunos[i].nota.geografia2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
                if (escolherMateria == 'filosofia') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaFilosofia1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Filosofia: ');
                        notaFilosofia1 = parseInt(notaFilosofia1);
                        if (notaFilosofia1 >= 0 && notaFilosofia1 <= 10) {
                            alunos[i].nota.filosofia1 = notaFilosofia1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em filosofia semestre 1 sua nota é: ' + alunos[i].nota.filosofia1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaFilosofia2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Filosofia: ');
                        notaFilosofia2 = parseInt(notaFilosofia2);
                        if (notaFilosofia2 >= 0 && notaFilosofia2 <= 10) {
                            alunos[i].nota.filosofia2 = notaFilosofia2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em filosofia semestre 2 sua nota é: ' + alunos[i].nota.filosofia2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
                if (escolherMateria == 'sociologia') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaSociologia1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Sociologia: ');
                        notaSociologia1 = parseInt(notaSociologia1);
                        if (notaSociologia1 >= 0 && notaSociologia1 <= 10) {
                            alunos[i].nota.sociologia1 = notaSociologia1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em sociologia semestre 1 sua nota é: ' + alunos[i].nota.sociologia1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaSociologia2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Sociologia: ');
                        notaSociologia2 = parseInt(notaSociologia2);
                        if (notaSociologia2 >= 0 && notaSociologia2 <= 10) {
                            alunos[i].nota.sociologia2 = notaSociologia2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em sociologia semestre 2 sua nota é: ' + alunos[i].nota.sociologia2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
                if (escolherMateria == 'linguas estrangeiras' || escolherMateria == 'linguas') {
                    console.clear();
                    const selecionarBimestre = await rl.question('1 Semestre, 2 Semestre\nDigite: ');
                    if (selecionarBimestre == '1') {
                        let notaLinguas1 = await rl.question('Digite a nota que o Aluno teve no 1 Semestre em Línguas Estrangeiras: ');
                        notaLinguas1 = parseInt(notaLinguas1);
                        if (notaLinguas1 >= 0 && notaLinguas1 <= 10) {
                            alunos[i].nota.linguas1 = notaLinguas1;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em línguas estrangeiras semestre 1 sua nota é: ' + alunos[i].nota.linguas1);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                    if (selecionarBimestre == '2') {
                        let notaLinguas2 = await rl.question('Digite a nota que o Aluno teve no 2 Semestre em Línguas Estrangeiras: ');
                        notaLinguas2 = parseInt(notaLinguas2);
                        if (notaLinguas2 >= 0 && notaLinguas2 <= 10) {
                            alunos[i].nota.linguas2 = notaLinguas2;
                            mostrarVerde('Você cadastrou a nota do aluno ' + alunos[i].nome + ' em línguas estrangeiras semestre 2 sua nota é: ' + alunos[i].nota.linguas2);
                        }
                        else {
                            mostrarVermelho('Nota inválida! A nota deve ser entre 0 e 10.');
                        }
                    }
                }
            }
        }
    }
    await salvarDados();

    if (interfaceNotas == '2') {
        return;
    } else {
        mostrarVermelho('Opção inválida! Tente novamente.');
    }
}

async function verNotas() {
    await buscarAluno('Digite o nome do Aluno que deseja ver as notas: ');

    const pegarId = await rl.question('Digite o ID do aluno que deseja ver as notas: ');

    for (let i = 0; i < alunos.length; i++) {
        if (alunos[i].id == pegarId) {
            let aguardarMateria = await rl.question('Selecione a matéria:\nMATEMÁTICA\nLINGUA PORTUGUÊSA\nHISTÓRIA\nFISÍCA\nBIOLOGIA\nQUÍMICA\nGEOGRAFIA\nFILOSOFIA\nSOCIOLOGIA\nLINGUAS ESTRANGEIRAS\nDigite a matéria: ');
            aguardarMateria = aguardarMateria.toLowerCase();

            if (aguardarMateria == 'matematica' || aguardarMateria == 'matemática') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.matematica1 + ', 2 Semestre: ' + alunos[i].nota.matematica2);
            }
            if (aguardarMateria == 'portugues' || aguardarMateria == 'português' || aguardarMateria == 'lingua portuguesa') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.portugues1 + ', 2 Semestre: ' + alunos[i].nota.portugues2);
            }
            if (aguardarMateria == 'historia' || aguardarMateria == 'história') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.historia1 + ', 2 Semestre: ' + alunos[i].nota.historia2);
            }
            if (aguardarMateria == 'fisica' || aguardarMateria == 'física') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.fisica1 + ', 2 Semestre: ' + alunos[i].nota.fisica2);
            }
            if (aguardarMateria == 'biologia') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.biologia1 + ', 2 Semestre: ' + alunos[i].nota.biologia2);
            }
            if (aguardarMateria == 'quimica' || aguardarMateria == 'química') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.quimica1 + ', 2 Semestre: ' + alunos[i].nota.quimica2);
            }
            if (aguardarMateria == 'geografia') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.geografia1 + ', 2 Semestre: ' + alunos[i].nota.geografia2);
            }
            if (aguardarMateria == 'filosofia') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.filosofia1 + ', 2 Semestre: ' + alunos[i].nota.filosofia2);
            }
            if (aguardarMateria == 'sociologia') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.sociologia1 + ', 2 Semestre: ' + alunos[i].nota.sociologia2);
            }
            if (aguardarMateria == 'linguas estrangeiras' || aguardarMateria == 'linguas estrangeiras') {
                mostrarVerde('1 Semestre: ' + alunos[i].nota.linguas1 + ', 2 Semestre: ' + alunos[i].nota.linguas2);
            }
        }
    }
}

let sair = false

do {
    const mostrarMenu = await rl.question('Selecione a opção desejada\n\nCADASTRO (1)\n\nLISTAR ALUNOS (2)\n\nATUALIZAR ALUNOS(3)\n\nREMOVER ALUNOS (4)\n\nCADASTRAR NOTAS (5)\n\nVER NOTAS (6)\n\nSAIR (7)\n\nSelecione a opçao:')
    if (mostrarMenu == '1') {
        await cadastrarAluno();
    }
    if (mostrarMenu == '2') {
        console.log('A lista de alunos registrados são:\n')
        listarAlunos();
    }
    if (mostrarMenu == '3') {
        await atualizarAluno();
    }
    if (mostrarMenu == '4') {
        await removerAluno();
    }
    if (mostrarMenu == '5') {
        await cadastrarNotas();
    }
    if (mostrarMenu == '6') {
        await verNotas();
    }
    if (mostrarMenu == '7') {
        mostrarVermelho('Você saiu do programa!')
        sair = true
    }
}
while (sair === false)

rl.close();