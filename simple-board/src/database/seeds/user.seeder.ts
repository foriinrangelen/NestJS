

import { User } from 'src/entity/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension'

export default class UserSeeder implements Seeder {
    async run(dataSource:DataSource, factoryManager: SeederFactoryManager): Promise<any> {
        
        const repository = dataSource.getRepository(User);
        for(let i=0; i<=10; i++){
            await repository.insert([{
                userId: `fastcampus${i}`,
                name: `kyy${i}`,
                password: `password${i}`,
            },])
        }

    }

}