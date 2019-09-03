// pc逻辑
function LOGIN(){
    var self = this;
    self.init = init;

    console.log('--- 执行PC端逻辑 ---');
    var login_model = $("#login_modelInput");
    var login_code = $("#login_code");
    var tips = $("#tips");
    var userName = $("#InputUser");
    var password = $("#InputPassword");
    var singIn = $("#singInBtn");
    

    // DOM加载
    function initDom(){
        /**
         * 引用拼图插件
         *  */ 
        imgVer({
            el:'$("#login_code")',
            width:'260',
            height:'116',
            img:[
                './../images/code1.jpg',
                './../images/code2.jpg',
                './../images/code3.jpg',
                './../images/code4.jpg'
            ],
            success:function () {
                $.ajax({
                    url:"https://easy-mock.com/mock/5d6e1284f10389455994d576/blog/login",
                    method: "get",
                    success:res=>{
                        console.log( res );
                        if( res.data.code == 200 ){
                            // 将信息缓存到本地

                            // 登陆成功 跳转到首页页面
                            // alert("登陆成功!!!");
                            window.location.href="./index.html"
                        }else{
                            var tipshtml = `<img class='tipsImg' src="./../images/null-username.jpg" alt="提示">
                                            <span>${res.data.msg}</span>`;
                            tips.empty().append(tipshtml);
                            // UI交互效果
                            login_model.css({"left":"0px"});
                            login_code.css({"left":"350px"});
                        }
                    }
                })
            },
            error:function () {
                //alert('错误什么都不执行')
            }
        });
    }

    // 页面行为
    function initEvent(){
        // 登陆验证
        singIn.click(function(){
            console.log( userName.val() );
            console.log( password.val() );
            if( userName.val().replace(/\s/g,"") == "" ){
                console.log("账户为空");
                var tipshtml = `<img class='tipsImg' src="./../images/null-username.jpg" alt="提示">
                            <span>老兄,你的用户名呢?!!!</span>`;
                console.log( tipshtml );
                tips.empty().append(tipshtml);
            }else if( password.val().replace(/\s/g,"") == "" ){
                console.log("密码为空");
                var tipshtml = `<img class='tipsImg' src="./../images/null-password.jpg" alt="提示">
                            <span>老兄!你密码呢?!</span>`;
                console.log( tipshtml );
                tips.empty().append(tipshtml);
            }else{
                console.log( "1111111" );
                // 清空提示
                tips.empty();
                // UI交互效果
                login_model.css({"left":"-350px"});
                login_code.css({"left":"0"});



            }
        });
    }

    // 页面导入
    function init(){
        initDom();
        initEvent();
    }
}


/*-------------- 入口 ---------------------*/
$(function(){
    new LOGIN().init();
});