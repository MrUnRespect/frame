; ((function (global) {
  var cache = {};
  var PROPS = {
    // 配置好的大屏获取数据url
    GET_DATA_URL: '/admin/bigScreen/getData',
    // 获取注入js
    GET_INJECT_JS_URL: '/admin/bigScreen/getInjectJs',
    // 配置好的大屏获取默认数据基地址（到模板根目录一级）url
    DEFAULT_DATA_URL_ROOT: '/bigScreenTmplate/',
    // 前端开发时大屏获取默认数据基地址（到模板根目录一级）url
    DEFAULT_DATA_URL_ROOT_DEV: '/'
  }

  /**
   * 获取url地址参数
   * 
   * @param {any} name 
   * @returns 
   */
  function getUrlParam(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    var r = window.location.search.substr(1).match(reg)
    if (r != null) {
      return unescape(r[2])
    }
    return null
  }

  /**
   * 使用默认数据
   * 
   * @param {any} url 
   * @param {any} callback 
   */
  var _toString = Object.prototype.toString;
  var toString = function (obj) {
    return _toString.call(obj)
  }
  function resolveWithDefaultData(url, callback, scope) {
    axios.get(url).then(function (ret) {
      if(toString(ret.data) == '[object String]') ret.data = JSON.parse(ret.data)
      callback(ret.data)
      cache[scope.source + $.param(scope.$root.params)] = ret.data
    }).catch(function (e) {
      var res = {}
      res[scope.sourcekey] = scope.struct
      callback(res)
    })
  }

  function executeInjectScript() {
    axios.get(PROPS.GET_INJECT_JS_URL, {
      params: {
        bigScreenId: getUrlParam('bigScreenId'), bigScreenDatasetId: getUrlParam('bigScreenDatasetId')
      }
    }).then(function (data) {
    }).catch(function (e) {
    })
  }

  /**
   * DataUtil对象
   * 
   */
  var DataUtil = {}

  DataUtil.getData = function (dataAreaId, scope, callback) {
    if (cache[scope.source + $.param(scope.$root.params)]) {
      callback(cache[scope.source + $.param(scope.$root.params)])
      return
    }
    if (dataAreaId === undefined || dataAreaId == null || dataAreaId === '') {
      var res = {}
      res[scope.sourcekey] = scope.struct
      callback(res)
      return
    }
    var param = scope.$root.params
    if (arguments.length == 2 && typeof param === 'function') {
      // param参数未传
      callback = param
      param = {}
    }

    $.get(PROPS.GET_DATA_URL, {
      bigScreenId: getUrlParam('bigScreenId'),
      bigScreenDatasetId: getUrlParam('bigScreenDatasetId'),
      dataAreaId: dataAreaId,
      param: param
    }).then(function (result) {
      if (result.success) {
        callback(result.data)
        cache[scope.source + $.param(scope.$root.params)] = result.data
      } else {
        // 没有配置数据，取默认数据
        console.log('数据区域【' + dataAreaId + '】获取数据失败，将使用默认数据，错误如下：\n' + result.info)
        resolveWithDefaultData(PROPS.DEFAULT_DATA_URL_ROOT + result.data + '/mockData/' + dataAreaId + '.json', callback, scope)
      }
    }).catch(function (error) {
      resolveWithDefaultData(PROPS.DEFAULT_DATA_URL_ROOT_DEV + 'mockData/' + dataAreaId + '.json', callback, scope)
    })
  }

  setTimeout(function () {
    executeInjectScript()
  }, 2000)

  global.DataUtil = DataUtil
})(this))
