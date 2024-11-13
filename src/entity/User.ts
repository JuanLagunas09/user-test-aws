import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    adress: string;

    @Column()
    phone: string;

    @Column({ default: "user" })
    role: string;

    @Column()
    id_cognito: string;

    @CreateDateColumn()  // Fecha de creación
    createdDate: Date;

    @UpdateDateColumn()  // Fecha de actualización
    updatedDate: Date;
}