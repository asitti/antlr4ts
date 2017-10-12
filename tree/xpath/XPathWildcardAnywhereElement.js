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
// CONVERSTION complete, Burt Harris 10/14/2016
import { Override } from "../../Decorators";
import { Trees } from "../Trees";
import { XPath } from "./XPath";
import { XPathElement } from "./XPathElement";
var XPathWildcardAnywhereElement = /** @class */ (function (_super) {
    __extends(XPathWildcardAnywhereElement, _super);
    function XPathWildcardAnywhereElement() {
        return _super.call(this, XPath.WILDCARD) || this;
    }
    XPathWildcardAnywhereElement.prototype.evaluate = function (t) {
        if (this.invert)
            return []; // !* is weird but valid (empty)
        return Trees.getDescendants(t);
    };
    __decorate([
        Override
    ], XPathWildcardAnywhereElement.prototype, "evaluate", null);
    return XPathWildcardAnywhereElement;
}(XPathElement));
export { XPathWildcardAnywhereElement };
//# sourceMappingURL=XPathWildcardAnywhereElement.js.map