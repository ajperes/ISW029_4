"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Supplier = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const History_Buy_1 = require("./History_Buy");
let Supplier = class Supplier extends sequelize_typescript_1.Model {
};
exports.Supplier = Supplier;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], Supplier.prototype, "Supp_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true
    }),
    __metadata("design:type", String)
], Supplier.prototype, "Supp_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(19),
        allowNull: true
    }),
    __metadata("design:type", String)
], Supplier.prototype, "Supp_cnpj", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        allowNull: true
    }),
    __metadata("design:type", Boolean)
], Supplier.prototype, "Supp_act", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => History_Buy_1.History_Buy),
    __metadata("design:type", Array)
], Supplier.prototype, "History_Buy", void 0);
exports.Supplier = Supplier = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'Suppliers',
        timestamps: false
    })
], Supplier);
