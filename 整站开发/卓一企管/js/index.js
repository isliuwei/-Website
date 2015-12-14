$(function(){


	//搜索

	var $searchType = $('.search h3'),
		$searchSpanDown = $('.search .triangle'),
		$searchSpanUp = $('.search .uptriangle'),
		$searchTypeList = $('.search-type-list'),
		$searchIpt = $('#search-ipt'),
		$searchResult = $('.search-result');

	$searchType.on('click',function(){
		$(this).next().toggle();
		// $searchSpanDown.toggle();
		// $searchSpanUp.toggle();
	});
	// $searchType.on('click',function(){
	// 	$searchSpan.removeClass('triangle').addClass('uptriangle');
	// 	console.log($(this).html());
	// }).on('mouseout',function(){
	// 	$searchTypeList.hide();
	// 	console.log('haha');
	// });

	$('li', $searchTypeList).on('click',function(){
		$searchType.html(  $.trim($(this).text())  );
		$searchIpt.val('输入'+$.trim($(this).text())+'名称');
		$searchType.append('<span class="triangle"></span>');
		$searchTypeList.hide();
		$searchSpanDown.hide();
		$searchSpanUp.show();
	});
	$searchTypeList.on('mouseleave',function(){ //mouseenter
		$(this).hide();
	});

	//测试数据
	var testArr  = [
		{
			title: "企业管理",
			desc: "..................."
		},
		{
			title: "工商行政",
			desc: "..................."
		},
		{
			title: "人事管理",
			desc: "..................."
		},
		{
			title: "MBA",
			desc: "..................."
		},
		{
			title: "企业文化",
			desc: "..................."
		}
	];
	var index = 0;
	$searchIpt.on('focus',function(){
		$(this).val('');
	}).on('keyup',function(e){
		if(this.value && e.which != 13){
			$searchResult.empty();
			var html = '';
			for(var i=0; i<testArr.length; i++){
				var obj = testArr[i];
				if(obj.title.indexOf(this.value)!=-1){
					html+='<li>'+obj.title+'</li>'	
				}
			}
			if(html){
				$searchResult.append(html);
				$searchResult.show();
				$searchResult.children().eq(index).addClass('selected');
			}else{
				$searchResult.hide();
			}
		}else{
			$searchResult.hide();
		}	
	}).on('keydown',function(e){
		if(e.which == 38 || e.which == 40){
			if( e.which == 40 ){
				index++;
				//console.log($searchResult.children().html());
				if(index == $searchResult.children().length){
					index = 0;
				}
				$searchResult.children().eq(index).addClass('selected').siblings().removeClass('selected');
			}else if( e.which == 38 ){
				index--;
				if(index == -1){
					index = $searchResult.children().length - 1;
				}
				$searchResult.children().eq(index).addClass('selected').siblings().removeClass('selected');
			}else if( e.which == 13){
				$searchIpt.val($searchResult.children().eq(index).text());
				$searchResult.hide();
			}

		}
	});

	$searchResult.on('click','li',function(){
		$searchIpt.val($(this).html());
		$searchResult.hide();


	});




	//轮播图
	var $imgsTab = $('#imgs-box .tab'),
		$imgs = $('#imgs-box .imgs'),
		$banner = $('#banner'),
		$prev = $('#imgs-box .control .prev'),
		$next = $('#imgs-box .control .next');
	var index = 0;
	$imgs.width($(window).width()*$('div',$imgs).length);
	$('div',$imgs).width($(window).width());

	$('li',$imgsTab).on('mouseover',function(){
		index = $(this).index();
		changImgs(index);
		//$(this).addClass('selected').siblings().removeClass('selected');
		// console.log(index);
		// console.log(index*$(window).width());
		// $imgs.animate({
		// 	left: -index*$(window).width()
		// },500);
	});

	// 封装changImgs函数 参数为索引index

	function changImgs(index){
		$('li',$imgsTab).eq(index).addClass('selected').siblings().removeClass('selected');
			$imgs.animate({
				left: -index*$(window).width()
			},500);
	}

	$next.on('click',function(){
		index++;
		if(index == $('li',$imgsTab).length){
			index = 0;
		}
		changImgs(index);
	});

	$prev.on('click',function(){
		index--;
		if(index == -1){
			index = $('li',$imgsTab).length-1;
		}
		changImgs(index);
	});

	var timer;
	function play(){
		timer = setInterval(function(){
			index++;
			if(index == $('li',$imgsTab).length){
				index = 0;
			}
			changImgs(index);
		},3000);
	}

	play();

	
	$banner.hover(function(){
		clearInterval(timer);
	},function(){
		play();
	})
















});