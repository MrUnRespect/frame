module.exports = {
    data1: {
        xAxis: ['2017', '2016', '2015', '2014', '2013'],
        barData: [
            {
                name: '男',
                value: [17, 22, 41, 55, 52]
            },
            {
                name: '女',
                value: [69, 89, 32, 42, 45]
            },
        ],
        lineData: {
            name: '综合成长指数',
            value: [200, 250, 310, 350, 290]
        }
        ,
        xName: "时间（年）",
        yName: "人数（人）1"
    },
    data2: {
        areaTitle: "近五年平均增长率：",
        boxTitle: [
            {
                name: "重点专业总数 ",
                num: "XX% ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png",
                name3: "近五年平均增长率",
                tb: "XX%"
            },
            {
                name: "国家级重点专业 ",
                num: "XX% ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png",
                name3: "近五年平均增长率",
                tb: "XX%"
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



