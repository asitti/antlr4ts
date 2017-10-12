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
import { RecognitionException } from "./RecognitionException";
import { NotNull, Override } from "./Decorators";
import { Interval } from "./misc/Interval";
import * as Utils from "./misc/Utils";
var LexerNoViableAltException = /** @class */ (function (_super) {
    __extends(LexerNoViableAltException, _super);
    function LexerNoViableAltException(lexer, input, startIndex, deadEndConfigs) {
        var _this = _super.call(this, lexer, input) || this;
        _this._startIndex = startIndex;
        _this._deadEndConfigs = deadEndConfigs;
        return _this;
    }
    Object.defineProperty(LexerNoViableAltException.prototype, "startIndex", {
        get: function () {
            return this._startIndex;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LexerNoViableAltException.prototype, "deadEndConfigs", {
        get: function () {
            return this._deadEndConfigs;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LexerNoViableAltException.prototype, "inputStream", {
        get: function () {
            return this.input;
        },
        enumerable: true,
        configurable: true
    });
    LexerNoViableAltException.prototype.toString = function () {
        var symbol = "";
        if (this._startIndex >= 0 && this._startIndex < this.inputStream.size) {
            symbol = this.inputStream.getText(Interval.of(this._startIndex, this._startIndex));
            symbol = Utils.escapeWhitespace(symbol, false);
        }
        // return String.format(Locale.getDefault(), "%s('%s')", LexerNoViableAltException.class.getSimpleName(), symbol);
        return "LexerNoViableAltException('" + symbol + "')";
    };
    __decorate([
        Override
    ], LexerNoViableAltException.prototype, "inputStream", null);
    __decorate([
        Override
    ], LexerNoViableAltException.prototype, "toString", null);
    LexerNoViableAltException = __decorate([
        __param(1, NotNull)
    ], LexerNoViableAltException);
    return LexerNoViableAltException;
}(RecognitionException));
export { LexerNoViableAltException };
//# sourceMappingURL=LexerNoViableAltException.js.map