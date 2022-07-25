import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { DerivedEmailDto } from './dtos/derivedEmail.dto';
import { ResponseTransformInterceptor } from './common/responseTransform.interceptor';
import { IUserDetails } from './app.types';

@Controller()
@UseInterceptors(ResponseTransformInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getDeriveEmail(@Query() derivedEmailDto: DerivedEmailDto): IUserDetails {
    return this.appService.getDeriveEmail(derivedEmailDto);
  }
}
