import { Injectable } from '@nestjs/common';
import { Eligibility } from '@domain/eligibility';
import { Consumption } from '@domain/consumption';
import { EligibilityInputDto } from '@application/dto/eligibility-input.dto';
import { EligibilityOutputDto } from '@application/dto/eligibility-output.dto';

@Injectable()
export class AppService {
  public async runEligibility(
    data: EligibilityInputDto,
  ): Promise<EligibilityOutputDto> {
    const eligibility = new Eligibility(
      data.classeDeConsumo,
      data.modalidadeTarifaria,
      data.tipoDeConexao,
    );

    const consumption = new Consumption(data.historicoDeConsumo);

    if (!eligibility.canEligible(consumption.calculateConsumption())) {
      return new EligibilityOutputDto(
        false,
        undefined,
        eligibility.getMessages(),
      );
    }

    return new EligibilityOutputDto(true, consumption.calculateEconomyCO2());
  }
}
