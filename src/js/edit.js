/**
 * Created by 杭 on 2017/7/10.
 */
import $ from 'jquery';
import { Modal } from './modal.js';
import '../css/common/Font-Awesome-3.2.1/css/font-awesome.min.css'

export function init() {
    //渲染初始元素
        let html = '<div id="container">' +
            '<div id="wenjuan">' +
            '<h1 id="creatTitle" class="creatTitle">这里是标题</h1><hr />' +
            '<div id="question-list"></div></div>' +
            '<div id="question-type">' +
            '<button id="audio-type"><i class="icon-circle-blank icon-large"></i> 单选</button>' +
            '<button id="checkbox-type"><i class="icon-check-empty icon-large"></i> 多选</button>' +
            '<button id="text-type"><i class="icon-book icon-large"></i> 文本</button></div>' +
            '<div id="add-question"><i class="icon-plus icon-large"></i> 添加问题</div><hr/>' +
            '<div id="my-calender">' +
            '<span id="date-group">' +
            '<label id="date" for="mydatepicker">问卷截止日期</label> &nbsp;<input readonly id="mydatepicker" type="text" name="mydatepicker" />' +
            '</span>' +
            '<span id="button-group"> <button id="save-question">保存问卷</button>&nbsp;&nbsp;&nbsp; <button id="submit-question">发布问卷</button> </span>' +
            ' </div></div>';
        $(html).appendTo($("main"));

        $("#question-type").hide();
        $("#add-question").click(function () {
            $("#question-type").slideToggle("fast");
        });
        $("#audio-type").click(function () {
            $("#question-type").hide();
            let $quesList=$("#question-list"),
                $div=$("<div class='question-option'>" +
                "<h3 class='audio-question'>Q<span class='index'></span> <span class='editable'> 单选题</span></h3>" +
                "<P><i class='icon-circle-blank'></i><span class='editable'> 选项1</span> <i class='icon-trash remove-option'></i></P>" +
                "<P><i class='icon-circle-blank'></i><span class='editable'> 选项2</span> <i class='icon-trash remove-option'></i></P>" +
                "<P><i class='icon-circle-blank'></i><span class='editable'> 选项3</span> <i class='icon-trash remove-option'></i></P>" +
                "<p class='add-option add-audio-option'><i class='icon-plus'></i></p>" +
                "<ul><li class='delete-question'>删除</li>" +
                "<li class='clone-question'>复用</li>" +
                "<li class='go-down'>下移</li>" +
                "<li class='go-up'>上移</li></ul></div>");
            $quesList.append($div);
            let n=$div.prevAll().length;
            $div.find(".index").text(n+1);
        });
        $("#checkbox-type").click(function () {
            $("#question-type").hide();
            let $quesList=$("#question-list"),
                 $div=$("<div class='question-option'>" +
                "<h3 class='checkbox-question'>Q<span class='index'></span> <span class='editable'> 多选题</span></h3>" +
                "<P><i class='icon-check-empty'></i><span class='editable'> 选项1</span> <i class='icon-trash remove-option'></i></P>" +
                "<P><i class='icon-check-empty'></i><span class='editable'> 选项2</span> <i class='icon-trash remove-option'></i></P>" +
                "<P><i class='icon-check-empty'></i><span class='editable'> 选项3</span> <i class='icon-trash remove-option'></i></P>" +
                "<p class='add-option add-check-option'><i class='icon-plus'></i></p>" +
                "<ul><li class='delete-question'>删除</li>" +
                "<li class='clone-question'>复用</li>" +
                "<li class='go-down'>下移</li>" +
                "<li class='go-up'>上移</li></ul></div>");
            $quesList.append($div);
            let n=$div.prevAll().length;
            $div.find(".index").text(n+1);
        });
        $("#text-type").click(function () {
            $("#question-type").hide();
            let $quesList=$("#question-list"),
                $div=$("<div class='question-option'>" +
                "<h3 class='needWords'>Q<span class='index'></span> <span class='editable'> 文本题</span></h3>" +
                "<textarea name='' id='' cols='60' rows='3'></textarea>" +
                "<ul><li class='delete-question'>删除</button></li>" +
                "<li class='clone-question'>复用</li>" +
                "<li class='go-down'>下移</li>" +
                "<li class='go-up'>上移</li></ul></div>");
            $quesList.append($div);
            let n=$div.prevAll().length;
            $div.find(".index").text(n+1);
        });
        //点击删除,下移，上移，复用问题；
        $("#question-list").click(function (e) {
            let $currEle=$(e.target).parents(".question-option"),
                $targetEle=$(e.target),
                $nextEle= $currEle.next(),
                $prevEle=$currEle.prev();
            if (e.target.className==="delete-question") {
                $currEle.remove();
            }else if(e.target.className==="go-down"){
                $nextEle.after($currEle);
            }else if(e.target.className==="go-up"){
                $prevEle.before($currEle);
            }else if(e.target.className==="clone-question"){
                $currEle.after($currEle.clone());
            }else if(e.target.className==="editable"){
                let $thisEle=$(e.target),
                    oldText=$thisEle.text(),
                    $input=$("<input type='text' class='input-edit' value='"+oldText+"'/>");

                $thisEle.html($input);
                $input.trigger("focus");
                $input.blur(function () {
                    if(newText !== oldText){
                        var newText=$input.val();
                        oldText=newText;
                    }
                    $thisEle.text(oldText);
                });
                return;
            } else if(e.target.className==="remove-option"){
                $(e.target).parents("p").remove();
                return;
            }

            for(let i=0,len=$(".question-option").length;i<len;i++){
                let n=$(".question-option").eq(i).prevAll().length;
                $(".question-option").eq(i).find(".index").text(n+1);
            }

        });

        $(document).on("click",".add-audio-option",function () {
            let $newOption=$("<p><i class='icon-circle-blank'></i> <span class='editable'>选项</span>" +
                " <i class='icon-trash remove-option'></i></p>");
            $(this).before($newOption);
        });
        $(document).on("click",".add-check-option",function () {
            let $newOption=$("<p><i class='icon-check-empty'></i> <span class='editable'>选项</span>" +
                " <i class='icon-trash remove-option'></i></p>");
            $(this).before($newOption);
        });
        $(document).on("click",".remove-option",function () {
            $(this).parent("p").remove();
        });

        $("#container").click(function (e) {
            if(e.target.className==="creatTitle"){
                let $thisEle=$(e.target),
                    oldText=$thisEle.text(),
                    $input=$("<input type='text' class='input-edit' value='"+oldText+"'/>");

                $thisEle.html($input);
                $input.trigger("focus");
                $input.blur(function () {
                    if(newText !== oldText){
                        var newText=$input.val();
                        oldText=newText;
                    }
                    $thisEle.text(oldText);
                    if($thisEle.text()===""){
                        $thisEle.text("这里是标题");
                    }
                })
            }
        });
}

