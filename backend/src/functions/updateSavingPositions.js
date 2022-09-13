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
var updateSavingPositions = function (data, coinName, canBeStaked) { return __awaiter(void 0, void 0, void 0, function () {
    var coins, savingPositions, coin, products, product, remainingSavingsAmount_1, remainingSavingsAmount_2;
    var _a, _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                if (coinName === "USDT")
                    return [2 /*return*/];
                coins = data["coins"];
                savingPositions = (_a = data["binance"]) === null || _a === void 0 ? void 0 : _a.savingProducts;
                if (!savingPositions)
                    return [2 /*return*/];
                coin = coins[coinName];
                if (!coin)
                    return [2 /*return*/];
                products = savingPositions[coinName];
                if (!products)
                    return [2 /*return*/];
                product = products[0];
                if (!product) {
                    console.log("could not find saving product for" + coinName);
                    return [2 /*return*/];
                }
                if (!!canBeStaked) return [3 /*break*/, 4];
                remainingSavingsAmount_1 = null;
                (_b = data["binance"]) === null || _b === void 0 ? void 0 : _b.spotAccount.balances.map(function (balance) {
                    if (balance.asset === coinName)
                        remainingSavingsAmount_1 = parseFloat(balance.free);
                });
                if (!remainingSavingsAmount_1)
                    return [2 /*return*/];
                if (!(remainingSavingsAmount_1 < product.minPurchaseAmount)) return [3 /*break*/, 1];
                return [2 /*return*/];
            case 1: return [4 /*yield*/, (0, dataBinance_1.purchaseSaving)(product.productId, remainingSavingsAmount_1)];
            case 2:
                _d.sent();
                return [2 /*return*/];
            case 3: return [3 /*break*/, 10];
            case 4:
                remainingSavingsAmount_2 = 0;
                (_c = data["binance"]) === null || _c === void 0 ? void 0 : _c.spotAccount.balances.map(function (balance) {
                    if (balance.asset === coinName)
                        if (coin.remainingStakingAmount < 0)
                            remainingSavingsAmount_2 = parseFloat(balance.free);
                        else
                            remainingSavingsAmount_2 =
                                parseFloat(balance.free) - coin.remainingStakingAmount;
                });
                if (!remainingSavingsAmount_2)
                    return [2 /*return*/];
                if (!(remainingSavingsAmount_2 < 0)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, dataBinance_1.redeemSaving)(product.productId, Number(coin.remainingStakingAmount.toFixed(7)) * -1)];
            case 5:
                _d.sent();
                _d.label = 6;
            case 6:
                if (!(remainingSavingsAmount_2 < 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, dataBinance_1.redeemSaving)(product.productId, Number(coin.remainingStakingAmount.toFixed(7)))];
            case 7:
                _d.sent();
                _d.label = 8;
            case 8:
                if (remainingSavingsAmount_2 < product.minPurchaseAmount)
                    return [2 /*return*/];
                return [4 /*yield*/, (0, dataBinance_1.purchaseSaving)(product.productId, remainingSavingsAmount_2)];
            case 9:
                _d.sent();
                return [2 /*return*/];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports["default"] = updateSavingPositions;
