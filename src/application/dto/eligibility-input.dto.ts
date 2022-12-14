export class EligibilityInputDto {
  constructor(
    public readonly numeroDoDocumento: string,
    public readonly tipoDeConexao: string,
    public readonly classeDeConsumo: string,
    public readonly modalidadeTarifaria: string,
    public readonly historicoDeConsumo: number[],
  ) {}
}
