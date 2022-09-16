$(function () {
  // 只要进入到首页，就调用获取用户基本信息的函数
  getUserInfo()

  $('#btnLogout').click(function () {
    layer.confirm(
      '确定退出登录?',
      { icon: 3, title: '提示' },
      function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index)
      }
    )
  })
})

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    method: 'GET',
    // headers: {
    //   Authorization: localStorage.getItem('token') || '',
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg('获取用户信息失败！')
      }
      // 成功获取用户信息后，就调用用户信息数据开始渲染函数
      // console.log(res.data)
      renderAvatar(res.data)
    },

    // complete: function (res) {
    //   // console.log(res)
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === '身份认证失败！'
    //   ) {
    //     // console.log(1)
    //     localStorage.removeItem('token')
    //     location.href = '/login.html'
    //   }
    // },
  })
}

function renderAvatar(user) {
  const name = user.nickname || user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
  if (user.user_pic !== null) {
    $('.layui-nav-img').attr('src', user.user_pic).show()
    $('.text-avatar').hide()
  } else {
    const first = name[0].toUpperCase()
    $('.text-avatar').html(first).show()
    $('.layui-nav-img').hide()
  }
}
