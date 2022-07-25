import { AppController } from './app.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { DerivedEmailDto } from './dtos/derivedEmail.dto';
import { HttpException } from '@nestjs/common';

const userDetailsList: Record<string, DerivedEmailDto> = {
  'jdoe@babbel.com': {
    firstName: 'Jane',
    lastName: 'Doe',
    domain: 'babbel.com',
  },
  'jayarun@linkedin.com': {
    firstName: 'Jay',
    lastName: 'Arun',
    domain: 'linkedin.com',
  },
  'davidstein@google.com': {
    firstName: 'David',
    lastName: 'Stein',
    domain: 'google.com',
  },
  'matlee@google.com': {
    firstName: 'Mat',
    lastName: 'Lee',
    domain: 'google.com',
  },
  'junaid@tintash.com': {
    firstName: 'Junaid',
    lastName: 'Nazir',
    domain: 'tintash.com',
  },
  'jon@arbisoft.com': {
    firstName: 'Alex',
    lastName: 'Jon',
    domain: 'arbisoft.com',
  },
};

const unrecognizedUserDomain: [string, DerivedEmailDto] = [
  'jon@arbisoft.com',
  {
    firstName: 'Alex',
    lastName: 'Jon',
    domain: 'abc.com',
  },
];

describe('App Service', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  it('should return derived email when passed details', () => {
    Object.entries(userDetailsList).forEach((userDetails) =>
      expect(appService.getDeriveEmail(userDetails[1]).email).toBe(
        userDetails[0],
      ),
    );
  });
  it('should throw exception when there is some unrecognized domain', async () => {
    try {
      appService.getDeriveEmail(unrecognizedUserDomain[1]);
    } catch (e) {
      expect(e).toBeInstanceOf(HttpException);
    }
  });
});
