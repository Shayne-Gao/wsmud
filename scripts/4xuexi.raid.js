//@author 墨匿
//学习
//v430 增加学习结束后的动作,在每次学习开始的时候都检测师傅在不在,如果不在就停止

#select ($afterLearn) = 学习结束之后干什么?,帮派打坐|练习技能|挖矿,帮派打坐
<-stopSSAuto
@toolbar score
@js ($menpai)=$("[data-prop='family']").text()
@js ($shifu)=$("[data-prop='master']").text()
//这里自己填写技能学习顺序
//目前填写前三个
[if] (shifu) == 风清扬
    ($a) = poyuquan
    ($b) = unarmed
    ($c) = poyuquan
[if] (shifu) == 雾中楼
    ($a) = unarmed
    ($b) = force 
    ($c) = shashengjue
[if] (shifu) == 逍遥子
    ($a) = dodge
    ($b) = dodge
    ($c) = dodge
[if] (shifu) == 静心
    ($a) = unarmed
    ($b) = dodge
    ($c) = parry
//

[if] (shifu) == 谷虚道长||(shifu) == 宋远桥
    ($Loction) = 武当派-三清殿
[if] (shifu) == 张三丰
    ($Loction) = 武当派-后山小院
[if] (shifu) == 清乐比丘
    ($Loction) = 少林派-广场
[if] (shifu) == 道绝禅师
    ($Loction) = 少林派-天王殿
[if] (shifu) == 慧合尊者
    ($Loction) = 少林派-般若堂
[if] (shifu) == 澄净
    ($Loction) = 少林派-罗汉堂
[if] (shifu) == 玄难
    ($Loction) = 少林派-方丈楼
[if] (shifu) == 高根明
    ($Loction) = 华山派-镇岳宫
[if] (shifu) == 岳不群
    ($Loction) = 华山派-客厅
[if] (shifu) == 封不平
    ($Loction) = 华山派-林间小屋
[if] (shifu) == 风清扬
    ($Loction) = 华山派-落雁峰
[if] (shifu) == 苏梦清
    ($Loction) = 峨眉派-庙门
[if] (shifu) == 静心
    ($Loction) = 峨眉派-大殿
[if] (shifu) == 周芷若
    ($Loction) = 峨眉派-小屋
[if] (shifu) == 灭绝
    ($Loction) = 峨眉派-清修洞
[if] (shifu) == 薛慕华
    ($Loction) = 逍遥派-木屋
[if] (shifu) == 苏星河
    ($Loction) = 逍遥派-青草坪
[if] (shifu) == 逍遥子
    ($Loction) = 逍遥派-地下石室
[if] (shifu) == 左全
    ($Loction) = 丐帮-树洞下
[if] (shifu) == 简长老
    ($Loction) = 丐帮-土地庙
[if] (shifu) == 鲁有脚
    ($Loction) = 丐帮-林间小屋
[if] (shifu) == 洪七公
    ($Loction) = 丐帮-林间小屋
[if] (shifu) == 何小二
    ($Loction) = 杀手楼-大厅
[if] (shifu) == 李四
    ($Loction) = 杀手楼-银楼
[if] (shifu) == 雾中楼
    ($Loction) = 杀手楼-书房
[if] (shifu) == 武馆教习
    ($Loction) = 扬州城-扬州武馆


stopstate;$to (Loction)

<---
//这里需要优化,如果学习过程中师傅没了怎么办?
$wait 300
[if] {r(shifu)}? == null
    ($needStudy)=false
    @print 你的师傅不在了...
//开始学习
($needStudy) = true

[if] (needStudy) == true
    $wait 3500
    @print 学习中，顺序：
    @print ->(a)
    @print    ->(b)
    @print      ->(c)
    @print        ->(d)
    @print          ->(e)
    [if] {r(shifu)}? == null
        $zdwk
    @tip 你挥着铁镐开始认真挖矿|也许是缺乏实战经验|也许是基本功火候未到
    stopstate;$to (Loction)
--->

xue (a) from {r(shifu)}
xue (b) from {r(shifu)}
xue (c) from {r(shifu)}
//xue (d) from {r(shifu)}
//xue (e) from {r(shifu)}
($needStudy)=false
[if] (afterLearn) == 帮派打坐
    [if] (menpai) == 逍遥派
        $to 住房-练功房
        [if] {r小昭}? == null
            $zdwk
            [exit]
        [else]
            xue houquan from {r小昭}
            [exit]
    [else]
        $to 帮会-练功房
        $wait 300
        dazuo
[else if]  (afterLearn) == 练习技能
    $to 帮会-练功房
    $wait 300
    lianxi club 800
[else if] (afterLearn) == 挖矿
    $zdwk


stopSSAuto->
