//libs
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//app
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { PrismaService } from '@/prisma.service';

//modules
import { AuthModule } from '@/auth/auth.module';
import { AccountModule } from '@/account/account.module';
import { SocketModule } from '@/socket/socket.module';
import { RefreshTokenModule } from '@/refresh-token/refresh-token.module';
import { TableModule } from '@/table/table.module';
import { OrderModule } from '@/order/order.module';
import { GuestModule } from '@/guest/guest.module';
import { DishSnapshotModule } from './dish-snapshot/dish-snapshot.module';
import { DishModule } from '@/dish/dish.module';

//services

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AccountModule,
    DishModule,
    DishSnapshotModule,
    GuestModule,
    OrderModule,
    TableModule,
    RefreshTokenModule,
    SocketModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [PrismaService, AppService],
})
export class AppModule {}
