import { Command } from './command.interface.js';
import chalk from 'chalk';
export class HelpCommand implements Command {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(chalk.yellow(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            --version:                   # выводит информации о версии приложения. Версия приложения считывается из файла package.json.
            --help:                      # выводит информацию о списке поддерживаемых команд
            --import <path>:             # импортирует данные из *.tsv-файла
    `));
  }
}
