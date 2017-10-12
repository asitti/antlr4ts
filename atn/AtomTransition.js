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
import { Override, NotNull } from '../Decorators';
import { Transition } from './Transition';
/** TODO: make all transitions sets? no, should remove set edges */
var AtomTransition = /** @class */ (function (_super) {
    __extends(AtomTransition, _super);
    function AtomTransition(target, label) {
        var _this = _super.call(this, target) || this;
        _this._label = label;
        return _this;
    }
    Object.defineProperty(AtomTransition.prototype, "serializationType", {
        get: function () {
            return 5 /* ATOM */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AtomTransition.prototype, "label", {
        get: function () {
            return IntervalSet.of(this._label);
        },
        enumerable: true,
        configurable: true
    });
    AtomTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
        return this._label === symbol;
    };
    AtomTransition.prototype.toString = function () {
        return String(this.label);
    };
    __decorate([
        Override
    ], AtomTransition.prototype, "serializationType", null);
    __decorate([
        Override,
        NotNull
    ], AtomTransition.prototype, "label", null);
    __decorate([
        Override
    ], AtomTransition.prototype, "matches", null);
    __decorate([
        Override,
        NotNull
    ], AtomTransition.prototype, "toString", null);
    AtomTransition = __decorate([
        __param(0, NotNull)
    ], AtomTransition);
    return AtomTransition;
}(Transition));
export { AtomTransition };
//# sourceMappingURL=AtomTransition.js.map