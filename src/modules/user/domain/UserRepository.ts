import { User, UserId } from "./User";

export interface UsuarioRepository {
  salvar(usuario: User): Promise<void>;
  buscarPorId(id: UserId): Promise<User | null>;
  buscarPorEmail(email: string): Promise<User | null>;
  buscarTodos(): Promise<User[]>;
  buscarPorTipo(tipo: string): Promise<User[]>;
  deletar(id: UserId): Promise<void>;
}