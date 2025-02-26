"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SignupControllers_js_1 = require("../Controllers/SignupControllers.js");
const router = express_1.default.Router();
// Route d'inscription
router.post('/', SignupControllers_js_1.createUser);
exports.default = router;
//# sourceMappingURL=SignupRoutes.js.map