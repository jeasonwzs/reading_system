
stuId = 3038

//目前地区无数据
let oldData = [];
let dataJZCX = [];
let dataJZMMST = [];
let dataJZJF = [];
let dataNJCX = [];
let dataNJMMST = [];
let dataNJJF = [];
let dataDQCX = [];
let dataDQMMST = [];
let dataDQJF = [];

let f_data = [];

let stu_img = [
     'https://img.keaitupian.cn/newupload/05/1683184422825120.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184422873046.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184422648379.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184422813761.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184422137266.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184423145482.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184423801248.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184423597797.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184423754449.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184426338808.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184737639420.jpg',
     'https://img.keaitupian.cn/newupload/05/1683184737240707.jpg'
 ]

// json文件路径 总 分（JZ,NJ,DQ）
const path = ['../data/oldData.json',
    './data/ZJ_CX.json',
    './data/ZJ_MMST.json',
    './data/ZJ_JF.json',
    './data/NJ_CX.json',
    './data/NJ_MMST.json',
    './data/NJ_JF.json',
    './data/DQ_CX.json',
    './data/DQ_MMST.json',
    './data/DQ_JF.json'];

/**
* 控件响应事件 获取元素
*/
// 获取左侧tab按钮
var tabs = document.querySelectorAll(".left_bar>div");

// 获取放置图表的容器;
var items = document.querySelectorAll(".content>div");

// 获取搜索模块中下拉列表的下拉箭头
var arrow = document.querySelector(".search-drop>div>.iconfont");

// 获取下拉内容容器
var selectContent = document.querySelector(".search-dropdown");

// 获取下拉内容
var selectitems = selectContent.querySelectorAll('div');

// 获取已选内容
var search_tab_text = document.querySelector(".search-tab-text");

// 获取输入内容容器
var search_input = document.querySelector('.search-input');

// 获取搜索icon
var search_icon = document.querySelector('.icon-sousuo');

// 表容器
var content = document.querySelector(".content");

// 实例容器
var shili_container = document.querySelector(".shili_container");

var title = shili_container.querySelectorAll(".title");
var tbody = shili_container.querySelectorAll('tbody');
var thead = shili_container.querySelectorAll('thead');
//返回icon
var re_icon = shili_container.querySelector('.iconfont');

//搜索结果显示
var search_result_container = document.querySelector('.search_result_container');

// 右侧内容
const rightCon1 = document.querySelector('.right_content')
const rightCon2 = document.querySelector('.right_content2')

const rightBook = document.querySelector('.right_book')
const rightPer = document.querySelector('.right_per')

//初始化
init();

//书本详细页面
function BookDetail()
{
    rightBook.innerHTML="";
}

