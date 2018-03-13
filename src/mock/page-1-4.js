
module.exports = {
    data1: {
        data: [
            { name: "20~30岁", data: [55, 45, 55, 65, 33] },
            { name: "30~40岁", data: [48, 42, 41, 55, 52] },
            { name: "20~50岁", data: [69, 89, 32, 42, 45] },
            { name: "50~60岁", data: [23, 26, 65, 82, 56] },
        ],
        yAxis: ['2017', '2016', '2015', '2014', '2013'],
        boxTitle: [
            {
                name: "教师年龄多分布在：",
                num: "20岁~~30岁",
                name2: "占比",
                tb: "2%",
            },

        ],
        yName: "数量（人）",
        xName: "时间（年）",
    },
    data2:
    {
        name: "中青年教师比例",
        value: 50,
        change: "24%",
        icon: "/static/assets/icon-add.png"
    }


}
