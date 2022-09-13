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
var defaultValues_1 = require("../data/defaultValues");
var processSpot = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var coins, checkBlackListedCoins, resetSpot;
    return __generator(this, function (_a) {
        coins = data["coins"];
        checkBlackListedCoins = function (coin) {
            if (coin.includes("NANO"))
                return true;
            return false;
        };
        resetSpot = function (coins) {
            Object.keys(coins).map(function (key) {
                var coinData = coins[key];
                if (coinData)
                    coinData.spot.amount = 0;
            });
        };
        resetSpot(coins);
        if (!data.binance)
            return [2 /*return*/];
        data.binance.spotAccount.balances.map(function (item) {
            var totalAmount = parseFloat(item.free);
            if (totalAmount && !checkBlackListedCoins(item.asset)) {
                var coinName = item.asset.substring(0, 2) === "LD"
                    ? item.asset.substring(2)
                    : item.asset;
                if (!coinName)
                    return;
                var coinData = coins[coinName];
                if (coinData)
                    coinData.spot.amount += totalAmount;
                else {
                    coins[coinName] = new defaultValues_1.defaultCoin();
                    var coinData_1 = coins[coinName];
                    if (coinData_1)
                        coinData_1.spot.amount = totalAmount;
                }
            }
        });
        return [2 /*return*/, coins];
    });
}); };
exports["default"] = processSpot;
