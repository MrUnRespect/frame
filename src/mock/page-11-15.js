module.exports = {
    data1: {
        data: [
            {
                value: 56,
                name: "专业1"
            },
            {
                value: 89,
                name: "专业2"
            },
            {
                value: 115,
                name: "专业3"
            },
            {
                value: 128,
                name: "专业4"
            }
        ],
        evaluate: ""
    },
    data2: {
        areaTitle: "近五年平均增长量",
        boxTitle: [
            {
                name: "就业类型",
                num: "XX% ",
                name2: "就业类型2",
                per: "XX%"
            },
            {
                name: "就业类型",
                num: "XX% ",
                name2: "就业类型2",
                per: "XX%"
            }
        ],
        legend: {
            data: ["初级就业率", "初次协议就业率"]
        },
        xAxis: ['一1', '二', '三', '四', '五', '六', '七', '八', '九', "学院10", "学院11", "学院12"],
        xName: "学院",
        yName: "比例（%）",
        series: [
            {
                name: "初级就业率",
                data: [1, 3, 5.5, 27, 81, 47, 41, 22, 33, 14, 25, 36]
            },
            {
                name: "初次协议就业率",
                data: [2, 7, 4.5, 20, 87, 30, 21, 27, 13, 44, 25, 16]
            },
        ]

    },
}