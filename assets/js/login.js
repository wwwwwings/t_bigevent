$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    //自定义验证规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,16}$/
            , '密码必须6到16位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg-box [name='password']").val()
            if (pwd !== value)
                return "两次密码输入不一致"
        }
    });
    //注册功能
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            data: $(this).serialize(),
            url: '/api/reguser',
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                $("#link_login").click()
                $("#form_reg")[0].reset()
            }
        })
    })
    // 登录功能
    $("#form_login").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            data: $(this).serialize(),
            url: '/api/login',
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                localStorage.setItem("token", res.token)
                location.href = '/index.html'
            }
        })
    })
})