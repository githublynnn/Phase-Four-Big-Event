$.ajaxPrefilter(function (options) {
  // 拼接根路径
  options.url = 'http://www.liulongbin.top:3007' + options.url

  // 有权限的页面携带请求头
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || '',
    }
  }
  //complete回调函数
  options.complete = function (res) {
    if (
      res.responseJSON.status === 1 &&
      res.responseJSON.message === '身份认证失败！'
    ) {
      // console.log(1)
      localStorage.removeItem('token')
      location.href = '/login.html'
    }
  }
})