function initData() {
    // 初始化数据
    for (let i = 0; i < path.length; i++) {
        $.ajax({
            url: path[i],
            type: "get",
            async: false,
            success: function (data) {
                switch (i) {
                    case 0:
                        oldData = data;
                        break;
                    case 1:
                        dataJZCX = data;
                        break;
                    case 2:
                        dataJZMMST = data;
                        break;
                    case 3:
                        dataJZJF = data;
                        break;
                    case 4:
                        dataNJCX = data;
                        break;
                    case 5:
                        dataNJMMST = data;
                        break;
                    case 6:
                        dataNJJF = data;
                        break;
                    case 7:
                        dataDQCX = data;
                        break;
                    case 8:
                        dataDQMMST = data;
                        break;
                    case 9:
                        dataDQJF = data;
                        break;
                }
            }
        });
    }

    // 获取 flask_params,放入f_data
    $.ajax({
        url: '../flask_params.json',
        type: "get",
        async: false,
        success: function (data) {
            f_data = data
        }
    })

    // 个性化推荐界面 -> 学生推荐书籍列表
    $.ajax({
        type: 'get',
        url: f_data["urlPre"]+'/recommendBook?stuId='+stuId,
        success: function (data) {
            data = data.replace(/'/g, '"'); // parse解析要求都双引号
            data = JSON.parse(data);
            var bookList = data.data; // 获取书籍数据数组
            console.log(data);
            // 获取空的<ul>元素
            var booksWrap = document.getElementById("booksWrap");
            // 遍历书籍数据并动态插入<li>元素
            bookList.forEach(function (book) {
                // 创建一个新的<li>元素
                var li = document.createElement("li");
                // 设置自定义属性 data-bookid，用于存储 bookId
                li.setAttribute("data-bookid", book.bookId);
                li.setAttribute("data-authorcountry", book.authorCountry);
                li.setAttribute("data-bookPeriod", book.bookPeriod);
                li.setAttribute("data-bookType", book.bookType);
                li.setAttribute("data-bookContentTheme", book.bookContentTheme);
                li.setAttribute("data-readabilityRange", book.readabilityRange);
                li.setAttribute("data-wordCount", book.wordCount);
                li.setAttribute("data-mainlyAffectsCharacter", book.mainlyAffectsCharacter);
                li.setAttribute("data-specialAttention", book.specialAttention);
                li.className = 'bookLi'
                book_info_list = [book.bookId, book.authorCountry, book.bookPeriod, book.bookType, book.bookContentTheme, book.readabilityRange, book.wordCount, book.mainlyAffectsCharacter, book.specialAttention]
                // 绑定点击事件
                li.addEventListener("click", function() {showBook(book_info_list)});
                // 创建<a>元素
                var a = document.createElement("a");
                a.className = "bookA";
                
                // 创建<div>元素用于书籍标题
                var div = document.createElement("div");
                div.className = "bookTitle";
                div.textContent = book.name;
                var di = document.createElement("div");
                    di.className="card2";
                    
                    di.textContent="书号:"+book.bookId+"\n国家:"+book.authorCountry+"\n时代:"+book.bookPeriod+"\n类别:"+book.bookType+"\n主题:"+book.bookContentTheme+"\n适合人群:"+book.readabilityRange+"\n字数:"+book.wordCount+"\n主要影响方面:"+book.mainlyAffectsCharacter+"\n特殊:"+book.specialAttention;
                    div.appendChild(di);
                div.addEventListener("mouseenter",function(){
                    this.children[0].style.display="block";
                })
                div.addEventListener("mouseleave", function(){
                    this.children[0].style.display="none";
                })
                // 将<img>和<span>元素添加到<a>元素中
                a.appendChild(div);
                // 将<a>元素添加到<li>元素中
                li.appendChild(a);
                // 将<li>元素添加到<ul>元素中
                booksWrap.appendChild(li);
            });
        },
        error: function (xhr, status, error) {
            console.log('请求出错：' + error);
        }
    });

    // / 个性化推荐界面 -> 学生学习伙伴
    $.ajax({
        type: 'get',
        url: f_data["urlPre"]+'/friRecommend?stuId='+stuId,
        success: function (data) {
            data = data.replace(/'/g, '"'); // parse解析要求都双引号
            data = JSON.parse(data);
            if (data.code === 1) {
                console.log('接收成功，返回如下。');
                console.log(data);

                var friList = data.data; // 获取伙伴数据数组

                // 获取空的<ul>元素
                var persWrap = document.getElementById("perWrap");

                // 遍历伙伴数据并动态插入<li>元素
                friList.forEach(function (fri) {
                    // 创建一个新的<li>元素
                    var li = document.createElement("li");
                    // 设置自定义属性 data-bookid，用于存储 bookId
                    li.setAttribute("data-stuId", fri.studentId);
                    li.className = 'friLi'
                    
                    
                    if(fri.is_fri == 1){
                        console.log("isfri:"+fri.is_fri);
                        li.style.background="skyblue"
                    }
                    
                    // 创建一个div被li包含
                    var div = document.createElement("div");
                    div.className = 'stuDiv'
                    // 绑定点击事件【这里应该改成点击添加伙伴】
                    // li.addEventListener("click", function() {showBook(book.bookId)});
                    // 创建<a>元素
                    // var a = document.createElement("a");
                    // a.className = "bookA";
                    // 创建<img>元素
                    var img = document.createElement("img");

                    // 生成 0-11的随机数
                    var randomNumber = Math.floor(Math.random() * 10) + 1;

                    img.src = stu_img[randomNumber];
                    img.alt = "";
                    img.className = 'stuImg'
                    img.addEventListener("mouseenter", function() {  
                        this.parentNode.children[3].style.display='block';
                        console.log(this.parentNode.children[3])
                        
                      });
                    img.addEventListener("mouseleave", function() {  
                        this.parentNode.children[3].style.display='none';
                          

                      });
                    // 创建<span>用于学生姓名
                    var span = document.createElement("span");
                    span.className = "uname";
                    span.textContent = fri.studentName;
                    // 创建<span>用于添加的icon..............................
                    var span1 = document.createElement("span");
                    span1.className = "icon-plus-circle1";
                    // 将<img>和<span>元素添加到<div>元素中
                    var firMsg = document.createElement("div");//添加朋友详细信息
                    console.log(fri);
                    firMsg.className="card1";
                    // firMsg.textContent = "学号:"+fri.studentId+"\n 姓名:"+fri.studentName+"\n";
                    firMsg.textContent = "学号:"+fri.studentId+"\n 姓名:"+fri.studentName+"\n 学校:"+fri.school+"\n 班级:"+fri.class+"\n 性别:"+fri.sex+"\n 民族:"+fri.nation+"\n 出生年月:"+fri.birth+"\n";
                    div.appendChild(img);
                    div.appendChild(span);
                    div.appendChild(span1);
                    div.appendChild(firMsg);
                    li.appendChild(div);
                    // 为这个点击icon绑定点击事件
                    span1.addEventListener("click", function() {
                        alert('添加成功');
                        // 这里先不对后端数据库做修改…因为数据有限；当然要改也可以，再加一个删掉好友的就可以方便修改数据库了
                        li.style.background="skyblue"
                        span1.style.display="none";
                        fri.is_fri=1;
                    });
                    li.addEventListener("click",function(){
                        //console.log(this.className);
                        if(fri.is_fri>1) window.location.href="对话界面.html";
                        fri.is_fri+=1;
                    })
                    
                    // 将<a>元素添加到<li>元素中
                    // li.appendChild(a);
                    
                    // 将<li>元素添加到<ul>元素中
                    persWrap.appendChild(li);
                });
            } else {
                console.log('接收返回，但出错。')
                console.log(data.msg);
            }
        },
        error: function (xhr, status, error) {
            console.log('请求出错：' + error);
        }
    });

    // / 个性化推荐界面 -> 学习方法
    $.ajax({
        type: 'get',
        url: f_data["urlPre"]+'/recommendMethod',
        success: function (data) {
            console.log(data)
        },
        error: function (xhr, status, error) {
            console.log('请求出错：' + error);
        }
    });
}


function initEvent() {
    // 初始化事件

    // 左侧tab按钮点击事件
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () {
            // 切换tab
            changeTab(i);
        }
    }

    // 下拉箭头点击事件
    arrow.onclick = function () {
        // 切换下拉内容
        changeSelectContent();
    }

    // 下拉内容点击事件
    for (let i = 0; i < selectitems.length; i++) {
        selectitems[i].onclick = function () {
            // 切换已选内容
            changeSearchTabText(i);
        }
    }

    // 搜索icon点击事件
    search_icon.onclick = function () {
        // 搜索
        search();
    }

    // 搜索框回车事件
    search_input.onkeydown = function (e) {
        if (e.keyCode == 13) {
            search();
        }
    }

    // 返回icon点击事件
    re_icon.onclick = function () {
        // 返回
        re();
    }
}

//通过value找key
function findKey(obj, value, compare = (a, b) => a === b) {
    return Object.keys(obj).find(k => compare(obj[k], value))
}

// 获取input内容
function getInputText(search_input) {
    var inputCon = search_input.value;
    // console.log("已输入内容：" + inputCon);
    if (inputCon == "") {
        alert("请输入有效内容");
        return "";
    } else {
        inputCon = inputCon.trim();
        return inputCon;
    }
}

//------------切换tab内容----------------------
function changeTab(index) {
    // 切换tab
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].className = '';
    }
    tabs[index].className = 'active';



    rightCon1.style.display = 'flex'
    rightCon2.style.display = 'none'
    rightBook.style.display = 'none'
    rightPer.style.display = 'none'
    // echart渲染
    if (index === 0) {

        content.style.display = 'block';
        shili_container.style.display = 'none';
        search_result_container.style.display = 'none';
        getEchart(0, 1);
        getEchart(0, 2);
        getEchart(0, 3);
    } else if (index === 1) {

        search_result_container.style.display = 'none';

        content.style.display = 'block';
        shili_container.style.display = 'none';
        getEchart(1, 1);
        getEchart(1, 2);
        getEchart(1, 3);
    } else if (index === 2) {
        content.style.display = 'block';
        shili_container.style.display = 'none';
        search_result_container.style.display = 'none';
        getEchart(2, 1);
        getEchart(2, 2);
        getEchart(2, 3);
    } else if(index==3){
        rightCon1.style.display = 'none'
        rightCon2.style.display = 'flex'
        var aa = document.querySelectorAll(".bookTitle");
        var maxheight = parseInt(0);
        var maxwidth = parseInt(0);
        aa.forEach(element => {
            console.log("name:"+element.text+"width:"+element.offsetWidth+",height:"+element.offsetHeight);
            if(maxheight<=element.offsetHeight) maxheight = element.offsetHeight;
            if(maxwidth<=element.offsetWidth) maxwidth = element.offsetWidth;
        });
        var booktitle = document.querySelectorAll(".bookTitle");
        if(maxheight<maxwidth) maxheight = maxwidth
        booktitle.forEach(element => {

            element.style.height=maxheight+"px";
            //if(getComputedStyle(element).height<=maxwidth) element.style.height = maxwidth;

            element.style.width= maxwidth+"px";
            //console.log("width:"+getComputedStyle(element).width+",height:"+getComputedStyle(element).height);
        });
    }
    else if(index==4)
    {
        window.location.href="个人设置.html";
    }

}

