"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var _a = winston_1.default.format, combine = _a.combine, timestamp = _a.timestamp, printf = _a.printf, colorize = _a.colorize, align = _a.align;
var logger = winston_1.default.createLogger({
    level: 'info',
    format: combine(colorize({ all: true }), timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
    }), align(), printf(function (info) { return "[".concat(info.timestamp, "] ").concat(info.level, ": ").concat(info.message); })),
    transports: [new winston_1.default.transports.Console()],
});
exports.default = logger;
