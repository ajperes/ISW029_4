import { Table, Column, Model, DataType, BelongsTo, HasMany, ForeignKey, BelongsToMany } from 'sequelize-typescript';
import { Product } from './Product';
import { Supplier } from './Supplier';


@Table({
    tableName: 'History_Buy',
    timestamps: false
})


export class History_Buy extends Model {
    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    })
    Hist_Buy_id!: number;


    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    Prod_id!: number;
    @BelongsTo(() => Product)
    Product!: Product[]


    @ForeignKey(() => Supplier)
    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    Supp_id!: number;
    @BelongsTo(() => Supplier)
    Supplier!: Supplier[]


    @Column({
        type: DataType.INTEGER,
        allowNull: true
    })
    Hist_Buy_count!: number;


    @Column({
        type: DataType.STRING(19),
        allowNull: true
    })
    Hist_Buy_date!: string;
}


