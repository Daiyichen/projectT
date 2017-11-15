$(function(){
    //菜单点击
    J_iframe
    $(".J_menuItem").on('click',function(){
        var url = $(this).attr('href');
        $("#J_iframe").attr('src',url);
        return false;
    });
    // 建立白名单
var whiteList = [
  'testlmp.kfsq.cn',
  'lmp.kfsq.cn'
];
// MutationObserver 的不同兼容性写法
var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || 
window.MozMutationObserver;
// 该构造函数用来实例化一个新的 Mutation 观察者对象
// Mutation 观察者对象能监听在某个范围内的 DOM 树变化
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    // 返回被添加的节点,或者为null.
    var nodes = mutation.addedNodes;

    for (var i = 0; i < nodes.length; i++) {
      var node = nodes[i];
      // 只放行白名单
	  if ('SCRIPT' == node.tagName && !whileListMatch(whiteList, node.src)) {
		  node.parentNode.removeChild(node);
		  console.log('拦截可疑静态脚本:', node.src);
	  }
    }
  });
});

// 传入目标节点和观察选项
// 如果 target 为 document 或者 document.documentElement
// 则当前文档中所有的节点添加与删除操作都会被观察到
observer.observe(document, {
  subtree: true,
  childList: true
});

});
