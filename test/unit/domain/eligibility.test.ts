import { Eligibility } from '@domain/eligibility';
import { DomainException } from '@domain/exception/domain.exception';

describe('Eligibility, test', () => {
  it('should create a eligibility', () => {
    const eligibility = new Eligibility(
      'comercial',
      'convencional',
      'bifasico',
    );

    expect(eligibility).toBeInstanceOf(Eligibility);
    expect(eligibility.canEligible(7000)).toEqual(true);
    expect(eligibility.getMessages()).toEqual('');
  });

  it('should create a eligibility', () => {
    const eligibility = new Eligibility(
      'comercial',
      'convencional',
      'monofasica',
    );

    expect(eligibility).toBeInstanceOf(Eligibility);
    expect(eligibility.canEligible(7000)).toEqual(true);
    expect(eligibility.getMessages()).toEqual('');
  });

  it('should create a eligibility', () => {
    const eligibility = new Eligibility(
      'comercial',
      'convencional',
      'trifasica',
    );

    expect(eligibility).toBeInstanceOf(Eligibility);
    expect(eligibility.canEligible(7000)).toEqual(true);
    expect(eligibility.getMessages()).toEqual('');
  });

  it('should create a eligibility', () => {
    const eligibility = new Eligibility(
      'comercial',
      'convencional',
      'trifasica',
    );

    expect(eligibility).toBeInstanceOf(Eligibility);
    expect(eligibility.canEligible(50)).toEqual(false);
    expect(eligibility.getMessages()).toEqual(
      'Consumo anual para tipo de conexão não aceita',
    );
  });

  it('should return an error if invalid consumption class', () => {
    const res = () => {
      new Eligibility('', '', '');
    };

    expect(res).toThrow(DomainException);
  });

  it('should return an error if invalid modality tariff', () => {
    const res = () => {
      new Eligibility('comercial', '', '');
    };

    expect(res).toThrow(DomainException);
  });

  it('should return an error if invalid connection type', () => {
    const res = () => {
      new Eligibility('comercial', 'convencional', '');
    };

    expect(res).toThrow(DomainException);
  });
});