//------------返回键----------------------
function re() {
    content.style.display = 'block';
    shili_container.style.display = 'none';
    search_result_container.style.display = 'none';
    var nav = document.querySelector(".nav");
    nav.style.display='block';
}

//------------搜索----------------------
function search() {
    var findcon = getInputText(search_input);
    var res_con = [];
    // console.log("搜索内容：" + findcon);

    //主要容器显示哪个
    content.style.display = 'none';
    shili_container.style.display = 'none';
    search_result_container.style.display = 'block';
    search_result_container.innerHTML = '';

    //搜索
    if (findcon != "") {
        var fenlei = search_tab_text.innerHTML;
        search_result_container.innerHTML = '';
        res_con = [];

        if (fenlei == "词性") {

            var dataCX = [dataJZCX, dataNJCX, dataDQCX];
            // 词性文件循环
            for (let i = 0; i < dataCX.length; i++) {
                // 具体循环
                for (var key1 in dataCX[i]) {
                    if (key1 === 0) continue;
                    for (var key2 in dataCX[i][key1]) {
                        for (var key3 in dataCX[i][key1][key2]) {
                            if (dataCX[i][key1][key2][key3].词语 === findcon) {

                                var div_container = document.createElement('div');
                                div_container.className = 'div_container';
                                search_result_container.appendChild(div_container);

                                var shuxing2 = findKey(dataCX[i], dataCX[i][key1])
                                var shuxing = findKey(dataCX[i][key1], dataCX[i][key1][key2]);
                                // console.log(jj);
                                var div = document.createElement('div');
                                div.innerHTML = "归类为：" + shuxing2;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "属性为: " + shuxing;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "频数: " + dataCX[i][key1][key2][key3].频数;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "标准化: " + dataCX[i][key1][key2][key3].标准化;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "归一化: " + dataCX[i][key1][key2][key3].归一化;
                                div_container.appendChild(div);
                            }

                        }
                    }

                }

            }


        } else if (fenlei == "命名实体") {
            var dataMMST = [dataJZMMST, dataNJMMST, dataDQMMST];
            // 命名实体文件循环
            for (let i = 0; i < dataMMST.length; i++) {
                // 具体循环
                for (var key1 in dataMMST[i]) {
                    for (var key2 in dataMMST[i][key1]) {
                        for (var key3 in dataMMST[i][key1][key2]) {
                            if (dataMMST[i][key1][key2][key3].具体命名实体 === findcon) {

                                var div_container = document.createElement('div');
                                div_container.className = 'div_container';
                                search_result_container.appendChild(div_container);

                                var shuxing2 = findKey(dataMMST[i], dataMMST[i][key1])
                                var shuxing = findKey(dataMMST[i][key1], dataMMST[i][key1][key2]);
                                // console.log(jj);
                                var div = document.createElement('div');
                                div.innerHTML = "归类为：" + shuxing2;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "属性为: " + shuxing;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "频数: " + dataMMST[i][key1][key2][key3].频数;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "最大值归一化: " + dataMMST[i][key1][key2][key3].最大值归一化;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "最小值最大值归一化: " + dataMMST[i][key1][key2][key3].最小值最大值归一化;
                                div_container.appendChild(div);
                            }

                        }
                    }

                }

            }
        } else if (fenlei == "句法") {
            var dataJF = [dataJZJF, dataNJJF, dataDQJF];
            // 句法文件循环
            for (let i = 0; i < dataJF.length; i++) {
                // 具体循环
                for (var key1 in dataJF[i]) {
                    if (key1 == 0) {
                        continue;
                    }
                    for (var key2 in dataJF[i][key1]) {
                        for (var key3 in dataJF[i][key1][key2]) {
                            if (dataJF[i][key1][key2][key3].Keys === findcon) {

                                var div_container = document.createElement('div');
                                div_container.className = 'div_container';
                                search_result_container.appendChild(div_container);

                                var shuxing2 = findKey(dataJF[i], dataJF[i][key1])
                                var shuxing = findKey(dataJF[i][key1], dataJF[i][key1][key2]);
                                // console.log(jj);
                                var div = document.createElement('div');
                                div.innerHTML = "归类为：" + shuxing2;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "属性为: " + shuxing;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "频数: " + dataJF[i][key1][key2][key3].Frequency;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "标准化: " + dataJF[i][key1][key2][key3].除以最大频数归一化;
                                div_container.appendChild(div);
                                div = document.createElement('div');
                                div.innerHTML = "0-1归一化: " + dataJF[i][key1][key2][key3].归一化;
                                div_container.appendChild(div);
                            }

                        }
                    }

                }

            }

        }
        if (search_result_container.innerHTML === '') {

            var div = document.createElement('div');
            div.innerHTML = "词库有限，未找到相关词语";
            search_result_container.appendChild(div);
        }
    } else {
        var div = document.createElement('div');
        search_result_container.appendChild(div);
        div.className = "div_container";
        div.innerHTML = "请输入有效值";
    }
}

