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
// ConvertTo-TS run at 2016-10-04T11:26:25.5488013-07:00
import { Array2DHashMap } from '../misc/Array2DHashMap';
import { Array2DHashSet } from '../misc/Array2DHashSet';
import { ArrayEqualityComparator } from '../misc/ArrayEqualityComparator';
import { ATN } from './ATN';
import { ATNConfig } from './ATNConfig';
import { BitSet } from '../misc/BitSet';
import { asIterable } from '../misc/Stubs';
import { NotNull, Override } from '../Decorators';
import { ObjectEqualityComparator } from '../misc/ObjectEqualityComparator';
import { PredictionContext } from './PredictionContext';
import { PredictionContextCache } from './PredictionContextCache';
import { SemanticContext } from './SemanticContext';
import * as assert from 'assert';
import * as Utils from '../misc/Utils';
var KeyTypeEqualityComparer = /** @class */ (function () {
    function KeyTypeEqualityComparer() {
    }
    KeyTypeEqualityComparer.prototype.hashCode = function (key) {
        return key.state ^ key.alt;
    };
    KeyTypeEqualityComparer.prototype.equals = function (a, b) {
        return a.state === b.state && a.alt === b.alt;
    };
    KeyTypeEqualityComparer.INSTANCE = new KeyTypeEqualityComparer();
    return KeyTypeEqualityComparer;
}());
function NewKeyedConfigMap(map) {
    if (map) {
        return new Array2DHashMap(map);
    }
    else {
        return new Array2DHashMap(KeyTypeEqualityComparer.INSTANCE);
    }
}
/**
 * Represents a set of ATN configurations (see `ATNConfig`). As configurations are added to the set, they are merged
 * with other `ATNConfig` instances already in the set when possible using the graph-structured stack.
 *
 * An instance of this class represents the complete set of positions (with context) in an ATN which would be associated
 * with a single DFA state. Its internal representation is more complex than traditional state used for NFA to DFA
 * conversion due to performance requirements (both improving speed and reducing memory overhead) as well as supporting
 * features such as semantic predicates and non-greedy operators in a form to support ANTLR's prediction algorithm.
 *
 * @author Sam Harwell
 */
