// ==UserScript==
// @name         自动登录(私有)
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Ink
// @match        http://game.wsmud.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var acc = GetQueryString("acc")
    var autologin=GetQueryString("autologin")
    //插入自动登录选择框, 名字 帐号 密码
    addLoginPanel('百姓','123123','123123')

    var acclist=new Array()

    //新增帐号配置
    //acc为登录时候的标记,menpai为登录显示的内容文字. p u s 为 document.cookie显示的cookie内容
    //下面是例子  
    //然后可以通过 http://game.wsmud.com/?autologin=1&acc=test 直接登录. 其中 autologin =0则不自动登录,只切换帐号.否则会在1秒后自动的鞥路
    
    acclist.push({'acc':'test','menpai':'测试帐号','p':'Qn9wot/623R+BT1y2S2Ehg==','u':'423278ce2a4343427d7a09c92ddff0','s':'0'});
    acclist.push({'acc':'test1','menpai':'测试帐号1','p':'Qn9wot/623R+BT1y2S2Ehg==','u':'423278ce2a4343427d7a09c92ddff0','s':'0'});


    //以下内容不需要更改
    if(acclist != null && acclist.length > 0){
        for ( var i = 0; i < acclist.length; i++) {

            addRolePanel(acclist[i].menpai,acclist[i].acc,2)
              if ( acclist[i].acc == acc ){
                   setloginCookie(acclist[i].p,acclist[i].u,acclist[i].s)
                 if(autologin != 0){
                        setTimeout(function(){
                            $("[command='SelectRole']").click()
                        },autologin* 1000);
                    //  $("[command='SelectRole']").click()
                 }
            }
        }
    }

    var nowOpen=0
    var interval
    function openNextInNewTab(){
      //  window.open("http://game.wsmud.com?autologin=1&acc="+acclist[nowOpen].acc)
        if(acclist[nowOpen].acc == 'mumu'){
            clearInterval(interval );//停止
            alert('停止开启');
            return;
        }

        window.open("http://game.wsmud.com?autologin=1&acc="+acclist[nowOpen].acc)
        nowOpen = nowOpen +1
        if(nowOpen>acclist.length-1){
            clearInterval(interval );//停止
            alert('停止开启');
        }
    }

    $("#role_panel ul li:first").append(
        $(`<li class="panel_item">全部登陆</li>`).click(function() {
           interval = setInterval(function(){openNextInNewTab() }, 2000);

        })
    );


    function addLoginPanel(name,u,p)
    {
        $("#login_panel ul").append(
            $(`<li class="panel_item">${name}</li>`).click(function() {
                $("#login_name").val(u)
                $("#login_pwd").val(p)
                setTimeout(function(){ $("[command='LoginIn']").click()}, 100);
                setTimeout(function(){ $("[command='SelectServer']").click()},1200);
                setTimeout(function(){ $("[command='SelectRole']").click()}, 1500);
            })
            )
    }


    function addRolePanel(name,roleacc,isautologin)
    {
            $("#role_panel ul li:first").append(
                $(`<li class="panel_item">${name}</li>`).click(function() {
             //     setloginCookie(p,u)
             //     window.location.reload()
               //     window.open("http://www.jb51.net");
                    window.location.href="http://game.wsmud.com?autologin="+`${isautologin}`+"&acc="+`${roleacc}`

                })
            )
    }

    function setloginCookie(p,u,s){
        setCookie('p',p)
        setCookie('u',u)
        setCookie('s',s)
    }

    function getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }

    function setCookie(name,value)
    {
        var Days = 365;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }


    function GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
        if(r!=null)return  unescape(r[2]); return null;
    }



    // Your code here...
})();
