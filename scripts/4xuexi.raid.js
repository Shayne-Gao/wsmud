//一键学习
//@author 墨匿
// 全流程学习  学习 - 练习 - 打坐(挖矿)
@toolbar score
@js ($menpai)=$("[data-prop='family']").text()
@js ($shifu)=$("[data-prop='master']").text()
@js ($role_level)=$("[data-prop='level']").text()
//这里自己填写技能学习顺序

($xue_queue)=空
($lianxi_queue)=空
[if] (shifu) == 雾中楼
    ($xue_queue)=taxuexunmei,mantianhuayu
    ($lianxi_queue)=whip,yunlongbian,force,shashengjue
[if] (shifu) == 逍遥子
    ($xue_queue)=lingboweibu
    ($lianxi_queue)=beimingshengong,blade,sword,unarmed,parry,dodge
[if] (shifu) == 灭绝
    ($xue_queue)=dodge,linjizhuang,unarmed,jindingzhang
    ($lianxi_queue)=juemengun,club,juemengun
[if] (shifu) == 风清扬
    ($lianxi_queue)=zixiashengong,dodge,unarmed,poyuquan


[if] (afterLearn) == null
    ($afterLearn) = 帮派打坐
    [if] (menpai) == 逍遥派
        ($afterLearn)=挖矿
[if] (learnSet) == null
    ($learnSet) = 2
[if] (learnMax) == null
    [if] (role_level) == 武师
        ($learnMax) = 800
    [else]
        ($learnMax) = 1000 
[if] (usePill) == null
    ($usePill) = 是
#select ($afterLearn) = 学习练习结束之后干什么?,帮派打坐|挖矿,(afterLearn)
#select ($learnSet) = 学习套装,1|2|3,2
#input ($learnMax) = 练习到多少级?,(learnMax)
#input ($xue_queue) = 学习队列 逗号分隔,(xue_queue)
#input ($lianxi_queue) = 练习队列 逗号分隔,(lianxi_queue)
#select ($usePill) = 练习时候吃冰心丹?,是|否,否

#config


<-stopSSAuto


[if] (shifu) == 谷虚道长||(shifu) == 宋远桥
    ($Location) = 武当派-三清殿
[if] (shifu) == 张三丰
    ($Location) = 武当派-后山小院
[if] (shifu) == 清乐比丘
    ($Location) = 少林派-广场
[if] (shifu) == 道绝禅师
    ($Location) = 少林派-天王殿
[if] (shifu) == 慧合尊者
    ($Location) = 少林派-般若堂
[if] (shifu) == 澄净
    ($Location) = 少林派-罗汉堂
[if] (shifu) == 玄难
    ($Location) = 少林派-方丈楼
[if] (shifu) == 高根明
    ($Location) = 华山派-镇岳宫
[if] (shifu) == 岳不群
    ($Location) = 华山派-客厅
[if] (shifu) == 封不平
    ($Location) = 华山派-林间小屋
[if] (shifu) == 风清扬
    ($Location) = 华山派-落雁峰
[if] (shifu) == 苏梦清
    ($Location) = 峨眉派-庙门
[if] (shifu) == 静心
    ($Location) = 峨眉派-大殿
[if] (shifu) == 周芷若
    ($Location) = 峨眉派-小屋
[if] (shifu) == 灭绝
    ($Location) = 峨眉派-清修洞
[if] (shifu) == 薛慕华
    ($Location) = 逍遥派-木屋
[if] (shifu) == 苏星河
    ($Location) = 逍遥派-青草坪
[if] (shifu) == 逍遥子
    ($Location) = 逍遥派-地下石室
[if] (shifu) == 左全
    ($Location) = 丐帮-树洞下
[if] (shifu) == 简长老
    ($Location) = 丐帮-土地庙
[if] (shifu) == 鲁有脚
    ($Location) = 丐帮-林间小屋
[if] (shifu) == 洪七公
    ($Location) = 丐帮-林间小屋
[if] (shifu) == 何小二
    ($Location) = 杀手楼-大厅
