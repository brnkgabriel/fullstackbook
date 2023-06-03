import { ConfigService } from "@nestjs/config"

console.log('from constants, JWT_SECRET is', new ConfigService().get<string>('JWT_SECRET'))

export const jwtConstants = { 
  secret: new ConfigService().get<string>('JWT_SECRET')
}