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
import { Interval } from './misc/Interval';
import { NotNull, Override } from './Decorators';
import { Token } from './Token';
var CommonToken = /** @class */ (function () {
    function CommonToken(type, text, source, channel, start, stop) {
        if (source === void 0) { source = CommonToken.EMPTY_SOURCE; }
        if (channel === void 0) { channel = Token.DEFAULT_CHANNEL; }
        if (start === void 0) { start = 0; }
        if (stop === void 0) { stop = 0; }
        /**
         * This is the backing field for {@link #getLine} and {@link #setLine}.
         */
        this._line = 0;
        /**
         * This is the backing field for {@link #getCharPositionInLine} and
         * {@link #setCharPositionInLine}.
         */
        this._charPositionInLine = -1; // set to invalid position
        /**
         * This is the backing field for {@link #getChannel} and
         * {@link #setChannel}.
         */
        this._channel = Token.DEFAULT_CHANNEL;
        /**
         * This is the backing field for `tokenIndex`.
         */
        this.index = -1;
        this._text = text;
        this._type = type;
        this.source = source;
        this._channel = channel;
        this.start = start;
        this.stop = stop;
        if (source.source != null) {
            this._line = source.source.line;
            this._charPositionInLine = source.source.charPositionInLine;
        }
    }
    /**
     * Constructs a new {@link CommonToken} as a copy of another {@link Token}.
     *
     * <p>
     * If {@code oldToken} is also a {@link CommonToken} instance, the newly
     * constructed token will share a reference to the {@link #text} field and
     * the {@link Tuple2} stored in {@link #source}. Otherwise, {@link #text} will
     * be assigned the result of calling {@link #getText}, and {@link #source}
     * will be constructed from the result of {@link Token#getTokenSource} and
     * {@link Token#getInputStream}.</p>
     *
     * @param oldToken The token to copy.
     */
    CommonToken.fromToken = function (oldToken) {
        var result = new CommonToken(oldToken.type, undefined, CommonToken.EMPTY_SOURCE, oldToken.channel, oldToken.startIndex, oldToken.stopIndex);
        result._line = oldToken.line;
        result.index = oldToken.tokenIndex;
        result._charPositionInLine = oldToken.charPositionInLine;
        if (oldToken instanceof CommonToken) {
            result._text = oldToken.text;
            result.source = oldToken.source;
        }
        else {
            result._text = oldToken.text;
            result.source = { source: oldToken.tokenSource, stream: oldToken.inputStream };
        }
        return result;
    };
    Object.defineProperty(CommonToken.prototype, "type", {
        get: function () {
            return this._type;
        },
        // @Override
        set: function (type) {
            this._type = type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "line", {
        get: function () {
            return this._line;
        },
        // @Override
        set: function (line) {
            this._line = line;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "text", {
        get: function () {
            if (this._text != null) {
                return this._text;
            }
            var input = this.inputStream;
            if (input == null) {
                return undefined;
            }
            var n = input.size;
            if (this.start < n && this.stop < n) {
                return input.getText(Interval.of(this.start, this.stop));
            }
            else {
                return "<EOF>";
            }
        },
        /**
         * Explicitly set the text for this token. If {code text} is not
         * {@code null}, then {@link #getText} will return this value rather than
         * extracting the text from the input.
         *
         * @param text The explicit text of the token, or {@code null} if the text
         * should be obtained from the input along with the start and stop indexes
         * of the token.
         */
        // @Override
        set: function (text) {
            this._text = text;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "charPositionInLine", {
        get: function () {
            return this._charPositionInLine;
        },
        // @Override
        set: function (charPositionInLine) {
            this._charPositionInLine = charPositionInLine;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "channel", {
        get: function () {
            return this._channel;
        },
        // @Override
        set: function (channel) {
            this._channel = channel;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "startIndex", {
        get: function () {
            return this.start;
        },
        set: function (start) {
            this.start = start;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "stopIndex", {
        get: function () {
            return this.stop;
        },
        set: function (stop) {
            this.stop = stop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "tokenIndex", {
        get: function () {
            return this.index;
        },
        // @Override
        set: function (index) {
            this.index = index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "tokenSource", {
        get: function () {
            return this.source.source;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CommonToken.prototype, "inputStream", {
        get: function () {
            return this.source.stream;
        },
        enumerable: true,
        configurable: true
    });
    CommonToken.prototype.toString = function (recognizer) {
        var channelStr = "";
        if (this._channel > 0) {
            channelStr = ",channel=" + this._channel;
        }
        var txt = this.text;
        if (txt != null) {
            txt = txt.replace(/\n/g, "\\n");
            txt = txt.replace(/\r/g, "\\r");
            txt = txt.replace(/\t/g, "\\t");
        }
        else {
            txt = "<no text>";
        }
        var typeString = String(this._type);
        if (recognizer) {
            typeString = recognizer.vocabulary.getDisplayName(this._type);
        }
        return "[@" + this.tokenIndex + "," + this.start + ":" + this.stop + "='" + txt + "',<" + typeString + ">" + channelStr + "," + this._line + ":" + this.charPositionInLine + "]";
    };
    /**
     * An empty {@link Tuple2} which is used as the default value of
     * {@link #source} for tokens that do not have a source.
     */
    CommonToken.EMPTY_SOURCE = { source: undefined, stream: undefined };
    __decorate([
        NotNull
    ], CommonToken.prototype, "source", void 0);
    __decorate([
        Override
    ], CommonToken.prototype, "type", null);
    __decorate([
        Override
    ], CommonToken.prototype, "text", null);
    __decorate([
        Override
    ], CommonToken.prototype, "line", null);
    __decorate([
        Override
    ], CommonToken.prototype, "charPositionInLine", null);
    __decorate([
        Override
    ], CommonToken.prototype, "channel", null);
    __decorate([
        Override
    ], CommonToken.prototype, "startIndex", null);
    __decorate([
        Override
    ], CommonToken.prototype, "stopIndex", null);
    __decorate([
        Override
    ], CommonToken.prototype, "tokenIndex", null);
    __decorate([
        Override
    ], CommonToken.prototype, "tokenSource", null);
    __decorate([
        Override
    ], CommonToken.prototype, "inputStream", null);
    __decorate([
        Override
    ], CommonToken.prototype, "toString", null);
    __decorate([
        __param(0, NotNull)
    ], CommonToken, "fromToken", null);
    CommonToken = __decorate([
        __param(2, NotNull)
    ], CommonToken);
    return CommonToken;
}());
export { CommonToken };
//# sourceMappingURL=CommonToken.js.map