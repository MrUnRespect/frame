<template>
    <item-container>
        <table class="item-table-3" :style="{fontSize:unit(16)}">
            <tr :style="{lineHeight:unit(40)}">
                <th class="item-table-3-shallow">诊断项目</th>
                <th class="item-table-3-deep">a文化建设</th>
                <th class="item-table-3-deep">b专业建设</th>
                <th class="item-table-3-deep">c课程建设</th>
            </tr>
            <tr v-for="item in struct.table">
                <td class="item-table-3-shallow" style="width:10%">{{item.name}}</td>
                <td class="item-table-3-a" :class="{tableOn3:item.result}">
                    <span v-html="item.e7">
               
                    </span>
                    <span v-html="item.e8">

                    </span>
                    <span v-html="item.e9">
                   
                    </span>
                </td>
                <td class="item-table-3-b" :class="{tableOn3:item.result}">
                    <span v-html="item.f1">
            
                    </span>
                    <span v-html="item.f2">
                   
                    </span>
                    <span v-html="item.f3">
                            
                    </span>
                    <span v-html="item.f4">
                                    
                    </span>
                    <span v-html="item.f5">
                            
                     </span>
                </td>
                <td class="item-table-3-c" :class="{tableOn3:item.result}">
                    <span v-html="item.g1">
           
                    </span>
                    <span v-html="item.g2">
                        
                    </span>
                    <span v-html="item.g3">
                            
                    </span>
                </td>
            </tr>
        </table>
    </item-container>
</template>
<script>
export default {
  data() {
    return {
      struct: {}
    };
  },
  props: {
    sourcekey: {
      type: String,
      default: "data6"
    }
  },
  methods: {
    update() {
      DataUtil.getData(this.source, this, data => {
        this.struct = data[this.sourcekey];
      });
    }
  }
};
</script>
<style>
.item-table-3-deep {
  background: rgba(108, 176, 243, 0.5);
}

.item-table-3-shallow {
  background: rgba(64, 131, 229, 0.5);
}

.item-table-3 {
  width: 100%;
  text-align: center;
  white-space: normal;
  color: rgb(213, 213, 213);
}

.item-table-3 td {
  /* border: 1px solid red; */
}

.item-table-3 th {
  /* border: 1px solid red; */
}

.item-table-3 td:after {
  clear: both;
  display: table;
  content: "";
}

.item-table-3-a {
  width: 25%;
}

.item-table-3-a span {
  float: left;
  width: 33%;
}

.item-table-3-b {
  width: 40%;
}

.item-table-3-b span {
  float: left;
  width: 20%;
}

.item-table-3-c {
  width: 25%;
}

.item-table-3-c span {
  float: left;
  width: 33%;
}
.tableOn3 {
  color: rgb(205, 91, 92);
}
</style>