"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    isBooked: { type: Boolean, required: false },
    isDriver: { type: Boolean, required: false },
    isAvailable: { type: Boolean, required: false },
    latitude: { type: Number, required: false },
    longitude: { type: Number, required: false },
    createdAt: { type: Date, default: Date.now },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