export let BtnFunction ={
    //点击保存问卷，弹出对话框，并保存。
      saveQues :function () {
          new Modal({
              title : "提示",
              body : "问卷已保存",
              noCancel : true ,
              confirmAim : "close-modal"
          });
          let aSavedQuestionnaire={
              title:"",
              date:"",
              html:""
          };
          aSavedQuestionnaire.title=$("#creatTitle").text();
          aSavedQuestionnaire.date=$("#mydatepicker").val();
          aSavedQuestionnaire.html=$("#question-list").html();
          return aSavedQuestionnaire;
      },

    //点击发布问卷弹出对话框
    submitQuesBtn:function () {
        let bodyContent = "",
            noCancel = false,
            confirmAim = "";
        if(!$("#mydatepicker").val()){
            bodyContent="请设置问卷截止日期。";
            noCancel = true ;
            confirmAim = "close-modal"
        }else if (!$("#question-list").children().length){
            bodyContent="请合理设置问卷内容。";
            noCancel= true;
            confirmAim = "close-modal"
        }else{
            bodyContent="是否发布问卷？";
            noCancel =false;
            confirmAim = "confirm-submit-question";
        }
        new Modal({
            title : "提示",
            body : bodyContent,
            noCancel : noCancel ,
            confirmAim : confirmAim
        });
    },

    //发布问卷前将问卷信息放入WJOption中；
    submitQues:function () {
        let WJOption={
            title:"",
            date:"",
            question:[],
            answers:[],
            type:[],
            value:[]
        };
        for(let i=0,len=$(".question-option").length;i<len;i++){
            let questionOption=$(".question-option")[i];
            WJOption.question.push(questionOption.getElementsByTagName("h3")[0].innerText);
            WJOption.type.push(questionOption.getElementsByTagName("h3")[0].className);
            let aOption=[],
                aOptionEle=questionOption.getElementsByTagName("p");
            for(let f=0,len=aOptionEle.length;f<len;f++){
                if($(aOptionEle[f]).hasClass("add-option")){
                    continue;
                }
                aOption.push(aOptionEle[f].innerText);
            }
            WJOption.answers.push(aOption);
        }
        WJOption.title=$("#creatTitle").text();
        WJOption.date=$("#mydatepicker").val();
        let submitQues=localStorage.submitQues? JSON.parse(localStorage.submitQues):[];
        submitQues.push(WJOption);
        localStorage.submitQues=JSON.stringify(submitQues);
    }
};