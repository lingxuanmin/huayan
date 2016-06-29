var page = page || {};

//分页
page.pageModule = function(opt){
	var totalPage = opt.totalPage,
		nowpage = opt.curPage || 1,
		dom = "";

	if(nowpage > totalPage || nowpage <=0 || totalPage<=0){
		return false;
	}else if(totalPage <=5){
		for(var i=1;i<=totalPage;i++){
			if(nowpage == i){
				dom += "<a href='#"+i+"'>"+i+"</a>";
			}else{
				dom += "<a href='#"+i+"'>["+i+"]</a>";
			}

		}
	
	}else{
		//首页:第一页隐藏时出现
			if(nowpage >=4){
 				dom += "<a href='#1'>首页</a>";
			}

			//上一页
			if(nowpage >=2){
				dom += "<a href='#"+(nowpage-1)+"'>上一页</a>";
			}
		//输出5个
		for(var i=1;i<=5;i++){

			//前2页特殊处理
			if(nowpage == 1 || nowpage == 2){
				if(nowpage == i){
					dom += "<a href='#"+i+"'>"+i+"</a>";
				}else{
					dom += "<a href='#"+i+"'>["+i+"]</a>";
				}
			}else if(totalPage-nowpage < 2 ){
				//后两页特殊处理
				var m = totalPage -5 +i;
				if(nowpage == m){
					dom += "<a href='#"+m+"'>"+m+"</a>";
				}else{
					dom += "<a href='#"+m+"'>["+m+"]</a>";
				}
			}else{
				var p = nowpage -3 +i;
				if(nowpage == p){
					dom += "<a href='#"+p+"'>"+p+"</a>";
				}else{
					dom += "<a href='#"+p+"'>["+p+"]</a>";
				}
			}

		}
		//下一页
		if(nowpage < totalPage){
			dom += "<a href='#"+(nowpage+1)+"'>下一页</a>";
		}
		//尾页
		if(totalPage- nowpage >=3){
			dom += "<a href='#"+(totalPage)+"'>尾页</a>";
		}
	}

    $(".page").html(dom);


    //点击事件
    $(".page a").click(function(){
    	//获取参数
    	var nextPage = $(this).attr("href").substring(1);
    	page.pageModule({totalPage:14,
				curPage:nextPage});
    	
    });

}



$(function(){
	
	page.pageModule({totalPage:14,
				curPage:6});
});