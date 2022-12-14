import {
  IsString,
  Length,
  IsNumberString,
  ArrayMaxSize,
  IsArray,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { EligibilityInputDto } from '@application/dto/eligibility-input.dto';

export class EligibilityRequest {
  @Transform(({ value }) => value.trim())
  @Length(11, 14)
  @IsNumberString()
  numeroDoDocumento: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  tipoDeConexao: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  classeDeConsumo: string;

  @Transform(({ value }) => value.trim())
  @IsString()
  modalidadeTarifaria: string;

  @IsArray()
  @ArrayMaxSize(12)
  historicoDeConsumo: number[];

  toDTO(): EligibilityInputDto {
    return new EligibilityInputDto(
      this.numeroDoDocumento,
      this.tipoDeConexao,
      this.classeDeConsumo,
      this.modalidadeTarifaria,
      this.historicoDeConsumo,
    );
  }
}
