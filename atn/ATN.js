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
// ConvertTo-TS run at 2016-10-04T11:26:25.1063510-07:00
import { Array2DHashMap } from '../misc/Array2DHashMap';
import { DFA } from '../dfa/DFA';
import { IntervalSet } from '../misc/IntervalSet';
import { InvalidState } from './InvalidState';
import { LL1Analyzer } from './LL1Analyzer';
import { NotNull } from '../Decorators';
import { ObjectEqualityComparator } from '../misc/ObjectEqualityComparator';
import { PredictionContext } from './PredictionContext';
import { Token } from '../Token';
import * as assert from 'assert';
/** */
var ATN = /** @class */ (function () {
    /** Used for runtime deserialization of ATNs from strings */
    function ATN(grammarType, maxTokenType) {
        this.states = [];
        /** Each subrule/rule is a decision point and we must track them so we
         *  can go back later and build DFA predictors for them.  This includes
         *  all the rules, subrules, optional blocks, ()+, ()* etc...
         */
        this.decisionToState = [];
        this.modeNameToStartState = new Map();
        this.modeToStartState = [];
        this.contextCache = new Array2DHashMap(ObjectEqualityComparator.INSTANCE);
        this.decisionToDFA = [];
        this.modeToDFA = [];
        this.LL1Table = new Map();
        this.grammarType = grammarType;
        this.maxTokenType = maxTokenType;
    }
    ATN.prototype.clearDFA = function () {
        this.decisionToDFA = new Array(this.decisionToState.length);
        for (var i = 0; i < this.decisionToDFA.length; i++) {
            this.decisionToDFA[i] = new DFA(this.decisionToState[i], i);
        }
        this.modeToDFA = new Array(this.modeToStartState.length);
        for (var i = 0; i < this.modeToDFA.length; i++) {
            this.modeToDFA[i] = new DFA(this.modeToStartState[i]);
        }
        this.contextCache.clear();
        this.LL1Table.clear();
    };
    Object.defineProperty(ATN.prototype, "contextCacheSize", {
        get: function () {
            return this.contextCache.size;
        },
        enumerable: true,
        configurable: true
    });
    ATN.prototype.getCachedContext = function (context) {
        return PredictionContext.getCachedContext(context, this.contextCache, new PredictionContext.IdentityHashMap());
    };
    ATN.prototype.getDecisionToDFA = function () {
        assert(this.decisionToDFA != null && this.decisionToDFA.length === this.decisionToState.length);
        return this.decisionToDFA;
    };
    ATN.prototype.nextTokens = function (s, ctx) {
        if (ctx) {
            var anal = new LL1Analyzer(this);
            var next = anal.LOOK(s, ctx);
            return next;
        }
        else {
            if (s.nextTokenWithinRule) {
                return s.nextTokenWithinRule;
            }
            s.nextTokenWithinRule = this.nextTokens(s, PredictionContext.EMPTY_LOCAL);
            s.nextTokenWithinRule.setReadonly(true);
            return s.nextTokenWithinRule;
        }
    };
    ATN.prototype.addState = function (state) {
        state.atn = this;
        state.stateNumber = this.states.length;
        this.states.push(state);
    };
    ATN.prototype.removeState = function (state) {
        // just replace the state, don't shift states in list
        var invalidState = new InvalidState();
        invalidState.atn = this;
        invalidState.stateNumber = state.stateNumber;
        this.states[state.stateNumber] = invalidState;
    };
    ATN.prototype.defineMode = function (name, s) {
        this.modeNameToStartState.set(name, s);
        this.modeToStartState.push(s);
        this.modeToDFA.push(new DFA(s));
        this.defineDecisionState(s);
    };
    ATN.prototype.defineDecisionState = function (s) {
        this.decisionToState.push(s);
        s.decision = this.decisionToState.length - 1;
        this.decisionToDFA.push(new DFA(s, s.decision));
        return s.decision;
    };
    ATN.prototype.getDecisionState = function (decision) {
        if (this.decisionToState.length > 0) {
            return this.decisionToState[decision];
        }
        return undefined;
    };
    Object.defineProperty(ATN.prototype, "numberOfDecisions", {
        get: function () {
            return this.decisionToState.length;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Computes the set of input symbols which could follow ATN state number
     * {@code stateNumber} in the specified full {@code context}. This method
     * considers the complete parser context, but does not evaluate semantic
     * predicates (i.e. all predicates encountered during the calculation are
     * assumed true). If a path in the ATN exists from the starting state to the
     * {@link RuleStopState} of the outermost context without matching any
     * symbols, {@link Token#EOF} is added to the returned set.
     *
     * <p>If {@code context} is {@code null}, it is treated as
     * {@link ParserRuleContext#EMPTY}.</p>
     *
     * <p>Note that this does NOT give you the set of all tokens that could
     * appear at a given token position in the input phrase.  In other words, it
     * does not answer:</p>
     *
     * <quote>"Given a specific partial input phrase, return the set of all
     * tokens that can follow the last token in the input phrase."</quote>
     *
     * <p>The big difference is that with just the input, the parser could land
     * right in the middle of a lookahead decision. Getting all
     * <em>possible</em> tokens given a partial input stream is a separate
     * computation. See https://github.com/antlr/antlr4/issues/1428</p>
     *
     * <p>For this function, we are specifying an ATN state and call stack to
     * compute what token(s) can come next and specifically: outside of a
     * lookahead decision. That is what you want for error reporting and
     * recovery upon parse error.</p>
     *
     * @param stateNumber the ATN state number
     * @param context the full parse context
     * @return The set of potentially valid input symbols which could follow the
     * specified state in the specified context.
     * @ if the ATN does not contain a state with
     * number {@code stateNumber}
     */
    ATN.prototype.getExpectedTokens = function (stateNumber, context) {
        if (stateNumber < 0 || stateNumber >= this.states.length) {
            throw new RangeError("Invalid state number.");
        }
        var ctx = context;
        var s = this.states[stateNumber];
        var following = this.nextTokens(s);
        if (!following.contains(Token.EPSILON)) {
            return following;
        }
        var expected = new IntervalSet();
        expected.addAll(following);
        expected.remove(Token.EPSILON);
        while (ctx != null && ctx.invokingState >= 0 && following.contains(Token.EPSILON)) {
            var invokingState = this.states[ctx.invokingState];
            var rt = invokingState.transition(0);
            following = this.nextTokens(rt.followState);
            expected.addAll(following);
            expected.remove(Token.EPSILON);
            ctx = ctx._parent;
        }
        if (following.contains(Token.EPSILON)) {
            expected.add(Token.EOF);
        }
        return expected;
    };
    __decorate([
        NotNull
    ], ATN.prototype, "states", void 0);
    __decorate([
        NotNull
    ], ATN.prototype, "decisionToState", void 0);
    __decorate([
        NotNull
    ], ATN.prototype, "modeNameToStartState", void 0);
    __decorate([
        NotNull
    ], ATN.prototype, "modeToStartState", void 0);
    __decorate([
        NotNull
    ], ATN.prototype, "decisionToDFA", void 0);
    __decorate([
        NotNull
    ], ATN.prototype, "modeToDFA", void 0);
    __decorate([
        NotNull
    ], ATN.prototype, "nextTokens", null);
    __decorate([
        __param(0, NotNull)
    ], ATN.prototype, "removeState", null);
    __decorate([
        __param(0, NotNull), __param(1, NotNull)
    ], ATN.prototype, "defineMode", null);
    __decorate([
        __param(0, NotNull)
    ], ATN.prototype, "defineDecisionState", null);
    __decorate([
        NotNull
    ], ATN.prototype, "getExpectedTokens", null);
    ATN = __decorate([
        __param(0, NotNull)
    ], ATN);
    return ATN;
}());
export { ATN };
(function (ATN) {
    ATN.INVALID_ALT_NUMBER = 0;
})(ATN || (ATN = {}));
//# sourceMappingURL=ATN.js.map