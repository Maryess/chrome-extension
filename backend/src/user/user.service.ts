import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  
  async getAllUser(searchTerm?:string) {
    return this.userRepository.find();
  }

  async getUserById(id:string | undefined){
    return await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    
  }

  async removeUser(id: string) {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      this.userRepository.delete({ id: id });
      return {
        message: 'User deleted',
        id: `${id}`,
      };
    } else {
      return {
        message: 'Error',
      };
    }
  }

  async deleteAllUsers(){
  try{
    await this.userRepository.createQueryBuilder().delete().from(User).execute()
    return{
    message:'Users deleted'
    }
  }catch(error){
    return{
      message:error
    }
  }
  }

  async updateAdminRole(id:string){
    try{
     
      return await this.userRepository.update(id,{isAdmin:true})

      
    }catch(error){
      return {
        message:error
      }
    }
  }

  async update(userId:string, data:UpdateUserDto){
    try{
      const user = await this.userRepository.findOneBy({id:userId})

      return await this.userRepository.update(userId, {...data})
    }catch(error){
      return error
    }
  }
}
