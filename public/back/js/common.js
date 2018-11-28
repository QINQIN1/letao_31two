
//进度条基本使用
// NProgress.start()//开启进度条
// NProgress.done()//结束定时器

//第一个ajax请求开始时调用
$(document).ajaxStart(function(){
    NProgress.start();
})
//所有的ajax请求结束后调用
$(document).ajaxStop(function(){
    setTimeout(function(){

        NProgress.done();
    },500)
});


$(function(){
    //公共的功能
    //1.左侧分类二级菜单
    $('.category').click(function(){
        $(this).next().stop().slideToggle();
    })
    //2.左侧侧边栏切换
    $('.icon_left').click(function(){
        $('.lt_aside').toggleClass('hidemenu');
        $('.lt_topbar').toggleClass('hidemenu');
        $('.it_main').toggleClass('hidemenu');
    })
    //3.点击右侧 退出功能
    $('.icon_right').click(function(){
        $('#logoutModal').modal("show");
    })
    $('#logoutBtn').click(function(){
        //发送ajax请求，让后台销毁当前用户登录的状态
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href="login.html"
                }
            }
        })
    })

})
