import { Validador } from "../../../shared/domain/value-objects/Validador";
import { ValueObject } from "../../../shared/domain/ValueObject";

export enum permissions  {
    //USERS
    VerUsuarios = 'verUsuarios',
    CriarUsuarios = 'criarUsuarios',
    DeletarUsuarios = 'deletarUsuarios',
    EditarUsuarios ='editarUsuarios',
    VerInfoUsuario = 'verInfoUsuario',  

    //ALUNOS
    VerAlunos = 'verAlunos',
    CriarAlunos = 'criarAlunos',
    DeletarAlunos = 'deletarAlunos',
    EditarAlunos ='editarAlunos', 
    VerInfoAluno = 'verInfoAluno',

    //TAREFAS
    CriarTarefas = 'criarTarefas',

    //TURMAS

    //FUNCIONARIOS

    //FINANCEIRO
}

export class Permissoes extends ValueObject<string[]> {
    private constructor(valor: string[]){
        super(valor)
    }
    static criar(permissoes: string[]){
        const resultado = Validador.combinar(
        Validador.tamanhoMaximoArray(permissoes, Object.values(permissions).length, "Permissões"),
    );
    if (!resultado.valido) {
        throw new Error(resultado.erro);
    }
    for(const permissao of permissoes){
        if(!Object.values(permissions).includes(permissao) && permissao != '') throw new Error('Permissão inválida')
    }

    return new Permissoes(permissoes)
    }
    static giveAllPermissoes(userPermissions : string[]){
        userPermissions.length = 0; 
        userPermissions.push(...Object.values(permissions));
    }
    static comparePermissions(permissions : string[], userPermissions : string[]): boolean{
       return permissions.every(permissao => userPermissions.includes(permissao))
    }
}