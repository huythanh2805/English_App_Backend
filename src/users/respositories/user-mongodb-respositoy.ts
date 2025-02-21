import { HttpException, Injectable } from "@nestjs/common";
import { UserRespository } from "./user-respository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserMongodbRespository implements UserRespository {
     constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
      async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new this.userModel(createUserDto);
        return user.save();
      }
    
      async createUser(email: string, password: string) {
        try {
          const newUser = new this.userModel({ email, password });
          return newUser.save();
        } catch (error) {
          throw new HttpException("Something went wrong with server", 500)
        }
      }
    
      async findAll() {
        try {
          const users = await this.userModel.find().exec();
          return {
              message: 'User retrieved successfully',
              users
          }
        } catch (error) {
          throw new HttpException("Something went wrong with server", 500)
        }
      }
    
      async findOne(id: string) {
        try {
          const user = await this.userModel.findById(id).exec();
          return {
            message: 'User retrieved successfully',
             user
          };
        } catch (error) {
          throw new HttpException("Something went wrong with server", 500)
        }
      }
    
      async update(id: string, updateUserDto: UpdateUserDto) {
        try {
          const user = await this.userModel.findByIdAndUpdate(id, updateUserDto).exec();
          return {
            message: 'User retrieved successfully',
             user
          };
        } catch (error) {
          throw new HttpException("Something went wrong with server", 500)
        }
      }
      async updateLoggedIn(id: string, isLoggedIn) {
        try {
          const user = await this.userModel.findByIdAndUpdate(id, {isLoggedIn}).exec();
          return {
            message: 'User retrieved successfully',
             user
          };
        } catch (error) {
          throw new HttpException("Something went wrong with server", 500)
        }
      }
    
      async remove(id: string) {
        try {
          const user = await this.userModel.findByIdAndDelete(id).exec();
          return {
            message: 'User retrieved successfully',
             user
          };
        } catch (error) {
          throw new HttpException("Something went wrong with server", 500)
        }
      }
    
      async findByEmail(email: string): Promise<User> {
        try {
          const user = await this.userModel.findOne({email}).exec();
          return user
        } catch (error) {
          console.log(error)
          throw new HttpException(error.message, error.status)

        }
      }
}