var ATNConfigSet = /** @class */ (function () {
    function ATNConfigSet(set, readonly) {
        this._uniqueAlt = 0;
        // Used in parser and lexer. In lexer, it indicates we hit a pred
        // while computing a closure operation.  Don't make a DFA state from this.
        this._hasSemanticContext = false;
        this._dipsIntoOuterContext = false;
        /**
         * When {@code true}, this config set represents configurations where the entire
         * outer context has been consumed by the ATN interpreter. This prevents the
         * {@link ParserATNSimulator#closure} from pursuing the global FOLLOW when a
         * rule stop state is reached with an empty prediction context.
         * <p>
         * Note: {@code outermostConfigSet} and {@link #dipsIntoOuterContext} should never
         * be true at the same time.
         */
        this.outermostConfigSet = false;
        this.cachedHashCode = -1;
        if (!set) {
            this.mergedConfigs = NewKeyedConfigMap();
            this.unmerged = [];
            this.configs = [];
            this._uniqueAlt = ATN.INVALID_ALT_NUMBER;
        }
        else {
            if (readonly) {
                this.mergedConfigs = undefined;
                this.unmerged = undefined;
            }
            else if (!set.isReadOnly) {
                this.mergedConfigs = NewKeyedConfigMap(set.mergedConfigs);
                this.unmerged = set.unmerged.slice(0);
            }
            else {
                this.mergedConfigs = NewKeyedConfigMap();
                this.unmerged = [];
            }
            this.configs = set.configs.slice(0);
            this._dipsIntoOuterContext = set._dipsIntoOuterContext;
            this._hasSemanticContext = set._hasSemanticContext;
            this.outermostConfigSet = set.outermostConfigSet;
            if (readonly || !set.isReadOnly) {
                this._uniqueAlt = set._uniqueAlt;
                this._conflictInfo = set._conflictInfo;
            }
            // if (!readonly && set.isReadOnly) -> addAll is called from clone()
        }
    }
    /**
     * Get the set of all alternatives represented by configurations in this
     * set.
     */
    ATNConfigSet.prototype.getRepresentedAlternatives = function () {
        if (this._conflictInfo != null) {
            return this._conflictInfo.conflictedAlts.clone();
        }
        var alts = new BitSet();
        for (var _i = 0, _a = Array.from(asIterable(this)); _i < _a.length; _i++) {
            var config = _a[_i];
            alts.set(config.alt);
        }
        return alts;
    };
    Object.defineProperty(ATNConfigSet.prototype, "isReadOnly", {
        get: function () {
            return this.mergedConfigs == null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ATNConfigSet.prototype, "isOutermostConfigSet", {
        get: function () {
            return this.outermostConfigSet;
        },
        set: function (outermostConfigSet) {
            if (this.outermostConfigSet && !outermostConfigSet) {
                throw new Error("IllegalStateException");
            }
            assert(!outermostConfigSet || !this._dipsIntoOuterContext);
            this.outermostConfigSet = outermostConfigSet;
        },
        enumerable: true,
        configurable: true
    });
    ATNConfigSet.prototype.getStates = function () {
        var states = new Array2DHashSet(ObjectEqualityComparator.INSTANCE);
        for (var _i = 0, _a = this.configs; _i < _a.length; _i++) {
            var c = _a[_i];
            states.add(c.state);
        }
        return states;
    };
    ATNConfigSet.prototype.optimizeConfigs = function (interpreter) {
        if (this.configs.length === 0) {
            return;
        }
        for (var i = 0; i < this.configs.length; i++) {
            var config = this.configs[i];
            config.context = interpreter.atn.getCachedContext(config.context);
        }
    };
    ATNConfigSet.prototype.clone = function (readonly) {
        var copy = new ATNConfigSet(this, readonly);
        if (!readonly && this.isReadOnly) {
            copy.addAll(this.configs);
        }
        return copy;
    };
    Object.defineProperty(ATNConfigSet.prototype, "size", {
        get: function () {
            return this.configs.length;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ATNConfigSet.prototype, "isEmpty", {
        get: function () {
            return this.configs.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    ATNConfigSet.prototype.contains = function (o) {
        if (!(o instanceof ATNConfig)) {
            return false;
        }
        if (this.mergedConfigs && this.unmerged) {
            var config = o;
            var configKey = this.getKey(config);
            var mergedConfig = this.mergedConfigs.get(configKey);
            if (mergedConfig != null && this.canMerge(config, configKey, mergedConfig)) {
                return mergedConfig.contains(config);
            }
            for (var _i = 0, _a = this.unmerged; _i < _a.length; _i++) {
                var c = _a[_i];
                if (c.contains(o)) {
                    return true;
                }
            }
        }
        else {
            for (var _b = 0, _c = this.configs; _b < _c.length; _b++) {
                var c = _c[_b];
                if (c.contains(o)) {
                    return true;
                }
            }
        }
        return false;
    };
    ATNConfigSet.prototype.iterator = function () {
        return new ATNConfigSetIterator(this, this.configs);
    };
    ATNConfigSet.prototype.toArray = function (a) {
        if (!a || a.length < this.configs.length) {
            return this.configs;
        }
        for (var i = 0; i < this.configs.length; i++) {
            a[i] = this.configs[i];
        }
        return a;
    };
    ATNConfigSet.prototype.add = function (e, contextCache) {
        this.ensureWritable();
        if (!this.mergedConfigs || !this.unmerged) {
            throw new Error("Covered by ensureWritable but duplicated here for strict null check limitation");
        }
        assert(!this.outermostConfigSet || !e.reachesIntoOuterContext);
        if (contextCache == null) {
            contextCache = PredictionContextCache.UNCACHED;
        }
        var addKey;
        var key = this.getKey(e);
        var mergedConfig = this.mergedConfigs.get(key);
        addKey = (mergedConfig == null);
        if (mergedConfig != null && this.canMerge(e, key, mergedConfig)) {
            mergedConfig.outerContextDepth = Math.max(mergedConfig.outerContextDepth, e.outerContextDepth);
            if (e.isPrecedenceFilterSuppressed) {
                mergedConfig.isPrecedenceFilterSuppressed = true;
            }
            var joined = PredictionContext.join(mergedConfig.context, e.context, contextCache);
            this.updatePropertiesForMergedConfig(e);
            if (mergedConfig.context == joined) {
                return false;
            }
            mergedConfig.context = joined;
            return true;
        }
        for (var i = 0; i < this.unmerged.length; i++) {
            var unmergedConfig = this.unmerged[i];
            if (this.canMerge(e, key, unmergedConfig)) {
                unmergedConfig.outerContextDepth = Math.max(unmergedConfig.outerContextDepth, e.outerContextDepth);
                if (e.isPrecedenceFilterSuppressed) {
                    unmergedConfig.isPrecedenceFilterSuppressed = true;
                }
                var joined = PredictionContext.join(unmergedConfig.context, e.context, contextCache);
                this.updatePropertiesForMergedConfig(e);
                if (unmergedConfig.context == joined) {
                    return false;
                }
                unmergedConfig.context = joined;
                if (addKey) {
                    this.mergedConfigs.put(key, unmergedConfig);
                    this.unmerged.splice(i, 1);
                }
                return true;
            }
        }
        this.configs.push(e);
        if (addKey) {
            this.mergedConfigs.put(key, e);
        }
        else {
            this.unmerged.push(e);
        }
        this.updatePropertiesForAddedConfig(e);
        return true;
    };
    ATNConfigSet.prototype.updatePropertiesForMergedConfig = function (config) {
        // merged configs can't change the alt or semantic context
        this._dipsIntoOuterContext = this._dipsIntoOuterContext || config.reachesIntoOuterContext;
        assert(!this.outermostConfigSet || !this._dipsIntoOuterContext);
    };
    ATNConfigSet.prototype.updatePropertiesForAddedConfig = function (config) {
        if (this.configs.length === 1) {
            this._uniqueAlt = config.alt;
        }
        else if (this._uniqueAlt !== config.alt) {
            this._uniqueAlt = ATN.INVALID_ALT_NUMBER;
        }
        this._hasSemanticContext = this._hasSemanticContext || !SemanticContext.NONE.equals(config.semanticContext);
        this._dipsIntoOuterContext = this._dipsIntoOuterContext || config.reachesIntoOuterContext;
        assert(!this.outermostConfigSet || !this._dipsIntoOuterContext);
    };
    ATNConfigSet.prototype.canMerge = function (left, leftKey, right) {
        if (left.state.stateNumber != right.state.stateNumber) {
            return false;
        }
        if (leftKey.alt !== right.alt) {
            return false;
        }
        return left.semanticContext.equals(right.semanticContext);
    };
    ATNConfigSet.prototype.getKey = function (e) {
        return { state: e.state.stateNumber, alt: e.alt };
    };
    ATNConfigSet.prototype.containsAll = function (c) {
        for (var _i = 0, _a = Array.from(asIterable(c)); _i < _a.length; _i++) {
            var o = _a[_i];
            if (!(o instanceof ATNConfig)) {
                return false;
            }
            if (!this.contains(o)) {
                return false;
            }
        }
        return true;
    };
    ATNConfigSet.prototype.addAll = function (c, contextCache) {
        this.ensureWritable();
        var changed = false;
        for (var _i = 0, _a = Array.from(asIterable(c)); _i < _a.length; _i++) {
            var group = _a[_i];
            if (this.add(group, contextCache)) {
                changed = true;
            }
        }
        return changed;
    };
    ATNConfigSet.prototype.retainAll = function (c) {
        this.ensureWritable();
        throw new Error("Not supported yet.");
    };
    ATNConfigSet.prototype.removeAll = function (c) {
        this.ensureWritable();
        throw new Error("Not supported yet.");
    };
    ATNConfigSet.prototype.clear = function () {
        this.ensureWritable();
        if (!this.mergedConfigs || !this.unmerged) {
            throw new Error("Covered by ensureWritable but duplicated here for strict null check limitation");
        }
        this.mergedConfigs.clear();
        this.unmerged.length = 0;
        this.configs.length = 0;
        this._dipsIntoOuterContext = false;
        this._hasSemanticContext = false;
        this._uniqueAlt = ATN.INVALID_ALT_NUMBER;
        this._conflictInfo = undefined;
    };
    ATNConfigSet.prototype.equals = function (obj) {
        if (this === obj) {
            return true;
        }
        if (!(obj instanceof ATNConfigSet)) {
            return false;
        }
        return this.outermostConfigSet == obj.outermostConfigSet
            && Utils.equals(this._conflictInfo, obj._conflictInfo)
            && ArrayEqualityComparator.INSTANCE.equals(this.configs, obj.configs);
    };
    ATNConfigSet.prototype.hashCode = function () {
        if (this.isReadOnly && this.cachedHashCode != -1) {
            return this.cachedHashCode;
        }
        var hashCode = 1;
        hashCode = 5 * hashCode ^ (this.outermostConfigSet ? 1 : 0);
        hashCode = 5 * hashCode ^ ArrayEqualityComparator.INSTANCE.hashCode(this.configs);
        if (this.isReadOnly) {
            this.cachedHashCode = hashCode;
        }
        return hashCode;
    };
    ATNConfigSet.prototype.toString = function (showContext) {
        if (showContext == null) {
            showContext = false;
        }
        var buf = "";
        var sortedConfigs = this.configs.slice(0);
        sortedConfigs.sort(function (o1, o2) {
            if (o1.alt != o2.alt) {
                return o1.alt - o2.alt;
            }
            else if (o1.state.stateNumber != o2.state.stateNumber) {
                return o1.state.stateNumber - o2.state.stateNumber;
            }
            else {
                return o1.semanticContext.toString().localeCompare(o2.semanticContext.toString());
            }
        });
        buf += ("[");
        for (var i = 0; i < sortedConfigs.length; i++) {
            if (i > 0) {
                buf += (", ");
            }
            buf += (sortedConfigs[i].toString(undefined, true, showContext));
        }
        buf += ("]");
        if (this._hasSemanticContext)
            buf += (",hasSemanticContext=") + (this._hasSemanticContext);
        if (this._uniqueAlt !== ATN.INVALID_ALT_NUMBER)
            buf += (",uniqueAlt=") + (this._uniqueAlt);
        if (this._conflictInfo != null) {
            buf += (",conflictingAlts=") + (this._conflictInfo.conflictedAlts);
            if (!this._conflictInfo.isExact) {
                buf += ("*");
            }
        }
        if (this._dipsIntoOuterContext)
            buf += (",dipsIntoOuterContext");
        return buf.toString();
    };
    Object.defineProperty(ATNConfigSet.prototype, "uniqueAlt", {
        get: function () {
            return this._uniqueAlt;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ATNConfigSet.prototype, "hasSemanticContext", {
        get: function () {
            return this._hasSemanticContext;
        },
        set: function (value) {
            this.ensureWritable();
            this._hasSemanticContext = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ATNConfigSet.prototype, "conflictInfo", {
        get: function () {
            return this._conflictInfo;
        },
        set: function (conflictInfo) {
            this.ensureWritable();
            this._conflictInfo = conflictInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ATNConfigSet.prototype, "conflictingAlts", {
        get: function () {
            if (this._conflictInfo == null) {
                return undefined;
            }
            return this._conflictInfo.conflictedAlts;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ATNConfigSet.prototype, "isExactConflict", {
        get: function () {
            if (this._conflictInfo == null) {
                return false;
            }
            return this._conflictInfo.isExact;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ATNConfigSet.prototype, "dipsIntoOuterContext", {
        get: function () {
            return this._dipsIntoOuterContext;
        },
        enumerable: true,
        configurable: true
    });
    ATNConfigSet.prototype.get = function (index) {
        return this.configs[index];
    };
    ATNConfigSet.prototype.remove = function (indexOrItem) {
        this.ensureWritable();
        if (!this.mergedConfigs || !this.unmerged) {
            throw new Error("Covered by ensureWritable but duplicated here for strict null check limitation");
        }
        if (typeof indexOrItem !== 'number') {
            throw new Error("Not supported yet");
        }
        var index = indexOrItem;
        var config = this.configs[index];
        this.configs.splice(index, 1);
        var key = this.getKey(config);
        if (this.mergedConfigs.get(key) === config) {
            this.mergedConfigs.remove(key);
        }
        else {
            for (var i = 0; i < this.unmerged.length; i++) {
                if (this.unmerged[i] === config) {
                    this.unmerged.splice(i, 1);
                    return;
                }
            }
        }
    };
    ATNConfigSet.prototype.ensureWritable = function () {
        if (this.isReadOnly) {
            throw new Error("This ATNConfigSet is read only.");
        }
    };
    __decorate([
        NotNull
    ], ATNConfigSet.prototype, "getRepresentedAlternatives", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "size", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "isEmpty", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "contains", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "iterator", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "toArray", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "containsAll", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "retainAll", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "removeAll", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "clear", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "equals", null);
    __decorate([
        Override
    ], ATNConfigSet.prototype, "hashCode", null);
    return ATNConfigSet;
}());
export { ATNConfigSet };
var ATNConfigSetIterator = /** @class */ (function () {
    function ATNConfigSetIterator(set, configs) {
        this.index = -1;
        this.removed = false;
        this.configs = configs;
    }
    ATNConfigSetIterator.prototype.hasNext = function () {
        return this.index + 1 < this.configs.length;
    };
    ATNConfigSetIterator.prototype.next = function () {
        if (!this.hasNext()) {
            throw new Error("NoSuchElementException");
        }
        this.index++;
        this.removed = false;
        return this.configs[this.index];
    };
    ATNConfigSetIterator.prototype.remove = function () {
        if (this.removed || this.index < 0 || this.index >= this.configs.length) {
            throw new Error("IllegalStateException");
        }
        this.set.remove(this.index);
        this.removed = true;
    };
    __decorate([
        Override
    ], ATNConfigSetIterator.prototype, "hasNext", null);
    __decorate([
        Override
    ], ATNConfigSetIterator.prototype, "next", null);
    __decorate([
        Override
    ], ATNConfigSetIterator.prototype, "remove", null);
    return ATNConfigSetIterator;
}());
//# sourceMappingURL=ATNConfigSet.js.map