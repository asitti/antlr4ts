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
import { DecisionState } from './DecisionState';
/**  The start of a regular {@code (...)} block. */
var BlockStartState = /** @class */ (function (_super) {
    __extends(BlockStartState, _super);
    function BlockStartState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return BlockStartState;
}(DecisionState));
export { BlockStartState };
//# sourceMappingURL=BlockStartState.js.map