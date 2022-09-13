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
var updateSavingPositions_1 = require("./updateSavingPositions");
var updateStakingPositions = function (data) { return __awaiter(void 0, void 0, void 0, function () {
    var coins, _a, _b, _i, key, coin, stakingPositions, _c, _d, _e, index, quota, minimum, stakingAmount, res;
    var _f;
    return __generator(this, function (_g) {
        switch (_g.label) {
            case 0:
                coins = data["coins"];
                _a = [];
                for (_b in coins)
                    _a.push(_b);
                _i = 0;
                _g.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 8];
                key = _a[_i];
                if (!coins[key])
                    return [3 /*break*/, 7];
                coin = coins[key];
                if (!coin)
                    return [3 /*break*/, 7];
                return [4 /*yield*/, (0, dataBinance_1.getStakingPositions)(key)];
            case 2:
                stakingPositions = _g.sent();
                return [4 /*yield*/, (0, updateSavingPositions_1["default"])(data, key, stakingPositions.length)];
            case 3:
                _g.sent();
                if (coin.remainingStakingAmount <= 0)
                    return [3 /*break*/, 7];
                if (stakingPositions.length === 0) {
                    coin.canBeStaked = false;
                    return [3 /*break*/, 7];
                }
                _c = [];
                for (_d in stakingPositions)
                    _c.push(_d);
                _e = 0;
                _g.label = 4;
            case 4:
                if (!(_e < _c.length)) return [3 /*break*/, 7];
                index = _c[_e];
                quota = stakingPositions[index].quota.totalPersonalQuota;
                minimum = stakingPositions[index].quota.minimum;
                if (!quota || !minimum)
                    return [3 /*break*/, 6];
                quota = parseFloat(quota);
                minimum = parseFloat(minimum);
                if (minimum > coin.remainingStakingAmount)
                    return [3 /*break*/, 6];
                stakingAmount = coin.remainingStakingAmount < quota
                    ? Number(coin.remainingStakingAmount.toFixed(7))
                    : quota;
                return [4 /*yield*/, (0, dataBinance_1.purchaseStaking)("STAKING", stakingPositions[index].projectId, stakingAmount)];
            case 5:
                res = _g.sent();
                if (!res)
                    return [3 /*break*/, 6];
                if ((res === null || res === void 0 ? void 0 : res.name) === "Error")
                    return [3 /*break*/, 6];
                console.log(res);
                if (!((_f = res.data) === null || _f === void 0 ? void 0 : _f.success))
                    return [3 /*break*/, 6];
                coin.remainingStakingAmount = coin.remainingStakingAmount - stakingAmount;
                _g.label = 6;
            case 6:
                _e++;
                return [3 /*break*/, 4];
            case 7:
                _i++;
                return [3 /*break*/, 1];
            case 8: return [2 /*return*/, coins];
        }
    });
}); };
exports["default"] = updateStakingPositions;
