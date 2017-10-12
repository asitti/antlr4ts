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
// ConvertTo-TS run at 2016-10-04T11:26:46.3281988-07:00
import { CommonToken } from '../../CommonToken';
import { NotNull, Override } from '../../Decorators';
/**
 * A {@link Token} object representing a token of a particular type; e.g.,
 * {@code <ID>}. These tokens are created for {@link TagChunk} chunks where the
 * tag corresponds to a lexer rule or token type.
 */
var TokenTagToken = /** @class */ (function (_super) {
    __extends(TokenTagToken, _super);
    /**
     * Constructs a new instance of {@link TokenTagToken} with the specified
     * token name, type, and label.
     *
     * @param tokenName The token name.
     * @param type The token type.
     * @param label The label associated with the token tag, or {@code null} if
     * the token tag is unlabeled.
     */
    function TokenTagToken(tokenName, type, label) {
        var _this = _super.call(this, type) || this;
        _this._tokenName = tokenName;
        _this._label = label;
        return _this;
    }
    Object.defineProperty(TokenTagToken.prototype, "tokenName", {
        /**
         * Gets the token name.
         * @return The token name.
         */
        get: function () {
            return this._tokenName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenTagToken.prototype, "label", {
        /**
         * Gets the label associated with the rule tag.
         *
         * @return The name of the label associated with the rule tag, or
         * {@code null} if this is an unlabeled rule tag.
         */
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TokenTagToken.prototype, "text", {
        /**
         * {@inheritDoc}
         *
         * <p>The implementation for {@link TokenTagToken} returns the token tag
         * formatted with {@code <} and {@code >} delimiters.</p>
         */
        get: function () {
            if (this._label != null) {
                return "<" + this._label + ":" + this._tokenName + ">";
            }
            return "<" + this._tokenName + ">";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * {@inheritDoc}
     *
     * <p>The implementation for {@link TokenTagToken} returns a string of the form
     * {@code tokenName:type}.</p>
     */
    TokenTagToken.prototype.toString = function () {
        return this._tokenName + ":" + this.type;
    };
    __decorate([
        NotNull
    ], TokenTagToken.prototype, "_tokenName", void 0);
    __decorate([
        NotNull
    ], TokenTagToken.prototype, "tokenName", null);
    __decorate([
        Override
    ], TokenTagToken.prototype, "text", null);
    __decorate([
        Override
    ], TokenTagToken.prototype, "toString", null);
    TokenTagToken = __decorate([
        __param(0, NotNull)
    ], TokenTagToken);
    return TokenTagToken;
}(CommonToken));
export { TokenTagToken };
//# sourceMappingURL=TokenTagToken.js.map