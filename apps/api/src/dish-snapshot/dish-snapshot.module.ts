import { Module } from '@nestjs/common';
import { DishSnapshotService } from './dish-snapshot.service';
import { DishSnapshotController } from './dish-snapshot.controller';

@Module({
  controllers: [DishSnapshotController],
  providers: [DishSnapshotService],
})
export class DishSnapshotModule {}
