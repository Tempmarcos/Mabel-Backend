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
    VerTurmas = 'verTurmas',
    CriarTurmas = 'criarTurmas',
    DeletarTurmas = 'deletarTurmas',
    EditarTurmas ='editarTurmas',
    FazerChamada = 'fazerChamada',

    //FUNCIONARIOS
    VerFuncionarios = 'verFuncionarios',
    CriarFuncionarios = 'criarFuncionarios',
    DeletarFuncionarios = 'deletarFuncionarios',
    EditarFuncionarios ='editarFuncionarios', 
    VerInfoFuncionario = 'verInfoFuncionario',

    //FINANCEIRO
    VerFinanceiro = 'verFinanceiro',
    CriarRegistro = 'criarRegistro',
    DeletarRegistro = 'deletarRegistro',
    EditarRegistro = 'editarRegistro',
}

export class Permissoes extends ValueObject<string[]> {
    private constructor(valor: string[]){
        super(valor)
    }
    static criar(permissoes: permissions[]){
        const resultado = Validador.combinar(
            Validador.tamanhoMaximoArray(permissoes, Object.values(permissions).length, "Permissões"),
        );
        if (!resultado.valido) {
            throw new Error(resultado.erro);
        }
        for(const permissao of permissoes){
            if(!Object.values(permissions).includes(permissao)) throw new Error('Permissão inválida')
        }

        return new Permissoes([...new Set(permissoes)])
    }
    static todasAsPermissoes(): Permissoes {
        return new Permissoes([...Object.values(permissions)]);
    }
    public possuiTodasDe(outra: Permissoes): boolean{
       return this.valor.every(permissao => outra.valor.includes(permissao))
    }
    public possui(permissao: permissions): boolean {
    return this.valor.includes(permissao);
    }
    public possuiAlgumaDe(outra: Permissoes): boolean {
        return outra.valor.some(p => this.valor.includes(p));
    }
}