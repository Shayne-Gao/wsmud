//状态监控发微信
($learnPotMin) = 10000
($successBuff) = success
($lastState)=(:state)


($hasSuccessBefore) = false
 @toolbar score
@js ($menpai)=$("[data-prop='family']").text()
 @js ($pot)=$("[data-prop='pot']").text()
[while] true
    $wait 30000
    //获取各种信息

    ($logStr) = 日志

    [if] (:living) == false
        //死了自动复活
        ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 检测到死亡,自动复活
        relive
        @renew

    [if] (:status (successBuff)) == true
        [if] (hasSuccessBefore) = false
        //新获得鼓舞
            @print 新获得鼓舞
            ($hasSuccessBefore) = true
             @toolbar score
             @js ($pot)=$("[data-prop='pot']").text()
            [if] (pot) > (learnPotMin)
                //潜能足够 去学习
                ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 获得鼓舞,潜能足够,去学习
                @print 获得鼓舞!去学习
                @call 4学习
            [else]
                ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 获得鼓舞,潜能不足,去打坐
                @print 获得鼓舞!潜能不够,去打坐
                $to 帮会-练功房
                dazuo
    [else if] (:status (successBuff)) == false
        [if] (hasSuccessBefore) = true
        //鼓舞消失 去挖矿
            ($hasSuccessBefore) = false
            ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 鼓舞消失,回去挖矿
            @print 鼓舞消失,去挖矿
            $zdwk

    [if] (:state)== 发呆
        $wait 30000
        [if] (:state)== 发呆
            [if] (:combating) == false
                @print 当前正在发呆
                ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 检测到在(:room)发呆,去挖矿
                   [if] (:status (successBuff)) == true
                        @toolbar score
                        @js ($pot)=$("[data-prop='pot']").text()
                        [if] (pot) > (learnPotMin)
                            //潜能足够 去学习
                            ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 发呆时候有鼓舞,潜能足够,去学习
                            @print 获得鼓舞!去学习
                            @call 4学习
                        [else]
                            ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 发呆时候有鼓舞,潜能不足,去打坐
                            @print 获得鼓舞!潜能不够,去打坐
                            $to 帮会-练功房
                            dazuo
                $zdwk
            [else]
                @print 战斗中..
                ($logStr) =(logStr)\n\r(:hour):(:minute):(:second) 检测到战斗中

    ($nowState) = (:state)
    [if] (lastState)!=(nowState)
        //状态变更
        @print 状态变更了!
        ($logStr)=(logStr)\n\r(:hour):(:minute):(:second) 状态从(lastState)变为(nowState)
        ($lastState)=(nowState)
    [else]
        @print 状态没变：(lastState)->(nowState)

    [if] (:status (successBuff)) == true
        ($hasSuccess) = 有鼓舞
    [else]
        ($hasSuccess) = 无鼓舞
    [if] (:living) == true
        ($alive) = 活着
    [else]
        ($alive) = 凉了
    @print <hig>(menpai)当前<(:state)>at<(:room)>,潜能(pot),(hasSuccess),气血(:hp)/(:maxHp),(alive)</hig>

    //push post
    @js $.post("http://119.29.138.20/api/wsmud_recordd", {role_id:"(:id)",role_name: "unkonw", role_menpai: "(menpai)" ,state:"(:state)",last_state:"(lastState)",hp:"(:hp)",maxhp:"(:maxHp)",mp:"(:mp)",maxMp:"(:maxMp)",has_success_buff:"(:status (successBuff))",pot:"(pot)",isalive:"(:living)",iscombating:"(:combating)"})

    @print (logStr)
    //处理通知
    [if] (logStr) != 日志
        //日志不为空,则要发送通知
        ($base)= 内力(:mp)/(:maxMp)\n\r生命(:hp)/(:maxHp)\n\r潜能(pot)\n\r(hasSuccess),(alive)
        ($body)=(base)\n\r(logStr)
        ($title) = (menpai)to(:state)at(:room)
        @print (body)
        @print (title)
        @print 准备发送wechat提醒
        @js $.post("https://sc.ftqq.com/SCU15524T3b74cdf9889582dd05f0f6311c30daa95a02d41d5e091.send", { text: "(title)", desp: "(body)" })

