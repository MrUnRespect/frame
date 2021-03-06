module.exports = {
    data1: {
        boxTitle: [
            {
                name: "国家级重点专业 ",
                num: "XX个 ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "省级重点专业 ",
                num: "XX个 ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "校级重点专业 ",
                num: "XX个 ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            }
        ],
        data: [
            {
                value: 56,
                name: "国家级重点专业1"
            },
            {
                value: 89,
                name: "国家级重点专业2"
            },
            {
                value: 115,
                name: "国家级重点专业3"
            },
            {
                value: 128,
                name: "国家级重点专业4"
            }
        ],
    },
    data2: {
        areaTitle: "近五年平均增长率：",
        boxTitle: [
            {
                name: "重点专业总数 ",
                num: "XX% ",
            },
            {
                name: "国家级重点专业 ",
                num: "XX% ",
            },
            {
                name: "校级重点专业 ",
                num: "XX% ",
            },
            {
                name: "省级重点专业 ",
                num: "XX% ",
            }
        ],
        legend: {
            data: ['国家级重点专业1', '省级重点专业', "校级重点专业", "平均温度1"]
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
            {
                name: "校级重点专业",
                data: [5, 20, 18, 30, 30]
            },

        ],
        time: ["2013", "2014", "2015", "2016", "2017"],
        yName: "数量（人）",
        xName: "时间（年）",
    }
}



