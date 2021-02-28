import { createStatementData } from './createStatementData.js'

const invoice = require('../test/invoice.json')
const plays = require('../test/plays.json')

function statement(invoice, plays) {
    return renderPlainText(createStatementData(invoice, plays));
}
function renderPlainText(data) {
    // print line for this order
    let result = `Satatement for ${data.customer}\n`;
    for (let perf of data.performances) {
        result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
    }
    result += `Amount owed is ${usd(data.totalAmount)}\n`
    result += `You earned ${data.totalVolumeCredits} credits \n`;



    
    console.log(result)
    return result;
}

function htmlStatement(invoice, plays) {
    const result = renderHtml(createStatementData(invoice, plays));
    
    //If rendered throws error:
    //TypeError: Cannot set propery 'innerHTML' of null
    //document.getElementById('render').innerHTML = result;
}

function renderHtml(data) {
    let result = `<h1>Statement for ${data.customer}</h1>\n`;
    result += "<table>\n";
    result += "<tr><th>play</th><th>seats</th><th>cost</th></tr>"
    for (let perf of data.performances) {
        result += `   <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
        result += `<td>${usd(perf.amount)}</td></tr>\n`;
    }
    result += "</table>\n";
    result += `<p>Amount owed is <em>${usd(data.totalAmount)}</em></p>\n`
    result += `<p>You earned <em>${data.totalVolumeCredits}</em> credits</p>`
    return result;
}
htmlStatement(invoice, plays);

function usd(aNumber) {
    return new Intl.NumberFormat("en-US",
        {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2
        }).format(aNumber / 100);
}
statement(invoice, plays);

module.exports = statement;