//------------切换已选内容----------------------
function changeSearchTabText(index) {
    // 切换已选内容
    search_tab_text.innerHTML = selectitems[index].innerHTML;
    changeSelectContent();
}


//------------切换已选内容----------------------
function changeSelectContent() {
    if (arrow.classList.contains('rotate180')) {
        arrow.classList.remove('rotate180');
        selectContent.style.display = 'none';
    } else {
        arrow.classList.add('rotate180');
        selectContent.style.display = 'block';
    }

    // 修改下拉内容
    for (var i = 0; i < selectitems.length; i++) {
        if (search_tab_text.innerHTML === selectitems[i].innerHTML) {
            selectitems[i].style.display = 'none';
        } else {
            selectitems[i].style.display = 'block';
        }
    }

}

//------------echart---------------------
function getEchart(tab_index, container_index) {  
    var data = oldData;
    // console.log(data);
    var data_x = [];
    var data1 = [];
    var data2 = [];
    var name1 = "";
    var name2 = "";
    var title = "";
    if (tab_index === 0 && container_index === 1) {
        data = data['真教']['词性'];
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].词性C;
            data1[i] = data[i].教育部;
            data2[i] = data[i].真实数据;
        };
        name1 = "教育部";
        name2 = "真实数据";

    } else if (tab_index === 0 && container_index === 2) {
        data = data.真教.命名实体;
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].命名实体类别;
            data1[i] = data[i].教育部;
            data2[i] = data[i].真实数据;
        }
        name1 = "教育部";
        name2 = "真实数据";

    } else if (tab_index === 0 && container_index === 3) {
        data = data.真教.句法;
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].关系类型;
            data1[i] = data[i].教育部;
            data2[i] = data[i].真实数据;
        }
        name1 = "教育部";
        name2 = "真实数据";

    } else if (tab_index === 1 && container_index === 1) {
        data = data.年级.词性;
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].词性C;
            data1[i] = data[i].三年级;
            data2[i] = data[i].六年级;
        }
        name1 = "三年级";
        name2 = "六年级";

    } else if (tab_index === 1 && container_index === 2) {
        data = data.年级.命名实体;
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].命名实体类别;
            data1[i] = data[i].三年级;
            data2[i] = data[i].六年级;
        }
        name1 = "三年级";
        name2 = "六年级";

    } else if (tab_index === 1 && container_index === 3) {
        data = data.年级.句法;
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].关系类型;
            data1[i] = data[i].三年级;
            data2[i] = data[i].六年级;
        }
        name1 = "三年级";
        name2 = "六年级";

    } else if (tab_index === 2 && container_index === 1) {
        data = data.地区.词性;
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].词性C;
            data1[i] = data[i].主城区;
            data2[i] = data[i].外围城区;
        }
        name1 = "主城区";
        name2 = "外围城区";

    } else if (tab_index === 2 && container_index === 2) {
        data = data.地区.命名实体;
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].命名实体类别;
            data1[i] = data[i].主城区;
            data2[i] = data[i].外围城区;
        }
        name1 = "主城区";
        name2 = "外围城区";
    } else if (tab_index === 2 && container_index === 3) {
        data = data.地区.句法;
        for (var i = 0; i < data.length; i++) {
            data_x[i] = data[i].关系类型;
            data1[i] = data[i].主城区;
            data2[i] = data[i].外围城区;
        }
        name1 = "主城区";
        name2 = "外围城区";
    }

    if (container_index === 1) {
        title = "词性";
    } else if (container_index === 2) {
        title = "命名实体";
    } else if (container_index === 3) {
        title = "句法";
    }

    var myChart = echarts.init(items[container_index], 'westeros');
    var option = {
        title: {
            text: title,
            left: 'center',
            extraCssText: "margin-top:4px",
        },
        tooltip: {
            trigger: 'axis',
            extraCssText: 'width: auto;height:auto',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            left: 'center',
            bottom: 'bottom',
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '8%',
            containLabel: true,
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, 0.01]
        },
        xAxis: {
            type: 'category',
            data: data_x,
            axisLabel: {
                interval: 0,
                //竖排
                formatter: function (value) {
                    return value.split('').join('\n')
                }


            },
            axisTick: {
                alignWithLabel: true
            },
            triggerEvent: true
        },
        series: [
            {
                name: name1,
                type: 'bar',
                data: data1
            },
            {
                name: name2,
                type: 'bar',
                data: data2
            }
        ]
    };
    myChart.off('click');
    myChart.on('click', function (params) {
        var value = params.value;

        showDetail(value, tab_index, container_index);
    });

    window.addEventListener("resize", function () {
        myChart.resize();
    });

    myChart.setOption(option);

}

