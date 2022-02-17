import { Controller, Get } from '@nestjs/common';

@Controller()
export class TasksController {
  @Get('/notes')
  public index() {
    return { key: 'value' };
  }
}
