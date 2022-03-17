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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../decorators/index");
const user_model_1 = require("../model/user.model");
const values_1 = require("../value/values");
//encrypt password
function hashPassword(password) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.hash(password, 10);
    });
}
function validatePassword(password, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcryptjs_1.default.compare(password, hashedPassword);
    });
}
let LoginController = class LoginController {
    // ======================= register endpoint ==============================================
    post_Register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, vehicle, isDriver, isAvailable, } = req.body;
            const hashedPassword = yield hashPassword(password);
            yield user_model_1.User.findOne({ email }).then((user) => {
                if (user)
                    return res.status(402).json({ msg: 'User Already Exist' });
            });
            let newUser = new user_model_1.User({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                vehicle,
                isDriver,
                isAvailable,
            });
            yield newUser.save();
            return res.status(200).json({ msg: 'New user Created, Proceed to Login' });
        });
    }
    // ====================== login endpoint =======================================================
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_model_1.User.findOne({ email });
            if (!user)
                return res.status(402).json({ msg: 'User does not exist' });
            const comparePassword = yield validatePassword(password, user.password);
            if (!comparePassword)
                return res.status(403).json({ msg: 'Invalid Password' });
            const usr = {
                email: user.email,
                id: user._id,
            };
            const token = jsonwebtoken_1.default.sign({ usr }, values_1.Values.jwtSecret, { expiresIn: '24h' });
            res.status(200).json({ token });
        });
    }
};
__decorate([
    (0, index_1.poster)('/register'),
    (0, index_1.RequestBodyValidator)('firstName', 'lastName', 'email', 'password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "post_Register", null);
__decorate([
    (0, index_1.poster)('/login'),
    (0, index_1.RequestBodyValidator)('email', 'password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "postLogin", null);
LoginController = __decorate([
    (0, index_1.controller)('/api')
], LoginController);
