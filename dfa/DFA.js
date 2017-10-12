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
// ConvertTo-TS run at 2016-10-04T11:26:38.3567094-07:00
import { Array2DHashSet } from '../misc/Array2DHashSet';
import { ATNConfigSet } from '../atn/ATNConfigSet';
import { DFASerializer } from './DFASerializer';
import { DFAState } from './DFAState';
import { LexerDFASerializer } from './LexerDFASerializer';
import { NotNull } from '../Decorators';
import { ObjectEqualityComparator } from '../misc/ObjectEqualityComparator';
import { StarLoopEntryState } from '../atn/StarLoopEntryState';
import { VocabularyImpl } from '../VocabularyImpl';
var DFA = /** @class */ (function () {
    function DFA(atnStartState, decision) {
        if (decision === void 0) { decision = 0; }
        /**
         * A set of all states in the `DFA`.
         *
         * Note that this collection of states holds the DFA states for both SLL and LL prediction. Only the start state
         * needs to be differentiated for these cases, which is tracked by the `s0` and `s0full` fields.
         */
        this.states = new Array2DHashSet(ObjectEqualityComparator.INSTANCE);
        this.nextStateNumber = 0;
        if (!atnStartState.atn) {
            throw new Error("The ATNState must be associated with an ATN");
        }
        this.atnStartState = atnStartState;
        this.atn = atnStartState.atn;
        this.decision = decision;
        // Precedence DFAs are associated with the special precedence decision created for left-recursive rules which
        // evaluate their alternatives using a precedence hierarchy. When such a decision is encountered, we mark this
        // DFA instance as a precedence DFA and initialize the initial states s0 and s0full to special DFAState
        // instances which use outgoing edges to link to the actual start state used for each precedence level.
        var isPrecedenceDfa = false;
        if (atnStartState instanceof StarLoopEntryState) {
            if (atnStartState.precedenceRuleDecision) {
                isPrecedenceDfa = true;
                this.s0 = new DFAState(new ATNConfigSet());
                this.s0full = new DFAState(new ATNConfigSet());
            }
        }
        this.precedenceDfa = isPrecedenceDfa;
    }
    Object.defineProperty(DFA.prototype, "isPrecedenceDfa", {
        /**
         * Gets whether this DFA is a precedence DFA. Precedence DFAs use a special
         * start state {@link #s0} which is not stored in {@link #states}. The
         * {@link DFAState#edges} array for this start state contains outgoing edges
         * supplying individual start states corresponding to specific precedence
         * values.
         *
         * @return {@code true} if this is a precedence DFA; otherwise,
         * {@code false}.
         * @see Parser.precedence
         */
        get: function () {
            return this.precedenceDfa;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Get the start state for a specific precedence value.
     *
     * @param precedence The current precedence.
     * @return The start state corresponding to the specified precedence, or
     * {@code null} if no start state exists for the specified precedence.
     *
     * @ if this is not a precedence DFA.
     * @see `isPrecedenceDfa`
     */
    DFA.prototype.getPrecedenceStartState = function (precedence, fullContext) {
        if (!this.isPrecedenceDfa) {
            throw new Error("Only precedence DFAs may contain a precedence start state.");
        }
        // s0 and s0full are never null for a precedence DFA
        if (fullContext) {
            return this.s0full.getTarget(precedence);
        }
        else {
            return this.s0.getTarget(precedence);
        }
    };
    /**
     * Set the start state for a specific precedence value.
     *
     * @param precedence The current precedence.
     * @param startState The start state corresponding to the specified
     * precedence.
     *
     * @ if this is not a precedence DFA.
     * @see `isPrecedenceDfa`
     */
    DFA.prototype.setPrecedenceStartState = function (precedence, fullContext, startState) {
        if (!this.isPrecedenceDfa) {
            throw new Error("Only precedence DFAs may contain a precedence start state.");
        }
        if (precedence < 0) {
            return;
        }
        if (fullContext) {
            // s0full is never null for a precedence DFA
            this.s0full.setTarget(precedence, startState);
        }
        else {
            // s0 is never null for a precedence DFA
            this.s0.setTarget(precedence, startState);
        }
    };
    Object.defineProperty(DFA.prototype, "isEmpty", {
        get: function () {
            if (this.isPrecedenceDfa) {
                // s0 and s0full are never null for a precedence DFA
                return this.s0.getEdgeMap().size === 0 && this.s0full.getEdgeMap().size === 0;
            }
            return this.s0 == null && this.s0full == null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DFA.prototype, "isContextSensitive", {
        get: function () {
            if (this.isPrecedenceDfa) {
                // s0full is never null for a precedence DFA
                return this.s0full.getEdgeMap().size > 0;
            }
            return this.s0full != null;
        },
        enumerable: true,
        configurable: true
    });
    DFA.prototype.addState = function (state) {
        state.stateNumber = this.nextStateNumber++;
        return this.states.getOrAdd(state);
    };
    DFA.prototype.toString = function (vocabulary, ruleNames) {
        if (!vocabulary) {
            vocabulary = VocabularyImpl.EMPTY_VOCABULARY;
        }
        if (!this.s0) {
            return "";
        }
        var serializer;
        if (ruleNames) {
            serializer = new DFASerializer(this, vocabulary, ruleNames, this.atnStartState.atn);
        }
        else {
            serializer = new DFASerializer(this, vocabulary);
        }
        return serializer.toString();
    };
    DFA.prototype.toLexerString = function () {
        if (!this.s0) {
            return "";
        }
        var serializer = new LexerDFASerializer(this);
        return serializer.toString();
    };
    __decorate([
        NotNull
    ], DFA.prototype, "states", void 0);
    __decorate([
        NotNull
    ], DFA.prototype, "atnStartState", void 0);
    __decorate([
        NotNull
    ], DFA.prototype, "atn", void 0);
    DFA = __decorate([
        __param(0, NotNull)
    ], DFA);
    return DFA;
}());
export { DFA };
//# sourceMappingURL=DFA.js.map