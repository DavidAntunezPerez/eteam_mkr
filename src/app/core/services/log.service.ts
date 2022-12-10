// SERVICE THAT LOGS INTO THE CONSOLE TO EASE LOGGING INFORMATION.

import { Injectable } from '@angular/core';
import { LogLevel } from '../components';
@Injectable()
export class LogService {
  level: LogLevel = LogLevel.All;
  logWithDate: boolean = true;

  //  FORMAT PARAMS: create a comma-delimited list of the parameter array
  private formatParams(params: any[]): string {
    let ret: string = params.join(',');

    // Is there at least one object in the array?
    if (params.some((p) => typeof p == 'object')) {
      ret = '';

      // Build comma-delimited string
      for (let item of params) {
        ret += JSON.stringify(item) + ',';
      }
    }
    return ret;
  }

  // SHOULD LOG METHOD
  private shouldLog(level: LogLevel): boolean {
    let ret: boolean = false;
    if (
      (level >= this.level && level !== LogLevel.Off) ||
      this.level === LogLevel.All
    ) {
      ret = true;
    }
    return ret;
  }

  // WRITE TO LOG METHOD
  private writeToLog(msg: string, level: LogLevel, params: any[]) {
    if (this.shouldLog(level)) {
      let value: string = '';

      // Build log string
      if (this.logWithDate) {
        value = new Date() + ' - ';
      }

      value += 'Type: ' + LogLevel[this.level];
      value += ' - Message: ' + msg;
      if (params.length) {
        value += ' - Extra Info: ' + this.formatParams(params);
      }

      // Log the value
      console.log(value);
    }
  }

  // MSG TYPES (CREATE LOG ENTRY CLASS---)

  debug(msg: string, ...optionalParams: any[]) {
    let values = ["1", "Home", "MainPage"];
    this.writeToLog(msg, LogLevel.Debug, values);
  }

  info(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Info, optionalParams);
  }

  warn(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Warn, optionalParams);
  }

  error(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Error, optionalParams);
  }

  fatal(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.Fatal, optionalParams);
  }

  log(msg: string, ...optionalParams: any[]) {
    this.writeToLog(msg, LogLevel.All, optionalParams);
  }
}
