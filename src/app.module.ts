import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entities/user.entity';


@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "users",
      entities: [ UserEntity],
      synchronize: true
    }),
  ],
})
export class AppModule { }