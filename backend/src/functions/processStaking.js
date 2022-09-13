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
var moment_1 = require("moment");
var defaultValues_1 = require("../data/defaultValues");
var dates_1 = require("../utils/dates");
var processStaking = function (data) {
    var coins = data["coins"];
    var resetStaking = function () {
        Object.keys(coins).map(function (key) {
            var coinData = coins[key];
            if (coinData)
                coinData.staked.amount = 0;
        });
    };
    var sortSubscriptions = function (subscriptions) {
        subscriptions.map(function (item) {
            if (!item.positionId || !item.asset)
                return;
            if (data.meta.IDs.stakingIDs.includes(item.positionId))
                return;
            data.meta.IDs.stakingIDs.push(item.positionId);
            var metaData = data["meta"].stakingHistory[item.asset];
            var historyObj = {
                id: item.positionId,
                expiration: (0, moment_1["default"])(item.time).add(item.lockPeriod, "d").unix(),
                value: 0,
                amount: parseFloat(item.amount),
                lockPeriod: item.lockPeriod,
                date: item.time,
                interestData: {
                    dailyAmount: 0,
                    dailyValue: 0,
                    totalAmount: 0,
                    totalValue: 0
                }
            };
            if (metaData)
                metaData.push(__assign({}, historyObj));
            else
                data["meta"].stakingHistory[item.asset] = [
                    __assign({}, historyObj),
                ];
            if (!coins[item.asset])
                coins[item.asset] = new defaultValues_1.defaultCoin();
        });
    };
    var sortInterest = function (interest) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            interest.map(function (item) {
                var coin = coins[item.asset];
                if (!coin || !item.positionId)
                    return;
                if (data.meta.IDs.interestIDs.includes(item.positionId))
                    return;
                data.meta.IDs.interestIDs.push(item.positionId);
                var stakingHistory = data.meta.stakingHistory[item.asset];
                if (!stakingHistory)
                    return;
                stakingHistory.map(function (history) {
                    var totalAmount = parseFloat(item.amount) * history.lockPeriod;
                    if (history.id === item.positionId) {
                        history.interestData.dailyAmount = parseFloat(item.amount);
                        history.interestData.dailyValue = 0;
                        history.interestData.totalAmount = totalAmount;
                        history.interestData.totalValue = 0;
                        coin.dailyInterest.amount += parseFloat(item.amount);
                        coin.interest.amount += totalAmount;
                        return history;
                    }
                    else
                        return history;
                });
            });
            return [2 /*return*/];
        });
    }); };
    var sortRedemptions = function (redemptions) {
        redemptions.map(function (item) {
            var coin = coins[item.asset];
            if (!item.positionId)
                return;
            if (!coin || data.meta.IDs.redemptionIDs.includes(item.positionId))
                return;
            data.meta.IDs.redemptionIDs.push(item.positionId);
            var stakingHistory = data.meta.stakingHistory[item.asset];
            if (!stakingHistory)
                return;
            data.meta.stakingHistory[item.asset] = stakingHistory.map(function (history) {
                if (history.id === item.positionId) {
                    history.redemptionDate = item.time;
                    data.meta.toAddToInterestTotal.push([
                        item.asset,
                        history.interestData.totalAmount,
                    ]);
                    return history;
                }
                else
                    return history;
            });
        });
    };
    if (!data.binance)
        return;
    resetStaking();
    sortSubscriptions(data.binance.stakingSubscriptionHistory);
    sortInterest(data.binance.stakingInterestHistory);
    sortRedemptions(data.binance.stakingRedemptionHistory);
    Object.entries(data.meta.stakingHistory).map(function (_a) {
        var coin = _a[0], history = _a[1];
        history.map(function (historyElement) {
            var coinData = data.coins[coin];
            if (!coinData)
                return;
            if (!historyElement.redemptionDate) {
                coinData.staked.amount += historyElement.amount;
                var daysToExpiration = (0, dates_1.numDaysBetween)(historyElement.expiration, new Date());
                if (!coinData.daysToStaking.last)
                    coinData.daysToStaking.last = daysToExpiration;
                if (!coinData.daysToStaking.next)
                    coinData.daysToStaking.next = daysToExpiration;
                if (coinData.daysToStaking.last < daysToExpiration)
                    coinData.daysToStaking.last = daysToExpiration;
                if (coinData.daysToStaking.next > daysToExpiration)
                    coinData.daysToStaking.next = daysToExpiration;
            }
        });
    });
    return data;
};
exports["default"] = processStaking;
