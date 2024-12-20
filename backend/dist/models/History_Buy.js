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
exports.History_Buy = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const Product_1 = require("./Product");
const Supplier_1 = require("./Supplier");
let History_Buy = class History_Buy extends sequelize_typescript_1.Model {
};
exports.History_Buy = History_Buy;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }),
    __metadata("design:type", Number)
], History_Buy.prototype, "Hist_Buy_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Product_1.Product),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], History_Buy.prototype, "Prod_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Product_1.Product),
    __metadata("design:type", Array)
], History_Buy.prototype, "Product", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Supplier_1.Supplier),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], History_Buy.prototype, "Supp_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Supplier_1.Supplier),
    __metadata("design:type", Array)
], History_Buy.prototype, "Supplier", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true
    }),
    __metadata("design:type", Number)
], History_Buy.prototype, "Hist_Buy_count", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(19),
        allowNull: true
    }),
    __metadata("design:type", String)
], History_Buy.prototype, "Hist_Buy_date", void 0);
exports.History_Buy = History_Buy = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'History_Buy',
        timestamps: false
    })
], History_Buy);
