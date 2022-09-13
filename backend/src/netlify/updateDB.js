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
exports.handler = void 0;
var initFireBase_1 = require("../initFireBase");
var dataDB_1 = require("../data/dataDB");
var dataBinance_1 = require("../data/dataBinance");
var checkUpdateCardHistory_1 = require("../functions/checkUpdateCardHistory");
var processTrades_1 = require("../functions/processTrades");
var processSpot_1 = require("../functions/processSpot");
var processAccountHistory_1 = require("../functions/processAccountHistory");
var updatePriceValues_1 = require("../functions/updatePriceValues");
var processStaking_1 = require("../functions/processStaking");
var object_sizeof_1 = require("object-sizeof");
var updateStakingPositions_1 = require("../functions/updateStakingPositions");
var moment_1 = require("moment");
var exchangeRatesUSDT = {};
var resetData = function (general) {
    if (general.coinsData.value) {
        general.coinsData.value = 0;
        general.coinsData.spotValue = 0;
        general.coinsData.spotValue = 0;
        general.coinsData.interestHistoryValue = 0;
    }
    return general;
};
var calculateSyncData = function (data) {
    for (var key in data["coins"]) {
        var coin = data["coins"][key];
        if (!coin)
            continue;
        if (!data["general"].coinsData.percentageToNotStake)
            continue;
        if (!coin.amountValue.amount)
            continue;
        if (coin.staked.amount) {
            coin.remainingStakingAmount =
                (coin.staked.amount + coin.spot.amount) *
                    (1 - data["general"].coinsData.percentageToNotStake / 100) -
                    coin.staked.amount;
        }
        else if (coin.spot.amount)
            coin.remainingStakingAmount =
                coin.spot.amount *
                    (1 - data["general"].coinsData.percentageToNotStake / 100);
    }
    return data["coins"];
};
var handler = function () { return __awaiter(void 0, void 0, void 0, function () {
    var test, _a, db, fireStore, data, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0:
                test = false;
                console.log("general", "--START--");
                return [4 /*yield*/, (0, initFireBase_1["default"])()];
            case 1:
                _a = _o.sent(), db = _a.db, fireStore = _a.fireStore;
                return [4 /*yield*/, (0, dataDB_1.getDBData)({ fireStore: fireStore, db: db, test: test })];
            case 2:
                data = _o.sent();
                _b = data;
                _c = "binance";
                return [4 /*yield*/, (0, dataBinance_1.getBinanceData)({
                        passedFirstRun: data["general"].passedFirstRun
                    })];
            case 3:
                _b[_c] = _o.sent();
                if (!data["general"].currency) return [3 /*break*/, 5];
                _d = exchangeRatesUSDT;
                _e = "currency";
                _f = parseFloat;
                return [4 /*yield*/, (0, dataBinance_1.getAvgPrice)(data["general"].currency + "USDT")];
            case 4:
                _d[_e] = _f.apply(void 0, [_o.sent()]);
                _o.label = 5;
            case 5:
                data["general"] = resetData(data["general"]);
                return [4 /*yield*/, (0, checkUpdateCardHistory_1["default"])()];
            case 6:
                _o.sent();
                _g = data;
                _h = "coins";
                return [4 /*yield*/, (0, processSpot_1["default"])(data)];
            case 7:
                _g[_h] = _o.sent();
                return [4 /*yield*/, (0, processTrades_1["default"])(data)];
            case 8:
                data = _o.sent();
                return [4 /*yield*/, (0, processAccountHistory_1["default"])(data, db)];
            case 9:
                data = _o.sent();
                return [4 /*yield*/, (0, processStaking_1["default"])(data)];
            case 10:
                data = _o.sent();
                return [4 /*yield*/, (0, updatePriceValues_1["default"])(data, exchangeRatesUSDT)];
            case 11:
                data = _o.sent();
                _j = data;
                return [4 /*yield*/, calculateSyncData(data)];
            case 12:
                _j.coins = _o.sent();
                _k = data;
                _l = "coins";
                if (!data["general"].passedFirstRun) return [3 /*break*/, 14];
                return [4 /*yield*/, (0, updateStakingPositions_1["default"])(data)];
            case 13:
                _m = _o.sent();
                return [3 /*break*/, 15];
            case 14:
                _m = data["coins"];
                _o.label = 15;
            case 15:
                _k[_l] = _m;
                if (!data["general"].passedFirstRun)
                    data["general"].passedFirstRun = true;
                data["general"].lastRunTime = (0, moment_1["default"])().unix();
                console.log("general", "size of Meta: ".concat((0, object_sizeof_1["default"])(data["meta"]), ", size Of general and coins: ").concat((0, object_sizeof_1["default"])(data["general"] + (0, object_sizeof_1["default"])(JSON.stringify(data["coins"]))), " "));
                return [4 /*yield*/, db.ref("users_meta/VafhUIU2Z4Mt1HoNQnNr11pEZ4z1").set(data["meta"])];
            case 16:
                _o.sent();
                return [4 /*yield*/, fireStore
                        .collection("users")
                        .doc("VafhUIU2Z4Mt1HoNQnNr11pEZ4z1")
                        .set({
                        general: __assign({}, data["general"]),
                        coins: JSON.stringify(data["coins"])
                    })
                        .then(function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            console.log("general", "--END--");
                            return [2 /*return*/, {
                                    statusCode: 200,
                                    body: JSON.stringify({ message: "Hello World" })
                                }];
                        });
                    }); })];
            case 17:
                _o.sent();
                return [2 /*return*/, {
                        statusCode: 200,
                        body: JSON.stringify({ message: "Hello World" })
                    }];
        }
    });
}); };
exports.handler = handler;
