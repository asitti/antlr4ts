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
import { ProxyErrorListener } from "./ProxyErrorListener";
import { Override } from "./Decorators";
/**
 * @author Sam Harwell
 */
var ProxyParserErrorListener = /** @class */ (function (_super) {
    __extends(ProxyParserErrorListener, _super);
    function ProxyParserErrorListener(delegates) {
        return _super.call(this, delegates) || this;
    }
    ProxyParserErrorListener.prototype.reportAmbiguity = function (recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs) {
        this.getDelegates()
            .forEach(function (listener) {
            if (listener.reportAmbiguity) {
                listener.reportAmbiguity(recognizer, dfa, startIndex, stopIndex, exact, ambigAlts, configs);
            }
        });
    };
    ProxyParserErrorListener.prototype.reportAttemptingFullContext = function (recognizer, dfa, startIndex, stopIndex, conflictingAlts, conflictState) {
        this.getDelegates()
            .forEach(function (listener) {
            if (listener.reportAttemptingFullContext) {
                listener.reportAttemptingFullContext(recognizer, dfa, startIndex, stopIndex, conflictingAlts, conflictState);
            }
        });
    };
    ProxyParserErrorListener.prototype.reportContextSensitivity = function (recognizer, dfa, startIndex, stopIndex, prediction, acceptState) {
        this.getDelegates()
            .forEach(function (listener) {
            if (listener.reportContextSensitivity) {
                listener.reportContextSensitivity(recognizer, dfa, startIndex, stopIndex, prediction, acceptState);
            }
        });
    };
    __decorate([
        Override
    ], ProxyParserErrorListener.prototype, "reportAmbiguity", null);
    __decorate([
        Override
    ], ProxyParserErrorListener.prototype, "reportAttemptingFullContext", null);
    __decorate([
        Override
    ], ProxyParserErrorListener.prototype, "reportContextSensitivity", null);
    return ProxyParserErrorListener;
}(ProxyErrorListener));
export { ProxyParserErrorListener };
//# sourceMappingURL=ProxyParserErrorListener.js.map