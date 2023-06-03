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
          // process.env.SECRET will return the proper value
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '6000s' }
        })
      ],
      module: AuthModule
    }
  }
}