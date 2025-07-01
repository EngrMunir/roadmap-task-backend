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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../app/config"));
const user_constant_1 = require("./user.constant");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'User name is required'],
    },
    email: {
        type: String,
        required: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please provide a valid email address',
        ],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        enum: [user_constant_1.USER_ROLE.user, user_constant_1.USER_ROLE.admin],
        default: user_constant_1.USER_ROLE.user,
    },
}, {
    timestamps: true,
});
// use hook to hash password before saving user
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const user = this;
        // hashing password before saving
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
// use hook to empty password before sending response
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});
// find user by using email
userSchema.statics.isUserExistByEmail = function (email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield this.findOne({ email }).select('+password');
    });
};
// Check if password is correct or not
userSchema.statics.isPasswordMatched = function (plainTextPassword, hashedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(plainTextPassword, hashedPassword);
    });
};
exports.User = (0, mongoose_1.model)('User', userSchema);