//-------------实例化------------------
function showDetail(value, tab_index, container_index) {
    var title_con = "";
    var title_con1 = "";
    var data = [];
    var nav = document.querySelector(".nav");
    nav.style.display='none';

    search_result_container.style.display = 'none';
    content.style.display = 'none';
    shili_container.style.display = 'block';
    

    if (container_index === 1) {
        title_con1 = "词性";
        if (tab_index === 0) {
            data = dataJZCX;
        } else if (tab_index === 1) {
            data = dataNJCX;
        } else if (tab_index === 2) {
            data = dataDQCX;
        }
    } else if (container_index === 2) {
        title_con1 = "命名实体";
        if (tab_index === 0) {
            data = dataJZMMST;
        } else if (tab_index === 1) {
            data = dataNJMMST;
        } else if (tab_index === 2) {
            data = dataDQMMST;
        }
    } else if (container_index === 3) {
        title_con1 = "句法";
        if (tab_index === 0) {
            data = dataJZJF;
        } else if (tab_index === 1) {
            data = dataNJJF;
        } else if (tab_index === 2) {
            data = dataDQJF;
        }
    }



    for (var i = 0; i < 2; i++) {
        if (tab_index === 0) {
            title_con = "" + value + "--" + title_con1 + "--" + (i == 0 ? "教育部" : "真实");
            if (i === 0) {
                data = data.教育部;
            } else {
                data = data.全部;
            }
        } else if (tab_index === 1) {
            title_con = "" + value + "--" + title_con1 + "--" + (i == 0 ? "三年级" : "六年级");
            if (i === 0) {
                data = data.三年级;
            } else {
                data = data.六年级;
            }
        } else if (tab_index === 2) {
            title_con = "" + value + "--" + title_con1 + "--" + (i == 0 ? "主城区" : "外围城区");
            if (i === 0) {
                data = data.主城区;
            } else {
                data = data.外围城区;
            }
        }


        // 没有数据就不制作表格
        // if (data === []) {
        //     console.log("我是空的");
        // }
        if (data === undefined) {
            continue
        };


        thead[i].innerHTML = "<div id='here'></div>";//返回顶部的锚点
        title[i].innerHTML = title_con+"";

        data = eval("data." + value);
        var data_x = Object.keys(data[0]);
        var tr = document.createElement("tr");
        thead[i].appendChild(tr);
        for (var j = 0; j < data_x.length; j++) {
            var td = document.createElement("td");
            tr.appendChild(td);
            td.innerHTML = data_x[j];
        }

        tbody[i].innerHTML = "";
        for (var j in data) {
            var tr = document.createElement("tr");
            tbody[i].appendChild(tr);
            var v;
            for (var k in data[j]) {
                var td = document.createElement("td");
                tr.appendChild(td);
                td.innerHTML = data[j][k]+"<div id="+data[j][k]+"></div>";
            }
        }
    }
}


