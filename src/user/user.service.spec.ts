import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';


describe('UserService Integration Tests', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>

  beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
          imports: [
            TypeOrmModule.forRoot({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "myuser",
                password: "1234",
                database: "users",
                entities: [UserEntity],
                synchronize: true
              }),
              TypeOrmModule.forFeature([UserEntity])
          ],
          providers: [UserService],
      }).compile();

      service = module.get<UserService>(UserService);
  });

  it('should create and retrieve a user', async () => {
    const createUserDto = { username: 'testuser', email: 'test@example.com', password: 'password123' };
    const user = await service.createUser(createUserDto);
    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');

    const foundUser = await service.findOne(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.username).toBe('testuser');
});

});