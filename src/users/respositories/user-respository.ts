import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";


export interface UserRespository {
    create(createUserDto: CreateUserDto): Promise<User>;
    createUser(email: string, password: string);
    findAll();
    findOne(id: string): any;
    update(id: string, updateUserDto: UpdateUserDto);
    remove(id: string);
    findByEmail(email: string);
}