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
// ConvertTo-TS run at 2016-10-04T11:26:30.6852565-07:00
import { DecisionEventInfo } from './DecisionEventInfo';
import { NotNull } from '../Decorators';
/**
 * This class represents profiling event information for tracking the lookahead
 * depth required in order to make a prediction.
 *
 * @since 4.3
 */
var LookaheadEventInfo = /** @class */ (function (_super) {
    __extends(LookaheadEventInfo, _super);
    /**
     * Constructs a new instance of the {@link LookaheadEventInfo} class with
     * the specified detailed lookahead information.
     *
     * @param decision The decision number
     * @param state The final simulator state containing the necessary
     * information to determine the result of a prediction, or {@code null} if
     * the final state is not available
     * @param input The input token stream
     * @param startIndex The start index for the current prediction
     * @param stopIndex The index at which the prediction was finally made
     * @param fullCtx {@code true} if the current lookahead is part of an LL
     * prediction; otherwise, {@code false} if the current lookahead is part of
     * an SLL prediction
     */
    function LookaheadEventInfo(decision, state, predictedAlt, input, startIndex, stopIndex, fullCtx) {
        var _this = _super.call(this, decision, state, input, startIndex, stopIndex, fullCtx) || this;
        _this.predictedAlt = predictedAlt;
        return _this;
    }
    LookaheadEventInfo = __decorate([
        __param(3, NotNull)
    ], LookaheadEventInfo);
    return LookaheadEventInfo;
}(DecisionEventInfo));
export { LookaheadEventInfo };
//# sourceMappingURL=LookaheadEventInfo.js.map