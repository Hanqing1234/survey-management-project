"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const index_1 = require("../Controller/index");
router.get('/', index_1.DisplayHomePage);
router.get('/home', index_1.DisplayHomePage);
router.get('/survey-list', index_1.DisplaySurveyListPage);
router.get('/add', index_1.DisplayAddPage);
router.post('/add', index_1.ProcessAddPage);
router.get('/update/:id', index_1.DisplayUpdatePage);
router.post('/update/:id', index_1.ProcessUpdatePage);
router.get('/delete/:id', index_1.ProcessDeletePage);
module.exports = router;
//# sourceMappingURL=index.js.map