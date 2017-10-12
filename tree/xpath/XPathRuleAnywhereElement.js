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
import { Override } from "../../Decorators";
import { Trees } from "../Trees";
import { XPathElement } from "./XPathElement";
/**
 * Either {@code ID} at start of path or {@code ...//ID} in middle of path.
 */
var XPathRuleAnywhereElement = /** @class */ (function (_super) {
    __extends(XPathRuleAnywhereElement, _super);
    function XPathRuleAnywhereElement(ruleName, ruleIndex) {
        var _this = _super.call(this, ruleName) || this;
        _this.ruleIndex = ruleIndex;
        return _this;
    }
    XPathRuleAnywhereElement.prototype.evaluate = function (t) {
        return Trees.findAllRuleNodes(t, this.ruleIndex);
    };
    __decorate([
        Override
    ], XPathRuleAnywhereElement.prototype, "evaluate", null);
    return XPathRuleAnywhereElement;
}(XPathElement));
export { XPathRuleAnywhereElement };
//# sourceMappingURL=XPathRuleAnywhereElement.js.map