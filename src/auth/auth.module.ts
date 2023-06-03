import { DynamicModule, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt'; 
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
  ],
  exports: [AuthService],
  providers: [AuthService, LocalStrategy, JwtStrategy]
})
export class AuthModule {

  static forRoot(): DynamicModule {
    return {
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET   // process.env.SECRET will return the proper value
        })
      ],
      module: AuthModule
    }
  }
}