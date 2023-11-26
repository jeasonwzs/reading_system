
let user = [];
function initData() {
    // 初始化数据
    console.log("read");
        
        $.ajax({
            url: "./data/User.json",
            type: "get",
            async: false,
            success: function (data) {
                user = data;
                console.log("success");
            },
            error:function(a, b, c){
                console.log(b+","+c);
            }
        });
        
}
initData();
function enter(){
    var username = document.querySelectorAll(".input_text")[0];
    var password = document.querySelectorAll(".input_text")[1];
    var Right = user.用户;
    console.log(Right);
    var judge=true;
    if(username.value==""||password.value=="")
    {
        alert("账号密码不能为空");
        return ;
    }
    for(var i = 0 ; i < Right.length; i++)
    {
        if(Right[i].账号==username.value)
        {
            judge=false;
            if(Right[i].密码==password.value)
            {
                alert("登陆成功");
                window.location.href="../index.html";
                break;
            }
            else
            {
                alert("账号或密码错误");
            }
        }
    }
    if(judge) alert("账号未注册");
}

var Obj = {
    
    用户:[]
}
function addUser()//先用这个勉强实现注册,下载文件要替换掉data/User.json,文件名不变
{
    var username = document.querySelectorAll(".input_text")[0];
    var password = document.querySelectorAll(".input_text")[1];
    var password1 = document.querySelectorAll(".input_text")[2];
    if(username.value==""||password.value==""||password1.value=="")
    {
        alert("账号密码不能为空");
        return ;
    }
    if(password.value!=password1.value)
    {
        alert("密码要一致");
        return ;
    }
    var judge=false;
    
    var Right = user.用户;
    for(var i = 0 ; i < Right.length; i++)
    {
        if(Right[i].账号==username.value)
        {
            alert("该账号已存在");
            return;
        }
    }
    if(password.value.length<6)
    {
        alert("密码长度大于6");
        return ;
    }
    alert("注册成功,文件下载到data/中,将User.json替换掉(先这样吧)");
    Obj.用户.push({"账号": ""+username.value, "密码":""+password.value});
    for(var i = 0 ; i < Right.length; i++)
    {
        Obj.用户.push({"账号": Right[i].账号, "密码":""+Right[i].密码});
    }
    var content = JSON.stringify(Obj);
    var blob = new Blob([content], {
       type: "text/plain;charset=utf-8"
    });
    saveAs(blob, "User.json");
    
    window.location.href="../登录界面.html";
    
}
