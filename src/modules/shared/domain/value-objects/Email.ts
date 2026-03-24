import { ValueObject } from "../ValueObject";

export class Email extends ValueObject<string> {
  private constructor(valor: string) {
    super(valor)
  }

  static criar(email: string): Email {
    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }

    //colocar regra de letra maiúscula e acentos

    return new Email(email);
  }

  get valor(): string {
    return this._props;
  }
}