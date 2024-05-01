$(document).ready(function() {
    $(".Dlight-div").mousemove(function(event) {
        var x = event.pageX - this.offsetLeft; // 獲得滑鼠相對於 div 左側的水平位置
        var y = event.pageY - this.offsetTop;  // 獲得滑鼠相對於 div 頂部的垂直位置
        var width = $(this).width();           // div 的寬度
        var gradientX = x / width * 100;       // 計算漸變中心點的百分比位置

        // 更新背景漸變，使漸變中心跟隨滑鼠位置
        $(this).css("background", `linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) ${gradientX}%, rgba(128,186,232,0) 99%, rgba(125,185,232,0) 100%)`);
    }).mouseleave(function() {
// 當滑鼠離開 div 時，恢復背景到初始狀態
$(this).css("background", 'rgba(255,255,255,0.1)');
});
});