import { PartialType } from '@nestjs/mapped-types';
import { CreateDishSnapshotDto } from './create-dish-snapshot.dto';

export class UpdateDishSnapshotDto extends PartialType(CreateDishSnapshotDto) {}
