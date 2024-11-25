"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
//
const routes_1 = __importDefault(require("./routes"));
const database_1 = __importDefault(require("./config/database"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use(routes_1.default);
const SV_PORT = process.env.SV_PORT || 4000;
let DB_RESET;
if (process.env.DB_RESET !== undefined)
    DB_RESET = process.env.DB_RESET.toLowerCase();
else
    DB_RESET = false;
database_1.default.sync({ force: DB_RESET }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('\nDatabase synchronized');
    app.listen(SV_PORT, () => {
        console.log(`\nServer running on ` + SV_PORT);
    });
})).catch((err) => {
    console.log("\nERROR: \n\t" + process.env.DB_PORT + "\n\tFull log: \n" + err);
});
