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
// ConvertTo-TS run at 2016-10-04T11:26:40.6647101-07:00
import { IntegerList } from './IntegerList';
/**
 *
 * @author Sam Harwell
 */
var IntegerStack = /** @class */ (function (_super) {
    __extends(IntegerStack, _super);
    function IntegerStack(arg) {
        return _super.call(this, arg) || this;
    }
    IntegerStack.prototype.push = function (value) {
        this.add(value);
    };
    IntegerStack.prototype.pop = function () {
        return this.removeAt(this.size - 1);
    };
    IntegerStack.prototype.peek = function () {
        return this.get(this.size - 1);
    };
    return IntegerStack;
}(IntegerList));
export { IntegerStack };
//# sourceMappingURL=IntegerStack.js.map