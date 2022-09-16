$(function () {
  // 点击去注册的链接
  $('#link_reg').on('click', function () {
    $('.login_box').hide()
    $('.reg_box').show()
  })
  // 点击去登录链接
  $('#link_login').on('click', function () {
    $('.reg_box').hide()
    $('.login_box').show()
  })
  // 从layui中获取对象
  const form = layui.form
  const layer = layui.layer
  // 添加密码校验
  form.verify({
    // 校验密码的校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验确认密码的校验规则
    repwd: function (value) {
      // 把校验放到第二次密码的标签属性中，通过形参value，拿到的是第二次密码的值
      // 获取第一次密码，与第二次密码对比。如果不一样就提示
      const pwd = $('.reg_box [name="password"]').val()
      if (pwd !== value) {
        return '两次密码不一致'
      }
    },
  })

  // 监听注册表单的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    const data = {
      username: $('#form_reg [name="username"]').val(),
      password: $('#form_reg [name="password"]').val(),
    }
    $.post('/api/reguser', data, function (res) {
      if (res.status !== 0) return layer.msg(res.message)
      layer.msg('注册成功，请登录')
      // 注册成功后直接登录
      $('#link_login').click()
    })
  })
  // 注册的账号密码： qazqazqazqaz / 123456
  // 监听登录界面的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      url: '/api/login',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        localStorage.setItem('token', res.token)
        location.href = '../../index.html'
      },
    })
  })
})
