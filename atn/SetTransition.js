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
import { IntervalSet } from '../misc/IntervalSet';
import { Override, NotNull, Nullable } from '../Decorators';
import { Token } from '../Token';
import { Transition } from './Transition';
/** A transition containing a set of values. */
var SetTransition = /** @class */ (function (_super) {
    __extends(SetTransition, _super);
    // TODO (sam): should we really allow null here?
    function SetTransition(target, set) {
        var _this = _super.call(this, target) || this;
        if (set == null) {
            set = IntervalSet.of(Token.INVALID_TYPE);
        }
        _this.set = set;
        return _this;
    }
    Object.defineProperty(SetTransition.prototype, "serializationType", {
        get: function () {
            return 7 /* SET */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SetTransition.prototype, "label", {
        get: function () {
            return this.set;
        },
        enumerable: true,
        configurable: true
    });
    SetTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
        return this.set.contains(symbol);
    };
    SetTransition.prototype.toString = function () {
        return this.set.toString();
    };
    __decorate([
        NotNull
    ], SetTransition.prototype, "set", void 0);
    __decorate([
        Override
    ], SetTransition.prototype, "serializationType", null);
    __decorate([
        Override,
        NotNull
    ], SetTransition.prototype, "label", null);
    __decorate([
        Override
    ], SetTransition.prototype, "matches", null);
    __decorate([
        Override,
        NotNull
    ], SetTransition.prototype, "toString", null);
    SetTransition = __decorate([
        __param(0, NotNull), __param(1, Nullable)
    ], SetTransition);
    return SetTransition;
}(Transition));
export { SetTransition };
//# sourceMappingURL=SetTransition.js.map