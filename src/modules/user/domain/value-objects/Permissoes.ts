import { ValueObject } from "../../../shared/domain/ValueObject";

export enum permissions  {
    //USERS
    VerUsuarios = 'verUsuarios',        //Permissão para listar usuários da empresa
    CriarUsuarios = 'criarUsuarios',    //Permissão para criar usuários
    DeletarUsuarios = 'deletarUsuarios',//Permissão para deletar usuários
    EditarUsuarios ='editarUsuarios',  //Permissão para editar usuários
    VerInfoUsuario = 'verInfoUsuario',  //Permissão para dar get em um usuário

    //ALUNOS
    VerAlunos = 'verAlunos',            //Permissão para listar os alunos
    CriarAlunos = 'criarAlunos',    //Permissão para criar usuários
    DeletarAlunos = 'deletarAlunos',//Permissão para deletar usuários
    EditarAlunos ='editarAlunos',  //Permissão para editar usuários
    VerInfoAluno = 'verInfoAluno',  //Permissão para dar get em um usuário

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

    static giveAllPermissoes(userPermissions : string[]){
        userPermissions.length = 0; 
        userPermissions.push(...Object.values(Permissoes));
    }

    static comparePermissions(permissions : string[], userPermissions : string[]){
       if(permissions.every(permissao => userPermissions.includes(permissao))){
        return true
       } else {
        return false
       }
    }

    static validatePermissions(permissions : string[]){
        try{
            permissionSchema.parse(permissions);
        }catch(error){
            throw new InvalidPermissoesError();
        }
        return permissions;
    } 

    static mudarPermissoes(permissions : string[], userPermissions : string[]){
        try{
            Permissoes.validatePermissions(permissions);
        }catch(error){
            throw new InvalidPermissoesError();

        }
        return userPermissions = permissions;
    }

    
}