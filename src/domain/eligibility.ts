import { ConsumptionClassesEnum } from '@domain/enums/consumption-classes.enum';
import { DomainException } from '@domain/exception/domain.exception';
import { TariffModalitiesEnum } from '@domain/enums/tariff-modalities.enum';
import { ConnectionTypesEnum } from '@domain/enums/connection-types.enum';

export class Eligibility {
  private readonly permitedConnectionTypes: ConnectionTypesEnum[] = [
    ConnectionTypesEnum.Monofasica,
    ConnectionTypesEnum.Bifasico,
    ConnectionTypesEnum.Trifasica,
  ];

  private readonly permitedConsumptionClasses: ConsumptionClassesEnum[] = [
    ConsumptionClassesEnum.Commercial,
    ConsumptionClassesEnum.Industrial,
    ConsumptionClassesEnum.PowerPublic,
    ConsumptionClassesEnum.Residential,
    ConsumptionClassesEnum.Rural,
  ];

  private readonly permitedTariffModalities: TariffModalitiesEnum[] = [
    TariffModalitiesEnum.Blue,
    TariffModalitiesEnum.Conventional,
    TariffModalitiesEnum.Green,
    TariffModalitiesEnum.White,
  ];

  private readonly eligiblesConsumptionClasses: ConsumptionClassesEnum[] = [
    ConsumptionClassesEnum.Commercial,
    ConsumptionClassesEnum.Industrial,
    ConsumptionClassesEnum.Residential,
  ];

  private readonly eligiblesTariffModalities: TariffModalitiesEnum[] = [
    TariffModalitiesEnum.Conventional,
    TariffModalitiesEnum.White,
  ];

  private messages: string[] = [];

  constructor(
    public readonly consumptionClass: string,
    public readonly tariffModality: string,
    public readonly connType: string,
  ) {
    this.validate();
  }

  private validate(): void {
    if (
      !this.permitedConsumptionClasses.includes(
        this.consumptionClass as ConsumptionClassesEnum,
      )
    ) {
      throw new DomainException(
        `Invalid consumption class. must be (${this.permitedConsumptionClasses.join()})`,
      );
    }

    if (
      !this.permitedTariffModalities.includes(
        this.tariffModality as TariffModalitiesEnum,
      )
    ) {
      throw new DomainException(
        `Invalid tariff modality. must be (${this.permitedTariffModalities.join()})`,
      );
    }

    if (
      !this.permitedConnectionTypes.includes(
        this.connType as ConnectionTypesEnum,
      )
    ) {
      throw new DomainException(
        `Invalid connection type modality. must be (${this.permitedConnectionTypes.join()})`,
      );
    }
  }

  private validateConnType(consumption: number): boolean {
    switch (this.connType) {
      case ConnectionTypesEnum.Monofasica:
        return consumption > 400;
      case ConnectionTypesEnum.Bifasico:
        return consumption > 500;
      case ConnectionTypesEnum.Trifasica:
        return consumption > 750;
    }
  }

  public canEligible(consumption: number): boolean {
    if (
      !this.eligiblesConsumptionClasses.includes(
        this.consumptionClass as ConsumptionClassesEnum,
      )
    ) {
      this.messages.push('Classe de consumo não aceita');
    }

    if (
      !this.eligiblesTariffModalities.includes(
        this.tariffModality as TariffModalitiesEnum,
      )
    ) {
      this.messages.push('Modalidade tarifária não aceita');
    }

    if (!this.validateConnType(consumption)) {
      this.messages.push('Consumo anual para tipo de conexão não aceita');
    }

    return this.messages.length > 0 ? false : true;
  }

  public getMessages(): string {
    return this.messages.join();
  }
}
