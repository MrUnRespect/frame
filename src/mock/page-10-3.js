module.exports = {
    data1: {
        legend: {
            data: ['国家级重点专业', '省级重点专业', "校级重点专业"]
        },
        lineSeries: [],
        barSeries: [
            {
                name: "国家级重点专业",
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
        all: "all"
    },
    data2: {
        boxTitle: [
            {
                name: "各学院招生人数",
                num: "XX人",
                name2: "同比",
                per2: "XX% ",
                icon: "/static/assets/icon-reduce.png"
            },
            {
                name: "近五年平均增长率",
                num: "XX% "
            }
        ],
        time: ["2013", "2014", "2015", "2016", "2017"],
        data: ["100", "115", "121", "122", "136"],
        yName: "数量（人）",
        xName: "时间（年）",
    }
}



