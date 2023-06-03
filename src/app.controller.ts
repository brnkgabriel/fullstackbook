import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt.auth.guard';
import { Roles } from './auth/roles.decorator';
import { Role } from './auth/role.enum';
import { RolesGuard } from './auth/roles.guard';

@Controller()
export class AppController {
  constructor( 
    private readonly appService: AppService,
    private readonly authService: AuthService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(
    @Request() req: any
  ) {
    return this.authService.login(req.user)
  }

  @UseGuards(JwtAuthGuard)
  @Get('api/profile')
  getProfile(
    @Request() req
  ) {
    return req.user
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('api/protected')
  getProtected() {
    return 'protected data'
  }
}
