
module.exports = {
    data1: {
        data: [
            {
                value: 56,
                name: "＞20年"
            },
            {
                value: 89,
                name: "10-20年"
            },
            {
                value: 115,
                name: "5-10年"
            },
            {
                value: 128,
                name: "＜5年"
            },
        ],
        t: ["{f|全院}", "个人评1价\n{a|A}"],
    },
    data2: {
        data: [
            {
                value: 56,
                name: "博士"
            },
            {
                value: 89,
                name: "硕士"
            },
            {
                value: 115,
                name: "本科"
            },
            {
                value: 128,
                name: "专科"
            },
        ],
        t: ["{f|全院}", "个人评2价\n{a|A}"],
    },
    data3: {
        data: [
            {
                value: 56,
                name: "正高"
            },
            {
                value: 89,
                name: "副高"
            },
            {
                value: 115,
                name: "中级"
            },
            {
                value: 128,
                name: "初级"
            },
        ],
        t: ["{f|全院}", "个人评3价\n{a|A}"],
    },
    data4: {
        title: ["指标", "个人评价", "相比去年", "全院该等级以上教师人数"],
        table: [
            {
                zb: "培训进修",
                evalute: "A",
                tb: "/static/assets/icon-reduce.png",
                num: 56
            },
            {
                zb: "实践锻炼",
                evalute: "A",
                tb: "/static/assets/icon-middle.png",
                num: 56
            },
            {
                zb: "海外研修   ",
                evalute: "A",
                tb: "/static/assets/icon-add.png",
                num: 56
            },
            {
                zb: "综合获奖",
                evalute: "A",
                tb: "/static/assets/icon-add.png",
                num: 56
            },
            {
                zb: "专业建设",
                evalute: "A",
                tb: "/static/assets/icon-add.png",
                num: 56
            },

        ],
    },
    data5: {
        areaTitle: "个人成长能力评价历年对比"
    },
    data6: {
        xAxis: ["2013", "2014", "2015", "2016", "2017"],
        legend:["教学工作量","教学质量","教材建设"],
        yAxis: ["D", "C","B","A"],
        data: [
            [2.5, 1.5, 1.7, 3, 0.8],
            [0.5, 2.5, 3, 2.4, 1.8],
            [3, 2.1, 2.3, 1.4, 0.2],
        ]
    },
    data7: {
        xAxis: ["2013", "2014", "2015", "2016", "2017"],
        legend:["教学工作量","教学质量","教材建设"],
        yAxis: ["D", "C","B","A"],
        data: [
            [2.5, 1.5, 1.7, 3, 0.8],
            [0.5, 2.5, 3, 2.4, 1.8],
            [3, 2.1, 2.3, 1.4, 0.2],
        ]
    }

}
