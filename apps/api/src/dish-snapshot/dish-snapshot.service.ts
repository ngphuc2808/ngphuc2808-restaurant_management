import { Injectable } from '@nestjs/common';
import { CreateDishSnapshotDto } from './dto/create-dish-snapshot.dto';
import { UpdateDishSnapshotDto } from './dto/update-dish-snapshot.dto';

@Injectable()
export class DishSnapshotService {
  create(createDishSnapshotDto: CreateDishSnapshotDto) {
    return 'This action adds a new dishSnapshot';
  }

  findAll() {
    return `This action returns all dishSnapshot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dishSnapshot`;
  }

  update(id: number, updateDishSnapshotDto: UpdateDishSnapshotDto) {
    return `This action updates a #${id} dishSnapshot`;
  }

  remove(id: number) {
    return `This action removes a #${id} dishSnapshot`;
  }
}
