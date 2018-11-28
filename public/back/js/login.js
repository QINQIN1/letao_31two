$(function(){


    //1.进行表单校验
    //用户名不能为空
    //长度必须是2-6位
    //密码不能为空
    //必须是6-12位
    $('#form').bootstrapValidator({
        // 配置校验图标
        feedbackIcons:{
            // 校验成功
            valid:'glyphicon glyphicon-ok',
            // 校验失败
            invalid:'glyphicon glyphicon-remove',
            //校验中
            validating:'glyphicon glyphicon-refresh'
        },
        //指定校验字段
        fields:{
            //校验用户名
            username:{
                //校验规则
                validators:{
                    //不能为空
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    //长度校验
                    stringLength:{
                        min:2,
                        max:6,
                        message:"用户名必须是2-6位"
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            //校验密码
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength:{
                        min:6,
                        max:12,
                        message:"密码必须是6-12位"
                    },
                    callback:{
                        message:"密码不存在"
                    }
                }
            }
        }

    });

    //2.校验成功后 会触发一个校验成功事件 success.form.bv
    // 默认表单会提交表单，页面就跳转
    // 我们需要在提交表单之前,校验成功的事件中先阻止跳转，再通过ajax请求进行提交
    $('#form').on('success.form.bv',function(e){
        //阻止默认跳转
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            data:$('#form').serialize(),
            dataType:"json",
            success:function(info){
                // console.log(info)
                if(info.error==1000){
                    //用户名不存在
                    //updateStatus: fields(字段名) status(状态) validators(配置校验规则)
                    //status INVALID校验失败 VALID校验成功 NOT_VALIDATED未校验 VALIDATING校验中
                    $('#form').data('bootstrapValidator').updateStatus("username","INVALID","callback");
                    return;
                }
                if(info.error==1001){
                    $('#form').data('bootstrapValidator').updateStatus("password","INVALID","callback");
                    return;
                }
                if(info.success){
                    location.href="index.html";
                }
            }
        })

    });
    //3.重置 reset重置只能重置内容，需要重置额外的状态
        //resetForm(Boolean)
        //resetForm()重置内容
        //resetForm(true)重置内容和状态
        $('[type="reset"]').click(function(){
            $('#form').data('bootstrapValidator').resetForm();
        })
})