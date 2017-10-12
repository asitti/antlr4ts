/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */
var ParseTreeProperty = /** @class */ (function () {
    function ParseTreeProperty(name) {
        if (name === void 0) { name = "ParseTreeProperty"; }
        this._symbol = Symbol(name);
    }
    ParseTreeProperty.prototype.get = function (node) {
        return node[this._symbol];
    };
    ParseTreeProperty.prototype.set = function (node, value) {
        node[this._symbol] = value;
    };
    ParseTreeProperty.prototype.removeFrom = function (node) {
        var result = node[this._symbol];
        delete node[this._symbol];
        return result;
    };
    return ParseTreeProperty;
}());
export { ParseTreeProperty };
//# sourceMappingURL=ParseTreeProperty.js.map