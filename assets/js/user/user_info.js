$(function () {
  const form = layui.form
  const layer = layui.layer
  form.verify({
    nickname: function (val) {
      if (val.length > 6) {
        return '名称长度必须在1-6个字符之间'
      }
    },
  })

  initUserInfo()

  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        console.log(res)
        // 调用form.val（）方法为表单赋值
        form.val('formUserInfo', res.data)
      },
    })
  }

  $('#btnReset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
  })

  $('.layui-form').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 为了界面用户头像旁边的名字随着表单昵称更改，要调用父容器的方法
        window.parent.getUserInfo()
      },
    })
  })
})
