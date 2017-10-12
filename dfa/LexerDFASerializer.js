/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { DFASerializer } from './DFASerializer';
import { NotNull, Override } from '../Decorators';
import { VocabularyImpl } from '../VocabularyImpl';
var LexerDFASerializer = /** @class */ (function (_super) {
    __extends(LexerDFASerializer, _super);
    function LexerDFASerializer(dfa) {
        return _super.call(this, dfa, VocabularyImpl.EMPTY_VOCABULARY) || this;
    }
    LexerDFASerializer.prototype.getEdgeLabel = function (i) {
        return "'" + String.fromCharCode(i) + "'";
    };
    __decorate([
        Override,
        NotNull
    ], LexerDFASerializer.prototype, "getEdgeLabel", null);
    LexerDFASerializer = __decorate([
        __param(0, NotNull)
    ], LexerDFASerializer);
    return LexerDFASerializer;
}(DFASerializer));
export { LexerDFASerializer };
//# sourceMappingURL=LexerDFASerializer.js.map