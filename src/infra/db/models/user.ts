import { AutoIncrement, Column, PrimaryKey, Table, Model } from "sequelize-typescript";

@Table({tableName: "users"})
export class User extends Model {

    @PrimaryKey
    @AutoIncrement
    @Column
    id!: number;

    @Column({ unique: true, allowNull: false })
    username!: string;

    @Column
    secret!: string;
}