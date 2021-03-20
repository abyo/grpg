import chalk from 'chalk';
import dayjs from 'dayjs';

const items: string[] = [];
const format = '{tstamp} {tag} {txt}\n';

export class Logger {
  public static log(content: any, { color, tag }: LoggerParam = { color: 'white', tag: 'Log' }) {
    Logger.write(content, { color, tag });
  }

  public static error(content: any, { color, tag }: LoggerParam = { color: 'red', tag: 'Error' }) {
    Logger.write(content, { color, tag, error: true });
}

  public static write(content: any, { color, tag, error }: LoggerParam = { color: 'grey', tag: 'Log', error: false }) {
    const tstamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
    const logTag = `[${tag}]`;
    const stream = error ? process.stderr : process.stdout;
    const item = format
      .replace('{tstamp}', chalk.gray(tstamp))
      .replace('{tag}', chalk.bgMagenta.black(logTag))
      // @ts-ignore
      .replace('{txt}', chalk[color](content));
    items.push(item);
    stream.write(item);
  }
}

export interface LoggerParam {
  color?: string | undefined;
  tag?: string | undefined;
  error?: boolean | undefined;
}