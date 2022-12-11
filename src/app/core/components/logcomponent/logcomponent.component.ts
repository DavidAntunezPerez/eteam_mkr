import { Component } from '@angular/core';
import { LogService } from '../../services';

@Component({
  selector: 'log-test',
  templateUrl: './logcomponent.component.html',
})
export class LogTestComponent {
  // ADD THIS COMPONENT ONLY IF YOU NEED LOG INFORMATION, ONLY IN DEVELOPMENT OR DEBUGGING PROCCESS, THIS COMPONENT SHOULDN'T BE ABLE TO BE SEEN IN THE FINAL PRODUCT. IT WILL DISPLAY DIFFERENT INFORMATION TO THE LOG CONSOLE.
  constructor(private logger: LogService) {}

  testLog(): void {
    this.logger.debug('Debug function');
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
