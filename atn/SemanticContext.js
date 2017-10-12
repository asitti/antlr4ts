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
// ConvertTo-TS run at 2016-10-04T11:26:36.9521478-07:00
import { Array2DHashSet } from '../misc/Array2DHashSet';
import { ArrayEqualityComparator } from '../misc/ArrayEqualityComparator';
import { MurmurHash } from '../misc/MurmurHash';
import { NotNull, Override } from '../Decorators';
import { ObjectEqualityComparator } from '../misc/ObjectEqualityComparator';
import * as Utils from '../misc/Utils';
function max(items) {
    var result;
    for (var _i = 0, _a = Array.from(items); _i < _a.length; _i++) {
        var current = _a[_i];
        if (result === undefined) {
            result = current;
            continue;
        }
        var comparison = result.compareTo(current);
        if (comparison < 0) {
            result = current;
        }
    }
    return result;
}
function min(items) {
    var result;
    for (var _i = 0, _a = Array.from(items); _i < _a.length; _i++) {
        var current = _a[_i];
        if (result === undefined) {
            result = current;
            continue;
        }
        var comparison = result.compareTo(current);
        if (comparison > 0) {
            result = current;
        }
    }
    return result;
}
/** A tree structure used to record the semantic context in which
 *  an ATN configuration is valid.  It's either a single predicate,
 *  a conjunction {@code p1&&p2}, or a sum of products {@code p1||p2}.
 *
 *  <p>I have scoped the {@link AND}, {@link OR}, and {@link Predicate} subclasses of
 *  {@link SemanticContext} within the scope of this outer class.</p>
 */
