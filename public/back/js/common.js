
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
