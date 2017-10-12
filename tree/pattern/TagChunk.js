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
// ConvertTo-TS run at 2016-10-04T11:26:46.1670669-07:00
import { Chunk } from './Chunk';
import { NotNull, Override } from '../../Decorators';
/**
 * Represents a placeholder tag in a tree pattern. A tag can have any of the
 * following forms.
 *
 * <ul>
 * <li>{@code expr}: An unlabeled placeholder for a parser rule {@code expr}.</li>
 * <li>{@code ID}: An unlabeled placeholder for a token of type {@code ID}.</li>
 * <li>{@code e:expr}: A labeled placeholder for a parser rule {@code expr}.</li>
 * <li>{@code id:ID}: A labeled placeholder for a token of type {@code ID}.</li>
 * </ul>
 *
 * This class does not perform any validation on the tag or label names aside
 * from ensuring that the tag is a non-null, non-empty string.
 */
var TagChunk = /** @class */ (function (_super) {
    __extends(TagChunk, _super);
    /**
     * Construct a new instance of {@link TagChunk} using the specified label
     * and tag.
     *
     * @param label The label for the tag. If this is {@code null}, the
     * {@link TagChunk} represents an unlabeled tag.
     * @param tag The tag, which should be the name of a parser rule or token
     * type.
     *
     * @exception IllegalArgumentException if {@code tag} is {@code null} or
     * empty.
     */
    function TagChunk(tag, label) {
        var _this = _super.call(this) || this;
        if (tag == null || tag.length === 0) {
            throw new Error("tag cannot be null or empty");
        }
        _this._tag = tag;
        _this._label = label;
        return _this;
    }
    Object.defineProperty(TagChunk.prototype, "tag", {
        /**
         * Get the tag for this chunk.
         *
         * @return The tag for the chunk.
         */
        get: function () {
            return this._tag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagChunk.prototype, "label", {
        /**
         * Get the label, if any, assigned to this chunk.
         *
         * @return The label assigned to this chunk, or {@code null} if no label is
         * assigned to the chunk.
         */
        get: function () {
            return this._label;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * This method returns a text representation of the tag chunk. Labeled tags
     * are returned in the form {@code label:tag}, and unlabeled tags are
     * returned as just the tag name.
     */
    TagChunk.prototype.toString = function () {
        if (this._label != null) {
            return this._label + ":" + this._tag;
        }
        return this._tag;
    };
    __decorate([
        NotNull
    ], TagChunk.prototype, "tag", null);
    __decorate([
        Override
    ], TagChunk.prototype, "toString", null);
    return TagChunk;
}(Chunk));
export { TagChunk };
//# sourceMappingURL=TagChunk.js.map