var SemanticContext = /** @class */ (function () {
    function SemanticContext() {
    }
    Object.defineProperty(SemanticContext, "NONE", {
        /**
         * The default {@link SemanticContext}, which is semantically equivalent to
         * a predicate of the form {@code {true}?}.
         */
        get: function () {
            if (SemanticContext._NONE === undefined) {
                SemanticContext._NONE = new SemanticContext.Predicate();
            }
            return SemanticContext._NONE;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Evaluate the precedence predicates for the context and reduce the result.
     *
     * @param parser The parser instance.
     * @param parserCallStack
     * @return The simplified semantic context after precedence predicates are
     * evaluated, which will be one of the following values.
     * <ul>
     * <li>{@link #NONE}: if the predicate simplifies to {@code true} after
     * precedence predicates are evaluated.</li>
     * <li>{@code null}: if the predicate simplifies to {@code false} after
     * precedence predicates are evaluated.</li>
     * <li>{@code this}: if the semantic context is not changed as a result of
     * precedence predicate evaluation.</li>
     * <li>A non-{@code null} {@link SemanticContext}: the new simplified
     * semantic context after precedence predicates are evaluated.</li>
     * </ul>
     */
    SemanticContext.prototype.evalPrecedence = function (parser, parserCallStack) {
        return this;
    };
    SemanticContext.and = function (a, b) {
        if (!a || a === SemanticContext.NONE)
            return b;
        if (b === SemanticContext.NONE)
            return a;
        var result = new SemanticContext.AND(a, b);
        if (result.opnds.length === 1) {
            return result.opnds[0];
        }
        return result;
    };
    /**
     *
     *  @see ParserATNSimulator#getPredsForAmbigAlts
     */
    SemanticContext.or = function (a, b) {
        if (!a) {
            return b;
        }
        if (a === SemanticContext.NONE || b === SemanticContext.NONE)
            return SemanticContext.NONE;
        var result = new SemanticContext.OR(a, b);
        if (result.opnds.length === 1) {
            return result.opnds[0];
        }
        return result;
    };
    return SemanticContext;
}());
export { SemanticContext };
(function (SemanticContext) {
    /**
     * This random 30-bit prime represents the value of `AND.class.hashCode()`.
     */
    var AND_HASHCODE = 40363613;
    /**
     * This random 30-bit prime represents the value of `OR.class.hashCode()`.
     */
    var OR_HASHCODE = 486279973;
    function filterPrecedencePredicates(collection) {
        var result = [];
        for (var i = 0; i < collection.length; i++) {
            var context_1 = collection[i];
            if (context_1 instanceof SemanticContext.PrecedencePredicate) {
                result.push(context_1);
                // Remove the item from 'collection' and move i back so we look at the same index again
                collection.splice(i, 1);
                i--;
            }
        }
        return result;
    }
    var Predicate = /** @class */ (function (_super) {
        __extends(Predicate, _super);
        function Predicate(ruleIndex, predIndex, isCtxDependent) {
            if (ruleIndex === void 0) { ruleIndex = -1; }
            if (predIndex === void 0) { predIndex = -1; }
            if (isCtxDependent === void 0) { isCtxDependent = false; }
            var _this = _super.call(this) || this;
            _this.ruleIndex = ruleIndex;
            _this.predIndex = predIndex;
            _this.isCtxDependent = isCtxDependent;
            return _this;
        }
        Predicate.prototype.eval = function (parser, parserCallStack) {
            var localctx = this.isCtxDependent ? parserCallStack : undefined;
            return parser.sempred(localctx, this.ruleIndex, this.predIndex);
        };
        Predicate.prototype.hashCode = function () {
            var hashCode = MurmurHash.initialize();
            hashCode = MurmurHash.update(hashCode, this.ruleIndex);
            hashCode = MurmurHash.update(hashCode, this.predIndex);
            hashCode = MurmurHash.update(hashCode, this.isCtxDependent ? 1 : 0);
            hashCode = MurmurHash.finish(hashCode, 3);
            return hashCode;
        };
        Predicate.prototype.equals = function (obj) {
            if (!(obj instanceof Predicate))
                return false;
            if (this === obj)
                return true;
            return this.ruleIndex === obj.ruleIndex &&
                this.predIndex === obj.predIndex &&
                this.isCtxDependent === obj.isCtxDependent;
        };
        Predicate.prototype.toString = function () {
            return "{" + this.ruleIndex + ":" + this.predIndex + "}?";
        };
        __decorate([
            Override
        ], Predicate.prototype, "eval", null);
        __decorate([
            Override
        ], Predicate.prototype, "hashCode", null);
        __decorate([
            Override
        ], Predicate.prototype, "equals", null);
        __decorate([
            Override
        ], Predicate.prototype, "toString", null);
        return Predicate;
    }(SemanticContext));
    SemanticContext.Predicate = Predicate;
    var PrecedencePredicate = /** @class */ (function (_super) {
        __extends(PrecedencePredicate, _super);
        function PrecedencePredicate(precedence) {
            var _this = _super.call(this) || this;
            _this.precedence = precedence;
            return _this;
        }
        PrecedencePredicate.prototype.eval = function (parser, parserCallStack) {
            return parser.precpred(parserCallStack, this.precedence);
        };
        PrecedencePredicate.prototype.evalPrecedence = function (parser, parserCallStack) {
            if (parser.precpred(parserCallStack, this.precedence)) {
                return SemanticContext.NONE;
            }
            else {
                return undefined;
            }
        };
        PrecedencePredicate.prototype.compareTo = function (o) {
            return this.precedence - o.precedence;
        };
        PrecedencePredicate.prototype.hashCode = function () {
            var hashCode = 1;
            hashCode = 31 * hashCode + this.precedence;
            return hashCode;
        };
        PrecedencePredicate.prototype.equals = function (obj) {
            if (!(obj instanceof PrecedencePredicate)) {
                return false;
            }
            if (this === obj) {
                return true;
            }
            return this.precedence === obj.precedence;
        };
        // precedence >= _precedenceStack.peek()
        PrecedencePredicate.prototype.toString = function () {
            return "{" + this.precedence + ">=prec}?";
        };
        __decorate([
            Override
        ], PrecedencePredicate.prototype, "eval", null);
        __decorate([
            Override
        ], PrecedencePredicate.prototype, "evalPrecedence", null);
        __decorate([
            Override
        ], PrecedencePredicate.prototype, "compareTo", null);
        __decorate([
            Override
        ], PrecedencePredicate.prototype, "hashCode", null);
        __decorate([
            Override
        ], PrecedencePredicate.prototype, "equals", null);
        __decorate([
            Override
            // precedence >= _precedenceStack.peek()
        ], PrecedencePredicate.prototype, "toString", null);
        return PrecedencePredicate;
    }(SemanticContext));
    SemanticContext.PrecedencePredicate = PrecedencePredicate;
    /**
     * This is the base class for semantic context "operators", which operate on
     * a collection of semantic context "operands".
     *
     * @since 4.3
     */
    var Operator = /** @class */ (function (_super) {
        __extends(Operator, _super);
        function Operator() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Operator;
    }(SemanticContext));
    SemanticContext.Operator = Operator;
    /**
     * A semantic context which is true whenever none of the contained contexts
     * is false.
     */
    var AND = /** @class */ (function (_super) {
        __extends(AND, _super);
        function AND(a, b) {
            var _this = _super.call(this) || this;
            var operands = new Array2DHashSet(ObjectEqualityComparator.INSTANCE);
            if (a instanceof AND)
                operands.addAll(a.opnds);
            else
                operands.add(a);
            if (b instanceof AND)
                operands.addAll(b.opnds);
            else
                operands.add(b);
            _this.opnds = operands.toArray();
            var precedencePredicates = filterPrecedencePredicates(_this.opnds);
            // interested in the transition with the lowest precedence
            var reduced = min(precedencePredicates);
            if (reduced) {
                _this.opnds.push(reduced);
            }
            return _this;
        }
        Object.defineProperty(AND.prototype, "operands", {
            get: function () {
                return this.opnds;
            },
            enumerable: true,
            configurable: true
        });
        AND.prototype.equals = function (obj) {
            if (this === obj)
                return true;
            if (!(obj instanceof AND))
                return false;
            return ArrayEqualityComparator.INSTANCE.equals(this.opnds, obj.opnds);
        };
        AND.prototype.hashCode = function () {
            return MurmurHash.hashCode(this.opnds, AND_HASHCODE);
        };
        /**
         * {@inheritDoc}
         *
         * <p>
         * The evaluation of predicates by this context is short-circuiting, but
         * unordered.</p>
         */
        AND.prototype.eval = function (parser, parserCallStack) {
            for (var _i = 0, _a = this.opnds; _i < _a.length; _i++) {
                var opnd = _a[_i];
                if (!opnd.eval(parser, parserCallStack))
                    return false;
            }
            return true;
        };
        AND.prototype.evalPrecedence = function (parser, parserCallStack) {
            var differs = false;
            var operands = [];
            for (var _i = 0, _a = this.opnds; _i < _a.length; _i++) {
                var context_2 = _a[_i];
                var evaluated = context_2.evalPrecedence(parser, parserCallStack);
                differs = differs || (evaluated !== context_2);
                if (evaluated == null) {
                    // The AND context is false if any element is false
                    return undefined;
                }
                else if (evaluated !== SemanticContext.NONE) {
                    // Reduce the result by skipping true elements
                    operands.push(evaluated);
                }
            }
            if (!differs) {
                return this;
            }
            if (operands.length === 0) {
                // all elements were true, so the AND context is true
                return SemanticContext.NONE;
            }
            var result = operands[0];
            for (var i = 1; i < operands.length; i++) {
                result = SemanticContext.and(result, operands[i]);
            }
            return result;
        };
        AND.prototype.toString = function () {
            return Utils.join(this.opnds, "&&");
        };
        __decorate([
            Override
        ], AND.prototype, "operands", null);
        __decorate([
            Override
        ], AND.prototype, "equals", null);
        __decorate([
            Override
        ], AND.prototype, "hashCode", null);
        __decorate([
            Override
        ], AND.prototype, "eval", null);
        __decorate([
            Override
        ], AND.prototype, "evalPrecedence", null);
        __decorate([
            Override
        ], AND.prototype, "toString", null);
        AND = __decorate([
            __param(0, NotNull), __param(1, NotNull)
        ], AND);
        return AND;
    }(Operator));
    SemanticContext.AND = AND;
    /**
     * A semantic context which is true whenever at least one of the contained
     * contexts is true.
     */
    var OR = /** @class */ (function (_super) {
        __extends(OR, _super);
        function OR(a, b) {
            var _this = _super.call(this) || this;
            var operands = new Array2DHashSet(ObjectEqualityComparator.INSTANCE);
            if (a instanceof OR)
                operands.addAll(a.opnds);
            else
                operands.add(a);
            if (b instanceof OR)
                operands.addAll(b.opnds);
            else
                operands.add(b);
            _this.opnds = operands.toArray();
            var precedencePredicates = filterPrecedencePredicates(_this.opnds);
            // interested in the transition with the highest precedence
            var reduced = max(precedencePredicates);
            if (reduced) {
                _this.opnds.push(reduced);
            }
            return _this;
        }
        Object.defineProperty(OR.prototype, "operands", {
            get: function () {
                return this.opnds;
            },
            enumerable: true,
            configurable: true
        });
        OR.prototype.equals = function (obj) {
            if (this === obj)
                return true;
            if (!(obj instanceof OR))
                return false;
            return ArrayEqualityComparator.INSTANCE.equals(this.opnds, obj.opnds);
        };
        OR.prototype.hashCode = function () {
            return MurmurHash.hashCode(this.opnds, OR_HASHCODE);
        };
        /**
         * {@inheritDoc}
         *
         * <p>
         * The evaluation of predicates by this context is short-circuiting, but
         * unordered.</p>
         */
        OR.prototype.eval = function (parser, parserCallStack) {
            for (var _i = 0, _a = this.opnds; _i < _a.length; _i++) {
                var opnd = _a[_i];
                if (opnd.eval(parser, parserCallStack))
                    return true;
            }
            return false;
        };
        OR.prototype.evalPrecedence = function (parser, parserCallStack) {
            var differs = false;
            var operands = [];
            for (var _i = 0, _a = this.opnds; _i < _a.length; _i++) {
                var context_3 = _a[_i];
                var evaluated = context_3.evalPrecedence(parser, parserCallStack);
                differs = differs || (evaluated !== context_3);
                if (evaluated === SemanticContext.NONE) {
                    // The OR context is true if any element is true
                    return SemanticContext.NONE;
                }
                else if (evaluated) {
                    // Reduce the result by skipping false elements
                    operands.push(evaluated);
                }
            }
            if (!differs) {
                return this;
            }
            if (operands.length === 0) {
                // all elements were false, so the OR context is false
                return undefined;
            }
            var result = operands[0];
            for (var i = 1; i < operands.length; i++) {
                result = SemanticContext.or(result, operands[i]);
            }
            return result;
        };
        OR.prototype.toString = function () {
            return Utils.join(this.opnds, "||");
        };
        __decorate([
            Override
        ], OR.prototype, "operands", null);
        __decorate([
            Override
        ], OR.prototype, "equals", null);
        __decorate([
            Override
        ], OR.prototype, "hashCode", null);
        __decorate([
            Override
        ], OR.prototype, "eval", null);
        __decorate([
            Override
        ], OR.prototype, "evalPrecedence", null);
        __decorate([
            Override
        ], OR.prototype, "toString", null);
        OR = __decorate([
            __param(0, NotNull), __param(1, NotNull)
        ], OR);
        return OR;
    }(Operator));
    SemanticContext.OR = OR;
})(SemanticContext || (SemanticContext = {}));
//# sourceMappingURL=SemanticContext.js.map