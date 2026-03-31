import { ValueObject } from "../ValueObject";

function normalizar(email: string): string {
  return email
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export class Email extends ValueObject<string> {
  private constructor(valor: string) {
    super(valor)
  }

  static criar(email: string): Email {
    const normalizado = normalizar(email)

    if (!normalizado.includes('@')) {
      throw new Error('Email inválido');
    }

    return new Email(normalizado);
  }

  get valor(): string {
    return this._props;
  }
}