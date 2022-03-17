"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { required: true },
    lastName: { required: true },
    email: { required: true },
    password: { required: true },
    vehicle: { required: false },
    isDriver: { required: false },
    isAvailable: { required: false },
    createdAt: { default: Date.now },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
