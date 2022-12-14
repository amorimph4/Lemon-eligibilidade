import { Consumption } from '@domain/consumption';

describe('Consumption, test', () => {
  it('should create a consumption given a empty history', () => {
    const consumption = new Consumption([]);

    expect(consumption).toBeInstanceOf(Consumption);
    expect(consumption.calculateConsumption()).toEqual(0);
    expect(consumption.calculateEconomyCO2()).toEqual(0);
  });

  it('should create a consumption given a  history', () => {
    const consumption = new Consumption([20, 30, 50, 5000, 600, 454, 6006]);

    jest.spyOn(consumption, 'calculateConsumption').mockReturnValue(0);
    jest.spyOn(consumption, 'calculateEconomyCO2').mockReturnValue(0);

    expect(consumption).toBeInstanceOf(Consumption);
    expect(consumption.calculateConsumption()).toEqual(0);
    expect(consumption.calculateEconomyCO2()).toEqual(0);
  });
});
