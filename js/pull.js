/**
 *
 * @authors Your Name (you@example.org)
 * @date    2017-12-19 20:52:15
 * @version $Id$
 */

window.onload=function(){
	waterfall('main','box');
	window.onscroll=function()
	{
		var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
		//当浏览完时创建新的标签
		if(checkscrollside())
		{
			var oParent=document.getElementById('main');
			for(var i=0;i<dataInt.data.length;i++)
			{
				var oBox=document.createElement('div');
				oBox.className='box';
				oParent.appendChild(oBox);
				var oPin=document.createElement('div');
				oPin.className='pin';
				oBox.appendChild(oPin);
				var oImg=document.createElement('img');
				oImg.src='img/'+dataInt.data[i].src;
				oPin.appendChild(oImg);
			}
			waterfall('main','box');
		}
	}
}
function waterfall(parent,box){
	var oparent=document.getElementById(parent);
	var obox=getClassObj(oparent,box);
	//获得每行的列数
	var oboxw=obox[0].offsetWidth;
	var clos=Math.floor(window.screen.width/oboxw);
	oparent.style.cssText='width:'+oboxw*clos+'px';
	//创建数组存储每列的长度
	var hArr=[];
	for(var i=0;i<obox.length;i++){
		if(i<clos){
			hArr.push(obox[i].offsetHeight);
		}
		else
		{
			var omin=Math.min.apply(null,hArr);
			var oindex=hArr.indexOf(omin);
			obox[i].style.position='absolute';
			obox[i].style.top=omin+'px';
			//obox[i].style.left=oboxw*oindex+'px';
			obox[i].style.left=obox[oindex].offsetLeft+'px';
			hArr[oindex]+=obox[i].offsetHeight;
		}
	}
}
function getClassObj(parent,className){
    var obj=parent.getElementsByTagName('*');//获取 父级的所有子集
    var pinS=[];//创建一个数组 用于收集子元素
    for (var i=0;i<obj.length;i++) {//遍历子元素、判断类别、压入数组
        if (obj[i].className==className){
            pinS.push(obj[i]);
        }
    };
    return pinS;
}
function checkscrollside()
{
	var oparent=document.getElementById('main');
	var apin=getClassObj(oparent,'box');
	var lastpinH=apin[apin.length-1].offsetTop+Math.floor(apin[apin.length-1].offsetHeight)/2;
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var documentH=document.documentElement.clientHeight;
	return(lastpinH<scrollTop+documentH)?true:false;
}
