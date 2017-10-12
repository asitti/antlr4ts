/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */
import { Array2DHashSet } from './Array2DHashSet';
import { asIterable } from './Stubs';
import { DefaultEqualityComparator } from './DefaultEqualityComparator';
var MapKeyEqualityComparator = /** @class */ (function () {
    function MapKeyEqualityComparator(keyComparator) {
        this.keyComparator = keyComparator;
    }
    MapKeyEqualityComparator.prototype.hashCode = function (obj) {
        return this.keyComparator.hashCode(obj.key);
    };
    MapKeyEqualityComparator.prototype.equals = function (a, b) {
        return this.keyComparator.equals(a.key, b.key);
    };
    return MapKeyEqualityComparator;
}());
var Array2DHashMap = /** @class */ (function () {
    function Array2DHashMap(keyComparer) {
        if (keyComparer instanceof Array2DHashMap) {
            this.backingStore = new Array2DHashSet(keyComparer.backingStore);
        }
        else {
            this.backingStore = new Array2DHashSet(new MapKeyEqualityComparator(keyComparer));
        }
    }
    Array2DHashMap.prototype.clear = function () {
        this.backingStore.clear();
    };
    Array2DHashMap.prototype.containsKey = function (key) {
        return this.backingStore.contains({ key: key });
    };
    Array2DHashMap.prototype.containsValue = function (value) {
        return this.values().contains(value);
    };
    Array2DHashMap.prototype.entrySet = function () {
        return new EntrySet(this, this.backingStore);
    };
    Array2DHashMap.prototype.get = function (key) {
        var bucket = this.backingStore.get({ key: key });
        if (!bucket) {
            return undefined;
        }
        return bucket.value;
    };
    Object.defineProperty(Array2DHashMap.prototype, "isEmpty", {
        get: function () {
            return this.backingStore.isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    Array2DHashMap.prototype.keySet = function () {
        return new KeySet(this, this.backingStore);
    };
    Array2DHashMap.prototype.put = function (key, value) {
        var element = this.backingStore.get({ key: key, value: value });
        var result;
        if (!element) {
            this.backingStore.add({ key: key, value: value });
        }
        else {
            result = element.value;
            element.value = value;
        }
        return result;
    };
    Array2DHashMap.prototype.putIfAbsent = function (key, value) {
        var element = this.backingStore.get({ key: key, value: value });
        var result;
        if (!element) {
            this.backingStore.add({ key: key, value: value });
        }
        else {
            result = element.value;
        }
        return result;
    };
    Array2DHashMap.prototype.putAll = function (m) {
        for (var _i = 0, _a = Array.from(asIterable(m.entrySet())); _i < _a.length; _i++) {
            var entry = _a[_i];
            this.put(entry.getKey(), entry.getValue());
        }
    };
    Array2DHashMap.prototype.remove = function (key) {
        var value = this.get(key);
        this.backingStore.remove({ key: key });
        return value;
    };
    Object.defineProperty(Array2DHashMap.prototype, "size", {
        get: function () {
            return this.backingStore.size;
        },
        enumerable: true,
        configurable: true
    });
    Array2DHashMap.prototype.values = function () {
        return new ValueCollection(this, this.backingStore);
    };
    Array2DHashMap.prototype.hashCode = function () {
        return this.backingStore.hashCode();
    };
    Array2DHashMap.prototype.equals = function (o) {
        if (!(o instanceof Array2DHashMap)) {
            return false;
        }
        return this.backingStore.equals(o.backingStore);
    };
    return Array2DHashMap;
}());
export { Array2DHashMap };
var EntrySet = /** @class */ (function () {
    function EntrySet(map, backingStore) {
        this.map = map;
        this.backingStore = backingStore;
    }
    EntrySet.prototype.add = function (e) {
        throw new Error("Not implemented");
    };
    EntrySet.prototype.addAll = function (collection) {
        throw new Error("Not implemented");
    };
    EntrySet.prototype.clear = function () {
        this.map.clear();
    };
    EntrySet.prototype.contains = function (o) {
        throw new Error("Not implemented");
    };
    EntrySet.prototype.containsAll = function (collection) {
        for (var _i = 0, _a = Array.from(asIterable(collection)); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!this.contains(key)) {
                return false;
            }
        }
        return true;
    };
    EntrySet.prototype.equals = function (o) {
        if (o === this) {
            return true;
        }
        else if (!(o instanceof EntrySet)) {
            return false;
        }
        return this.backingStore.equals(o.backingStore);
    };
    EntrySet.prototype.hashCode = function () {
        return this.backingStore.hashCode();
    };
    Object.defineProperty(EntrySet.prototype, "isEmpty", {
        get: function () {
            return this.backingStore.isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    EntrySet.prototype.iterator = function () {
        throw new Error("Not implemented");
    };
    EntrySet.prototype.remove = function (o) {
        throw new Error("Not implemented");
    };
    EntrySet.prototype.removeAll = function (collection) {
        var removedAny = false;
        for (var _i = 0, _a = Array.from(asIterable(collection)); _i < _a.length; _i++) {
            var key = _a[_i];
            removedAny = this.remove(key) || removedAny;
        }
        return removedAny;
    };
    EntrySet.prototype.retainAll = function (collection) {
        throw new Error("Not implemented");
    };
    Object.defineProperty(EntrySet.prototype, "size", {
        get: function () {
            return this.backingStore.size;
        },
        enumerable: true,
        configurable: true
    });
    EntrySet.prototype.toArray = function (a) {
        throw new Error("Not implemented");
    };
    return EntrySet;
}());
var KeySet = /** @class */ (function () {
    function KeySet(map, backingStore) {
        this.map = map;
        this.backingStore = backingStore;
    }
    KeySet.prototype.add = function (e) {
        throw new Error("Not supported");
    };
    KeySet.prototype.addAll = function (collection) {
        throw new Error("Not supported");
    };
    KeySet.prototype.clear = function () {
        this.map.clear();
    };
    KeySet.prototype.contains = function (o) {
        return this.backingStore.contains({ key: o });
    };
    KeySet.prototype.containsAll = function (collection) {
        for (var _i = 0, _a = Array.from(asIterable(collection)); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!this.contains(key)) {
                return false;
            }
        }
        return true;
    };
    KeySet.prototype.equals = function (o) {
        if (o === this) {
            return true;
        }
        else if (!(o instanceof KeySet)) {
            return false;
        }
        return this.backingStore.equals(o.backingStore);
    };
    KeySet.prototype.hashCode = function () {
        return this.backingStore.hashCode();
    };
    Object.defineProperty(KeySet.prototype, "isEmpty", {
        get: function () {
            return this.backingStore.isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    KeySet.prototype.iterator = function () {
        throw new Error("Not implemented");
    };
    KeySet.prototype.remove = function (o) {
        return this.backingStore.remove({ key: o });
    };
    KeySet.prototype.removeAll = function (collection) {
        var removedAny = false;
        for (var _i = 0, _a = Array.from(asIterable(collection)); _i < _a.length; _i++) {
            var key = _a[_i];
            removedAny = this.remove(key) || removedAny;
        }
        return removedAny;
    };
    KeySet.prototype.retainAll = function (collection) {
        throw new Error("Not implemented");
    };
    Object.defineProperty(KeySet.prototype, "size", {
        get: function () {
            return this.backingStore.size;
        },
        enumerable: true,
        configurable: true
    });
    KeySet.prototype.toArray = function (a) {
        throw new Error("Not implemented");
    };
    return KeySet;
}());
var ValueCollection = /** @class */ (function () {
    function ValueCollection(map, backingStore) {
        this.map = map;
        this.backingStore = backingStore;
    }
    ValueCollection.prototype.add = function (e) {
        throw new Error("Not supported");
    };
    ValueCollection.prototype.addAll = function (collection) {
        throw new Error("Not supported");
    };
    ValueCollection.prototype.clear = function () {
        this.map.clear();
    };
    ValueCollection.prototype.contains = function (o) {
        for (var _i = 0, _a = Array.from(asIterable(this.backingStore)); _i < _a.length; _i++) {
            var bucket = _a[_i];
            if (DefaultEqualityComparator.INSTANCE.equals(o, bucket.value)) {
                return true;
            }
        }
        return false;
    };
    ValueCollection.prototype.containsAll = function (collection) {
        for (var _i = 0, _a = Array.from(asIterable(collection)); _i < _a.length; _i++) {
            var key = _a[_i];
            if (!this.contains(key)) {
                return false;
            }
        }
        return true;
    };
    ValueCollection.prototype.equals = function (o) {
        if (o === this) {
            return true;
        }
        else if (!(o instanceof ValueCollection)) {
            return false;
        }
        return this.backingStore.equals(o.backingStore);
    };
    ValueCollection.prototype.hashCode = function () {
        return this.backingStore.hashCode();
    };
    Object.defineProperty(ValueCollection.prototype, "isEmpty", {
        get: function () {
            return this.backingStore.isEmpty;
        },
        enumerable: true,
        configurable: true
    });
    ValueCollection.prototype.iterator = function () {
        var delegate = this.backingStore.iterator();
        return {
            hasNext: function () {
                return delegate.hasNext();
            },
            next: function () {
                return delegate.next().value;
            },
            remove: function () {
                throw new Error("Not supported");
            }
        };
    };
    ValueCollection.prototype.remove = function (o) {
        throw new Error("Not implemented");
    };
    ValueCollection.prototype.removeAll = function (collection) {
        var removedAny = false;
        for (var _i = 0, _a = Array.from(asIterable(collection)); _i < _a.length; _i++) {
            var key = _a[_i];
            removedAny = this.remove(key) || removedAny;
        }
        return removedAny;
    };
    ValueCollection.prototype.retainAll = function (collection) {
        throw new Error("Not implemented");
    };
    Object.defineProperty(ValueCollection.prototype, "size", {
        get: function () {
            return this.backingStore.size;
        },
        enumerable: true,
        configurable: true
    });
    ValueCollection.prototype.toArray = function (a) {
        if (a === undefined || a.length < this.backingStore.size) {
            a = new Array(this.backingStore.size);
        }
        var i = 0;
        for (var _i = 0, _a = Array.from(asIterable(this.backingStore)); _i < _a.length; _i++) {
            var bucket = _a[_i];
            a[i++] = bucket.value;
        }
        return a;
    };
    return ValueCollection;
}());
//# sourceMappingURL=Array2DHashMap.js.map