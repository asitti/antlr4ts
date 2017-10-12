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
import { NotNull } from '../Decorators';
/**
 * This class provides access to specific and aggregate statistics gathered
 * during profiling of a parser.
 *
 * @since 4.3
 */
var ParseInfo = /** @class */ (function () {
    function ParseInfo(atnSimulator) {
        this.atnSimulator = atnSimulator;
    }
    /**
     * Gets an array of {@link DecisionInfo} instances containing the profiling
     * information gathered for each decision in the ATN.
     *
     * @return An array of {@link DecisionInfo} instances, indexed by decision
     * number.
     */
    ParseInfo.prototype.getDecisionInfo = function () {
        return this.atnSimulator.getDecisionInfo();
    };
    /**
     * Gets the decision numbers for decisions that required one or more
     * full-context predictions during parsing. These are decisions for which
     * {@link DecisionInfo#LL_Fallback} is non-zero.
     *
     * @return A list of decision numbers which required one or more
     * full-context predictions during parsing.
     */
    ParseInfo.prototype.getLLDecisions = function () {
        var decisions = this.atnSimulator.getDecisionInfo();
        var LL = [];
        for (var i = 0; i < decisions.length; i++) {
            var fallBack = decisions[i].LL_Fallback;
            if (fallBack > 0) {
                LL.push(i);
            }
        }
        return LL;
    };
    /**
     * Gets the total time spent during prediction across all decisions made
     * during parsing. This value is the sum of
     * {@link DecisionInfo#timeInPrediction} for all decisions.
     */
    ParseInfo.prototype.getTotalTimeInPrediction = function () {
        var decisions = this.atnSimulator.getDecisionInfo();
        var t = 0;
        for (var i = 0; i < decisions.length; i++) {
            t += decisions[i].timeInPrediction;
        }
        return t;
    };
    /**
     * Gets the total number of SLL lookahead operations across all decisions
     * made during parsing. This value is the sum of
     * {@link DecisionInfo#SLL_TotalLook} for all decisions.
     */
    ParseInfo.prototype.getTotalSLLLookaheadOps = function () {
        var decisions = this.atnSimulator.getDecisionInfo();
        var k = 0;
        for (var i = 0; i < decisions.length; i++) {
            k += decisions[i].SLL_TotalLook;
        }
        return k;
    };
    /**
     * Gets the total number of LL lookahead operations across all decisions
     * made during parsing. This value is the sum of
     * {@link DecisionInfo#LL_TotalLook} for all decisions.
     */
    ParseInfo.prototype.getTotalLLLookaheadOps = function () {
        var decisions = this.atnSimulator.getDecisionInfo();
        var k = 0;
        for (var i = 0; i < decisions.length; i++) {
            k += decisions[i].LL_TotalLook;
        }
        return k;
    };
    /**
     * Gets the total number of ATN lookahead operations for SLL prediction
     * across all decisions made during parsing.
     */
    ParseInfo.prototype.getTotalSLLATNLookaheadOps = function () {
        var decisions = this.atnSimulator.getDecisionInfo();
        var k = 0;
        for (var i = 0; i < decisions.length; i++) {
            k += decisions[i].SLL_ATNTransitions;
        }
        return k;
    };
    /**
     * Gets the total number of ATN lookahead operations for LL prediction
     * across all decisions made during parsing.
     */
    ParseInfo.prototype.getTotalLLATNLookaheadOps = function () {
        var decisions = this.atnSimulator.getDecisionInfo();
        var k = 0;
        for (var i = 0; i < decisions.length; i++) {
            k += decisions[i].LL_ATNTransitions;
        }
        return k;
    };
    /**
     * Gets the total number of ATN lookahead operations for SLL and LL
     * prediction across all decisions made during parsing.
     *
     * <p>
     * This value is the sum of {@link #getTotalSLLATNLookaheadOps} and
     * {@link #getTotalLLATNLookaheadOps}.</p>
     */
    ParseInfo.prototype.getTotalATNLookaheadOps = function () {
        var decisions = this.atnSimulator.getDecisionInfo();
        var k = 0;
        for (var i = 0; i < decisions.length; i++) {
            k += decisions[i].SLL_ATNTransitions;
            k += decisions[i].LL_ATNTransitions;
        }
        return k;
    };
    ParseInfo.prototype.getDFASize = function (decision) {
        if (decision) {
            var decisionToDFA = this.atnSimulator.atn.decisionToDFA[decision];
            return decisionToDFA.states.size;
        }
        else {
            var n = 0;
            var decisionToDFA = this.atnSimulator.atn.decisionToDFA;
            for (var i = 0; i < decisionToDFA.length; i++) {
                n += this.getDFASize(i);
            }
            return n;
        }
    };
    __decorate([
        NotNull
    ], ParseInfo.prototype, "getDecisionInfo", null);
    __decorate([
        NotNull
    ], ParseInfo.prototype, "getLLDecisions", null);
    ParseInfo = __decorate([
        __param(0, NotNull)
    ], ParseInfo);
    return ParseInfo;
}());
export { ParseInfo };
//# sourceMappingURL=ParseInfo.js.map