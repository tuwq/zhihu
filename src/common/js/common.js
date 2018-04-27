// 线程睡眠
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
// 文本框自适应高度
export function makeExpandingArea(el) {  
    var setStyle = function(el) {  
        el.style.height = 'auto';  
        el.style.height = el.scrollHeight + 'px';  
        // console.log(el.scrollHeight);  
    }  
    var delayedResize = function(el) {  
        window.setTimeout(function() {  
                setStyle(el)  
            },  
            0);  
    }  
    if (el.addEventListener) {  
        el.addEventListener('input', function() {  
            setStyle(el)  
        }, false);  
        setStyle(el)  
    } else if (el.attachEvent) {  
        el.attachEvent('onpropertychange', function() {  
            setStyle(el)  
        });  
        setStyle(el)  
    }  
    if (window.VBArray && window.addEventListener) { //IE9  
        el.attachEvent("onkeydown", function() {  
            var key = window.event.keyCode;  
            if (key == 8 || key == 46) delayedResize(el);  

        });  
        el.attachEvent("oncut", function() {  
            delayedResize(el);  
        }); //处理粘贴  
    }  
}  
// 获取浏览器各相距位置
export function scroll() {  
    if(window.pageYOffset !== undefined) {  // ie9+ 高版本浏览器
        // 因为 window.pageYOffset 默认的是  0  所以这里需要判断
        return {
            left: window.pageXOffset,
            top: window.pageYOffset
        }
    }
    else if(document.compatMode === "CSS1Compat") {    // 标准浏览器   来判断有没有声明DTD
        return {
            left: document.documentElement.scrollLeft,
            top: document.documentElement.scrollTop
        }
    }
    return {   // 未声明 DTD
        left: document.body.scrollLeft,
        top: document.body.scrollTop
    }
}
// 取出句号分隔的段落
export function periodWrap(el,target) {
    var pArray = [];
    var text = el.text();
    var flag = true;
    var index,nt,p;
     while(flag) {
        index = getPeriod(text); 
        if ( index === -1) {
            flag = false
            nt = text.substr(0);
            p = $('<p>').text(nt);      
            pArray.push(p);
        }else{
            nt =  text.substr(0,index+1);
            p = $('<p>').text(nt);      
            pArray.push(p);
            text = text.substr(index+1,text.length); 
        }
    }
    el.text('');
    appendToRichText(pArray,target);
}

function getPeriod(text) {
    return text.indexOf('。');
}

function appendToRichText(pArray,target) {
    pArray.forEach((el,index) => {
        target.append(el);
    })
}

// 返回顶部
export function toTop(btn) {
    // 当前值
    var leader = 0;
    window.onscroll = function () {
        //每次移动滚动条的时候都给leader赋值，模拟leader获取距离顶部的距离
        leader = scroll().top;
        if(scroll().top>300){
            btn.show()
        }else{
            btn.hide()
        }
    }
    var timer = null;
    var target = 0;
    btn.on('click',(e) => {
         clearInterval(timer);
          timer = setInterval(function () {
            var step = (target-leader)/5;
            step = step>0?Math.ceil(step):Math.floor(step);
            leader = leader +step;
            window.scrollTo(0,leader);
            if(leader === 0){
                clearInterval(timer);
            }
        },25);
    })
}