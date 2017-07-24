/**
 * Created by 杭 on 2017/7/24.
 */
import $ from 'jquery';

export function Tooltip($target,data){
     this.init($target);
     this.render(data);
     this.bindEvent();
}

Tooltip.prototype={
    init($target){
        this.$target = $target;
    },
    render(data){
        this.$tooltip = $("<div class='tooltip'></div>");
        this.$tooltip.appendTo($("body")).css({
            width: "200px",
            position: "absolute",
            fontSize: "12px",
            textWrap: "suppress"

        });
        data=data.join('、');
        this.$tooltip.text(data);
        this.$tooltip.hide();
    },
    bindEvent(data){
        let self = this;
        this.$target.on("mousemove",function (e) {
            self.$tooltip.show().css({
                top: e.pageY,
                left: (e.pageX+20),
                background: "white",
                "z-index": "2"
            });
        });
        this.$target.on("mouseleave",function () {
            self.$tooltip.hide();
        })
    }
};
