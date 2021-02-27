import { createStatementData } from './createStatementData.js'

const invoice = require('../test/invoice.json')
const plays = require('../test/plays.json')

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
    function renderPlainText(data) {
        // print line for this order
        let result = `Satatement for ${data.customer}\n`;
        for (let perf of data.performances) {
            result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
        }
        result += `Amount owed is ${usd(data.totalAmount)}\n`
        result += `You earned ${data.totalVolumeCredits} credits \n`;

        function usd(aNumber) {
            return new Intl.NumberFormat("en-US",
                {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 2
                }).format(aNumber / 100);
        }

        console.log(result)
        return result;
    }

}
statement(invoice, plays);

module.exports = statement;

