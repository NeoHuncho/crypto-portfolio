"use strict";
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
var dataBinance_1 = require("../data/dataBinance");
var processTrades = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var checkKey, _loop_1, _a, _b, _i, key, state_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                checkKey = function (key) {
                    if (key === "XNO")
                        return "NANO";
                    if (key === "USDT" || key === "NANO")
                        return false;
                    else
                        return key;
                };
                _loop_1 = function (key) {
                    var tradeKey, trades, coinData_1, tradeIDs_1, priceDataBuy_1, priceDataSell_1, totalBought, totalSold, _d, valueSumSell, weightSumSell, _e, valueSumBuy, weightSumBuy, error_1;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                _f.trys.push([0, 3, , 4]);
                                tradeKey = checkKey(key);
                                if (!tradeKey) return [3 /*break*/, 2];
                                return [4 /*yield*/, (0, dataBinance_1.getAllOrders)(tradeKey)];
                            case 1:
                                trades = _f.sent();
                                coinData_1 = data["coins"][key];
                                if (!coinData_1)
                                    return [2 /*return*/, { value: void 0 }];
                                if (!data["meta"].tradeIDs[key])
                                    data["meta"].tradeIDs[key] = [];
                                tradeIDs_1 = data["meta"].tradeIDs[key];
                                priceDataBuy_1 = data["meta"].coinBuyBalance[key];
                                priceDataSell_1 = data["meta"].coinSellBalance[key];
                                totalBought = coinData_1.bought;
                                totalSold = coinData_1.sold;
                                if (!priceDataBuy_1)
                                    priceDataBuy_1 = [];
                                if (!priceDataSell_1)
                                    priceDataSell_1 = [];
                                if (!totalBought)
                                    coinData_1.bought = { cash: 0, amount: 0 };
                                if (!totalSold)
                                    coinData_1.sold = { cash: 0, amount: 0 };
                                trades.map(function (item) {
                                    if (!tradeIDs_1 || !priceDataBuy_1 || !priceDataSell_1)
                                        return;
                                    if (item.status === "FILLED" && !tradeIDs_1.includes(item.orderId)) {
                                        tradeIDs_1.push(item.orderId);
                                        var paidAmount = parseFloat(item.cummulativeQuoteQty);
                                        var coinAmount = parseFloat(item.executedQty);
                                        if (paidAmount !== 0 && coinAmount !== 0)
                                            if (item.side === "BUY") {
                                                coinData_1.bought.cash += paidAmount;
                                                coinData_1.bought.amount += coinAmount;
                                                priceDataBuy_1.push([paidAmount / coinAmount, coinAmount]);
                                            }
                                            else if (item.side === "SELL") {
                                                var avgQuantitySell_1 = coinAmount / priceDataBuy_1.length;
                                                var allPassed = false;
                                                while (!allPassed && priceDataBuy_1.length !== 0) {
                                                    var removeIndex = -1;
                                                    for (var index in priceDataBuy_1) {
                                                        var data_1 = priceDataBuy_1[index];
                                                        if (data_1)
                                                            if (data_1[1] < avgQuantitySell_1) {
                                                                removeIndex = parseInt(index);
                                                                break;
                                                            }
                                                    }
                                                    if (removeIndex !== -1) {
                                                        var itemToRemove = priceDataBuy_1[removeIndex];
                                                        if (itemToRemove) {
                                                            avgQuantitySell_1 =
                                                                (coinAmount - itemToRemove[1]) /
                                                                    (priceDataBuy_1.length - 1);
                                                            priceDataBuy_1.splice(removeIndex, 1);
                                                        }
                                                    }
                                                    else
                                                        allPassed = true;
                                                }
                                                priceDataBuy_1.map(function (item) {
                                                    item[1] -= avgQuantitySell_1;
                                                });
                                                coinData_1.sold.cash += paidAmount;
                                                coinData_1.sold.amount += coinAmount;
                                                priceDataSell_1.push([paidAmount / coinAmount, coinAmount]);
                                            }
                                    }
                                });
                                _d = priceDataSell_1.reduce(function (_a, _b) {
                                    var valueSum = _a[0], weightSum = _a[1];
                                    var value = _b[0], weight = _b[1];
                                    return [
                                        valueSum + value * weight,
                                        weightSum + weight,
                                    ];
                                }, [0, 0]), valueSumSell = _d[0], weightSumSell = _d[1];
                                _e = priceDataBuy_1.reduce(function (_a, _b) {
                                    var valueSum = _a[0], weightSum = _a[1];
                                    var value = _b[0], weight = _b[1];
                                    return [
                                        valueSum + value * weight,
                                        weightSum + weight,
                                    ];
                                }, [0, 0]), valueSumBuy = _e[0], weightSumBuy = _e[1];
                                coinData_1.avgBuyPrice = valueSumBuy / weightSumBuy;
                                coinData_1.allTimeSellPrice = valueSumSell / weightSumSell;
                                data["meta"].coinBuyBalance[key] = priceDataBuy_1;
                                data["meta"].coinSellBalance[key] = priceDataSell_1;
                                _f.label = 2;
                            case 2: return [3 /*break*/, 4];
                            case 3:
                                error_1 = _f.sent();
                                console.log("errors", "error in trades for " + key);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                };
                _a = [];
                for (_b in data["coins"])
                    _a.push(_b);
                _i = 0;
                _c.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 4];
                key = _a[_i];
                return [5 /*yield**/, _loop_1(key)];
            case 2:
                state_1 = _c.sent();
                if (typeof state_1 === "object")
                    return [2 /*return*/, state_1.value];
                _c.label = 3;
            case 3:
                _i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/, data];
        }
    });
}); };
exports["default"] = processTrades;
