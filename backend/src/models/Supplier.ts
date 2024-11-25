import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { History_Buy } from './History_Buy';


@Table({
    tableName: 'Suppliers',
    timestamps: false
})


export class Supplier extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Supp_id!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true
    })
    Supp_name!: string;

    @Column({
        type: DataType.STRING(19),
        allowNull: true
    })
    Supp_cnpj!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true
    })
    Supp_act!: boolean



    @HasMany(() => History_Buy)
    History_Buy!: History_Buy[];
}


