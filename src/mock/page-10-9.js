module.exports = {
    data1: {
        legend: {
            data: ['提前招生', '对口单招', "中职转段升学", "高考"]
        },
        lineSeries: [],
        barSeries: [
            {
                name: "提前招生",
                data: [5, 20, 18, 30, 30, 40, 20, 45, 35, 22, 11, 23]
            },
            {
                name: "对口单招",
                data: [5, 20, 18, 30, 30, 20, 23, 40, 35, 12, 33, 12]
            },
            {
                name: "中职转段升学",
                data: [5, 20, 18, 30, 30, 22, 36, 54, 32, 12, 33, 11]
            },
            {
                name: "高考",
                data: [5, 20, 18, 30, 30, 22, 36, 54, 32, 12, 33, 11]
            },

        ],
        time: ["南京", "无锡", "徐州", "常州", "苏州", "南通", "连云港", "淮安", "盐城", "扬州", "镇江", "泰州"],
        yName: "数量（人）",
        xName: "时间（年）",
        all:"fir"
    }
}