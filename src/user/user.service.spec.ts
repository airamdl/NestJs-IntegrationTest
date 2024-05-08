import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SignInDto } from 'src/auth/dto/signin.dto';

describe('UserService', () => {
  let service: UserService;
  let dto: SignInDto;
  let userRepository: Repository<UserEntity>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
    dto = module.get<SignInDto>(SignInDto);
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity));

  });

  describe('findOne', () => {
    it('should return a user by ID', async () => {
      const userToCreate: UserEntity = {
        id: 1,
        username: 'prueba123',
        email: 'prueba@prueba.com',
        password: 'prueba123123'
      };
      const createdUser = await userRepository.save(userToCreate);
      const result = await service.findUserById(createdUser.id);
      expect(result).toEqual(createdUser);
    });

    it('should return null if user is not found', async () => {
      const result = await service.findUserById(999);
      expect(result).toBeNull();
    });
  });


  describe('create', () => {
    it('should create a new user', async () => {
      const newUser: UserEntity = {
        id: 3,
        username: 'prueba123',
        email: 'prueba@prueba.com',
        password: 'prueba123123'
      };
      const result = await service.createUser(newUser);
      expect(result.id).toBeDefined();
      expect(result.username).toEqual(newUser.username);
      expect(result.email).toEqual(newUser.email);
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});