import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import chalk from 'chalk';
import { Goods } from '../../shared/types/goods.type.js';
import { Location } from '../../shared/types/location.type.js';
import { User } from '../../shared/types/user.type.js';
import { Offer } from '../../shared/types/offer.type.js';

type FlatOffer = string | number | boolean |string[] | Date | Goods[]

export class ImportCommand implements Command {
  public getName(): string {
    return '--import';
  }

  private printOffer (offers: Offer[]): void {
    offers.forEach((row,index) => {
      console.log(chalk.bgYellow(`Предложение ${index + 1}:`));
      for (const [key, value] of Object.entries(row)) {
        if (typeof value === 'object') {
          this.printObject(value as User | Location);
        } else {
          this.printProperty(key,value as FlatOffer);
        }
      }
    });
  }

  private printObject (object: User | Location): void {
    for (const [key, value] of Object.entries(object)) {
      this.printProperty(key,value);
    }
  }

  private printProperty (key: string, value: FlatOffer):void {
    console.log(`${chalk.green(key)}: ${chalk.red(value)}`);
  }

  public execute(...parameters: string[]): void {
    // Чтение файла
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      const data = fileReader.toArray();
      this.printOffer(data);
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
    }
  }
}
