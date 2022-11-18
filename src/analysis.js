const indicators = require("technicalindicators")
// import moment from "moment";

function get_EMA(formatted, period) {  
    const EMA = indicators.EMA;
    const vals = formatted.map((value) => value.y[3]);
    const data = EMA.calculate({ period: period, values: vals });
    var newData = [];
    for (let i = vals.length - data.length; i < vals.length; i++) {
        newData.push({
            x: formatted[i].x,
            y: data[data.length - vals.length + i],
        });
    }

    return { name: "EMA " + period, type: "line", data: newData };
}



function get_SMA(formatted, period) {  
    const SMA = indicators.SMA;
    const vals = formatted.map((value) => value.y[3]);
    const data = SMA.calculate({ period: period, values: vals });
    var newData = [];
    for (let i = vals.length - data.length; i < vals.length; i++) {
        newData.push({
            x: formatted[i].x,
            y: data[data.length - vals.length + i],
        });
    }

    return { name: "SMA " + period, type: "line", data: newData };
}



function get_BBands(formatted, period, std) {
    const BBands = indicators.BollingerBands;
    const vals = formatted.map((value) => value.y[3]);
    const data = BBands.calculate({ period: period, values: vals, stdDev: std });
    var upper = [];
    for (let i = vals.length - data.length; i < vals.length; i++) {
      upper.push({
        x: formatted[i].x,
        y: data[data.length - vals.length + i]['upper'],
      });
    }

    var lower = [];
    for (let i = vals.length - data.length; i < vals.length; i++) {
      lower.push({
        x: formatted[i].x,
        y: data[data.length - vals.length + i]['lower'],
      });
    }

    const lower_dict = { name: "Lower BBand " + period, type: "line", data: lower }
    const upper_dict = { name: "Upper BBand " + period, type: "line", data: upper }

    return {lower: lower_dict, upper: upper_dict}
}


export {
    get_EMA,
    get_SMA, 
    get_BBands,
}