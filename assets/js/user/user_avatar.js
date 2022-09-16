$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比 1代表是正方形的裁剪区域1/1
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview',
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  $('#btnChooseImage').on('click', function () {
    $('#file').click()
  })

  $('#file').on('change', function (e) {
    // 用户选择的文件的伪数组
    const filelist = e.target.files
    if (filelist.length === 0) {
      return layui.layer.msg('请选择照片！')
    }
    // 1. 拿到用户选择的文件
    const file = filelist[0]
    // 2. 将文件，转化为路径
    const imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  })
  // 为确定按钮，绑定点击事件
  $('#btnUpload').on('click', function () {
    // 1. 要拿到用户裁剪之后的头像
    var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2. 调用接口，把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar: dataURL,
      },
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg('头像上传失败')
        }
        layui.layer.msg('更换头像成功！')
        // 渲染用户登录的小头像
        window.parent.getUserInfo()
      },
    })
  })
})
