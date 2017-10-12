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
 * Implements the {@code pushMode} lexer action by calling
 * {@link Lexer#pushMode} with the assigned mode.
 *
 * @author Sam Harwell
 * @since 4.2
 */
var LexerPushModeAction = /** @class */ (function () {
    /**
     * Constructs a new {@code pushMode} action with the specified mode value.
     * @param mode The mode value to pass to {@link Lexer#pushMode}.
     */
    function LexerPushModeAction(mode) {
        this._mode = mode;
    }
    Object.defineProperty(LexerPushModeAction.prototype, "mode", {
        /**
         * Get the lexer mode this action should transition the lexer to.
         *
         * @return The lexer mode for this {@code pushMode} command.
         */
        get: function () {
            return this._mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LexerPushModeAction.prototype, "actionType", {
        /**
         * {@inheritDoc}
         * @return This method returns {@link LexerActionType#PUSH_MODE}.
         */
        get: function () {
            return 5 /* PUSH_MODE */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LexerPushModeAction.prototype, "isPositionDependent", {
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
     * <p>This action is implemented by calling {@link Lexer#pushMode} with the
     * value provided by {@link #getMode}.</p>
     */
    LexerPushModeAction.prototype.execute = function (lexer) {
        lexer.pushMode(this._mode);
    };
    LexerPushModeAction.prototype.hashCode = function () {
        var hash = MurmurHash.initialize();
        hash = MurmurHash.update(hash, this.actionType);
        hash = MurmurHash.update(hash, this._mode);
        return MurmurHash.finish(hash, 2);
    };
    LexerPushModeAction.prototype.equals = function (obj) {
        if (obj === this) {
            return true;
        }
        else if (!(obj instanceof LexerPushModeAction)) {
            return false;
        }
        return this._mode === obj._mode;
    };
    LexerPushModeAction.prototype.toString = function () {
        return "pushMode(" + this._mode + ")";
    };
    __decorate([
        Override
    ], LexerPushModeAction.prototype, "actionType", null);
    __decorate([
        Override
    ], LexerPushModeAction.prototype, "isPositionDependent", null);
    __decorate([
        Override,
        __param(0, NotNull)
    ], LexerPushModeAction.prototype, "execute", null);
    __decorate([
        Override
    ], LexerPushModeAction.prototype, "hashCode", null);
    __decorate([
        Override
    ], LexerPushModeAction.prototype, "equals", null);
    __decorate([
        Override
    ], LexerPushModeAction.prototype, "toString", null);
    return LexerPushModeAction;
}());
export { LexerPushModeAction };
//# sourceMappingURL=LexerPushModeAction.js.map