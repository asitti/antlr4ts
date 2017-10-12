/*!
 * Copyright 2016 The ANTLR Project. All rights reserved.
 * Licensed under the BSD-3-Clause license. See LICENSE file in the project root for license information.
 */
var ConsoleErrorListener = /** @class */ (function () {
    function ConsoleErrorListener() {
    }
    /**
     * {@inheritDoc}
     *
     * <p>
     * This implementation prints messages to {@link System#err} containing the
     * values of {@code line}, {@code charPositionInLine}, and {@code msg} using
     * the following format.</p>
     *
     * <pre>
     * line <em>line</em>:<em>charPositionInLine</em> <em>msg</em>
     * </pre>
     */
    ConsoleErrorListener.prototype.syntaxError = function (recognizer, offendingSymbol, line, charPositionInLine, msg, e) {
        console.error("line " + line + ":" + charPositionInLine + " " + msg);
    };
    /**
     * Provides a default instance of {@link ConsoleErrorListener}.
     */
    ConsoleErrorListener.INSTANCE = new ConsoleErrorListener();
    return ConsoleErrorListener;
}());
export { ConsoleErrorListener };
//# sourceMappingURL=ConsoleErrorListener.js.map