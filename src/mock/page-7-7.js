module.exports = {
    data1: {
        boxTitle: [
            {
                name: "教室数 ",
                num: "XX间 ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "多媒体教室数 ",
                num: "XX间 ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
        ],
        data: [
            {
                value: 56,
                name: "多媒体教室数"
            },
            {
                value: 89,
                name: "其他教室数"
            },
        ],
    },
    data2: {
        areaTitle: "近五年平均增长率",
        boxTitle: [
            {
                name: "教室数 ",
                num: "XX%",

            },
            {
                name: "多媒体教室数 ",
                num: "XX%",
            },
        ],
        xAxis: ["2013", "2014", "2015", "2016", "2017"],
        data: [
            [2.5, 1.5, 1.7, 3, 0.8],
            [0.5, 2.5, 3, 2.4, 1.8],

        ],
        yName: "数量（人）",
        xName: "时间（年）",
        seriesName: ["占地面积", "建筑面积"]
    }

}



