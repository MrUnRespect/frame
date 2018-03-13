<template>
    <item-container>
        <div class="msg-4-box" :style="{fontSize:unit(16)}">
            <div class="msg-4-content" :style="{lineHeight:unit(30)}">
                南京工业职业技术学院简称"南工院"，是一所全日制公办普通高校， 学校是全国就业典型经验50强高校，全国职业院校就业竞争力示范 校30强高校，“国家示范性高等职业院校建设计划”建设单位。学 校毗邻著名的南京钟山风景区，有仙林、中山、天堂三个校区，占
                地面积1360余亩，建筑面积40余万平方米，，教学科研仪器设备总 值1.8亿元，馆藏图书百万余册；设有10院2部，开设53个专业；教职 员工800余人，在校生近14000人，其中专科生13000余人，本科生近
                1000人，外国留学生近100人。
            </div>
        </div>
    </item-container>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        props: {
            sourcekey: {
                type: String,
                default: "data1"
            }
        },
        methods: {
            update() {
                DataUtil.getData(this.source, this, data => {
                    this.data = data[this.sourcekey];
                });
            },

        }
    };

</script>
<style>
    .msg-4-box h1,
    .msg-4-box ul,
    .msg-4-box li,
    .msg-4-box p {
        padding: 0;
        margin: 0;
        list-style: none;
    }

    .msg-4-box {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        position: relative;
    }

    .msg-4-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        white-space: normal;
        color: rgb(213,213,213);
    }
</style>