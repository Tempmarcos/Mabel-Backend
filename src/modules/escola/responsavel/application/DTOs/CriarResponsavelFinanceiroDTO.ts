import { EnderecoInput } from "../../../../shared/domain/value-objects/Endereco";

export interface CriarResponsavelFinanceiroDTO {
    endereco: EnderecoInput,
    metodoPagamento: string,
    responsavelId: string
}