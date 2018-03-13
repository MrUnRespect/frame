module.exports = {
    data1: {
        boxTitle: [
            {
                name: "国家级",
                num: "XX人",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "国家级",
                num: "XX人",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "省级",
                num: "XX人",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            }
        ]
    },
    data2: {
        legend: {
            data: ['国家级重点专业1', '省级重点专业', "平均温度1"]
        },
        lineSeries: [
            {
                name: "平均温度1",
                data: [16, 20, 30, 35, 40],
            }
        ],
        barSeries: [
            {
                name: "国家级重点专业1",
                data: [5, 20, 18, 30, 30]
            },
            {
                name: "省级重点专业",
                data: [5, 20, 18, 30, 30]
            },

        ],
        time: ["2013", "2014", "2015", "2016", "2017"],
        yName: "数量（人）",
        xName: "时间（年）",
        all:"all"
    }
}