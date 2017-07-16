/**
 * Created by 杭 on 2017/3/3.
 */
import '../css/fillQuestionnaire/style.scss';
import $ from 'jquery';
import { Modal} from './modal.js';
$(function () {
    //渲染出初始的元素
    let html = '<div id="container">' +
                    '<h1 id="creatTitle" class="creatTitle"></h1><hr />' +
                    '<div id="question-list"></div><hr />' +
                    '<button id="submit-questionnaire">提交问卷</button>' +
                '</div>';
    $(html).appendTo($("main"));

    let submitQues=JSON.parse(localStorage.submitQues),
        aSubmitQues=submitQues[localStorage.submitIndex],
        optionLen=aSubmitQues.question.length;

//渲染出问卷内容
    $("#creatTitle").text(aSubmitQues.title);
    for(let i=0;i<optionLen;i++){
        let $div=$("<div class='question-option'></div>").addClass(aSubmitQues.type[i]);
        $div.append($("<h3></h3>").text(aSubmitQues.question[i]));
        if(aSubmitQues.type[i] === "needWords"){
            $("<textarea rows='3'></textarea>").appendTo($div);
        }else if(aSubmitQues.type[i] === "audio-question"){
            for(let f=0,len=aSubmitQues.answers[i].length;f<len;f++){
                $("<p answer='0'><i class='icon-circle-blank'></i> <span></span></p>").appendTo($div).children("span").text(aSubmitQues.answers[i][f]);
            }
        }else {
            for(let f=0,len=aSubmitQues.answers[i].length;f<len;f++){
                $("<p answer='0'><i class='icon-check-empty'></i> <span></span></p>").appendTo($div).children("span").text(aSubmitQues.answers[i][f]);
            }
        }

        $("#question-list").append($div);
    }

//点击选项颜色变化
    $(document).on("click",".audio-question p",function () {
        $(this).attr("answer","1").siblings().attr("answer","0");
        $(this).children("i").removeClass("icon-circle-blank").addClass("icon-circle");
        $(this).siblings().children("i").removeClass("icon-circle").addClass("icon-circle-blank");
    });
    $(document).on("click",".checkbox-question p",function () {

        if($(this).attr("answer") == 1){
            $(this).attr("answer","0").children("i").removeClass("icon-check").addClass("icon-check-empty");
        }else {
            $(this).attr("answer","1").children("i").removeClass("icon-check-empty").addClass("icon-check");
        }
    });
//获取当前这个人的数据
    function getData(){
        let  aPeopleData=[];
        for(let i =0;i<optionLen; i++){
            let questionOption=$(".question-option")[i],
                aOption=[],
                aOptionEle=questionOption.getElementsByTagName("p");
            for(let f=0,len=aOptionEle.length;f<len;f++){
                aOption.push(Number(aOptionEle[f].getAttribute("answer")));
            }
            if(aOption.length==0){
                aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
            }
            aPeopleData.push(aOption);
        }
        return aPeopleData;
    }

    function isFinish(data) {
        for(let i=0,len=data.length;i<len;i++){
            if(typeof data[i][0]=="number" && eval(data[i].join("+"))==0){
                return false;
            }else if(typeof data[i][0] !=="number" && data[i][0].length==0 ){
                return false;
            }
        }
        return true;
    }
//点击提交问卷
    $("#submit-questionnaire").click(function () {
        let aPeopleData = getData();
        if(isFinish(aPeopleData)){
            new Modal({
                title:"提示",
                body:"确认提交问卷？",
                noCancel:false,
                confirmAim:"confirm-fill"
            })
        }else {
            new Modal({
                title:"提示",
                body:"请完整填写问卷。",
                noCancel:true,
                confirmAim:"close-modal"
            })
        }
    });

//弹出框符合要求点击确定后
    $(document).on("click",".confirm-fill",function () {
        if(aSubmitQues.value.length==0){
            for(let i =0;i<optionLen; i++){
                let questionOption=$(".question-option")[i];
                let aOption=[],
                    aOptionEle=questionOption.getElementsByTagName("p");
                for(let f=0,len=aOptionEle.length;f<len;f++){
                    aOption.push(Number(aOptionEle[f].getAttribute("answer")));
                }
                if(aOption.length==0){
                    aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
                }
                aSubmitQues.value.push(aOption);
            }
        }else{
            for(let i =0 ;i<optionLen; i++){
                let questionOption=$(".question-option")[i];
                let aOption=aSubmitQues.value[i],
                    aOptionEle=questionOption.getElementsByTagName("p");
                console.log(aOptionEle.length);
                for(let f=0,len=aOptionEle.length;f<len;f++){
                    aOption[f]=Number(aOption[f])+Number(aOptionEle[f].getAttribute("answer"));
                }
                if(typeof aOption[0] !=="number"){
                    aOption.push(questionOption.getElementsByTagName("textarea")[0].value);
                }
            }
        }
        localStorage.submitQues=JSON.stringify(submitQues);
        window.location.href="index.html";
    });
});


