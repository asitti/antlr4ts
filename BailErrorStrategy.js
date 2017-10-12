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
// ConvertTo-TS run at 2016-10-04T11:26:49.2855056-07:00
/**
 * This implementation of {@link ANTLRErrorStrategy} responds to syntax errors
 * by immediately canceling the parse operation with a
 * {@link ParseCancellationException}. The implementation ensures that the
 * {@link ParserRuleContext#exception} field is set for all parse tree nodes
 * that were not completed prior to encountering the error.
 *
 * <p>
 * This error strategy is useful in the following scenarios.</p>
 *
 * <ul>
 * <li><strong>Two-stage parsing:</strong> This error strategy allows the first
 * stage of two-stage parsing to immediately terminate if an error is
 * encountered, and immediately fall back to the second stage. In addition to
 * avoiding wasted work by attempting to recover from errors here, the empty
 * implementation of {@link BailErrorStrategy#sync} improves the performance of
 * the first stage.</li>
 * <li><strong>Silent validation:</strong> When syntax errors are not being
 * reported or logged, and the parse result is simply ignored if errors occur,
 * the {@link BailErrorStrategy} avoids wasting work on recovering from errors
 * when the result will be ignored either way.</li>
 * </ul>
 *
 * <p>
 * {@code myparser.errorHandler = new BailErrorStrategy();}</p>
 *
 * @see Parser.errorHandler
 */
import { DefaultErrorStrategy } from "./DefaultErrorStrategy";
import { InputMismatchException } from "./InputMismatchException";
import { Override } from "./Decorators";
import { ParseCancellationException } from "./misc/ParseCancellationException";
var BailErrorStrategy = /** @class */ (function (_super) {
    __extends(BailErrorStrategy, _super);
    function BailErrorStrategy() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Instead of recovering from exception {@code e}, re-throw it wrapped
     *  in a {@link ParseCancellationException} so it is not caught by the
     *  rule function catches.  Use {@link Exception#getCause()} to get the
     *  original {@link RecognitionException}.
     */
    BailErrorStrategy.prototype.recover = function (recognizer, e) {
        for (var context_1 = recognizer.context; context_1; context_1 = context_1.parent) {
            context_1.exception = e;
        }
        throw new ParseCancellationException(e);
    };
    /** Make sure we don't attempt to recover inline; if the parser
     *  successfully recovers, it won't throw an exception.
     */
    BailErrorStrategy.prototype.recoverInline = function (recognizer) {
        var e = new InputMismatchException(recognizer);
        for (var context_2 = recognizer.context; context_2; context_2 = context_2.parent) {
            context_2.exception = e;
        }
        throw new ParseCancellationException(e);
    };
    /** Make sure we don't attempt to recover from problems in subrules. */
    BailErrorStrategy.prototype.sync = function (recognizer) { };
    __decorate([
        Override
    ], BailErrorStrategy.prototype, "recover", null);
    __decorate([
        Override
    ], BailErrorStrategy.prototype, "recoverInline", null);
    __decorate([
        Override
    ], BailErrorStrategy.prototype, "sync", null);
    return BailErrorStrategy;
}(DefaultErrorStrategy));
export { BailErrorStrategy };
//# sourceMappingURL=BailErrorStrategy.js.map