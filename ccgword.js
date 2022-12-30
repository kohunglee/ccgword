// -----------------[ 参数配置区 ]-----------------------

const lkh_outNum = 10;  // 输出的条目数
const lkh_searchApi = "";  // 搜索 API，这里如果有地址，可以点单词搜百度，目前是句子模式，固不用了。

// -----------------[ 版本记录区 ]-----------------------

// version 2.0:2022-12-01
// version 1.0:2022-11-26

// -----------------[ 以下内容均是是逻辑区，不用动 ]-----------------------

/* 这些 a b 是演示用的 */

a = `
This was the first international treaty
Tremendous progress has been made in this direction.
This trend is expected to continue in the future.
As a result, the case goes to trial.
It is a very old trick, but it works.
The troop included 5 males and 5 females
The length of the tube is not critical.
This can save you thousands of dollars in tuition
the majority of people are unable to carry a tune
there is a light at the end of the tunnel
They are in need of a tutor.
The ultimate goal is to improve the quality of health care.
It is up to them to undertake this work.
No effort is made to undo the effect of dog
It is intended to provide universal access to health care.`;

b = `
这是第一个国际条约
在这个方向上已经取得了巨大的进展。
预计这一趋势将在未来继续下去。
结果，案件进入了审判阶段。
这是一个非常古老的技巧，但它很有效。
这支队伍包括5只雄性和5只雌性
管子的长度并不重要。
这可以为你节省数千美元的学费
大多数人都不能跑调
隧道的尽头有一线光明
他们需要一个家庭教师。
最终目标是提高医疗保健的质量。
由他们来承担这项工作。
没有努力去消除狗的影响
其目的是普及保健服务。`;


var lkh_display_end = lkh_display_end || false;

let lkh_list_i;  // 记录条目从上到下的第几位
let lkh_list_num;  // 记录条目在字典中的 ID 数字

//生成从 minNum 到 maxNum 的随机数
function randomNum(minNum,maxNum){ 
    switch(arguments.length){ 
        case 1: 
            return parseInt(Math.random()*minNum+1,10); 
            break; 
        case 2: 
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
            break; 
        default: 
            return 0; 
            break; 
    } 
} 

let a_array = a.split("\n");
let b_array = b.split("\n");

console.log("a 长度："+ a_array.length +" , b 长度："+ b_array.length )

function lkh_make_a(a_content){
    if(lkh_searchApi){
        return `<a href='${lkh_searchApi}${a_content}+' target="_blank">${a_content}</a>`;
    } else {
        return a_content;
    }
}

function lkh_makecontent(number = -1) {
    let random_number = randomNum(1, (a_array.length - 1));

    let a_content = a_array[random_number];
    let b_content = b_array[random_number];

    console.log("随机 ID 是" + random_number);

    if(number !== -1){
        let a_num_c = a_array[number];
        let b_num_c = b_array[number];
        return lkh_make_a(a_num_c) + "<div class='lkh_infos' num="+ number +">" + b_num_c + "<div>";
    }
    return lkh_make_a(a_content) + "<div class='lkh_infos' num="+ random_number +">" + b_content + "<div>";
}

function lkh_outInfo() {
    let index = 0;
    let time = lkh_outNum;  // 这个是输出的次数
    while (index < time) {
        if(index == lkh_list_i){
            lkh_e_learn_a.innerHTML += lkh_makecontent(lkh_list_num);
        } else {
            lkh_e_learn_a.innerHTML += lkh_makecontent();
        }
        index++;
    }
}

let lkh_addclick_num = 0;

function lkh_addclick(){
    let lkh_info_list = document.getElementsByClassName("lkh_infos");

    for(let i in lkh_info_list){
        lkh_info_list[i].onclick = function(){  // 点击后的动作

            if(lkh_info_list[i].style.color !== "red"){
                lkh_info_list[i].style.color = "red";
            } else { return }

            lkh_addclick_num++;

            console.log("点击了" + lkh_addclick_num);

            if(lkh_addclick_num === lkh_outNum){  // 点击第十次后的动作

            if(lkh_display_end){
                lkh_list_i = i;
                lkh_list_num = lkh_info_list[i].getAttribute("num");
            }
                lkh_e_learn_a.innerHTML = "";
                lkh_addclick_num = 0;

                likehong_e_ding.play();

                lkh_outInfo();  // 输出
                lkh_addclick(); // 添加点击事件

                // 最后，把上次最后点击的题目，触发一次点击事件
                document.getElementsByClassName("lkh_infos")[lkh_list_i].click()
            }
        } 
    }
}

lkh_outInfo();  // 输出
lkh_addclick(); // 添加点击事件
