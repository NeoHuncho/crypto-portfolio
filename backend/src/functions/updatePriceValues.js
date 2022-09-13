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
var updatePriceValues = function (data, exchangeRatesUSDT) { return __awaiter(void 0, void 0, void 0, function () {
    var _loop_1, _a, _b, _i, key, state_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                //get values of positions
                if (!exchangeRatesUSDT["currency"])
                    return [2 /*return*/];
                _loop_1 = function (key) {
                    var coin, value_1, _d, _e, reverseExchangeRate, removeIndex_1, error_1;
                    return __generator(this, function (_f) {
                        switch (_f.label) {
                            case 0:
                                coin = data["coins"][key];
                                if (!coin)
                                    return [2 /*return*/, { value: void 0 }];
                                _f.label = 1;
                            case 1:
                                _f.trys.push([1, 5, , 6]);
                                if (!!key.includes("USD")) return [3 /*break*/, 3];
                                _e = parseFloat;
                                return [4 /*yield*/, (0, dataBinance_1.getAvgPrice)(key.substring(0, 2) === "LD"
                                        ? key.substring(2) + "USDT"
                                        : key + "USDT")];
                            case 2:
                                _d = _e.apply(void 0, [_f.sent()]) / exchangeRatesUSDT["currency"];
                                return [3 /*break*/, 4];
                            case 3:
                                _d = 1;
                                _f.label = 4;
                            case 4:
                                value_1 = _d;
                                reverseExchangeRate = 1 / exchangeRatesUSDT["currency"];
                                coin.currentCoinValue = value_1;
                                coin.amountValue.value =
                                    ((coin.staked.amount || 0) + (coin.staked.amount || 0)) * value_1;
                                coin.spot.value = coin.spot.amount * value_1;
                                if (coin.avgBuyPrice)
                                    coin.currentValueDiff = -((1 - coin.currentCoinValue / coin.avgBuyPrice) *
                                        100).toFixed(2);
                                if (coin.bought && coin.sold) {
                                    coin.bought.cash = coin.bought.cash * reverseExchangeRate;
                                    coin.sold.cash = coin.sold.cash * reverseExchangeRate;
                                    coin.spent = coin.bought.cash - coin.sold.cash;
                                    coin.currentProfitLoss = coin.amountValue.value - coin.spent;
                                }
                                coin.staked.value = coin.staked.amount * value_1;
                                coin.amountValue.amount = coin.spot.amount + coin.staked.amount;
                                coin.amountValue.value = coin.spot.value + coin.staked.value;
                                data["general"].coinsData.value += coin.amountValue.value;
                                data["general"].coinsData.spotValue += coin.spot.value;
                                coin.interest.value = coin.interest.amount * value_1;
                                data["general"].coinsData.stakedValue += coin.staked.value;
                                coin.dailyInterest.value = coin.dailyInterest.amount * value_1;
                                removeIndex_1 = [];
                                data.meta.toAddToInterestTotal.map(function (item, index) {
                                    if (item[0] === key) {
                                        data.general.coinsData.interestHistoryValue += item[1] * value_1;
                                        removeIndex_1.push(index);
                                    }
                                    return item;
                                });
                                return [3 /*break*/, 6];
                            case 5:
                                error_1 = _f.sent();
                                console.log("errors", "error in updatePriceValues for " + coin);
                                return [3 /*break*/, 6];
                            case 6: return [2 /*return*/];
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
exports["default"] = updatePriceValues;
