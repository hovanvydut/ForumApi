import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './app/auth/auth.module';
import { Config } from 'src/config/configuration';
import { IdeaModule } from './app/idea/idea.module';
import { CommentModule } from './app/comment/comment.module';
import { VoteModule } from './app/vote/vote.module';
import { MediaModule } from './app/media/media.module';
import { LabelModule } from './app/label/label.module';
import { PermissionModule } from './app/permission/permission.module';
import { RoleModule } from './app/role/role.module';
import { GroupModule } from './app/group/group.module';
import { UserModule } from './app/user/user.module';
@Module({
    imports: [
        TypeOrmModule.forRoot(Config.getInstance().getTypeormConfig()),
        UserModule,
        AuthModule,
        IdeaModule,
        CommentModule,
        VoteModule,
        MediaModule,
        LabelModule,
        PermissionModule,
        RoleModule,
        GroupModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