//------------初始化----------------------
function init() {
    // 初始化数据
    initData();
    // 初始化事件
    initEvent();

    //默认显示图表
    getEchart(0, 1);
    getEchart(0, 2);
    getEchart(0, 3);
}

// 获取书籍列表，单独展示一本书
function showBook(book_info_list) {
    rightCon1.style.display = 'none'
    rightCon2.style.display = 'none'
    rightBook.style.display = 'block'
    
    
    //alert(book_info_list);

}

// 实际书籍返回
const bookRe = document.querySelector('.right_book .icon-back')
bookRe.addEventListener('click', function () {
    rightCon1.style.display = 'none'
    rightCon2.style.display = 'flex'
    rightBook.style.display = 'none'
})


let masterpiece = 0;
let traditional_chinese_culture = 0;
let others = 0;
let science_fantasy = 0;
let red_literature = 0;
let classical_chinese = 0;

// 个性化推荐 -> 点击个人头像
function getPerEchart() {

    // 偏好图书类型
    $.ajax({
        type: 'get',
        url: f_data["urlPre"]+'/perfer_statistics?stuId='+stuId,
        success: function (data) {
            // console.log('偏好');
            // console.log(data);
            var data = data.replace(/'/g, '"'); // parse解析要求都双引号
            data = JSON.parse(data);
            data = data.data;
            console.log(data.data);
            masterpiece = data['masterpiece'];
            traditional_chinese_culture = data['traditional_chinese_culture'];
            others = data['others'];
            science_fantasy = data['science_fantasy'];
            red_literature = data['red_literature'];
            classical_chinese = data['classical_chinese'];
            console.log('masterpiece',masterpiece);
            console.log('traditional_chinese_culture',traditional_chinese_culture);

            var perfer_list = [];
            hobbyRead_catagory = '文学类'
            hobbyRead_num = 0
            if(masterpiece !== 0){
                perfer_list.push({value: masterpiece, name: '名著类'});
                if(masterpiece > hobbyRead_num){
                    hobbyRead_catagory = '名著类'
                    hobbyRead_num = masterpiece
                }
            }
            if(traditional_chinese_culture !== 0){
                perfer_list.push({value: traditional_chinese_culture, name: '中国传统文化类'});
                if(traditional_chinese_culture > hobbyRead_num){
                    hobbyRead_catagory = '中国传统文化类'
                    hobbyRead_num = traditional_chinese_culture
                }
            }
            if(others !== 0){
                perfer_list.push({value: others, name: '其他'});
                if(others > hobbyRead_num){
                    hobbyRead_catagory = '其他'
                    hobbyRead_num = others
                }
            }
            if(science_fantasy !== 0){
                perfer_list.push({value: science_fantasy, name: '科学幻想类'});
                if(science_fantasy > hobbyRead_num){
                    hobbyRead_catagory = '科学幻想类'
                    hobbyRead_num = science_fantasy
                }
            }
            if(red_literature !== 0){
                perfer_list.push({value: red_literature, name: '红色文学类'});
                if(red_literature > hobbyRead_num){
                    hobbyRead_catagory = '红色文学类'
                    hobbyRead_num = red_literature
                }
            }
            if(classical_chinese !== 0){
                perfer_list.push({value: classical_chinese, name: '文言文类'});
                if(classical_chinese > hobbyRead_num){
                    hobbyRead_catagory = '文言文类'
                    hobbyRead_num = classical_chinese
                }
            }

            var hobbyRead_span = document.getElementsByClassName('hobbyRead')[0]
            hobbyRead_span.innerHTML = hobbyRead_catagory

            const cirPic = document.querySelector('.cirPic')
            var perCirChart = echarts.init(cirPic, 'westeros'); // 在初始化 ECharts 图表时，第二个参数指定了要使用的主题类型。
            var cirOption = {
                title: {
                    text: '阅读类型',
                    left: 'center'
                },
                tooltip: { // 提示框
                    trigger: 'item', // 触发提示框显示的方式。在这里，设置为 'item'，表示当鼠标悬停在图表的数据项上时触发提示框显示。
                    height: 100 // 设置提示框的高度
                },
                legend: {  // 下方类别图例
                    orient: 'horizontal', // 图例以水平方向排列。
                    left: 'center', // 图例的水平位置，'center' 表示水平居中。
                    top: 'bottom', // 图例的垂直位置，'bottom' 表示在图表底部显示。
                },
                grid: { // 图表的绘图区域（grid）属性，控制图表的布局和边距
                    top: '10%', // 绘图区域的上边距，距离图表容器的顶部的距离；占整个图表容器高度的10%。
                    left: '3%',
                    right: '3%',
                    bottom: '6%',
                    // containLabel: true // 表示绘图区域要包含图表的标签和标题，确保它们不会超出绘图区域。以确保图表元素不会被遮挡或截断。
                },
                series: [
                    {
                        name: '阅读类型书籍',
                        type: 'pie', // 饼图
                        radius: '50%', // 饼图的半径为整个图表容器宽度的50%。
                        data: perfer_list,
                        emphasis: { // 配置数据系列的强调样式
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
            window.addEventListener("resize", function () {
                perCirChart.resize();
            });
            perCirChart.setOption(cirOption, true);
        }
    });

    // 阅读小时数
    $.ajax({
        type: 'get',
        url: f_data["urlPre"]+'/reading_hour?stuId='+stuId,
        success: function (data) {
            var data = data.replace(/'/g, '"'); // parse解析要求都双引号
            data = JSON.parse(data);
            data = data.data;
            // console.log('阅读小时');
            // console.log(data);
            const zzPic = document.querySelector('.zzPic')
            var perZzChart = echarts.init(zzPic, 'westeros');
            var zzOption = {
                title: {
                    text: '阅读小时数',
                    left: 'center'
                },
                xAxis: {
                    type: 'category',
                    splitLine: { show: false },
                    data: ['0-4', '4-8', '8-12'],
                    name: '月份'
                },
                yAxis: {
                    type: 'value',
                    name: '阅读小时数',
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '8%',
                    containLabel: true,
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                series: [
                    {
                        data: [data['zero_four'], data['four_eight'], data['eight_twelve']],
                        type: 'bar',
                        name: '读书小时数',
                        label: {
                            show: true,
                            // position: 'top'
                        }
                    }
                ]
            };
            window.addEventListener("resize", function () {
                perZzChart.resize();
            });
            perZzChart.setOption(zzOption, true);
            hasRead_hours = data['zero_four']+data['four_eight']+data['eight_twelve']
            hasRead_span = document.getElementsByClassName('hasRead')[0]
            hasRead_span.textContent = '已阅读'+hasRead_hours+'小时'
            // alert(hasRead_span.textContent)
        }
    });

    // 词云制作

   /* $.ajax({
        type: 'get',
        url: f_data["urlPre"]+'/personality?stuId='+stuId,
        success: function (data) {
            var data = data.replace(/'/g, '"'); // parse解析要求都双引号
            // alert(data)
            data = JSON.parse(data);
            // alert(data)
           
            data = data['data'];
            
            // alert(data)
            // 获取空的<ul>元素
            var cyPic_div = document.getElementById("cyPic");//词云图
            // 遍历书籍数据并动态插入<li>元素
            data.forEach(function (d, index) {
                
                if(index!==0 && d!==0){
                    // 创建一个新的<li>元素
                    var div_ = document.createElement("div");
                    div_.className = 'child'
                    switch (index){
                        case 1:
                            div_.textContent = '平静、放松';
                            break;
                        case 2:
                            div_.textContent = '社交能力较强';
                            break;
                        case 3:
                            div_.textContent = '心理比较健康';
                            break;
                        case 4:
                            div_.textContent = '全面发展';
                            break;
                        case 5:
                            div_.textContent = '善于学习';
                            break;
                    }
                    // 将<li>元素添加到<ul>元素中
                    cyPic_div.appendChild(div_);
                    console.log("次元兔:"+d);
                }
            });
        }
    });*/
    

    $.ajax({
        type: 'get',
        url: f_data["urlPre"]+'/personality?stuId='+stuId,
        success: function (data) {
            var data = data.replace(/'/g, '"'); // parse解析要求都双引号
            // alert(data)
            data = JSON.parse(data);
            // alert(data)
            var item1=[];
            data = data['data']
            console.log("sum:"+data);
            item1=data;//词云库的数值在这里改
            console.log(item1[1]);
            // alert(data)
            // 获取空的<ul>元素
            /*var cyPic_div = document.getElementById("cyPic");
            
            // 遍历书籍数据并动态插入<li>元素
            data.forEach(function (d, index) {
                //item1.push(index);
                if(index!==0 && d!==1){
                    // 创建一个新的<li>元素
                    var div_ = document.createElement("div");
                    div_.className = 'child1'
                    switch (index){
                        case 1:
                            div_.textContent = '平静、放松';
                            break;
                        case 2:
                            div_.textContent = '社交能力较强';
                            break;
                        case 3:
                            div_.textContent = '心理比较健康';
                            break;
                        case 4:
                            div_.textContent = '全面发展';
                            break;
                        case 5:
                            div_.textContent = '善于学习';
                            break;
                    }
                    // 将<li>元素添加到<ul>元素中
                    cyPic_div.appendChild(div_);
                    
                }
            });*/
            CY(item1);
        }
    });
    
    

}

function findMaxIndex(arr) {
    return arr.reduce(function (maxIndex, currentValue, currentIndex, array) {
        return currentValue > array[maxIndex] ? currentIndex : maxIndex;
    }, 0);
}

//词云库
function CY(item1)//词云库的关键字在这里改
{
   var data = [
        // { name: "无关键字", value: item1[0], },
        { name: "心理健康", value: item1[1], },
        { name: "社交状况", value: item1[2], },
        { name: "情绪状态", value: item1[3], },
        { name: "学习能力", value: item1[4], },
        { name: "品格素养", value: item1[5], },
    ];
    if(item1.length>0)
    {
        var arr = [item1[1], item1[2], item1[3], item1[4], item1[5]]
        console.log(arr)
        var maxIndex = findMaxIndex(arr);
        console.log(maxIndex)

        console.log("item:"+item1[0]);

        personality_span = document.getElementsByClassName('personality')[0]
        if(maxIndex == 0) {
            personality_span.textContent = '心灵使者';
        }
        else if(maxIndex == 1) {
            personality_span.textContent = '社交小能手';
        }
        else if(maxIndex == 2) {
            personality_span.textContent = '情感阳光使者';
        }
        else if(maxIndex == 3) {
            personality_span.textContent = '学业达才';
        }
        else if(maxIndex == 4) {
            personality_span.textContent = '道德模范';
        }
        
        const cyPic = document.querySelector('.cyPic')
        var cyChart = echarts.init(cyPic, 'westeros');
        console.log("cy:"+cyChart);
        var w = cyPic.width;
        var h = cyPic.height;
        var cyOption = {
            title: {
                    text: '人格词云图',
                    left: 'center'
                },

            tooltip: {},
            grid: {
                left: '10%',
                right: '10%',
                bottom: '8%',
                containLabel: true,
            },
            series: [{
                type: 'wordCloud',
                gridSize: 28,
                sizeRange: [12, 40],
                rotationRange: [0, 0],
                shape: 'square',
                width: w,
                height: h,
                left: 50,
                top: 50,
                drawOutOfBound: false,
                shrinkToFit: true,
                data,
                
            }]
        };
        console.log(cyOption);
        cyChart.setOption(cyOption);
        window.onresize = cyChart.resize;
    }
    
    
}

// 点击人物展示图表
function showYourself() {
    rightCon1.style.display = 'none'
    rightCon2.style.display = 'none'
    rightPer.style.display = 'block'
    // 人物返回
    const perRe = document.querySelector('.right_per .icon-back')
    perRe.addEventListener('click', function () {
        rightCon1.style.display = 'none'
        rightCon2.style.display = 'flex'
        rightPer.style.display = 'none'
        // console.log(222);
    })
    getPerEchart()
}

addPerson=function(tp){
    //添加好友
    alert("添加成功");
    var l = document.querySelectorAll(".perWrap li");
    l[tp].style.background="skyblue";
}




function ShowRank(){//跳转排名页
    window.location.href="排名页.html";
}
/*打卡 */
var d = new Date();

var Days = null;
if(localStorage.getItem("date")) Days = localStorage.getItem("date");
function Ding(){
    var day = d.getDate();
    month=d.getMonth()+1;
    year=d.getFullYear();
    day=year+"year"+month+"month"+day+"day";
    console.log(day);
    console.log(Days);
    if(day == Days) 
    {
        alert("今日已打过卡了");
        return;
    }
    /*for(var i=0; i<per.length; i++)
    {
        if(per[i].uname=="我")
        {
            per[i].dingtime+=1;
            break;
        }
    }*/
    alert("打卡成功");
    localStorage.setItem("date", day);
    Days = day;
}

/**对话页跳转 */



