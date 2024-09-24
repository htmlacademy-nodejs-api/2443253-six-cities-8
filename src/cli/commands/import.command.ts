import { Command } from './command.interface.js';
import { TSVFileReader } from '../../shared/libs/file-reader/index.js';
import { Offer } from '../../shared/types/index.js';
import { getErrorMessage } from '../../shared/helpers/index.js';
import { printOffer } from '../../shared/helpers/common.js';


export class ImportCommand implements Command {


  public getName(): string {
    return '--import';
  }


  //Событие: импорт выполнен полностью
  private onCompleteImport(count: number) {
    console.info(`${count} offers imported.`);
  }

  //Событие: предложение импортировано
  private onImportedOffer(numberOffer:number,offer: Offer): void {
    printOffer(numberOffer,offer);
  }


  public async execute(...parameters: string[]): Promise<void> {
    // Чтение файла
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('offer', this.onImportedOffer);
    fileReader.on('end', this.onCompleteImport);
    try {
      fileReader.read();
    } catch (err) {

      console.error(`Can't import data from file: ${filename}`);
      console.error(getErrorMessage(err));
    }
  }
}

