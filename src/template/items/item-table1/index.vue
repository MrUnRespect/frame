<template>
    <item-container>
        <table class="item-table" :style="{fontSize:unit(16)}">
            <tr :style="{lineHeight:unit(40)}">
                <th class="item-table-shallow">诊断项目</th>
                <th class="item-table-deep">a文化建设</th>
                <th class="item-table-deep">b专业建设</th>
                <th class="item-table-deep">c课程建设</th>
            </tr>
            <tr v-for="item in struct.table" >
                <td class="item-table-shallow" style="width:10%" class="table-border-top">{{item.name}}</td>
                <td class="item-table-a"  :class="{tableOn:item.result}" class="table-border-color">
                    <span v-html="item.a1">
                        
                    </span>
                    <span v-html="item.a2">

                    </span>
                    <span v-html="item.a3">
                   

                    </span>
                    <span v-html="item.a4">
        
          
                    </span>
                </td>
                <td class="item-table-b" :class="{tableOn:item.result}" class="table-border-color">
                    <span v-html="item.b1">
            
                    </span>
                    <span v-html="item.b2">
                   
                        </span>
                    </span>
                </td>
                <td class="item-table-c" :class="{tableOn:item.result}" class="table-border-color">
                    <span v-html="item.c1">
           
                    </span>
                    <span v-html="item.c2">
                        
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
      default: "data1"
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
.item-table-deep {
  background: rgba(108, 176, 243, 0.5);
}

.item-table-shallow {
  background: rgba(64, 131, 229, 0.5);
}

.item-table {
  width: 100%;
  text-align: center;
  white-space: normal;
  border-collapse: collapse;
  color: rgb(213, 213, 213);
}

.item-table td {
  /* border: 1px solid red; */
}

.item-table th {
  /* border: 1px solid red; */
}

.item-table td:after {
  clear: both;
  display: table;
  content: "";
}

.item-table-a {
  width: 50%;
}

.item-table-a span {
  float: left;
  width: 25%;
}

.item-table-b {
  width: 20%;
}

.item-table-b span {
  float: left;
  width: 50%;
}

.item-table-c {
  width: 20%;
}

.item-table-c span {
  float: left;
  width: 50%;
}
.tableOn {
  color: rgb(205, 91, 92);
}
.table-border-color {
  border: 1px solid rgba(33, 131, 236, 0.3);
}
.table-border-top {
  border-top: 2px solid rgba(0, 0, 0, 0.5);
  background: rgba(64, 131, 229, 0.5);
}
</style>