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
var ActionTransition = /** @class */ (function (_super) {
    __extends(ActionTransition, _super);
    function ActionTransition(target, ruleIndex, actionIndex, isCtxDependent) {
        if (actionIndex === void 0) { actionIndex = -1; }
        if (isCtxDependent === void 0) { isCtxDependent = false; }
        var _this = _super.call(this, target) || this;
        _this.ruleIndex = ruleIndex;
        _this.actionIndex = actionIndex;
        _this.isCtxDependent = isCtxDependent;
        return _this;
    }
    Object.defineProperty(ActionTransition.prototype, "serializationType", {
        get: function () {
            return 6 /* ACTION */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionTransition.prototype, "isEpsilon", {
        get: function () {
            return true; // we are to be ignored by analysis 'cept for predicates
        },
        enumerable: true,
        configurable: true
    });
    ActionTransition.prototype.matches = function (symbol, minVocabSymbol, maxVocabSymbol) {
        return false;
    };
    ActionTransition.prototype.toString = function () {
        return "action_" + this.ruleIndex + ":" + this.actionIndex;
    };
    __decorate([
        Override
    ], ActionTransition.prototype, "serializationType", null);
    __decorate([
        Override
    ], ActionTransition.prototype, "isEpsilon", null);
    __decorate([
        Override
    ], ActionTransition.prototype, "matches", null);
    __decorate([
        Override
    ], ActionTransition.prototype, "toString", null);
    ActionTransition = __decorate([
        __param(0, NotNull)
    ], ActionTransition);
    return ActionTransition;
}(Transition));
export { ActionTransition };
//# sourceMappingURL=ActionTransition.js.map