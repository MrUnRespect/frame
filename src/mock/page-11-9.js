module.exports = {
    data1: {
        aver: true,
        xAxis: ['一', '二', '三', '四', '五', '六', '七', '八', '九', "学院10", "学院11", "学院12"],
        xName: "学院",
        yName: "比例（%）",
        series: [
            {
                name: "各学院",
                data: [1, 3, 5.5, 27, 81, 47, 41, 22, 33, 14, 25, 36]
            },
        ]
    },
    data2: {
        boxTitle: [
            {
                name: "专业X对口度",
                num: "XX%",
                name2: "较去年",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "近五年专业对口度平均增长量",
                num: "XX%"
            }
        ],
        time: ["2013", "2014", "2015", "2016", "2017"],
        data: ["123", "115", "121", "122", "136"],
        yName: "数量（人）",
        xName: "时间（年）",
    }
}