import { ValueObject } from "../../../shared/domain/ValueObject";

export enum permissions {
    //USERS
    VerUsuarios = 'verUsuarios',
    CriarUsuarios = 'criarUsuarios',
    DeletarUsuarios = 'deletarUsuarios',
    EditarUsuarios = 'editarUsuarios',
    VerInfoUsuario = 'verInfoUsuario',

    //ALUNOS
    VerAlunos = 'verAlunos',
    CriarAlunos = 'criarAlunos',
    DeletarAlunos = 'deletarAlunos',
    EditarAlunos = 'editarAlunos',
    VerInfoAluno = 'verInfoAluno',

    //TAREFAS
    CriarTarefas = 'criarTarefas',

    //TURMAS
    VerTurmas = 'verTurmas',
    CriarTurmas = 'criarTurmas',
    DeletarTurmas = 'deletarTurmas',
    EditarTurmas = 'editarTurmas',
    FazerChamada = 'fazerChamada',

    //FUNCIONARIOS
    VerFuncionarios = 'verFuncionarios',
    CriarFuncionarios = 'criarFuncionarios',
    DeletarFuncionarios = 'deletarFuncionarios',
    EditarFuncionarios = 'editarFuncionarios',
    VerInfoFuncionario = 'verInfoFuncionario',

    //FINANCEIRO
    VerFinanceiro = 'verFinanceiro',
    CriarRegistro = 'criarRegistro',
    DeletarRegistro = 'deletarRegistro',
    EditarRegistro = 'editarRegistro',
    AlterarTaxas = 'alterarTaxas',

    //SISTEMA
    VerLog = 'verLog'
}

export class Permissoes extends ValueObject<string[]> {
    private constructor(valor: string[]) {
        super(valor)
    }
    static criar(permissoes: string[]): Permissoes {
        const permissoesUnicas = [...new Set(permissoes)];

        for (const permissao of permissoesUnicas) {
            if (!Object.values(permissions).includes(permissao as permissions)) {
                throw new Error('Permissão inválida');
            }
        }

        return new Permissoes(permissoesUnicas);
    }
    static todasAsPermissoes(): Permissoes {
        return new Permissoes([...Object.values(permissions)]);
    }
    public possuiTodasDe(outra: Permissoes): boolean {
        return outra.valor.every(p => this.valor.includes(p));
    }
    public possui(permissao: string): boolean {
        return this.valor.includes(permissao);
    }
    public possuiAlgumaDe(outra: Permissoes): boolean {
        return outra.valor.some(p => this.valor.includes(p));
    }
}