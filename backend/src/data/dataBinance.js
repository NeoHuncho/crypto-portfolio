"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.redeemSaving = exports.purchaseSaving = exports.getSavingPositions = exports.purchaseStaking = exports.getStakingPositions = exports.getAllOrders = exports.getAvgPrice = exports.getBinanceData = void 0;
var connector_1 = require("@binance/connector");
var moment_1 = require("moment");
var apiKey = process.env["BINANCE_API_KEY"];
var apiSecret = process.env["BINANCE_API_SECRET"];
var client = new connector_1.Spot(apiKey, apiSecret);
var date = (0, moment_1["default"])("2021-08-01");
var flattenAndFilter = function (data, ids) {
    if (!ids)
        return data;
    return [].concat.apply([], data).filter(function (item) {
        if (!item)
            return false;
        var id = item.positionId
            ? item.positionId
            : item.txId
                ? item.txId
                : item.operationId
                    ? item.operationId
                    : item.orderNo
                        ? item.orderNo
                        : item.id;
        if (ids.includes(id))
            return false;
        ids.push(id);
        return true;
    });
};
var getBinanceData = function (_a) {
    var passedFirstRun = _a.passedFirstRun;
    return __awaiter(void 0, void 0, void 0, function () {
        var makeRequest, data, requestSettings, requestsBeginEnd, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, index, savingData, index_1;
        var _10, _11;
        return __generator(this, function (_12) {
            switch (_12.label) {
                case 0:
                    makeRequest = function (name, params, setting1, setting2) { return __awaiter(void 0, void 0, void 0, function () {
                        var error_1, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 6, , 16]);
                                    if (!(setting1 !== "undefined" && !setting2)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, client[name](setting1, __assign({}, params))];
                                case 1: return [2 /*return*/, (_a.sent()).data];
                                case 2:
                                    if (!(setting1 && setting2)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, client[name](setting1, setting2, __assign({}, params))];
                                case 3: return [2 /*return*/, (_a.sent()).data];
                                case 4: return [4 /*yield*/, client[name](params)];
                                case 5: return [2 /*return*/, (_a.sent()).data];
                                case 6:
                                    error_1 = _a.sent();
                                    _a.label = 7;
                                case 7:
                                    _a.trys.push([7, 14, , 15]);
                                    console.log("errors", "error from binance- waiting");
                                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 60000); })];
                                case 8:
                                    _a.sent();
                                    if (!(setting1 === 0 && !setting2)) return [3 /*break*/, 10];
                                    return [4 /*yield*/, client[name](setting1, __assign({}, params))];
                                case 9: return [2 /*return*/, (_a.sent()).data];
                                case 10:
                                    if (!(setting1 && setting2)) return [3 /*break*/, 12];
                                    return [4 /*yield*/, client[name](setting1, setting2, __assign({}, params))];
                                case 11: return [2 /*return*/, (_a.sent()).data];
                                case 12: return [4 /*yield*/, client[name](params)];
                                case 13: return [2 /*return*/, (_a.sent()).data];
                                case 14:
                                    error_2 = _a.sent();
                                    console.log("errors", "error while making request ".concat(name, ", ").concat(params));
                                    return [2 /*return*/];
                                case 15: return [3 /*break*/, 16];
                                case 16: return [2 /*return*/];
                            }
                        });
                    }); };
                    data = {
                        stakingSubscriptionHistory: [],
                        stakingRedemptionHistory: [],
                        stakingInterestHistory: [],
                        depositHistory: [],
                        directHistory: [],
                        coinDepositHistory: [],
                        coinWithdrawalHistory: [],
                        liquidityHistory: [],
                        savingProducts: {},
                        IDs: {
                            subscriptionIDs: [],
                            redemptionIDs: [],
                            interestIDs: [],
                            depositIDs: [],
                            directIDs: [],
                            coinDepositIDs: [],
                            coinWithdrawalIDs: [],
                            liquidityIDs: []
                        },
                        spotAccount: null
                    };
                    if (!!passedFirstRun) return [3 /*break*/, 12];
                    _12.label = 1;
                case 1:
                    if (!((0, moment_1["default"])(date).add(89, "days") < (0, moment_1["default"])().add(4, "months"))) return [3 /*break*/, 11];
                    if (!((0, moment_1["default"])(date).unix() < (0, moment_1["default"])().unix())) return [3 /*break*/, 10];
                    requestSettings = (0, moment_1["default"])(date).add(89, "days").unix() < (0, moment_1["default"])().unix()
                        ? {
                            startTime: parseInt((0, moment_1["default"])(date).unix() + "000"),
                            endTime: parseInt((0, moment_1["default"])(date).add(89, "days").unix() + "000"),
                            size: 100
                        }
                        : {
                            startTime: parseInt((0, moment_1["default"])(date).unix() + "000"),
                            endTime: parseInt((0, moment_1["default"])().unix() + "000"),
                            size: 100
                        };
                    requestsBeginEnd = (0, moment_1["default"])(date).add(89, "days").unix() < (0, moment_1["default"])().unix()
                        ? {
                            beginTime: parseInt((0, moment_1["default"])(date).unix() + "000"),
                            endTime: parseInt((0, moment_1["default"])(date).add(89, "days").unix() + "000"),
                            size: 100
                        }
                        : {
                            beginTime: parseInt((0, moment_1["default"])(date).unix() + "000"),
                            endTime: parseInt((0, moment_1["default"])().unix() + "000"),
                            size: 100
                        };
                    _c = (_b = data.directHistory).push;
                    return [4 /*yield*/, makeRequest("paymentHistory", requestsBeginEnd, 0)];
                case 2:
                    _c.apply(_b, [(_10 = (_12.sent())) === null || _10 === void 0 ? void 0 : _10.data]);
                    _e = (_d = data.stakingSubscriptionHistory).push;
                    return [4 /*yield*/, makeRequest("stakingHistory", requestSettings, "STAKING", "SUBSCRIPTION")];
                case 3:
                    _e.apply(_d, [_12.sent()]);
                    _g = (_f = data.stakingRedemptionHistory).push;
                    return [4 /*yield*/, makeRequest("stakingHistory", requestSettings, "STAKING", "REDEMPTION")];
                case 4:
                    _g.apply(_f, [_12.sent()]);
                    _j = (_h = data.stakingInterestHistory).push;
                    return [4 /*yield*/, makeRequest("stakingHistory", requestSettings, "STAKING", "INTEREST")];
                case 5:
                    _j.apply(_h, [_12.sent()]);
                    _l = (_k = data.depositHistory).push;
                    return [4 /*yield*/, makeRequest("depositWithdrawalHistory", requestsBeginEnd, 0)];
                case 6:
                    _l.apply(_k, [(_11 = (_12.sent())) === null || _11 === void 0 ? void 0 : _11.data]);
                    _o = (_m = data.coinDepositHistory).push;
                    return [4 /*yield*/, makeRequest("depositHistory", requestSettings)];
                case 7:
                    _o.apply(_m, [_12.sent()]);
                    _q = (_p = data.coinWithdrawalHistory).push;
                    return [4 /*yield*/, makeRequest("withdrawHistory", requestSettings)];
                case 8:
                    _q.apply(_p, [_12.sent()]);
                    _s = (_r = data.liquidityHistory).push;
                    return [4 /*yield*/, makeRequest("bswapLiquidityOperationRecord", requestSettings)];
                case 9:
                    _s.apply(_r, [_12.sent()]);
                    _12.label = 10;
                case 10:
                    date.add(89, "days");
                    return [3 /*break*/, 1];
                case 11: return [3 /*break*/, 21];
                case 12:
                    _u = (_t = data.stakingSubscriptionHistory).push;
                    return [4 /*yield*/, client.stakingHistory("STAKING", "SUBSCRIPTION", { size: 100 })];
                case 13:
                    _u.apply(_t, [(_12.sent())
                            .data]);
                    _w = (_v = data.stakingRedemptionHistory).push;
                    return [4 /*yield*/, client.stakingHistory("STAKING", "REDEMPTION", { size: 100 })];
                case 14:
                    _w.apply(_v, [(_12.sent()).data]);
                    _y = (_x = data.stakingInterestHistory).push;
                    return [4 /*yield*/, client.stakingHistory("STAKING", "INTEREST", { size: 100 })];
                case 15:
                    _y.apply(_x, [(_12.sent()).data]);
                    _0 = (_z = data.depositHistory).push;
                    return [4 /*yield*/, client.depositWithdrawalHistory(0)];
                case 16:
                    _0.apply(_z, [(_12.sent()).data.data]);
                    _2 = (_1 = data.directHistory).push;
                    return [4 /*yield*/, client.paymentHistory(0)];
                case 17:
                    _2.apply(_1, [(_12.sent()).data.data]);
                    _4 = (_3 = data.coinDepositHistory).push;
                    return [4 /*yield*/, client.depositHistory(0)];
                case 18:
                    _4.apply(_3, [(_12.sent()).data]);
                    _6 = (_5 = data.coinWithdrawalHistory).push;
                    return [4 /*yield*/, client.withdrawHistory()];
                case 19:
                    _6.apply(_5, [(_12.sent()).data]);
                    _8 = (_7 = data.liquidityHistory).push;
                    return [4 /*yield*/, client.bswapLiquidityOperationRecord()];
                case 20:
                    _8.apply(_7, [(_12.sent()).data]);
                    _12.label = 21;
                case 21:
                    _9 = data;
                    return [4 /*yield*/, client.account()];
                case 22:
                    _9.spotAccount = (_12.sent()).data;
                    data.spotAccount.balances = data.spotAccount.balances.filter(function (item) { return parseFloat(item.free) > 0; });
                    index = 1;
                    _12.label = 23;
                case 23:
                    if (!true) return [3 /*break*/, 25];
                    return [4 /*yield*/, client.savingsFlexibleProducts({
                            status: "ALL",
                            featured: "ALL",
                            size: 10,
                            current: index
                        })];
                case 24:
                    savingData = (_12.sent()).data;
                    if (savingData.length === 0)
                        return [3 /*break*/, 25];
                    for (index_1 in savingData) {
                        data.savingProducts[savingData[index_1].asset]
                            ? data.savingProducts[savingData[index_1].asset].push(savingData[index_1])
                            : (data.savingProducts[savingData[index_1].asset] = [savingData[index_1]]);
                    }
                    index++;
                    return [3 /*break*/, 23];
                case 25:
                    data.stakingSubscriptionHistory = flattenAndFilter(data.stakingSubscriptionHistory, data.IDs["subscriptionIDs"]);
                    data.stakingRedemptionHistory = flattenAndFilter(data.stakingRedemptionHistory, data.IDs["redemptionIDs"]);
                    data.stakingInterestHistory = flattenAndFilter(data.stakingInterestHistory, data.IDs["interestIDs"]);
                    data.depositHistory = flattenAndFilter(data.depositHistory.filter(function (item) { return item; }), data.IDs["depositIDs"]);
                    data.directHistory = flattenAndFilter(data.directHistory, data.IDs["directIDs"]);
                    data.coinDepositHistory = flattenAndFilter(data.coinDepositHistory, data.IDs["coinDepositIDs"]);
                    data.coinWithdrawalHistory = flattenAndFilter(data.coinWithdrawalHistory, data.IDs["coinWithdrawalIDs"]);
                    data.liquidityHistory = flattenAndFilter(data.liquidityHistory, data.IDs["liquidityIDs"]);
                    return [2 /*return*/, data];
            }
        });
    });
};
exports.getBinanceData = getBinanceData;
var getAvgPrice = function (name) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.avgPrice(name)];
            case 1: return [2 /*return*/, (_a.sent()).data.price];
        }
    });
}); };
exports.getAvgPrice = getAvgPrice;
var getAllOrders = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.allOrders(key + "USDT")];
            case 1: return [2 /*return*/, (_a.sent()).data];
        }
    });
}); };
exports.getAllOrders = getAllOrders;
var getStakingPositions = function (key) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.stakingProductList("STAKING", { asset: key })];
            case 1: return [2 /*return*/, (_a.sent()).data];
        }
    });
}); };
exports.getStakingPositions = getStakingPositions;
var getSavingPositions = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client.savingsFlexibleProducts({
                    status: "ALL",
                    featured: "ALL",
                    size: 100
                })];
            case 1: return [2 /*return*/, (_a.sent()).data];
        }
    });
}); };
exports.getSavingPositions = getSavingPositions;
var purchaseStaking = function (type, product, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var res;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client
                    .stakingPurchaseProduct(type, product, amount)
                    .then(function (res) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("general", "".concat(product, " (staking) purchased for amount  ").concat(amount, "."));
                        return [2 /*return*/, res];
                    });
                }); })["catch"](function (err) {
                    console.log("error when purchasing staking: ".concat(product, " for amount ").concat(amount));
                    return err;
                })];
            case 1:
                res = _a.sent();
                return [2 /*return*/, res];
        }
    });
}); };
exports.purchaseStaking = purchaseStaking;
var purchaseSaving = function (productID, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client
                    .savingsPurchaseFlexibleProduct(productID, amount)
                    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("general", "".concat(productID, " (saving) purchased for amount  ").concat(amount, "."));
                        return [2 /*return*/];
                    });
                }); })["catch"](function () {
                    console.log("error when purchasing saving: ".concat(productID, " for amount ").concat(amount));
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.purchaseSaving = purchaseSaving;
var redeemSaving = function (productID, amount) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, client
                    .savingsFlexibleRedeem(productID, amount, "FAST")
                    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        console.log("general", "".concat(productID, "(saving) redeemed for amount of ").concat(amount, "."));
                        return [2 /*return*/];
                    });
                }); })["catch"](function () {
                    console.log("error when redeeming saving: ".concat(productID, " for amount ").concat(amount));
                })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.redeemSaving = redeemSaving;
