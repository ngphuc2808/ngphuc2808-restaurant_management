import { APP_GUARD } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as ms from 'ms';

import { AuthService } from '@/auth/auth.service';
import { AuthController } from '@/auth/auth.controller';

import { LocalStrategy } from '@/auth/strategies/local.strategy';
import { JwtStrategy } from '@/auth/strategies/jwt.strategy';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RefreshTokenStrategy } from '@/auth/strategies/refresh-token.strategy';
import { RefreshTokenIdsStorage } from '@/auth/refresh-token-ids.storage';
import { PrismaService } from '@/prisma.service';

@Module({
  imports: [
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn:
            Number(ms(configService.get('JWT_ACCESS_TOKEN_EXPIRES_IN'))) / 1000,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    PrismaService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    RefreshTokenStrategy,
    RefreshTokenIdsStorage,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
