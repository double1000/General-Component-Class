/**
 * Weight,是一个通用组件,依赖jQuery?
 * Weight.on(type,handler):param{type} 自定义事件的类型 param{handler} 事件执行函数
 * Weight.fire(type):param{type} 需要释放(执行)的自定义事件
 * Weight.renderUI(),渲染DOM事件
 * Weight.bindUI(),绑定DOM操作事件
 * Weight.syncUI(),DOM样式设置
 * Weight.destructor(),回收
 * Weight.destory(),销毁
 * Weight.render(),初始化事件默认绑定执行了renderUI,bindUI,syncUI
 */
;(function () {
    function Weight() {
        this.element = null;
    };
    
    Weight.prototype = {
        constructor:Weight,
        // 注册事件
        on:function (type,handler) {
            if(typeof this.handlers[type] == "undefined"){
                this.handlers[type] = [];
            }
            this.handlers[type].push(handler);
            return this;
        },
        // 执行事件
        fire:function (type,data) {
            if(this.handlers[type] instanceof Array){
                var handlers = this.handlers[type];
                for(var i=0,len=handlers.length;i<len;i++){
                    handlers[i](data);
                }
            }
        },
        // 渲染DOM事件
        renderUI:function () {},
        // 绑定DOM操作事件
        bindUI:function () {},
        // DOM样式设置
        syncUI:function () {},
        // 回收
        destructor:function () {},
        // 销毁事件
        destory:function () {
            // 销毁事件过后一般都需要执行回收操作
            this.destructor();
            // 在当前这个函数中移除一个或者多个事件的事件处理函数
            this.element.off();
            // 移除元素
            this.element.remove();
        },
        // 初始化事件
        render:function (container) {
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            $(container||document.body).append(this.element);
        }
    };

    return{
        Weight : Weight
    }

})();