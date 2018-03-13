module.exports = {
    data1: {
        boxTitle: [
            {
                name: "招生人数",
                num: "XX人",
                name2: "同比",
                per: "XX%"
            },
            {
                name: "男生",
                num: "XX人",
                name2: "同比",
                per: "XX%"
            },
            {
                name: "女生",
                num: "XX人",
                name2: "同比",
                per: "XX%"
            }
        ],
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
        evaluate: "个人评价\n{a|B}" //nonecessary
    },
    data2: {
        areaTitle: "近五年平均增长率：",
        boxTitle: [
            {
                name: "男生",
                num: "XX%"
            },
            {
                name: "男生",
                num: "XX%"
            },
            {
                name: "男生",
                num: "XX%"
            }
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



