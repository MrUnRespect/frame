module.exports = {
  data1: Array.from(new Array(30)).map((o, index) => ({
    name: '成都市某学校' + index,
    value: 30 - index
  }))
}
