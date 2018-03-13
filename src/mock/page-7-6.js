module.exports = {
    data1: {
        boxTitle: [
            {
                name: "占地面积 ",
                num: "XX万㎡ ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "生均占地面积 ",
                num: "XX万㎡/人 ",
            },
            {
                name: "占地面积 ",
                num: "XX万㎡ ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
            {
                name: "生均校舍建筑面积  ",
                num: "XX万㎡/人 ",
            }
        ],
        data: [
            {
                value: 56,
                name: "建筑面积"
            },
            {
                value: 89,
                name: "其他用地面积"
            },
        ],
    },
    data2: {
        boxTitle: [
            {
                name: "教学科研及辅助用房 ",
                num: "XX万㎡ ",
                name2: "同比",
                per: "XX%",
                icon: "/static/assets/icon-add.png"
            },
        ],
        data: [
            {
                value: 56,
                name: "建筑面积"
            },
            {
                value: 89,
                name: "其他用地面积"
            },
            {
                value: 89,
                name: "其他用地面积1"
            },
            {
                value: 89,
                name: "其他用地面积2"
            },
        ],
    },
    data3: {
        areaTitle: "近五年平均增长率：",
        boxTitle: [
            {
                name: "占地面积 ",
                num: "XX% ",
                name2: "建筑面积",
                per: "XX%",
            },
        ],
        xAxis: ["2013", "2014", "2015", "2016", "2017"],
        data: [
            [2.5, 1.5, 1.7, 3, 0.8],
            [0.5, 2.5, 3, 2.4, 1.8],

        ],
        yName: "面积（万平方米）",
        xName: "时间（年）",
        seriesName:["占地面积","建筑面积"]
    }
}



