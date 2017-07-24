/**
 * Created by 杭 on 2017/3/3.
 */
import $ from 'jquery';
import '../css/viewData/style.scss';
import {Tooltip} from './tooltip.js'

$(function () {
    //渲染出初始的元素
    let html = '<div id="container">' +
        '<h1 id="creatTitle" class="creatTitle"></h1>' +
        '<hr />' +
        ' <div id="question-list"></div>' +
        '<hr />' +
        '<button id="return-btn">返回</button>' +
        '</div>';
    $(html).appendTo($("main"));

    //点击返回
    $("#return-btn").click(function () {
        window.history.back();
    });

    let aSubmitQues=JSON.parse(localStorage.submitQues)[localStorage.submitIndex],
        optionLen=aSubmitQues.question.length,
        data=aSubmitQues.value,
        allScaleArr=[];

    $("#creatTitle").text(aSubmitQues.title);

    if(!data.length) {
        $("#question-list").text("暂时还没有人填写问卷。。。");
    }else {

        for(let i=0;i<optionLen;i++){
            let $div=$("<div class='question-option'></div>").addClass(aSubmitQues.type[i]);
            $div.append($("<h3></h3>").text(aSubmitQues.question[i]));
            if(typeof data[i][0]=="number"){
                let $canvas=$("<canvas width='220px' height='220px' id='drawing'></canvas>"),
                    $describe=$("<div class='describe'></div>"),
                    aQuestionData=eval(data[i].join("+")),
                    drawing=$canvas[0],
                    fillColors=["blue","red","green","black","pink","orange","grey","gold","white"];
                $div.append($canvas).append($describe);

                let a=0,b=0,aScaleArr=[];
                for(let f=0,len=data[i].length;f<len;f++){
                    let context=drawing.getContext("2d");
                    context.beginPath();
                    let percentage=(data[i][f]/aQuestionData),
                        scale=percentage.toFixed(2);
                    scale=scale>0 ? (scale*100+"%"): 0 ;
                    aScaleArr.push(aSubmitQues.answers[i][f]+": "+scale);
                    b=a+(2*Math.PI)*percentage;
                    context.arc(110,110,100,a,b,false);
                    context.lineTo(110,110);
                    a=b;
                    context.fillStyle=fillColors[f];
                    context.globalAlpha=0.35;
                    context.fill();
                    context.closePath();
                    //下方描述
                    $("<span>"+aSubmitQues.answers[i][f]+"</span><span class='"+fillColors[f]+"'></span>").appendTo($describe);
                }
                allScaleArr.push(aScaleArr)
            }else{
                for(let f=0,len=data[i].length;f<len;f++){
                    $("<p></p>").text(data[i][f]).appendTo($div);
                }
            }

            $("#question-list").append($div);
        }
    }

    let $canvasEles = $("canvas");
    for(let i=0,len=$canvasEles.length;i<len;i++){
        new Tooltip($canvasEles.eq(i),allScaleArr[i])
    }
});