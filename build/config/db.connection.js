"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const values_1 = require("../value/values");
mongoose_1.default
    .connect(values_1.Values.mongoURI)
    .then(() => console.log('successfully connected to mongoDB'))
    .catch((err) => console.log(err));
exports.db = mongoose_1.default;
