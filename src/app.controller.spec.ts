import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DerivedEmailDto } from './dtos/derivedEmail.dto';
import { HttpException } from '@nestjs/common';

const userDetails: DerivedEmailDto = {
  firstName: 'Junaid',
  lastName: 'Nazir',
  domain: 'tintash.com',
};
const UserDetailsWithUncognizedDomain: DerivedEmailDto = {
  firstName: 'Junaid',
  lastName: 'Nazir',
  domain: 'abc.com',
};
describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('App Controller', () => {
    it('should return derived email when passed details', () => {
      expect(appController.getDeriveEmail(userDetails).email).toBe(
        'junaid@tintash.com',
      );
    });

    it('should throw exception when there is some unrecognized domain', async () => {
      try {
        appController.getDeriveEmail(UserDetailsWithUncognizedDomain);
      } catch (e) {
        expect(e).toBeInstanceOf(HttpException);
      }
    });
  });
});
