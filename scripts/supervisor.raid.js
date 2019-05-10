//状态监控发微信
#select ($NeedSuccessMove) =鼓舞要做出反应吗?,是|否,是
#input ($learnPotMin) = 低于这个潜能则不在鼓舞时学习,10000
#config

($SuccessBuff) = success
($lastState)=(:state)

($hasSuccessBefore) = false
@toolbar score
@js ($menpai)=$("[data-prop='family']").text()
@js ($pot)=$("[data-prop='pot']").text()
//===========push post
<===
[while] true
    @print 子流程心跳,鼓舞反应?(NeedSuccessMove)

    ($logStr) = 日志
    ////===========死了自动复活
    [if] (:living) == false
        //死了自动复活
        ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 检测到死亡,自动复活 去挖矿
        relive
        @renew
        $zdwk
    //===========发呆保护流程
    [if] (:state)== 发呆
        $wait 30000
        [if] (:state)== 发呆
            [if] (:combating) == false
                @print 当前正在发呆
                ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 检测到在(:room)发呆,去挖矿
                $zdwk
            [else]
                @print 战斗中..
                ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 检测到战斗中
    //===========鼓舞消失 不浪费潜能的流程
    [if] (NeedSuccessMove) == 是 
        @print 鼓舞状态:当前(:status (SuccessBuff)),当前状态(:state)
        [if] (:status (SuccessBuff)) == false 
            [if]  (:state) == 学习 || (:state) == 练习 || (:state) == 打坐
                ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 鼓舞消失,回去挖矿
                @print 鼓舞消失,节省潜能,去挖矿
                $zdwk
    //===========状态变更通知流程
    ($nowState) = (:state)
    [if] (lastState)!=(nowState)
        //状态变更
        @print 状态变更了!
        ($logStr)=(logStr)\n\r(:hour):(:minute):(:second) 状态从(lastState)变为(nowState)
        ($lastState)=(nowState)
    [else]
        @print 状态没变：(lastState)->(nowState)

    [if] (:status (SuccessBuff)) == true
        ($hasSuccess) = 有鼓舞
    [else]
        ($hasSuccess) = 无鼓舞
    [if] (:living) == true
        ($alive) = 活着
    [else]
        ($alive) = 凉了
 //   @print <hig>(menpai)当前<(:state)>at<(:room)>,潜能(pot),(hasSuccess),气血(:hp)/(:maxHp),(alive)</hig>

    @call push 
    

    ////===========处理通知
    [if] (logStr) != 日志
        @print (logStr)
        //日志不为空,则要发送通知
        ($base)= 内力(:mp)/(:maxMp)\n\r生命(:hp)/(:maxHp)\n\r潜能(pot)\n\r(hasSuccess),(alive)
        ($body)=(base)\n\r(logStr)
        ($title) = (menpai)to(:state)at(:room)
      //  @print (body)
    //    @print (title)
        @print 准备发送wechat提醒
        @js $.post("https://sc.ftqq.com/SCU15524T3b74cdf9889582dd05f0f6311c30daa95a02d41d5e091.send", { text: "(title)", desp: "(body)" })
    $wait 30000
===>


////===========鼓舞处理流程
($hasSuccessBefore) = false
[while] true
    [if] (NeedSuccessMove) == 是 
        ($hasSuccessNow) =  (:status (SuccessBuff))
        @print 鼓舞状态:当前(hasSuccessNow),之前(hasSuccessBefore),当前状态(:state)
        [if] (hasSuccessNow) == true
            [if] (:state) != 学习 &&  (:state) != 练习 &&  (:state) != 打坐
            //新获得鼓舞
                @print 检测到获得鼓舞 应该动起来了
                @toolbar score
                @js ($pot)=$("[data-prop='pot']").text()
                [if] (pot) > (learnPotMin)
                    //潜能足够 去学习
                    ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 获得鼓舞,潜能足够,去学习
                    @print 获得鼓舞!去学习
                    @call 4学习 (SuccessBuff)

                [else if] (menpai) != 逍遥派
                    ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 获得鼓舞,潜能不足,去打坐
                    @print 获得鼓舞!潜能不够,去打坐
                    $to 帮会-练功房
                    dazuo

        ($hasSuccessBefore) =  (hasSuccessNow)
    [else]
        @print 不考虑鼓舞状态 维持进程
    @wait 10000
