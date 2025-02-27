"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UserControllers_js_1 = require("../Controllers/UserControllers.js");
const router = express_1.default.Router();
router.get("/", UserControllers_js_1.getAllUsers);
exports.default = router;
//# sourceMappingURL=UserRoutes.js.map