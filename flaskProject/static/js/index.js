stuId = 123

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

// 书籍数据
const bookLists = [{
    picture: 'image/book1.png',
    bookName: '时代科技',
},
{
    picture: 'image/book2.png',
    bookName: '活着',
},
{
    picture: 'image/book3.png',
    bookName: '志当存高远',
}
]

// 人物列表数据
const per = [{
    picture: 'image/per1.png',
    uname: '张三'
}, {
    picture: 'image/per2.png',
    uname: '李四'
}]

//初始化
init();

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
        url: f_data["urlPre"]+'/bookRecommend?stuId='+stuId,
        success: function (data) {
            data = data.replace(/'/g, '"'); // parse解析要求都双引号
            data = JSON.parse(data);
            if (data.code === 1) {
                console.log('接收成功，返回如下。');
                console.log(data);

                var bookList = data.data; // 获取书籍数据数组

                // 获取空的<ul>元素
                var booksWrap = document.getElementById("booksWrap");

                // 遍历书籍数据并动态插入<li>元素
                bookList.forEach(function (book) {
                    // 创建一个新的<li>元素
                    var li = document.createElement("li");
                    // 设置自定义属性 data-bookid，用于存储 bookId
                    li.setAttribute("data-bookid", book.bookId);
                    li.className = 'bookLi'
                    // 绑定点击事件
                    li.addEventListener("click", function() {showBook(book.bookId)});
                    // 创建<a>元素
                    var a = document.createElement("a");
                    a.className = "bookA";
                    // 创建<img>元素
                    var img = document.createElement("img");
                    img.src = book.bookImg;
                    img.alt = "";
                    img.className = 'bookImg'
                    // 创建<div>元素用于书籍标题
                    var div = document.createElement("div");
                    div.className = "bookTitle";
                    div.textContent = book.bookName;
                    
                    // 将<img>和<span>元素添加到<a>元素中
                    a.appendChild(img);
                    a.appendChild(div);
                    
                    // 将<a>元素添加到<li>元素中
                    li.appendChild(a);
                    
                    // 将<li>元素添加到<ul>元素中
                    booksWrap.appendChild(li);
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

    // 个性化推荐界面 -> 学生学习伙伴
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
                    li.setAttribute("data-stuId", fri.stuId);
                    li.className = 'friLi'
                    if(fri.is_fri == 1){
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
                    img.src = fri.stuImg;
                    img.alt = "";
                    img.className = 'stuImg'
                    // 创建<span>用于学生姓名
                    var span = document.createElement("span");
                    span.className = "uname";
                    span.textContent = fri.stuName;
                    // 创建<span>用于添加的icon
                    var span1 = document.createElement("span");
                    span1.className = "icon-plus-circle1";
                    // 将<img>和<span>元素添加到<div>元素中
                    div.appendChild(img);
                    div.appendChild(span);
                    div.appendChild(span1);
                    li.appendChild(div);
                    // 为这个点击icon绑定点击事件
                    span1.addEventListener("click", function() {
                        alert('添加成功');
                        // 这里先不对后端数据库做修改…因为数据有限；当然要改也可以，再加一个删掉好友的就可以方便修改数据库了
                        li.style.background="skyblue"
                    });
                    
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
    } else {
        rightCon1.style.display = 'none'
        rightCon2.style.display = 'flex'
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
        data = data.真教.词性;
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
function showBook(bookId) {
    rightCon1.style.display = 'none'
    rightCon2.style.display = 'none'
    rightBook.style.display = 'block'

    console.log(bookId);
    $.ajax({
        type: 'get',
        url: 'http://localhost:5000/bookDetail?bookId='+bookId,
        success: function (data) {
            data = data.replace(/'/g, '"'); // parse解析要求都双引号
            data = JSON.parse(data);
            if (data.code === 1) {
                console.log('接收成功，返回如下。');
                console.log(data);

                data = data.data; // 获取具体内容

                var author = data.author;
                var bookImg = data.bookImg;
                var bookName = data.bookName;
                var introduce = data.introduce;

                var au = document.getElementById('author')
                var Im = document.getElementById('bookImg')
                var Na = document.getElementById('bookName')
                var In = document.getElementById('introduce')

                au.textContent  = author
                Im.src = bookImg
                Na.textContent  = bookName
                In.textContent  = introduce
            } else {
                console.log('接收返回，但出错。')
                console.log(data.msg);
            }
        },
        error: function (xhr, status, error) {
            console.log('请求出错：' + error);
        }
    });
}

// 实际书籍返回
const bookRe = document.querySelector('.right_book .icon-back')
bookRe.addEventListener('click', function () {
    rightCon1.style.display = 'none'
    rightCon2.style.display = 'flex'
    rightBook.style.display = 'none'
})

// 个性化推荐 -> 点击个人头像
function getPerEchart() {
    const cirPic = document.querySelector('.cirPic')
    const zzPic = document.querySelector('.zzPic')
    var perCirChart = echarts.init(cirPic, 'westeros'); // 在初始化 ECharts 图表时，第二个参数指定了要使用的主题类型。
    var perZzChart = echarts.init(zzPic, 'westeros');
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
                data: [ // 每个元素表示一个扇形（饼图的一部分）
                    { value: 1048, name: '文学类' }, // value: 表示这个扇形的数值；name: 表示这个扇形的名称
                    { value: 735, name: '艺术类' },
                    { value: 580, name: '历史类' },
                    { value: 484, name: '诗歌类' }
                ],
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
    var zzOption = {
        title: {
            text: '阅读小时数',
            left: 'center'
        },
        xAxis: {
            type: 'category',
            splitLine: { show: false },
            data: ['0-4', '4-8', '8-12', '12-16', '16-20', '20-24'],
            name: '小时'
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
                data: [0.5, 0.8, 2, 1.3, 1, 1.6],
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
        perCirChart.resize();
    });

    window.addEventListener("resize", function () {
        perZzChart.resize();
    });

    perCirChart.setOption(cirOption, true);
    perZzChart.setOption(zzOption, true);


    // 词云制作
    var data = [
        { name: "善良", value: 45, },
        { name: "正直", value: 41, },
        { name: "勇敢", value: 32, },
        { name: "宽容", value: 33, },
        { name: "自律", value: 35, },
        { name: "诚信", value: 20, },
        { name: "谦虚", value: 23, },
        { name: "公正", value: 15, }
    ];
    const cyPic = document.querySelector('.cyPic')
    var cyChart = echarts.init(cyPic);
    var w = cyPic.width;
    var h = cyPic.height;
    var cyOption = {
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
    cyChart.setOption(cyOption);
    window.onresize = cyChart.resize;

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


