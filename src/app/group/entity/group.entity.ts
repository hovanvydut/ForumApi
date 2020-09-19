import { UserGroupEntity } from './../../user/entity/user-group.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GroupRoleEntity } from './group-role.entity';

@Entity({ name: 'groups' })
export class GroupEntity {
    @PrimaryGeneratedColumn()
    group_id: number;

    @Column()
    group_name: string;

    @Column()
    group_code: string;

    @Column()
    group_description: string;

    @OneToMany(
        type => UserGroupEntity,
        userGroup => userGroup.group,
    )
    userGroups: UserGroupEntity[];

    @OneToMany(
        type => GroupRoleEntity,
        groupRole => groupRole.group,
    )
    groupRoles: GroupRoleEntity[];
}
