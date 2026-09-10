import { Column, Entity, PrimaryColumn } from "typeorm";


@Entity('access_keys')
export class AuthEntity {
    @PrimaryColumn()
    id: number;

    @Column()
    password: string;
}