module.exports = {
    data1: {
        boxTitle: [
            {
                name: "男生",
                num: "XX人",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "男生",
                num: "XX人",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "男生",
                num: "XX人",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            }
        ],
        data: [
            { name: "男", data: [55, 45, 55] },
            { name: "女", data: [48, 42, 41] },

        ],
        yAxis: ['一年级', '二年级', '三年级'],
        yName: "数量（人）",
        xName: "时间（年）",
    },
    data2: {
        areaTitle: "近五年平均增长率：",
        boxTitle: [
            {
                name: "男生",
                num: "XX%",
            },
            {
                name: "女生",
                num: "XX%",
            },
            {
                name: "总数",
                num: "XX%",
            }
        ],
        xAxis: ["2013", "2014", "2015", "2016", "2017"],
        data: [
            [2.5, 1.5, 1.7, 3, 0.8],
            [0.5, 2.5, 3, 2.4, 1.8],
            [0.9, 3.5, 4, 5.4, 6.8],

        ],
        yName: "数量（人）",
        xName: "时间（年）",
        seriesName: ["占地面积", "建筑面积","总数"]
    }

}

