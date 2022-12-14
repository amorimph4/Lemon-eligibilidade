export class EligibilityOutputDto {
  constructor(
    public readonly elegivel: boolean,
    public readonly economiaAnualDeCO2?: number,
    public readonly razoesInelegibilidade?: string,
  ) {}
}
