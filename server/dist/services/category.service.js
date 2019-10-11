"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const category_model_1 = require("./../entities/category.model");
const category_repository_1 = require("./../repositories/category.repository");
exports.categoryRepository = new category_repository_1.default(category_model_1.Category);
class CategoriService {
    getAllCategory() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = {};
            return yield exports.categoryRepository.find(query);
        });
    }
}
exports.default = CategoriService;
//# sourceMappingURL=category.service.js.map