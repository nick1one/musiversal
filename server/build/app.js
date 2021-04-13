"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = express_1.default();
var port = 3001;
app.get("/toto", function (req, res) {
    res.send("Hello toto");
});
app.listen(port, function () {
    console.log("App is listening on port " + port + " !");
});
