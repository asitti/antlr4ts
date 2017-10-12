/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */
/**
 * This adapter function allows Collection<T> arguments to be used in JavaScript for...of loops
 */
export function asIterable(collection) {
    if (collection[Symbol.iterator])
        return collection;
    return new IterableAdapter(collection);
}
// implementation detail of above...
var IterableAdapter = /** @class */ (function () {
    function IterableAdapter(collection) {
        this.collection = collection;
    }
    IterableAdapter.prototype[Symbol.iterator] = function () { this._iterator = this.collection.iterator(); return this; };
    IterableAdapter.prototype.next = function () {
        if (!this._iterator.hasNext()) {
            // A bit of a hack needed here, tracking under https://github.com/Microsoft/TypeScript/issues/11375
            return { done: true, value: undefined };
        }
        return { done: false, value: this._iterator.next() };
    };
    return IterableAdapter;
}());
//# sourceMappingURL=Stubs.js.map