

function update_size(){
    var scene = document.getElementById("scene");

    var width = window.innerWidth;
    var height = window.innerHeight;
    var s = Math.min(width/800,height/600);

    scene.style.MozTransform = "scale("+s+","+s+")";
    document.body.style.height = height + "px";
}
update_size();
window.addEventListener("resize",update_size,true);
