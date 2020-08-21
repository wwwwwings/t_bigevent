$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6)
                return "昵称长度为1-6位"
        }
    })
    var layer = layui.layer
    // 用户渲染
    function initUserInfo() {
        $.ajax({
            mathod: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg(res.message)
                // layer.msg(res.message)
                form.val("formUserInfo", res.data)
            }
        })
    }
    initUserInfo()
    // 表单重置
    $("#btnReset").on("click", function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0)
                    return layer.msg(res.message)
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})