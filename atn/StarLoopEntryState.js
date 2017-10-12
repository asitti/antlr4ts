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
// ConvertTo-TS run at 2016-10-04T11:26:37.7099201-07:00
import { ATNStateType } from './ATNStateType';
import { BitSet } from '../misc/BitSet';
import { DecisionState } from './DecisionState';
import { Override } from '../Decorators';
var StarLoopEntryState = /** @class */ (function (_super) {
    __extends(StarLoopEntryState, _super);
    function StarLoopEntryState() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Indicates whether this state can benefit from a precedence DFA during SLL
         * decision making.
         *
         * <p>This is a computed property that is calculated during ATN deserialization
         * and stored for use in {@link ParserATNSimulator} and
         * {@link ParserInterpreter}.</p>
         *
         * @see `DFA.isPrecedenceDfa`
         */
        _this.precedenceRuleDecision = false;
        /**
         * For precedence decisions, this set marks states <em>S</em> which have all
         * of the following characteristics:
         *
         * <ul>
         * <li>One or more invocation sites of the current rule returns to
         * <em>S</em>.</li>
         * <li>The closure from <em>S</em> includes the current decision without
         * passing through any rule invocations or stepping out of the current
         * rule.</li>
         * </ul>
         *
         * <p>This field is not used when {@link #isPrecedenceDecision} is
         * {@code false}.</p>
         */
        _this.precedenceLoopbackStates = new BitSet();
        return _this;
    }
    Object.defineProperty(StarLoopEntryState.prototype, "stateType", {
        get: function () {
            return ATNStateType.STAR_LOOP_ENTRY;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Override
    ], StarLoopEntryState.prototype, "stateType", null);
    return StarLoopEntryState;
}(DecisionState));
export { StarLoopEntryState };
//# sourceMappingURL=StarLoopEntryState.js.map