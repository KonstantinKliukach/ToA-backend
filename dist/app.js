"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const daysRouter_1 = __importDefault(require("./routers/daysRouter"));
const consts_1 = require("./utils/consts");
const body_parser_1 = __importDefault(require("body-parser"));
const envFileName = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv_1.default.config({
    path: envFileName,
});
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(`${consts_1.API}`, daysRouter_1.default);
app.get('/', (req, res) => {
    res.send('Today is Heavy Rain');
});
mongoose_1.default
    .connect(process.env.MONGO)
    .then(() => {
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
})
    .catch((err) => {
    console.log(err);
});
