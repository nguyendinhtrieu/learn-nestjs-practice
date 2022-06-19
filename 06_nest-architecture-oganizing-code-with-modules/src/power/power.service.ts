import { Injectable } from '@nestjs/common';

@Injectable()
export class PowerService {
  supplyPower(amount: number) {
    console.log(`Supply ${amount} power!`);
  }
}
