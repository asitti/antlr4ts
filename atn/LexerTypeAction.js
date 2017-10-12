/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { MurmurHash } from '../misc/MurmurHash';
import { NotNull, Override } from '../Decorators';
/**
 * Implements the {@code type} lexer action by setting `Lexer.type`
 * with the assigned type.
 *
 * @author Sam Harwell
 * @since 4.2
 */
var LexerTypeAction = /** @class */ (function () {
    /**
     * Constructs a new {@code type} action with the specified token type value.
     * @param type The type to assign to the token using `Lexer.type`.
     */
    function LexerTypeAction(type) {
        this._type = type;
    }
    Object.defineProperty(LexerTypeAction.prototype, "type", {
        /**
         * Gets the type to assign to a token created by the lexer.
         * @return The type to assign to a token created by the lexer.
         */
        get: function () {
            return this._type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LexerTypeAction.prototype, "actionType", {
        /**
         * {@inheritDoc}
         * @return This method returns {@link LexerActionType#TYPE}.
         */
        get: function () {
            return 7 /* TYPE */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LexerTypeAction.prototype, "isPositionDependent", {
        /**
         * {@inheritDoc}
         * @return This method returns {@code false}.
         */
        get: function () {
            return false;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * {@inheritDoc}
     *
     * <p>This action is implemented by setting `Lexer.type` with the
     * value provided by `type`.</p>
     */
    LexerTypeAction.prototype.execute = function (lexer) {
        lexer.type = this._type;
    };
    LexerTypeAction.prototype.hashCode = function () {
        var hash = MurmurHash.initialize();
        hash = MurmurHash.update(hash, this.actionType);
        hash = MurmurHash.update(hash, this._type);
        return MurmurHash.finish(hash, 2);
    };
    LexerTypeAction.prototype.equals = function (obj) {
        if (obj === this) {
            return true;
        }
        else if (!(obj instanceof LexerTypeAction)) {
            return false;
        }
        return this._type === obj._type;
    };
    LexerTypeAction.prototype.toString = function () {
        return "type(" + this._type + ")";
    };
    __decorate([
        Override
    ], LexerTypeAction.prototype, "actionType", null);
    __decorate([
        Override
    ], LexerTypeAction.prototype, "isPositionDependent", null);
    __decorate([
        Override,
        __param(0, NotNull)
    ], LexerTypeAction.prototype, "execute", null);
    __decorate([
        Override
    ], LexerTypeAction.prototype, "hashCode", null);
    __decorate([
        Override
    ], LexerTypeAction.prototype, "equals", null);
    __decorate([
        Override
    ], LexerTypeAction.prototype, "toString", null);
    return LexerTypeAction;
}());
export { LexerTypeAction };
//# sourceMappingURL=LexerTypeAction.js.map