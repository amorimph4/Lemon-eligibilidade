export class Consumption {
  private readonly baseCalculatingCO2: number = 84 / 1000;
  private readonly baseDivisionAnnual: number = 12;

  constructor(public readonly consumptionHistory: number[]) {}

  public calculateConsumption(): number {
    if (!this.consumptionHistory.length) return this.consumptionHistory.length;

    const soma = this.consumptionHistory.reduce((soma, i) => {
      return soma + i;
    });
    return soma / this.baseDivisionAnnual;
  }

  public calculateEconomyCO2(): number {
    if (!this.consumptionHistory.length) return this.consumptionHistory.length;

    const soma = this.consumptionHistory.reduce((soma, i) => {
      return soma + i;
    });

    return Number.parseFloat((soma * this.baseCalculatingCO2).toFixed(2));
  }
}
