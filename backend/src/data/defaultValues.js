"use strict";
exports.__esModule = true;
exports.defaultData = exports.defaultCoin = void 0;
var AmountValue = /** @class */ (function () {
    function AmountValue() {
        this.amount = 0;
        this.value = 0;
    }
    return AmountValue;
}());
var daysTo = /** @class */ (function () {
    function daysTo() {
        this.last = 0;
        this.next = 0;
    }
    return daysTo;
}());
var defaultCoin = /** @class */ (function () {
    function defaultCoin() {
        this.allTimeSellPrice = 0;
        this.avgBuyPrice = 0;
        this.currentCoinValue = 0;
        this.currentProfitLoss = 0;
        this.currentValueDiff = 0;
        this.daysToStaking = new daysTo();
        this.remainingStakingAmount = 0;
        this.amountValue = new AmountValue();
        this.bought = { amount: 0, cash: 0 };
        this.sold = { amount: 0, cash: 0 };
        this.spent = 0;
        this.spot = new AmountValue();
        this.staked = new AmountValue();
        this.stakedInterestAccumulated = new AmountValue();
        this.interest = new AmountValue();
        this.dailyInterest = new AmountValue();
    }
    return defaultCoin;
}());
exports.defaultCoin = defaultCoin;
var defaultData = {
    meta: {
        toAddToInterestTotal: [],
        coinBuyBalance: {},
        coinSellBalance: {},
        coinDepositHistory: [],
        coinWithdrawalHistory: [],
        depositHistory: [],
        tradeIDs: {},
        stakingHistory: {},
        directHistory: [],
        cardPayments: [],
        liquidityHistory: [],
        IDs: {
            stakingIDs: [],
            redemptionIDs: [],
            interestIDs: [],
            depositIDs: [],
            directIDs: [],
            coinDepositIDs: [],
            coinWithdrawalIDs: [],
            liquidityIDs: [],
            cardPaymentIDs: []
        }
    },
    general: {
        coinsData: {
            spend: 0,
            taxes: 0,
            interestHistoryValue: 0,
            spotValue: 0,
            stakedValue: 0,
            percentageToNotStake: 25,
            value: 0
        },
        currency: "EUR",
        passedFirstRun: false,
        currencySymbol: "€"
    },
    coins: {}
};
exports.defaultData = defaultData;
