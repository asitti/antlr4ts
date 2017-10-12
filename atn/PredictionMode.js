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
// ConvertTo-TS run at 2016-10-04T11:26:36.2673893-07:00
import { Array2DHashMap } from '../misc/Array2DHashMap';
import { asIterable } from '../misc/Stubs';
import { MurmurHash } from '../misc/MurmurHash';
import { Override } from '../Decorators';
import { RuleStopState } from './RuleStopState';
/**
 * This enumeration defines the prediction modes available in ANTLR 4 along with
 * utility methods for analyzing configuration sets for conflicts and/or
 * ambiguities.
 */
export var PredictionMode;
(function (PredictionMode) {
    /**
     * The SLL(*) prediction mode. This prediction mode ignores the current
     * parser context when making predictions. This is the fastest prediction
     * mode, and provides correct results for many grammars. This prediction
     * mode is more powerful than the prediction mode provided by ANTLR 3, but
     * may result in syntax errors for grammar and input combinations which are
     * not SLL.
     *
     * <p>
     * When using this prediction mode, the parser will either return a correct
     * parse tree (i.e. the same parse tree that would be returned with the
     * {@link #LL} prediction mode), or it will report a syntax error. If a
     * syntax error is encountered when using the {@link #SLL} prediction mode,
     * it may be due to either an actual syntax error in the input or indicate
     * that the particular combination of grammar and input requires the more
     * powerful {@link #LL} prediction abilities to complete successfully.</p>
     *
     * <p>
     * This prediction mode does not provide any guarantees for prediction
     * behavior for syntactically-incorrect inputs.</p>
     */
    PredictionMode[PredictionMode["SLL"] = 0] = "SLL";
    /**
     * The LL(*) prediction mode. This prediction mode allows the current parser
     * context to be used for resolving SLL conflicts that occur during
     * prediction. This is the fastest prediction mode that guarantees correct
     * parse results for all combinations of grammars with syntactically correct
     * inputs.
     *
     * <p>
     * When using this prediction mode, the parser will make correct decisions
     * for all syntactically-correct grammar and input combinations. However, in
     * cases where the grammar is truly ambiguous this prediction mode might not
     * report a precise answer for <em>exactly which</em> alternatives are
     * ambiguous.</p>
     *
     * <p>
     * This prediction mode does not provide any guarantees for prediction
     * behavior for syntactically-incorrect inputs.</p>
     */
    PredictionMode[PredictionMode["LL"] = 1] = "LL";
    /**
     * The LL(*) prediction mode with exact ambiguity detection. In addition to
     * the correctness guarantees provided by the {@link #LL} prediction mode,
     * this prediction mode instructs the prediction algorithm to determine the
     * complete and exact set of ambiguous alternatives for every ambiguous
     * decision encountered while parsing.
     *
     * <p>
     * This prediction mode may be used for diagnosing ambiguities during
     * grammar development. Due to the performance overhead of calculating sets
     * of ambiguous alternatives, this prediction mode should be avoided when
     * the exact results are not necessary.</p>
     *
     * <p>
     * This prediction mode does not provide any guarantees for prediction
     * behavior for syntactically-incorrect inputs.</p>
     */
    PredictionMode[PredictionMode["LL_EXACT_AMBIG_DETECTION"] = 2] = "LL_EXACT_AMBIG_DETECTION";
})(PredictionMode || (PredictionMode = {}));
(function (PredictionMode) {
    /** A Map that uses just the state and the stack context as the key. */
    // NOTE: Base type used to be FlexibleHashMap<ATNConfig, BitSet>
    var AltAndContextMap = /** @class */ (function (_super) {
        __extends(AltAndContextMap, _super);
        function AltAndContextMap() {
            return _super.call(this, AltAndContextConfigEqualityComparator.INSTANCE) || this;
        }
        return AltAndContextMap;
    }(Array2DHashMap));
    var AltAndContextConfigEqualityComparator = /** @class */ (function () {
        function AltAndContextConfigEqualityComparator() {
        }
        AltAndContextConfigEqualityComparator.prototype.AltAndContextConfigEqualityComparator = function () {
        };
        /**
         * The hash code is only a function of the {@link ATNState#stateNumber}
         * and {@link ATNConfig#context}.
         */
        AltAndContextConfigEqualityComparator.prototype.hashCode = function (o) {
            var hashCode = MurmurHash.initialize(7);
            hashCode = MurmurHash.update(hashCode, o.state.stateNumber);
            hashCode = MurmurHash.update(hashCode, o.context);
            hashCode = MurmurHash.finish(hashCode, 2);
            return hashCode;
        };
        AltAndContextConfigEqualityComparator.prototype.equals = function (a, b) {
            if (a === b)
                return true;
            if (a == null || b == null)
                return false;
            return a.state.stateNumber == b.state.stateNumber
                && a.context.equals(b.context);
        };
        AltAndContextConfigEqualityComparator.INSTANCE = new AltAndContextConfigEqualityComparator();
        __decorate([
            Override
        ], AltAndContextConfigEqualityComparator.prototype, "hashCode", null);
        __decorate([
            Override
        ], AltAndContextConfigEqualityComparator.prototype, "equals", null);
        return AltAndContextConfigEqualityComparator;
    }());
    /**
     * Checks if any configuration in {@code configs} is in a
     * {@link RuleStopState}. Configurations meeting this condition have reached
     * the end of the decision rule (local context) or end of start rule (full
     * context).
     *
     * @param configs the configuration set to test
     * @return {@code true} if any configuration in {@code configs} is in a
     * {@link RuleStopState}, otherwise {@code false}
     */
    function hasConfigInRuleStopState(configs) {
        for (var _i = 0, _a = Array.from(asIterable(configs)); _i < _a.length; _i++) {
            var c = _a[_i];
            if (c.state instanceof RuleStopState) {
                return true;
            }
        }
        return false;
    }
    PredictionMode.hasConfigInRuleStopState = hasConfigInRuleStopState;
    /**
     * Checks if all configurations in {@code configs} are in a
     * {@link RuleStopState}. Configurations meeting this condition have reached
     * the end of the decision rule (local context) or end of start rule (full
     * context).
     *
     * @param configs the configuration set to test
     * @return {@code true} if all configurations in {@code configs} are in a
     * {@link RuleStopState}, otherwise {@code false}
     */
    function allConfigsInRuleStopStates(/*@NotNull*/ configs) {
        for (var _i = 0, _a = Array.from(asIterable(configs)); _i < _a.length; _i++) {
            var config = _a[_i];
            if (!(config.state instanceof RuleStopState)) {
                return false;
            }
        }
        return true;
    }
    PredictionMode.allConfigsInRuleStopStates = allConfigsInRuleStopStates;
})(PredictionMode || (PredictionMode = {}));
//# sourceMappingURL=PredictionMode.js.map