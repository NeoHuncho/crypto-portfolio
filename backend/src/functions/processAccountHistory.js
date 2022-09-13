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
var moment_1 = require("moment");
var dataBinance_1 = require("../data/dataBinance");
var dataGecko_1 = require("../data/dataGecko");
var getCurrencySymbol_1 = require("../utils/getCurrencySymbol");
var xlsx_1 = require("xlsx");
var processAccountHistory = function (data, db) { return __awaiter(void 0, void 0, void 0, function () {
    var general, processDepositHistory, processDirectBuyHistory, processCoinWithdrawalHistory, processCoinDepositHistory, processCardPayments, buyWorkbook, buySheet, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                general = data["general"];
                processDepositHistory = function (depositHistory) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (!depositHistory || depositHistory.length === 0)
                            return [2 /*return*/];
                        depositHistory.map(function (item) {
                            if (item.status === "Successful" &&
                                !data["meta"].IDs.depositIDs.includes(item.orderNo)) {
                                data["meta"].IDs.depositIDs.push(item.orderNo);
                                data["meta"].depositHistory.push({
                                    fiatCurrency: item.fiatCurrency,
                                    amount: parseFloat(item.indicatedAmount),
                                    timeUnix: (0, moment_1["default"])(item.updateTime).unix(),
                                    totalValue: {
                                        valuePast: parseFloat(item.indicatedAmount),
                                        valuePresent: parseFloat(item.indicatedAmount)
                                    },
                                    id: item.orderNo
                                });
                                if (!data["general"].currency)
                                    data["general"].currency = item.fiatCurrency;
                                data["general"].currencySymbol = (0, getCurrencySymbol_1["default"])(general.currency);
                                data["general"].coinsData.spend += parseFloat(item.indicatedAmount);
                                data["general"].coinsData.taxes += parseFloat(item.totalFee);
                            }
                        });
                        return [2 /*return*/];
                    });
                }); };
                processDirectBuyHistory = function (directHistory) {
                    var usdtBuys = [];
                    if (!directHistory || directHistory[0] === undefined)
                        return;
                    directHistory.map(function (item) {
                        if (item.status === "Completed" &&
                            !data["meta"].IDs.directIDs.includes(item.orderNo)) {
                            data["meta"].IDs.directIDs.push(item.orderNo);
                            data["meta"].directHistory.push({
                                fiatCurrency: item.fiatCurrency,
                                amount: parseFloat(item.sourceAmount),
                                totalFee: parseFloat(item.totalFee),
                                timeUnix: (0, moment_1["default"])(item.updateTime).unix(),
                                id: item.orderNo,
                                cryptoCurrency: item.cryptoCurrency,
                                obtainAmount: parseFloat(item.obtainAmount)
                            });
                            if (!data["general"].currency)
                                data["general"].currency = item.fiatCurrency;
                            if (parseFloat(item.totalFee) / parseFloat(item.sourceAmount) >
                                0.0199) {
                                data["general"].coinsData.spend += parseFloat(item.sourceAmount);
                                data["general"].coinsData.taxes += parseFloat(item.totalFee);
                            }
                            else {
                                data["general"].coinsData.taxes += parseFloat(item.totalFee);
                            }
                            if (item.cryptoCurrency === "USDT")
                                usdtBuys.push([
                                    parseFloat(item.price),
                                    parseFloat(item.obtainAmount),
                                ]);
                        }
                    });
                    if (data["coins"]["USDT"]) {
                        var _a = usdtBuys.reduce(function (_a, _b) {
                            var valueSum = _a[0], weightSum = _a[1];
                            var value = _b[0], weight = _b[1];
                            return [
                                valueSum + value * weight,
                                weightSum + weight,
                            ];
                        }, [0, 0]), valueSumBuy = _a[0], weightSumBuy = _a[1];
                        data["coins"]["USDT"].avgBuyPrice = valueSumBuy / weightSumBuy;
                    }
                };
                processCoinWithdrawalHistory = function (coinWithdrawalHistory) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _i, index, item, coin, avgPrice, historicPrice;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                if (!coinWithdrawalHistory) return [3 /*break*/, 5];
                                _a = [];
                                for (_b in coinWithdrawalHistory)
                                    _a.push(_b);
                                _i = 0;
                                _c.label = 1;
                            case 1:
                                if (!(_i < _a.length)) return [3 /*break*/, 5];
                                index = _a[_i];
                                item = coinWithdrawalHistory[index];
                                if (!(item.confirmNo &&
                                    !data["meta"].IDs.coinWithdrawalIDs.includes(item.id))) return [3 /*break*/, 4];
                                data["meta"].IDs.coinWithdrawalIDs.push(item.id);
                                coin = data["coins"][item.coin];
                                if (!coin) return [3 /*break*/, 2];
                                avgPrice = coin.avgBuyPrice;
                                data["meta"].coinWithdrawalHistory.push({
                                    coin: item.coin,
                                    amount: parseFloat(item.amount),
                                    value: parseFloat(item.amount) * avgPrice,
                                    timeUnix: (0, moment_1["default"])(item.applyTime).unix(),
                                    id: item.id
                                });
                                data["general"].coinsData.taxes += parseFloat(item.transactionFee);
                                data["general"].coinsData.spend -=
                                    parseFloat(item.amount) * avgPrice;
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, (0, dataGecko_1.getHistoricPriceUSD)({
                                    db: db,
                                    coin: item.coin.toLowerCase(),
                                    inputDate: item.applyTime
                                })];
                            case 3:
                                historicPrice = _c.sent();
                                if (historicPrice) {
                                    data["meta"].coinWithdrawalHistory.push({
                                        coin: item.coin,
                                        amount: parseFloat(item.amount),
                                        value: parseFloat(item.amount) * historicPrice,
                                        timeUnix: (0, moment_1["default"])(item.applyTime).unix(),
                                        id: item.confirmNo
                                    });
                                    data["general"].coinsData.taxes +=
                                        parseFloat(item.transactionFee) * historicPrice;
                                    data["general"].coinsData.spend -=
                                        parseFloat(item.amount) * historicPrice;
                                }
                                else
                                    console.log("errors", "".concat(item.coin, " historic price not found"));
                                _c.label = 4;
                            case 4:
                                _i++;
                                return [3 /*break*/, 1];
                            case 5: return [2 /*return*/];
                        }
                    });
                }); };
                processCoinDepositHistory = function (coinDepositHistory) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a, _b, _i, index, item, historicPrice, valueData, _c, _d;
                    return __generator(this, function (_e) {
                        switch (_e.label) {
                            case 0:
                                if (!coinDepositHistory) return [3 /*break*/, 8];
                                _a = [];
                                for (_b in coinDepositHistory)
                                    _a.push(_b);
                                _i = 0;
                                _e.label = 1;
                            case 1:
                                if (!(_i < _a.length)) return [3 /*break*/, 8];
                                index = _a[_i];
                                item = coinDepositHistory[index];
                                if (!(item.confirmTimes &&
                                    !data.meta.IDs.coinDepositIDs.includes(item.txId))) return [3 /*break*/, 7];
                                data.meta.IDs.coinDepositIDs.push(item.txId);
                                return [4 /*yield*/, (0, dataGecko_1.getHistoricPriceUSD)({
                                        db: db,
                                        coin: item.coin.toLowerCase(),
                                        inputDate: item.insertTime
                                    })];
                            case 2:
                                historicPrice = _e.sent();
                                if (!historicPrice) return [3 /*break*/, 3];
                                data["general"].coinsData.spend +=
                                    parseFloat(item.amount) * historicPrice;
                                data["meta"].coinDepositHistory.push({
                                    coin: item.coin,
                                    amount: parseFloat(item.amount),
                                    value: parseFloat(item.amount) * historicPrice,
                                    timeUnix: (0, moment_1["default"])(item.insertTime).unix(),
                                    id: item.txId
                                });
                                return [3 /*break*/, 7];
                            case 3:
                                if (!!item.coin.includes("USD")) return [3 /*break*/, 5];
                                _d = parseFloat;
                                return [4 /*yield*/, (0, dataBinance_1.getAvgPrice)(item.coin.includes("LD")
                                        ? item.coin.substring(2) + "USDT"
                                        : item.coin + "USDT")];
                            case 4:
                                _c = _d.apply(void 0, [_e.sent()]);
                                return [3 /*break*/, 6];
                            case 5:
                                _c = 1;
                                _e.label = 6;
                            case 6:
                                valueData = _c;
                                data["general"].coinsData.spend +=
                                    parseFloat(item.amount) * valueData;
                                data["meta"].coinDepositHistory[item.txId] = {
                                    coin: item.coin,
                                    amount: parseFloat(item.amount),
                                    value: parseFloat(item.amount) * valueData,
                                    timeUnix: (0, moment_1["default"])(item.insertTime).unix(),
                                    id: item.txId
                                };
                                _e.label = 7;
                            case 7:
                                _i++;
                                return [3 /*break*/, 1];
                            case 8: return [2 /*return*/];
                        }
                    });
                }); };
                processCardPayments = function (items) {
                    items.map(function (item) {
                        if (item["Paid OUT (EUR)"] &&
                            !data["meta"].IDs.cardPaymentIDs.includes(item["Timestamp"])) {
                            data["meta"].IDs.cardPaymentIDs.push(item["Timestamp"]);
                            data["general"].coinsData.spend -= parseFloat(item["Paid OUT (EUR)"]);
                            data["meta"].cardPayments.push({
                                amount: parseFloat(item["Paid OUT (EUR)"]),
                                timeUnix: (0, moment_1["default"])(item["Timestamp"]).unix(),
                                id: item.Timestamp
                            });
                        }
                    });
                };
                if (!data.binance)
                    return [2 /*return*/];
                processDepositHistory(data.binance.depositHistory);
                processDirectBuyHistory(data.binance.directHistory);
                return [4 /*yield*/, processCoinWithdrawalHistory(data.binance.coinWithdrawalHistory)];
            case 1:
                _a.sent();
                return [4 /*yield*/, processCoinDepositHistory(data.binance.coinDepositHistory)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                buyWorkbook = xlsx_1["default"].readFile("imports/CardHistoryFinal.xlsx");
                buySheet = buyWorkbook.SheetNames;
                return [4 /*yield*/, processCardPayments(xlsx_1["default"].utils.sheet_to_json(buyWorkbook.Sheets[buySheet[0]]))];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log("errors", "cardHistory does not exist");
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/, data];
        }
    });
}); };
exports["default"] = processAccountHistory;
