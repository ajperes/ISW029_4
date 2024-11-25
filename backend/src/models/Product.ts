import { Table, Column, Model, DataType, BelongsToMany, HasMany } from 'sequelize-typescript';
import { History_Buy } from './History_Buy';


@Table({
    tableName: 'Products',
    timestamps: false
})


export class Product extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Prod_id!: number;

    @Column({
        type: DataType.STRING(50),
        allowNull: true
    })
    Prod_name!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    Prod_count!: number;

    @Column({
        type: DataType.DECIMAL(8,2),
        allowNull: false
    })
    Prod_price!: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: true
    })
    Prod_act!: boolean

    

    @HasMany(() => History_Buy)
    History_Buy!: History_Buy[];
}