[if] (shifu) == 李四
    ($Location) = 杀手楼-银楼
[if] (shifu) == 雾中楼
    ($Location) = 杀手楼-书房
[if] (shifu) == 武馆教习
    ($Location) = 扬州城-扬州武馆



$wait 500

//先去学习
stopstate;$to (Location)
$eq (learnSet)
($needStudy) = true
($needPractice) = true
($isStudy) = false
($isPractice) = false
<---
//[if] (needStudy) == true || (needPractice) == true
[if] (isStudy) == true || (isPractice) == true
    [while] true
        [if] (isStudy) == true
            @print <hir>学习(current_skill)中.. 鼓舞(:status success)<hir>
        [else if] (isPractice) == true
            @print <hir>练习(current_skill)中.. 鼓舞(:status success)<hir>
        @print ->学习:(xue_queue)
        @print    ->练习:(lianxi_queue)
        @print      ->(afterLearn)

        [if] (isStudy) == true && {r(shifu)}? == null 
            @print <hir>退出!你的师傅不在了...</hir>
            ($needStudy)=false
            [break]

        //根据参数来判断是否检测BUFF并且退出 一般是看鼓舞
        [if] (arg0) != null  && (:status (arg0)) == false 
            //如果冰心丹还在 也不退出
            [if] (usePill) == 是 && (:status food)==true
                [continue]
            ($needStudy) = false
            ($needPractice) = false
            @print <hir>退出学习和练习!鼓舞消失...</hir>
            stopstat
            $zdwk
            [break]
        //练习吃冰心丹检测
        [if] (isPractice) == true && (usePill) == 是 && {b冰心丹}? != null && (:status food)==false  
            @print <hir>练习中,补吃药</hir>
            stopstate
            use {b冰心丹}?
            lianxi (current_skill) (learnMax)

        [if] (:state) == 挖矿
            @print <hir>执行下一项!你跑去挖矿了</hir>
            stopstate;$to (Location)
            [break]
        [if] (:state) == 发呆
            $wait 500
            [if] (:state) == 发呆
                @print <hir>执行下一项!你在发呆...</hir>
                stopstate;$to (Location)  
                [break]     
        $wait 12130
--->
//解析学习队列并执行
[if] (xue_queue) != 空 && (needStudy) == true
    @js ($xue_length) = "(xue_queue)".split(",").length
    ($num)=0
    [while](num) < (xue_length)
       @js ($current_skill) = "(xue_queue)".split(",")[(num)]
       ($num) = (num) + 1
       @print <hir>当前学习:(current_skill)</hir>
       [if] (needStudy) == true
           ($isStudy) = true
           xue (current_skill) from {r(shifu)}?
           ($isStudy) = false

($needStudy) = false
//学习完队列里所有的,进入练习流程
@print  <hir>学习完毕(或者全部失败),开始去练习</hir>


//解析练习队列并执行
[if] (lianxi_queue) != 空 && (needPractice) == true
    ($Location) = 帮会-练功房
    $to ($Location)
    @js ($lianxi_length) = "(lianxi_queue)".split(",").length
    ($num)=0
    [while](num) < (lianxi_length)
       @js ($current_skill) = "(lianxi_queue)".split(",")[(num)]
       ($num) = (num) + 1
       @print <hir>当前练习:(current_skill)</hir>
       [if] (needPractice) == true
           ($isPractice) = true
           lianxi (current_skill) (learnMax)
           ($isPractice) = false


//练习学习都结束 ,按照指定的执行下一个动作
($needStudy)=false
($needPractice) = false
@print  <hir>学习练习完毕(或者全部失败),开始去(afterLearn)</hir>

[if] (arg0) != null  && (:status (arg0)) == false 
    @print  <hir>受buff影响,结束流程 去挖矿</hir>
[else]
    [if] (afterLearn) == 帮派打坐
        $to 帮会-练功房
        $wait 300
        dazuo
    [else if] (afterLearn) == 挖矿
        $zdwk

stopSSAuto->
