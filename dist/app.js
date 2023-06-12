"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const envConfig_1 = __importDefault(require("./config/envConfig"));
const app = (0, express_1.default)();
app.listen(envConfig_1.default.PORT, () => {
    console.log(`App is flying on PORT ${envConfig_1.default.PORT}`);
});
app.get('/', (req, res) => {
    res.send('Hell');
});
exports.default = app;
