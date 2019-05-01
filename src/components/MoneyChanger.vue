<template>
    <div>
        <header class="row sticky">
            <div class="col-sm-12 col-md-11 col-md-offset-1">
                <h2>
                    <a href="#">Rupiah Changer</a>
                </h2>
            </div>
        </header>
        <br>
        <div class="container">
            <br>
            <div class="row">
                <div class="col-sm-12 col-md-4 col-md-offset-1">
                    <fieldset id="parameters">
                        <legend>Parameters</legend>
                        <form autocomplete="off" @submit.prevent="calculate">
                            <div class="input-group fluid">
                                <label for="input-amount">
                                    <strong>Amount</strong>
                                </label>
                                <input id="input-amount" v-model="amount" placeholder="Enter rupiah amount to make"
                                    class="is-invalid">
                                <button class="small primary" type="submit">Run</button>
                            </div>
                        </form>
                        <div class="collapse">
                            <input type="checkbox" id="collapse-section1" checked aria-hidden="true">
                            <label for="collapse-section1" aria-hidden="true">
                                <strong>Denominations Available</strong>
                            </label>
                            <div>
                                <ol id="denominations">
                                    <li v-for="(denomination, index) in denominations.slice()" :key="'denom-'+index">
                                        <div class="input-group fluid">
                                            <input :value="'Rp'+denomination" readonly>
                                            <button class="small secondary" @click="removeDenom((index))">Del</button>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <form autocomplete="off" @submit.prevent="addDenom">
                            <div class="input-group fluid">
                                <label for="input-denomination">
                                    <strong>New Denom</strong>
                                </label>
                                <input id="input-denomination" v-model="newDenom"
                                    placeholder="Enter rupiah denomination">
                                <button class="small tertiary">Add</button>
                            </div>
                        </form>
                    </fieldset>
                </div>
                <div class="col-sm-12 col-md-6">
                    <fieldset id="result">
                        <legend>Result</legend>
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="input-group fluid">
                                    <label for="result-amount">
                                        <strong>Amount</strong>
                                    </label>
                                    <input id="result-amount" :value="result.amount" readonly>
                                </div>
                            </div>
                        </div>
                        <div class="input-group vertical">
                            <label for="denominations">
                                <strong>Denominations Used</strong>
                            </label>
                            <ul id="denominations-used">
                                <li v-for="denomination in Object.keys(result.used)" :key="'used-'+denomination">
                                    {{result.used[denomination]}}x
                                    <strong>{{denomination}}</strong>
                                </li>
                            </ul>
                        </div>
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="input-group fluid">
                                    <label for="result-total">
                                        <strong>Total</strong>
                                    </label>
                                    <input id="result-total" :value="result.total" readonly>
                                </div>
                            </div>
                            <div class="col-sm-6">
                                <div class="input-group fluid">
                                    <label for="result-remaining">
                                        <strong>Remaining</strong>
                                    </label>
                                    <input id="result-remaining" :value="result.remaining" readonly>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </div>
            </div>
            <br>
        </div>
        <footer>
            <div class="col-sm col-md-10 col-md-offset-1">
                <p>Copyright &copy; Ezar Enanda 2019</p>
            </div>
        </footer>
    </div>
</template>

<script>
    import {
        moneyChange
    } from "@/assets/js/moneyChange.js";
    import {
        validRupiah
    } from "@/assets/js/validRupiah.js";

    export default {
        data: function () {
            return {
                newDenom: null,
                amount: null,
                denominations: [
                    100000,
                    50000,
                    20000,
                    10000,
                    5000,
                    2000,
                    1000,
                    500,
                    100,
                    50
                ],
                result: {
                    amount: null,
                    used: {},
                    total: null,
                    remaining: null
                }
            };
        },
        watch: {
            amount: function () {
                var input = document.querySelector("#input-amount");
                input.setCustomValidity("");
            },
            newDenom: function () {
                var input = document.querySelector("#input-denomination");
                input.setCustomValidity("");
            }
        },
        methods: {
            calculate: function () {
                const validation = validRupiah(this.amount);
                var input = document.querySelector("#input-amount");
                if (!validation.isValid) {
                    input.setCustomValidity("Invalid rupiah format!");
                } else {
                    input.setCustomValidity("");
                    this.result = moneyChange(validation.value, this.denominations);
                    var resultEl = document.querySelector("#result");
                    resultEl.scrollIntoView();
                }
            },
            removeDenom: function (index) {
                this.denominations.splice(index, 1);
            },
            addDenom: function () {
                const validation = validRupiah(this.newDenom);
                var input = document.querySelector("#input-denomination");
                if (!validation.isValid) {
                    input.setCustomValidity("Invalid rupiah format!");
                } else {
                    input.setCustomValidity("");
                    this.denominations.push(validation.value);
                }
            }
        }
    };
</script>