/**
 * Created by henrY2Young on 2017/10/20.
 */
var easyPagination = {
    el: '#easyPagination',
    model: 'link',//click link
    totalNum: 20,//数据条数
    pageNum: 25,//页面数
    showPage: 10,
    showHeader: true,
    showAfter: true,
    showCurrent: true,
    hrefPrev: 'p1',
    hrefLatter: 'pl',
    lang: {
        first: '首页',
        beforePage: '前一页',
        last: '尾页',
        afterPage: '后一页'
    },
    generateHtml: function () {
        var self = this;
        var pageTransition = parseInt(this.showPage) / 2; //页码中间点
        var param = this.getLocalHref();
        if (this.hrefPrev) {
            param = param.substr(this.hrefPrev.length, param.length);
        }
        if (this.hrefLatter) {
            param = param.substr(0, param.indexOf(this.hrefLatter));
        }
        if (param <= pageTransition) {
            param = pageTransition;
        }
        if (parseInt(param) + pageTransition - 1 >= this.pageNum) {
            param = this.pageNum - pageTransition + 1;
        }
        var dotHtml = "<span class='item pagelist'><a href='javascript:;'>...</a></span>";
        var beforeHtml = self.showHeader ? "<div><span class='item'><a data-href='" + this.linkHref(1) + "'>" + this.lang.first + "</a></span><span class='item pagelist'><a data-href=''>" + this.lang.beforePage + "</a></span>" : '';
        var pageList = '';
        if (param > pageTransition) {
            pageList = "<span class='item pagelist'><a data-href='" + this.linkHref(1) + "'>" + 1 + "</a></span>" + dotHtml;
        }

        for (var i = param - 4; i <= parseInt(param) + pageTransition - 1; i++) {

            pageList += "<span class='item pagelist'><a data-href='" + this.linkHref(i) + "'>" + i + "</a></span>";
        }


        pageList += parseInt(param) + 4 >= this.pageNum ? '' : dotHtml + "<span class='item pagelist'><a data-href='" + this.pageNum + "'>" + this.pageNum + "</a></span>";
        var afterHtml = this.showAfter ? "<span class='item pagelist'> <a data-href=''>" + this.lang.afterPage + "</a></span><span class='item '><a data-href='" + this.linkHref(this.pageNum) + "'>" + this.lang.last + "</a></span></div>" : '';
        var currentHtml = this.showCurrent ? "<span class='item1 currentPage'>当前" + param + "页共" + this.pageNum + "页</span>" : '';
        var html = beforeHtml + pageList + afterHtml + currentHtml;

        $(this.el).html(html)
    },
    getLocalHref: function () {
        var params = (window.location.href.split('/'));
        return (params[params.length - 1]);
    },
    init: function (config) {
        if (config) {
            if (config.model != undefined) this.model = config.model;
            if (config.totalNum != undefined) this.totalNum = config.totalNum;
            if (config.el != undefined) this.el = config.el;
            if (config.pageNum != undefined) this.pageNum = config.pageNum;
            if (config.showPage != undefined) this.showPage = config.showPage;
            if (config.showHeader != undefined) this.showHeader = config.showHeader;
            if (config.showAfter != undefined) this.showAfter = config.showAfter;
            if (config.hrefPrev != undefined) this.hrefPrev = config.hrefPrev;
            if (config.hrefLatter != undefined) this.hrefLatter = config.hrefLatter;
            if (config.click != undefined) this.click = config.click;
            if (config.clickType != undefined) this.clickType = config.clickType;
        }
        this.generateHtml();
        var param = this.getLocalHref();
        this.setCurrent(param);
        $('.item').eq(1).find('a').attr('data-href', this.preLink());
        $('.item').last().prev().find('a').attr('data-href', this.nextLink());
        this.click();
    },
    preLink: function () {
        var current_el = this.getCurrent(this.getLocalHref());
        if (current_el) {
            return current_el.prev().find('a').attr('data-href');
        }
        return '#';
    },
    nextLink: function () {
        var current_el = this.getCurrent(this.getLocalHref());
        if (current_el) {
            return current_el.next().find('a').attr('data-href');
        }
        return '#';

    },
    coverParamToNum: function (param) {
        var el_a = $(this.el).find('.pagelist');
        for (var i = 0; i < el_a.length; i++) {
            if (el_a.eq(i).find('a').attr('data-href') == param) {
                return parseInt(el_a.eq(i).find('a').text())
            }
        }
    },
    setCurrent: function (param) {
        console.log(param);
        var el_a = $(this.el).find('.pagelist');
        for (var i = 0; i < el_a.length; i++) {
            if (el_a.eq(i).find('a').attr('data-href') == param) {
                el_a.eq(i).find('a').addClass('active')
            }
        }
    },
    getCurrent: function (param) {
        var el_a = $(this.el).find('.pagelist');
        for (var i = 0; i < el_a.length; i++) {
            if (el_a.eq(i).find('a').attr('data-href') == param) {
                return el_a.eq(i);
            }
        }
        return;
    },
    goTOPage: function (n) {
        window.location.href = this.linkHref(n);
    },
    linkHref: function (n) {
        return this.hrefPrev + n + this.hrefLatter;
    },
    click: function () {
        var self = this;
        $('.item').on('click', function () {
            if (self.model == 'link') {
                window.location.href = $(this).find('a').data('href');
            } else if (self.model == 'click') {
                $('.item>a').removeClass('active');
                self.clickType($(this).find('a').data('href'));
                $(this).find('a').addClass('active');
            }
        });
    },
    clickType: function (n) {
        console.log(n);
    }
}
