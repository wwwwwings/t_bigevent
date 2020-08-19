$(function () {
    getUserInfo()
    $("#btnLogout").on("click", function () {
        layer.confirm('是否退出？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href='/login.html'
            layer.close(index);
        });
    })
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0)
                return layer.msg(res.message)
            renderAvatar(res.data);
        }
    })
}
function renderAvatar(user) {
    // 用户名，昵称优先
    var name = user.nickname || user.username
    $(".welcome").html("欢迎&nbsp" + name)
    // 用户头像
    if (user.user_pic !== null) {
        // 有头像
        $(".layui-nav-img").show().attr("src", user.user_pic)
        $(".text-avatar").hide()
    }
    else {
        // 无头像
        $(".layui-nav-img").hide()
        var text = name[0].toUpperCase()
        $(".text-avatar").show().html(text)
    }
}