import { Component } from '@angular/core';
import { LogService } from '../../services';

@Component({
  selector: 'log-test',
  templateUrl: './logcomponent.component.html',
})
export class LogTestComponent {
  constructor(private logger: LogService) {}

  testLog(): void {
    this.logger.debug('Current time.');
  }
}
export enum LogLevel {
  All = 0,
  Debug = 1,
  Info = 2,
  Warn = 3,
  Error = 4,
  Fatal = 5,
  Off = 6,
}
