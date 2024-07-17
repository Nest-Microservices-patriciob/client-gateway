import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from 'src/config';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { catchError } from 'rxjs';
import { AuthGuard } from './guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { User } from './decorators/user.decorator';
import { Token } from './decorators/token.decorator';

@Controller('auth')
export class AuthController {
  constructor(@Inject(NATS_SERVICE) private readonly client: ClientProxy) {}

  @Post('register')
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.client.send('auth.register.user', registerUserDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.client.send('auth.login.user', loginDto).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  verifyUser(@User() user: any, @Token() token: any) {
    return { user, token };
    return this.client.send('verify.token', {});
  }
}
