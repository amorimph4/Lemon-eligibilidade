import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '@application/app.service';
import { EligibilityRequest } from '@infrastructure/controller/request/eligibility.request';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/eligibility')
  async eligibility(
    @Body() body: EligibilityRequest,
    @Res() response: Response,
  ): Promise<Response> {
    const output = await this.appService.runEligibility(body.toDTO());
    return response.status(HttpStatus.OK).send(output);
  }
}
