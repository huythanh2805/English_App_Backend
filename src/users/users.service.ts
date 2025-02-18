import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserMongodbRespository } from './respositories/user-mongodb-respositoy';

@Injectable()
export class UserService {
  constructor(private readonly userRespository: UserMongodbRespository) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRespository.create(createUserDto)
  }

  async createUser(email: string, password: string) {
    return this.userRespository.createUser(email, password)
  }

  async findAll() {
    return this.userRespository.findAll()
  }

  async findOne(id: string) {
    return this.userRespository.findOne(id)
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRespository.update(id, updateUserDto)
  }

  async remove(id: string) {
    return this.userRespository.remove(id)
  }

  async findByEmail(email: string): Promise<any> {
    return this.userRespository.findByEmail(email)
  }
}
