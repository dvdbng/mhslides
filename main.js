

function update_size(){
    var scene = $("#scene");

    var width = window.innerWidth;
    var height = window.innerHeight;
    var s = Math.min(width/800,height/600);

    scene.css({
        "MozTransform":"scale("+s+","+s+")",
        "WebkitTransform":"scale("+s+","+s+")"
    });
        document.body.style.height = height + "px";

    $("#footer").css("marginLeft",(width-s*800)/2 + "px")

}
update_size();
window.addEventListener("resize",update_size,true);


var $slides = $(".slide").first().addClass("active").end().attr("class","slide slide-0 slide-gte-0");
var slide_index = 0;

function slide_delta(di){
    var new_index = Math.max(Math.min(slide_index+di,$slides.length-1),0);

    if(new_index==slide_index)return;

    var $new_slide = $slides.eq(slide_index).removeAttr("active").end().eq(new_index);
    setTimeout(function(){
        $new_slide.attr("active","");
    },600);
    slide_index = new_index;
}

function slide_next(){slide_delta(1);}
function slide_prev(){slide_delta(-1);}

var subslide_index = 0;
function subslide_delta(di){
    var $slide = $slides.eq(slide_index);
    var subslide_cnt = parseInt($slide.attr("data-subslides")||0);

    var new_index = subslide_index+di;
    if(new_index < 0){
        slide_prev();
        subslide_index = 0;
        $slide.attr("class","slide slide-0 slide-gte-0");
    }else if(new_index >= subslide_cnt){
        slide_next();
        subslide_index = 0;
        $slide.attr("class","slide slide-0 slide-gte-0");
    }else if(new_index!=subslide_index){
        subslide_index = new_index;
        var cn = "slide ";
        for(var i=0;i<=subslide_index;++i){
            cn += "slide-gte-"+i+" ";
        }
        $slide.attr("class",cn+"slide-"+subslide_index);
    }
    subslide_handler(slide_index,subslide_index);
}
function subslide_next(){subslide_delta(1);}
function subslide_prev(){subslide_delta(-1);}



var debug_elm = $();
function debugPos(sel){
    debug_elm = $(sel);
}

$(document).mousemove(function(e){
    debug_elm.css({
        "position":"absolute",
        "top" : e.pageY + "px",
        "left" : e.pageX + "px"
    });
});
$(document).click(function(e){
    console.log(e.pageX + "," + e.pageY);
    subslide_next();
});

$(document).keypress(function(e){
    if(e.keyCode == 39){
        subslide_next();
    }else if(e.keyCode == 37){
        subslide_prev();
    }
});


/**************/

var $items = $(".item[data-order]");
function subslide_handler(slide,subslide){
    if(slide==1 || slide==2){
        $items.each(function(e){
            var $e = $(this);
            if(parseInt($e.attr("data-order")) <= subslide){
                $e.addClass("active");
            }else{
                $e.removeClass("active");
            }
        });

        var item = $(".item[data-order="+subslide+"]");
        var year = item.parents().filter(".year");
        $(".year.yearactive").removeClass("yearactive");
        year.addClass("yearactive");

        $(".yearmedia.active").removeClass("active");
        var media_selector = item.attr("data-media");
        if(media_selector){
            $(media_selector).addClass("active");
        }

        $("#year-title").text([
                "PAST: History and background",
                "PRESENT: Key facts and numbes: How do we work?",
                "FUTURE: Challenges"
            ][year.attr("data-title")]);

        $("#years-container").css("margin-left","-" + year.attr("data-x") + "px");
    }else if(slide==3){
        if(subslide==1){
            setTimeout(function(){
                $("#video")[0].play();
            },1000);
        }else{
            var video = $("#video")[0];
            video.pause();
            video.currentTime = 0;
        }
    }

    $("#footer")[slide==0?"removeClass":"addClass"]("active");
}


slide_delta(0);
//subslide_delta(2);
