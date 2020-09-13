import { Controller, UseGuards, Post, Req, Get } from '@nestjs/common';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from '../service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req): Promise<IToken> {
    // jwt sign token when user login successfully
    return this.authService.login(req.user);
  }
}