import { ValueObject } from "../../../shared/domain/ValueObject";

enum permissions  {
    //USERS
    VerUsuarios = 'verUsuarios',        //Permissão para listar usuários da empresa
    CriarUsuarios = 'criarUsuarios',    //Permissão para criar usuários
    DeletarUsuarios = 'deletarUsuarios',//Permissão para deletar usuários
    EditarUsuarios ='editarUsuarios',  //Permissão para editar usuários
    VerInfoUsuario = 'verInfoUsuario',  //Permissão para dar get em um usuário

    //ALUNOS

    //TAREFAS
    CriarTarefas = 'criarTarefas',

    //TURMAS

    //FUNCIONARIOS

    //FINANCEIRO
}

const permissionEnum = z.nativeEnum(permissions)

export const permissionSchema= z.array(permissionEnum)

export class Permissoes extends ValueObject<string[]> {
    private constructor(valor: string[]){
        super(valor)
    }

    static giveAllPermissoes(userPermissions : string[]){
        userPermissions.length = 0; 
        userPermissions.push(
            'verUsuarios', 'criarUsuarios', 'deletarUsuarios', 'editarUsuarios', 
            'verInfoUsuario', 'verDados', 'editarDados', 'verItens', 'adicionarItens', 'editarItens',
            'deletarItens', 'verEntidades', 'adicionarEntidades', 'editarEntidades',
            'deletarEntidades', 'criarTarefas', 'verPropostas', 'deletarPropostas', 'criarPropostas');
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