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
import { ATN } from '../atn/ATN';
import { CommonToken } from "../CommonToken";
import { ErrorNode } from "./ErrorNode";
import { NotNull } from "../Decorators";
import { Parser } from '../Parser';
import { ParserRuleContext } from "../ParserRuleContext";
import { RuleNode } from "./RuleNode";
import { TerminalNode } from "./TerminalNode";
import { Token } from "../Token";
import * as Utils from "../misc/Utils";
/** A set of utility routines useful for all kinds of ANTLR trees. */
var Trees = /** @class */ (function () {
    function Trees() {
    }
    /** Print out a whole tree in LISP form. {@link #getNodeText} is used on the
     *  node payloads to get the text for the nodes.  Detect
     *  parse trees and extract data appropriately.
     */
    /** Print out a whole tree in LISP form. {@link #getNodeText} is used on the
     *  node payloads to get the text for the nodes.  Detect
     *  parse trees and extract data appropriately.
     */
    /** Print out a whole tree in LISP form. {@link #getNodeText} is used on the
     *  node payloads to get the text for the nodes.
     */
    Trees.toStringTree = function (t, arg2) {
        var ruleNames;
        if (arg2 instanceof Parser) {
            ruleNames = arg2.ruleNames;
        }
        else {
            ruleNames = arg2;
        }
        var s = Utils.escapeWhitespace(this.getNodeText(t, ruleNames), false);
        if (t.childCount == 0)
            return s;
        var buf = "";
        buf += ("(");
        s = Utils.escapeWhitespace(this.getNodeText(t, ruleNames), false);
        buf += (s);
        buf += (' ');
        for (var i = 0; i < t.childCount; i++) {
            if (i > 0)
                buf += (' ');
            buf += (this.toStringTree(t.getChild(i), ruleNames));
        }
        buf += (")");
        return buf;
    };
    Trees.getNodeText = function (t, arg2) {
        var ruleNames;
        if (arg2 instanceof Parser) {
            ruleNames = arg2.ruleNames;
        }
        else if (arg2) {
            ruleNames = arg2;
        }
        else {
            // no recog or rule names
            var payload = t.payload;
            if (typeof payload.text === 'string') {
                return payload.text;
            }
            return t.payload.toString();
            ;
        }
        if (t instanceof RuleNode) {
            var ruleContext = t.ruleContext;
            var ruleIndex = ruleContext.ruleIndex;
            var ruleName = ruleNames[ruleIndex];
            var altNumber = ruleContext.altNumber;
            if (altNumber !== ATN.INVALID_ALT_NUMBER) {
                return ruleName + ":" + altNumber;
            }
            return ruleName;
        }
        else if (t instanceof ErrorNode) {
            return t.toString();
        }
        else if (t instanceof TerminalNode) {
            var symbol = t.symbol;
            return symbol.text || "";
        }
        throw new TypeError("Unexpected node type");
    };
    /** Return ordered list of all children of this node */
    Trees.getChildren = function (t) {
        var kids = [];
        for (var i = 0; i < t.childCount; i++) {
            kids.push(t.getChild(i));
        }
        return kids;
    };
    /** Return a list of all ancestors of this node.  The first node of
     *  list is the root and the last is the parent of this node.
     *
     *  @since 4.5.1
     */
    Trees.getAncestors = function (t) {
        var ancestors = [];
        var p = t.parent;
        while (p) {
            ancestors.unshift(p); // insert at start
            p = p.parent;
        }
        return ancestors;
    };
    /** Return true if t is u's parent or a node on path to root from u.
     *  Use == not equals().
     *
     *  @since 4.5.1
     */
    Trees.isAncestorOf = function (t, u) {
        if (!t || !u || !t.parent)
            return false;
        var p = u.parent;
        while (p) {
            if (t === p)
                return true;
            p = p.parent;
        }
        return false;
    };
    Trees.findAllTokenNodes = function (t, ttype) {
        return Trees.findAllNodes(t, ttype, true);
    };
    Trees.findAllRuleNodes = function (t, ruleIndex) {
        return Trees.findAllNodes(t, ruleIndex, false);
    };
    Trees.findAllNodes = function (t, index, findTokens) {
        var nodes = [];
        Trees._findAllNodes(t, index, findTokens, nodes);
        return nodes;
    };
    Trees._findAllNodes = function (t, index, findTokens, nodes) {
        // check this node (the root) first
        if (findTokens && t instanceof TerminalNode) {
            if (t.symbol.type === index)
                nodes.push(t);
        }
        else if (!findTokens && t instanceof ParserRuleContext) {
            if (t.ruleIndex === index)
                nodes.push(t);
        }
        // check children
        for (var i = 0; i < t.childCount; i++) {
            Trees._findAllNodes(t.getChild(i), index, findTokens, nodes);
        }
    };
    /** Get all descendents; includes t itself.
     *
     * @since 4.5.1
     */
    Trees.getDescendants = function (t) {
        var nodes = [];
        function recurse(e) {
            nodes.push(e);
            var n = e.childCount;
            for (var i = 0; i < n; i++) {
                recurse(e.getChild(i));
            }
        }
        recurse(t);
        return nodes;
    };
    /** Find smallest subtree of t enclosing range startTokenIndex..stopTokenIndex
    *  inclusively using postorder traversal.  Recursive depth-first-search.
    *
    *  @since 4.5
    */
    Trees.getRootOfSubtreeEnclosingRegion = function (t, startTokenIndex, // inclusive
        stopTokenIndex // inclusive
    ) {
        var n = t.childCount;
        for (var i = 0; i < n; i++) {
            var child = t.getChild(i);
            var r = Trees.getRootOfSubtreeEnclosingRegion(child, startTokenIndex, stopTokenIndex);
            if (r)
                return r;
        }
        if (t instanceof ParserRuleContext) {
            var stopToken = t.stop;
            if (startTokenIndex >= t.start.tokenIndex && // is range fully contained in t?
                (stopToken == null || stopTokenIndex <= stopToken.tokenIndex)) {
                // note: r.stop==null likely implies that we bailed out of parser and there's nothing to the right
                return t;
            }
        }
        return undefined;
    };
    /** Replace any subtree siblings of root that are completely to left
    *  or right of lookahead range with a CommonToken(Token.INVALID_TYPE,"...")
    *  node. The source interval for t is not altered to suit smaller range!
    *
    *  WARNING: destructive to t.
    *
    *  @since 4.5.1
    */
    Trees.stripChildrenOutOfRange = function (t, root, startIndex, stopIndex) {
        if (!t)
            return;
        var count = t.childCount;
        for (var i = 0; i < count; i++) {
            var child = t.getChild(i);
            var range = child.sourceInterval;
            if (child instanceof ParserRuleContext && (range.b < startIndex || range.a > stopIndex)) {
                if (Trees.isAncestorOf(child, root)) {
                    var abbrev = new CommonToken(Token.INVALID_TYPE, "...");
                    t.children[i] = new TerminalNode(abbrev); // HACK access to private
                }
            }
        }
    };
    __decorate([
        __param(0, NotNull)
    ], Trees, "toStringTree", null);
    __decorate([
        NotNull,
        __param(0, NotNull)
    ], Trees, "getAncestors", null);
    __decorate([
        __param(0, NotNull)
    ], Trees, "getRootOfSubtreeEnclosingRegion", null);
    return Trees;
}());
export { Trees };
//# sourceMappingURL=Trees.js.map