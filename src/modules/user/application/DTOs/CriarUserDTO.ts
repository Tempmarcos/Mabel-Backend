export interface CriarUserDTO {
    nome: string,
    email: string,
    admin: boolean,
    permissoes: string[],
    senha: string
}