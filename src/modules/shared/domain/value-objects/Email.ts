import { ValueObject } from "../ValueObject";
import { Validador } from "./Validador";

function normalizar(email: string): string {
  return email
    .toLowerCase().trim();
}

export class Email extends ValueObject<string> {
  private constructor(valor: string) {
    super(valor)
  }

  static criar(email: string): Email {
    const normalizado = normalizar(email)

    const resultado = Validador.combinar(
        Validador.naoVazio(normalizado, "Email"),
        Validador.tamanhoMinimo(normalizado, 6, "Email"),
        Validador.tamanhoMaximo(normalizado, 100, "Email"),
        Validador.regex(normalizado, /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email", 
            "conter um formato válido"),
    );

    if (!resultado.valido) {
        throw new Error(resultado.erro);
    }

    return new Email(normalizado);
  }
}