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
// ConvertTo-TS run at 2016-10-04T11:26:38.5097925-07:00
import { asIterable } from '../misc/Stubs';
import { ATNSimulator } from '../atn/ATNSimulator';
import { NotNull, Override } from '../Decorators';
import { PredictionContext } from '../atn/PredictionContext';
import { Recognizer } from '../Recognizer';
import { VocabularyImpl } from '../VocabularyImpl';
/** A DFA walker that knows how to dump them to serialized strings. */
var DFASerializer = /** @class */ (function () {
    function DFASerializer(dfa, vocabulary, ruleNames, atn) {
        if (vocabulary instanceof Recognizer) {
            ruleNames = vocabulary.ruleNames;
            atn = vocabulary.atn;
            vocabulary = vocabulary.vocabulary;
        }
        else if (!vocabulary) {
            vocabulary = VocabularyImpl.EMPTY_VOCABULARY;
        }
        this.dfa = dfa;
        this.vocabulary = vocabulary;
        this.ruleNames = ruleNames;
        this.atn = atn;
    }
    DFASerializer.prototype.toString = function () {
        if (!this.dfa.s0) {
            return "";
        }
        var buf = "";
        if (this.dfa.states) {
            var states = new (Array.bind.apply(Array, [void 0].concat(this.dfa.states.toArray())))();
            states.sort(function (o1, o2) { return o1.stateNumber - o2.stateNumber; });
            for (var _i = 0, states_1 = states; _i < states_1.length; _i++) {
                var s = states_1[_i];
                var edges = s.getEdgeMap();
                var edgeKeys = Array.from(edges.keys()).slice().sort(function (a, b) { return a - b; });
                var contextEdges = s.getContextEdgeMap();
                var contextEdgeKeys = Array.from(contextEdges.keys()).slice().sort(function (a, b) { return a - b; });
                for (var _a = 0, edgeKeys_1 = edgeKeys; _a < edgeKeys_1.length; _a++) {
                    var entry = edgeKeys_1[_a];
                    var value = edges.get(entry);
                    if ((value == null || value === ATNSimulator.ERROR) && !s.isContextSymbol(entry)) {
                        continue;
                    }
                    var contextSymbol = false;
                    buf += (this.getStateString(s)) + ("-") + (this.getEdgeLabel(entry)) + ("->");
                    if (s.isContextSymbol(entry)) {
                        buf += ("!");
                        contextSymbol = true;
                    }
                    var t = value;
                    if (t && t.stateNumber !== ATNSimulator.ERROR.stateNumber) {
                        buf += (this.getStateString(t)) + ('\n');
                    }
                    else if (contextSymbol) {
                        buf += ("ctx\n");
                    }
                }
                if (s.isContextSensitive) {
                    for (var _b = 0, contextEdgeKeys_1 = contextEdgeKeys; _b < contextEdgeKeys_1.length; _b++) {
                        var entry = contextEdgeKeys_1[_b];
                        buf += (this.getStateString(s))
                            + ("-")
                            + (this.getContextLabel(entry))
                            + ("->")
                            + (this.getStateString(contextEdges.get(entry)))
                            + ("\n");
                    }
                }
            }
        }
        var output = buf;
        if (output.length === 0)
            return "";
        //return Utils.sortLinesInString(output);
        return output;
    };
    DFASerializer.prototype.getContextLabel = function (i) {
        if (i === PredictionContext.EMPTY_FULL_STATE_KEY) {
            return "ctx:EMPTY_FULL";
        }
        else if (i === PredictionContext.EMPTY_LOCAL_STATE_KEY) {
            return "ctx:EMPTY_LOCAL";
        }
        if (this.atn && i > 0 && i <= this.atn.states.length) {
            var state = this.atn.states[i];
            var ruleIndex = state.ruleIndex;
            if (this.ruleNames && ruleIndex >= 0 && ruleIndex < this.ruleNames.length) {
                return "ctx:" + String(i) + "(" + this.ruleNames[ruleIndex] + ")";
            }
        }
        return "ctx:" + String(i);
    };
    DFASerializer.prototype.getEdgeLabel = function (i) {
        return this.vocabulary.getDisplayName(i);
    };
    DFASerializer.prototype.getStateString = function (s) {
        if (s === ATNSimulator.ERROR) {
            return "ERROR";
        }
        var n = s.stateNumber;
        var stateStr = "s" + n;
        if (s.isAcceptState) {
            if (s.predicates) {
                stateStr = ":s" + n + "=>" + s.predicates;
            }
            else {
                stateStr = ":s" + n + "=>" + s.prediction;
            }
        }
        if (s.isContextSensitive) {
            stateStr += "*";
            for (var _i = 0, _a = Array.from(asIterable(s.configs)); _i < _a.length; _i++) {
                var config = _a[_i];
                if (config.reachesIntoOuterContext) {
                    stateStr += "*";
                    break;
                }
            }
        }
        return stateStr;
    };
    __decorate([
        NotNull
    ], DFASerializer.prototype, "dfa", void 0);
    __decorate([
        NotNull
    ], DFASerializer.prototype, "vocabulary", void 0);
    __decorate([
        Override
    ], DFASerializer.prototype, "toString", null);
    return DFASerializer;
}());
export { DFASerializer };
//# sourceMappingURL=DFASerializer.js.map