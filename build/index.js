"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const AppRouter_1 = require("./AppRouter");
const values_1 = require("./value/values");
require("./config/db.connection");
require("./controller/router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use(AppRouter_1.AppRouter.getInstance());
app.listen(values_1.Values.port, () => console.log(`Server is running on port ${values_1.Values.port}`));
