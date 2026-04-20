type ValidationResult = { valido: true } | { valido: false; erro: string };

export class Validador {
  // ----- Strings -----
  static naoVazio(valor: string, campo: string): ValidationResult {
    if (!valor || valor.trim().length === 0) {
      return { valido: false, erro: `${campo} não pode ser vazio` };
    }
    return { valido: true };
  }

  static tamanhoMinimo(valor: string, min: number, campo: string): ValidationResult {
    if (valor.trim().length < min) {
      return { valido: false, erro: `${campo} deve ter no mínimo ${min} caracteres` };
    }
    return { valido: true };
  }

  static tamanhoMaximo(valor: string, max: number, campo: string): ValidationResult {
    if (valor.trim().length > max) {
      return { valido: false, erro: `${campo} deve ter no máximo ${max} caracteres` };
    }
    return { valido: true };
  }

  static tamanhoMinimoArray(valor: string[], min: number, campo: string): ValidationResult {
    if (valor.length < min) {
      return { valido: false, erro: `${campo} deve ter no mínimo ${min} caracteres` };
    }
    return { valido: true };
  }

  static tamanhoMaximoArray(valor: string[], max: number, campo: string): ValidationResult {
    if (valor.length > max) {
      return { valido: false, erro: `${campo} deve ter no máximo ${max} caracteres` };
    }
    return { valido: true };
  }

  static regex(valor: string, pattern: RegExp, campo: string, descricao: string): ValidationResult {
    if (!pattern.test(valor)) {
      return { valido: false, erro: `${campo} deve ${descricao}` };
    }
    return { valido: true };
  }

  // ----- Números -----
  static positivo(valor: number, campo: string): ValidationResult {
    if (valor <= 0) {
      return { valido: false, erro: `${campo} deve ser positivo` };
    }
    return { valido: true };
  }

  static faixa(valor: number, min: number, max: number, campo: string): ValidationResult {
    if (valor < min || valor > max) {
      return { valido: false, erro: `${campo} deve estar entre ${min} e ${max}` };
    }
    return { valido: true };
  }

  // ----- Datas -----
  static dataFutura(data: Date, campo: string): ValidationResult {
    if (data <= new Date()) {
      return { valido: false, erro: `${campo} deve ser uma data futura` };
    }
    return { valido: true };
  }

  // ----- Composição -----
  static combinar(...resultados: ValidationResult[]): ValidationResult {
    const primeiroErro = resultados.find(r => !r.valido);
    return primeiroErro || { valido: true };
  }
}