import { Controller, Get } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';

@Controller()
export class TasksController {
  @Get('/notes')
  public index(@JwtBody() jwtBody: JwtBodyDto) {
    return { key: 'value' };
  }
}
