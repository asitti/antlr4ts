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
import { Override, NotNull } from '../Decorators';
import { Transition } from './Transition';
var EpsilonTransition = /** @class */ (function (_super) {
    __extends(EpsilonTransition, _super);
    function EpsilonTransition(target, outermostPrecedenceReturn) {
        if (outermostPrecedenceReturn === void 0) { outermostPrecedenceReturn = -1; }
        var _this = _super.call(this, target) || this;
        _this._outermostPrecedenceReturn = outermostPrecedenceReturn;
        return _this;
    }
    Object.defineProperty(EpsilonTransition.prototype, "outermostPrecedenceReturn", {
        /**
         * @return the rule index of a precedence rule for which this transition is
         * returning from, where the precedence value is 0; otherwise, -1.
         *
         * @see ATNConfig.isPrecedenceFilterSuppressed
         * @see ParserATNSimulator#applyPrecedenceFilter(ATNConfigSet, ParserRuleContext, PredictionContextCache)
         * @since 4.4.1
         */
        get: function () {
            return this._outermostPrecedenceReturn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EpsilonTransition.prototype, "serializationType", {
        get: function () {
            return 1 /* EPSILON */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(EpsilonTransition.prototype, "isEpsilon", {
        get: function () {
            return true;
        },
        enumerable: true,
        configurable: true
    });
    EpsilonTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    };
    EpsilonTransition.prototype.toString = function () {
        return "epsilon";
    };
    __decorate([
        Override
    ], EpsilonTransition.prototype, "serializationType", null);
    __decorate([
        Override
    ], EpsilonTransition.prototype, "isEpsilon", null);
    __decorate([
        Override
    ], EpsilonTransition.prototype, "matches", null);
    __decorate([
        Override,
        NotNull
    ], EpsilonTransition.prototype, "toString", null);
    EpsilonTransition = __decorate([
        __param(0, NotNull)
    ], EpsilonTransition);
    return EpsilonTransition;
}(Transition));
export { EpsilonTransition };
//# sourceMappingURL=EpsilonTransition.js.map