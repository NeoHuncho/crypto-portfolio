"use strict";
exports.__esModule = true;
exports.numDaysBetween = void 0;
var numDaysBetween = function (d1, d2) {
    return Math.ceil(Math.abs(d1 - d2.getTime() / 1000) / (60 * 60 * 24));
};
exports.numDaysBetween = numDaysBetween;
