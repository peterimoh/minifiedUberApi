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
    postRegister(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, vehicle, isDriver, isAvailable, } = req.body;
            const hashedPassword = yield hashPassword(password);
            user_model_1.User.findOne({ email }).then((user) => __awaiter(this, void 0, void 0, function* () {
                if (user) {
                    console.log({ error: 'User already exists' });
                }
                else {
                    let newUser = new user_model_1.User({
                        firstName,
                        lastName,
                        email,
                        password: hashedPassword,
                        vehicle,
                        isDriver,
                        isAvailable,
                    });
                    yield newUser.save().then((user) => {
                        res.status(200).json({ message: 'User Created' });
                    });
                }
            }));
        });
    }
    // ====================== login endpoint =======================================================
    postLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield user_model_1.User.findOne({ email });
            if (!user)
                return res.status(422).json({ error: 'User does not exist' });
            const comparePassword = yield validatePassword(password, user.password);
            if (!comparePassword)
                return res.status(422).json({ error: 'Invalid Password' });
            const usr = {
                email: user.email,
                id: user._id,
            };
            const token = jsonwebtoken_1.default.sign({ usr }, values_1.Values.jwtSecret, { expiresIn: '24h' });
            res.status(200).json({ token, user });
        });
    }
    // ===================== get Available Drivers =================================================
    getAvailableDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { available } = req.params;
            const driver = yield user_model_1.User.find({ isDriver: true, isAvailable: available });
            res.status(200).json(driver);
        });
    }
    // ===================== toggle is available status ==============================================================
    putterDriver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.body);
            const { isAvailable, latitude, longitude } = req.body;
            const driver = yield user_model_1.User.findById(id);
            if (!driver)
                return res.status(422).json({ error: 'Driver does not exist' });
            driver.isAvailable = isAvailable;
            driver.latitude = latitude;
            driver.longitude = longitude;
            yield driver.save();
            res.status(200).json({ msg: 'Driver status changed' });
        });
    }
    // ===================== toggle is booked status ==============================================================
    posterDriverBooked(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            console.log(req.body);
            const { isBooked } = req.body;
            const driver = yield user_model_1.User.findById(id);
            if (!driver)
                return res.status(422).json({ error: 'Driver does not exist' });
            driver.isBooked = isBooked;
            yield driver.save();
            res.status(200).json({ msg: 'Driver status changed' });
        });
    }
};
__decorate([
    (0, index_1.poster)('/register'),
    (0, index_1.RequestBodyValidator)('firstName', 'lastName', 'email', 'password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "postRegister", null);
__decorate([
    (0, index_1.poster)('/login'),
    (0, index_1.RequestBodyValidator)('email', 'password'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "postLogin", null);
__decorate([
    (0, index_1.getter)('/driver/:available'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "getAvailableDriver", null);
__decorate([
    (0, index_1.putter)('/driver/availability/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "putterDriver", null);
__decorate([
    (0, index_1.poster)('/driver/booked/:id'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "posterDriverBooked", null);
LoginController = __decorate([
    (0, index_1.controller)('/api')
], LoginController);
