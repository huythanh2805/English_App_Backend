import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { UserService } from './users.service';
import { UsersController } from './users.controller';
import { UserMongodbRespository } from './respositories/user-mongodb-respositoy';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [UserService, UserMongodbRespository],
  controllers: [UsersController],
  exports: [UserService, UserMongodbRespository],
})
export class UserModule {}
