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
// ConvertTo-TS run at 2016-10-03T02:09:41.7434086-07:00
import * as assert from "assert";
import { DefaultEqualityComparator } from './DefaultEqualityComparator';
import { NotNull, Nullable, Override, SuppressWarnings } from '../Decorators';
import { asIterable } from './Stubs';
import { MurmurHash } from './MurmurHash';
/** {@link Set} implementation with closed hashing (open addressing). */
// NOTE:  JavaScript's Set interface has on significant different diffrence from Java's:
//       e.g. the return type of add() differs!
//        For this reason I've commented tweaked the implements clause
var INITAL_CAPACITY = 16; // must be power of 2
var LOAD_FACTOR = 0.75;
var Array2DHashSet = /** @class */ (function () {
    function Array2DHashSet(comparatorOrSet, initialCapacity) {
        if (initialCapacity === void 0) { initialCapacity = INITAL_CAPACITY; }
        /** How many elements in set */
        this.n = 0;
        this.threshold = Math.floor(INITAL_CAPACITY * LOAD_FACTOR); // when to expand
        if (comparatorOrSet instanceof Array2DHashSet) {
            this.comparator = comparatorOrSet.comparator;
            this.buckets = comparatorOrSet.buckets.slice(0);
            for (var i = 0; i < this.buckets.length; i++) {
                var bucket = this.buckets[i];
                if (bucket) {
                    this.buckets[i] = bucket.slice(0);
                }
            }
            this.n = comparatorOrSet.n;
            this.threshold = comparatorOrSet.threshold;
        }
        else {
            this.comparator = comparatorOrSet || DefaultEqualityComparator.INSTANCE;
            this.buckets = this.createBuckets(initialCapacity);
        }
    }
    /**
     * Add {@code o} to set if not there; return existing value if already
     * there. This method performs the same operation as {@link #add} aside from
     * the return value.
     */
    Array2DHashSet.prototype.getOrAdd = function (o) {
        if (this.n > this.threshold)
            this.expand();
        return this.getOrAddImpl(o);
    };
    Array2DHashSet.prototype.getOrAddImpl = function (o) {
        var b = this.getBucket(o);
        var bucket = this.buckets[b];
        // NEW BUCKET
        if (!bucket) {
            bucket = [o];
            this.buckets[b] = bucket;
            this.n++;
            return o;
        }
        // LOOK FOR IT IN BUCKET
        for (var i = 0; i < bucket.length; i++) {
            var existing = bucket[i];
            if (this.comparator.equals(existing, o)) {
                return existing; // found existing, quit
            }
        }
        // FULL BUCKET, expand and add to end
        bucket.push(o);
        this.n++;
        return o;
    };
    Array2DHashSet.prototype.get = function (o) {
        if (o == null)
            return o;
        var b = this.getBucket(o);
        var bucket = this.buckets[b];
        if (!bucket) {
            // no bucket
            return undefined;
        }
        for (var _i = 0, bucket_1 = bucket; _i < bucket_1.length; _i++) {
            var e = bucket_1[_i];
            if (this.comparator.equals(e, o)) {
                return e;
            }
        }
        return undefined;
    };
    Array2DHashSet.prototype.getBucket = function (o) {
        var hash = this.comparator.hashCode(o);
        var b = hash & (this.buckets.length - 1); // assumes len is power of 2
        return b;
    };
    Array2DHashSet.prototype.hashCode = function () {
        var hash = MurmurHash.initialize();
        for (var _i = 0, _a = this.buckets; _i < _a.length; _i++) {
            var bucket = _a[_i];
            if (bucket == null)
                continue;
            for (var _b = 0, bucket_2 = bucket; _b < bucket_2.length; _b++) {
                var o = bucket_2[_b];
                if (o == null)
                    break;
                hash = MurmurHash.update(hash, this.comparator.hashCode(o));
            }
        }
        hash = MurmurHash.finish(hash, this.size);
        return hash;
    };
    Array2DHashSet.prototype.equals = function (o) {
        if (o === this)
            return true;
        if (!(o instanceof Array2DHashSet))
            return false;
        if (o.size !== this.size)
            return false;
        var same = this.containsAll(o);
        return same;
    };
    Array2DHashSet.prototype.expand = function () {
        var old = this.buckets;
        var newCapacity = this.buckets.length * 2;
        var newTable = this.createBuckets(newCapacity);
        this.buckets = newTable;
        this.threshold = Math.floor(newCapacity * LOAD_FACTOR);
        //    System.out.println("new size="+newCapacity+", thres="+threshold);
        // rehash all existing entries
        var oldSize = this.size;
        for (var _i = 0, old_1 = old; _i < old_1.length; _i++) {
            var bucket = old_1[_i];
            if (!bucket) {
                continue;
            }
            for (var _a = 0, bucket_3 = bucket; _a < bucket_3.length; _a++) {
                var o = bucket_3[_a];
                var b = this.getBucket(o);
                var newBucket = this.buckets[b];
                if (!newBucket) {
                    newBucket = [];
                    this.buckets[b] = newBucket;
                }
                newBucket.push(o);
            }
        }
        assert(this.n === oldSize);
    };
    Array2DHashSet.prototype.add = function (t) {
        var existing = this.getOrAdd(t);
        return existing === t;
    };
    Object.defineProperty(Array2DHashSet.prototype, "size", {
        get: function () {
            return this.n;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Array2DHashSet.prototype, "isEmpty", {
        get: function () {
            return this.n === 0;
        },
        enumerable: true,
        configurable: true
    });
    Array2DHashSet.prototype.contains = function (o) {
        return this.containsFast(this.asElementType(o));
    };
    Array2DHashSet.prototype.containsFast = function (obj) {
        if (obj == null) {
            return false;
        }
        return this.get(obj) != null;
    };
    Array2DHashSet.prototype.iterator = function () {
        return new SetIterator(this.toArray(), this);
    };
    Array2DHashSet.prototype.toArray = function (a) {
        // Check if the array argument was provided
        if (!a || a.length < this.size) {
            a = new Array(this.size);
        }
        // Copy elements from the nested arrays into the destination array
        var i = 0; // Position within destination array
        for (var _i = 0, _a = this.buckets; _i < _a.length; _i++) {
            var bucket = _a[_i];
            if (bucket == null) {
                continue;
            }
            for (var _b = 0, bucket_4 = bucket; _b < bucket_4.length; _b++) {
                var o = bucket_4[_b];
                if (o == null) {
                    break;
                }
                a[i++] = o;
            }
        }
        return a;
    };
    Array2DHashSet.prototype.remove = function (o) {
        return this.removeFast(this.asElementType(o));
    };
    Array2DHashSet.prototype.removeFast = function (obj) {
        if (obj == null) {
            return false;
        }
        var b = this.getBucket(obj);
        var bucket = this.buckets[b];
        if (!bucket) {
            // no bucket
            return false;
        }
        for (var i = 0; i < bucket.length; i++) {
            var e = bucket[i];
            if (this.comparator.equals(e, obj)) {
                // shift all elements to the right down one
                bucket.copyWithin(i, i + 1);
                bucket.length--;
                this.n--;
                return true;
            }
        }
        return false;
    };
    Array2DHashSet.prototype.containsAll = function (collection) {
        if (collection instanceof Array2DHashSet) {
            var s = collection;
            for (var _i = 0, _a = s.buckets; _i < _a.length; _i++) {
                var bucket = _a[_i];
                if (bucket == null)
                    continue;
                for (var _b = 0, bucket_5 = bucket; _b < bucket_5.length; _b++) {
                    var o = bucket_5[_b];
                    if (o == null)
                        break;
                    if (!this.containsFast(this.asElementType(o)))
                        return false;
                }
            }
        }
        else {
            for (var _c = 0, _d = Array.from(asIterable(collection)); _c < _d.length; _c++) {
                var o = _d[_c];
                if (!this.containsFast(this.asElementType(o)))
                    return false;
            }
        }
        return true;
    };
    Array2DHashSet.prototype.addAll = function (c) {
        var changed = false;
        for (var _i = 0, _a = Array.from(asIterable(c)); _i < _a.length; _i++) {
            var o = _a[_i];
            var existing = this.getOrAdd(o);
            if (existing !== o)
                changed = true;
        }
        return changed;
    };
    Array2DHashSet.prototype.retainAll = function (c) {
        var newsize = 0;
        for (var _i = 0, _a = this.buckets; _i < _a.length; _i++) {
            var bucket = _a[_i];
            if (bucket == null) {
                continue;
            }
            var i = void 0;
            var j = void 0;
            for (i = 0, j = 0; i < bucket.length; i++) {
                if (bucket[i] == null) {
                    break;
                }
                if (!c.contains(bucket[i])) {
                    // removed
                    continue;
                }
                // keep
                if (i !== j) {
                    bucket[j] = bucket[i];
                }
                j++;
                newsize++;
            }
            newsize += j;
            bucket.length = j;
        }
        var changed = newsize != this.n;
        this.n = newsize;
        return changed;
    };
    Array2DHashSet.prototype.removeAll = function (c) {
        var changed = false;
        for (var _i = 0, _a = Array.from(asIterable(c)); _i < _a.length; _i++) {
            var o = _a[_i];
            if (this.removeFast(this.asElementType(o)))
                changed = true;
        }
        return changed;
    };
    Array2DHashSet.prototype.clear = function () {
        this.buckets = this.createBuckets(INITAL_CAPACITY);
        this.n = 0;
        this.threshold = Math.floor(INITAL_CAPACITY * LOAD_FACTOR);
    };
    Array2DHashSet.prototype.toString = function () {
        if (this.size === 0)
            return "{}";
        var buf = '{';
        var first = true;
        for (var _i = 0, _a = this.buckets; _i < _a.length; _i++) {
            var bucket = _a[_i];
            if (bucket == null)
                continue;
            for (var _b = 0, bucket_6 = bucket; _b < bucket_6.length; _b++) {
                var o = bucket_6[_b];
                if (o == null)
                    break;
                if (first)
                    first = false;
                else
                    buf += ", ";
                buf += o.toString();
            }
        }
        buf += '}';
        return buf;
    };
    Array2DHashSet.prototype.toTableString = function () {
        var buf = "";
        for (var _i = 0, _a = this.buckets; _i < _a.length; _i++) {
            var bucket = _a[_i];
            if (bucket == null) {
                buf += "null\n";
                continue;
            }
            buf += '[';
            var first = true;
            for (var _b = 0, bucket_7 = bucket; _b < bucket_7.length; _b++) {
                var o = bucket_7[_b];
                if (first)
                    first = false;
                else
                    buf += " ";
                if (o == null)
                    buf += "_";
                else
                    buf += o.toString();
            }
            buf += "]\n";
        }
        return buf;
    };
    /**
     * Return {@code o} as an instance of the element type {@code T}. If
     * {@code o} is non-null but known to not be an instance of {@code T}, this
     * method returns {@code null}. The base implementation does not perform any
     * type checks; override this method to provide strong type checks for the
     * {@link #contains} and {@link #remove} methods to ensure the arguments to
     * the {@link EqualityComparator} for the set always have the expected
     * types.
     *
     * @param o the object to try and cast to the element type of the set
     * @return {@code o} if it could be an instance of {@code T}, otherwise
     * {@code null}.
     */
    Array2DHashSet.prototype.asElementType = function (o) {
        return o;
    };
    /**
     * Return an array of {@code T[]} with length {@code capacity}.
     *
     * @param capacity the length of the array to return
     * @return the newly constructed array
     */
    Array2DHashSet.prototype.createBuckets = function (capacity) {
        return new Array(capacity);
    };
    __decorate([
        NotNull
    ], Array2DHashSet.prototype, "comparator", void 0);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "hashCode", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "equals", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "add", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "size", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "isEmpty", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "contains", null);
    __decorate([
        __param(0, Nullable)
    ], Array2DHashSet.prototype, "containsFast", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "iterator", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "toArray", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "remove", null);
    __decorate([
        __param(0, Nullable)
    ], Array2DHashSet.prototype, "removeFast", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "containsAll", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "addAll", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "retainAll", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "removeAll", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "clear", null);
    __decorate([
        Override
    ], Array2DHashSet.prototype, "toString", null);
    __decorate([
        SuppressWarnings("unchecked")
    ], Array2DHashSet.prototype, "asElementType", null);
    __decorate([
        SuppressWarnings("unchecked")
    ], Array2DHashSet.prototype, "createBuckets", null);
    return Array2DHashSet;
}());
export { Array2DHashSet };
var SetIterator = /** @class */ (function () {
    function SetIterator(data, set) {
        this.data = data;
        this.set = set;
        this.nextIndex = 0;
        this.removed = true;
    }
    SetIterator.prototype.hasNext = function () {
        return this.nextIndex < this.data.length;
    };
    SetIterator.prototype.next = function () {
        if (this.nextIndex >= this.data.length)
            throw new RangeError("Attempted to iterate past end.");
        this.removed = false;
        return this.data[this.nextIndex++];
    };
    // Note: this is an untested extension to the JavaScript iterator interface
    SetIterator.prototype.remove = function () {
        if (this.removed) {
            throw new Error("This entry has already been removed");
        }
        this.set.remove(this.data[this.nextIndex - 1]);
        this.removed = true;
    };
    return SetIterator;
}());
//# sourceMappingURL=Array2DHashSet.js.map