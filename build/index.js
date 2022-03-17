"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var values_1 = require("./value/values");
var AppRouter_1 = require("./AppRouter");
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use(express_1["default"].urlencoded({ extended: true }));
app.use((0, morgan_1["default"])('dev'));
app.use(AppRouter_1.AppRouter.getInstance());
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.listen(values_1.PORT, function () { return console.log("Server is running on port ".concat(values_1.PORT)); });
