// 参数在这里配置
const lkh_outNum = 10;  // 输出的次数

// version 2.0:2022-12-01
// version 1.0:2022-11-26
// -----------------[ 以下内容均是是逻辑区，不用动 ]-----------------------

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

function lkh_makecontent(number = -1) {
    let random_number = randomNum(1, (a_array.length - 1));

    let a_content = a_array[random_number];
    let b_content = b_array[random_number];

    console.log("随机 ID 是" + random_number);

    if(number !== -1){
        let a_num_c = a_array[number];
        let b_num_c = b_array[number];
        return a_num_c + "<div class='lkh_infos' num="+ number +">" + b_num_c + "<div>";
    }
    return a_content + "<div class='lkh_infos' num="+ random_number +">" + b_content + "<div>";
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
                lkh_list_i = i;
                lkh_list_num = lkh_info_list[i].getAttribute("num");

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
