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
 * Implements the {@code channel} lexer action by calling
 * {@link Lexer#setChannel} with the assigned channel.
 *
 * @author Sam Harwell
 * @since 4.2
 */
var LexerChannelAction = /** @class */ (function () {
    /**
     * Constructs a new {@code channel} action with the specified channel value.
     * @param channel The channel value to pass to {@link Lexer#setChannel}.
     */
    function LexerChannelAction(channel) {
        this._channel = channel;
    }
    Object.defineProperty(LexerChannelAction.prototype, "channel", {
        /**
         * Gets the channel to use for the {@link Token} created by the lexer.
         *
         * @return The channel to use for the {@link Token} created by the lexer.
         */
        get: function () {
            return this._channel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LexerChannelAction.prototype, "actionType", {
        /**
         * {@inheritDoc}
         * @return This method returns {@link LexerActionType#CHANNEL}.
         */
        get: function () {
            return 0 /* CHANNEL */;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LexerChannelAction.prototype, "isPositionDependent", {
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
     * <p>This action is implemented by calling {@link Lexer#setChannel} with the
     * value provided by {@link #getChannel}.</p>
     */
    LexerChannelAction.prototype.execute = function (lexer) {
        lexer.channel = this._channel;
    };
    LexerChannelAction.prototype.hashCode = function () {
        var hash = MurmurHash.initialize();
        hash = MurmurHash.update(hash, this.actionType);
        hash = MurmurHash.update(hash, this._channel);
        return MurmurHash.finish(hash, 2);
    };
    LexerChannelAction.prototype.equals = function (obj) {
        if (obj === this) {
            return true;
        }
        else if (!(obj instanceof LexerChannelAction)) {
            return false;
        }
        return this._channel === obj._channel;
    };
    LexerChannelAction.prototype.toString = function () {
        return "channel(" + this._channel + ")";
    };
    __decorate([
        Override
    ], LexerChannelAction.prototype, "actionType", null);
    __decorate([
        Override
    ], LexerChannelAction.prototype, "isPositionDependent", null);
    __decorate([
        Override,
        __param(0, NotNull)
    ], LexerChannelAction.prototype, "execute", null);
    __decorate([
        Override
    ], LexerChannelAction.prototype, "hashCode", null);
    __decorate([
        Override
    ], LexerChannelAction.prototype, "equals", null);
    __decorate([
        Override
    ], LexerChannelAction.prototype, "toString", null);
    return LexerChannelAction;
}());
export { LexerChannelAction };
//# sourceMappingURL=LexerChannelAction.js.map