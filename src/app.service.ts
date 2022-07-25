import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import sampleDerivedEmails from './constants/sampleDerivedEmails.json';
import { DerivedEmailDto } from './dtos/derivedEmail.dto';
import { APP_ERROR_MESSAGES } from './constants/app.constants';
import { IUserDetails } from './app.types';

@Injectable()
export class AppService {
  getDeriveEmail({
    firstName,
    lastName,
    domain,
  }: DerivedEmailDto): IUserDetails {
    const sampleUser = Object.entries(sampleDerivedEmails).find((sample) =>
      sample[1].includes(domain.toLowerCase()),
    );
    if (!sampleUser) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: APP_ERROR_MESSAGES.UNRECOGNIZED_EMAIL,
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const sampleUserDiscreteDetails = this.getUserDiscreteDetails(sampleUser);
    const sampleUserFormulaNamesCount = this.getFormulaNamesCount(
      sampleUserDiscreteDetails,
    );
    const derivedUsername = this.getDerivedUsername(
      sampleUserFormulaNamesCount,
      sampleUserDiscreteDetails,
      {
        firstName,
        lastName,
      },
    );
    return {
      email: `${derivedUsername.toLowerCase()}@${
        sampleUserDiscreteDetails.sampleUserEmailMask
      }`,
      firstName,
      lastName,
      domain,
    };
  }

  private getUserDiscreteDetails(sampleUser) {
    const sampleUserNames = sampleUser[0].split(' ');
    const sampleUserFirstName = sampleUserNames[0].toLowerCase();
    const sampleUserLastName = sampleUserNames[1].toLowerCase();
    const sampleUserEmail = sampleUser[1].split('@');
    const sampleUsername = sampleUserEmail[0];
    const sampleUserEmailMask = sampleUserEmail[1];
    return {
      sampleUserFirstName,
      sampleUserLastName,
      sampleUsername,
      sampleUserEmailMask,
    };
  }

  private getFormulaNamesCount({
    sampleUserFirstName,
    sampleUserLastName,
    sampleUsername,
  }) {
    let sampleFirstNameCount = 0;
    let sampleLastNameCount = 0;
    for (let i = 0; i < sampleUserFirstName.length; i++) {
      if (sampleUserFirstName[i] === sampleUsername[i]) {
        sampleFirstNameCount++;
      } else {
        break;
      }
    }
    for (let i = 0; i < sampleUserLastName.length; i++) {
      if (sampleUserLastName[i] === sampleUsername[sampleFirstNameCount + i]) {
        sampleLastNameCount++;
      }
    }
    return { sampleFirstNameCount, sampleLastNameCount };
  }

  private getDerivedUsername(
    { sampleFirstNameCount, sampleLastNameCount },
    { sampleUserFirstName, sampleUserLastName },
    { firstName, lastName },
  ): string {
    const derivedFirstName = this.getDerivedName(
      sampleUserFirstName,
      sampleFirstNameCount,
      firstName,
    );
    const derivedLastName = this.getDerivedName(
      sampleUserLastName,
      sampleLastNameCount,
      lastName,
    );
    return derivedFirstName + derivedLastName;
  }

  private getDerivedName(sampleName, sampleNameCount, name): string {
    if (sampleNameCount === sampleName.length) {
      return name;
    }
    return name.slice(0, sampleNameCount);
  }
}
