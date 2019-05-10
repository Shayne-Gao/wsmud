//让随从去练习技能
[if] (LianxiRunType) == null
    ($LianxiRunType) = 开始
[if] (LianxiNpc) == null
    ($LianxiNpc) = 程灵素
#select ($LianxiRunType)=开始还是结束?,开始|结束,(LianxiRunType)
#select ($LianxiNpc)=让谁练习?,双儿|鳌拜|小昭|夏雪宜|周芷若|程灵素|韦春芳,(LianxiNpc)

#select ($isGiveEq)=是否使用你的装备?,是|否,是
#input ($skill)= 要练习的技能,shedaoqigong
#input ($skillMax)= 练多少级?,800
#config

@cmdDelay 600
stopstate

[if] (LianxiRunType) == 开始
    $to 住房-小花园
    [if] {r(LianxiNpc)}? == null
        $to 住房-练功房
        [if] {r(LianxiNpc)}? == null 
            @print 未找到指定LianxiNpc          
            [exit]
    dc {r(LianxiNpc)} stopstate
    team with {r(LianxiNpc)}
    go southwest;go west
    [if] (isGiveEq) == 是  
        $eq 2
        ($Shipinid) = (:eq7)
        ($Huwanid)=(:eq8)
 
        uneq (Huwanid)
        give {r(LianxiNpc)} 1 (Huwanid);
        dc {r(LianxiNpc)} eq (Huwanid)

        uneq (Shipinid);
        give {r(LianxiNpc)} 1 (Shipinid);
        dc {r(LianxiNpc)} eq (Shipinid)
    dc {r(LianxiNpc)} lianxi (skill) (skillMax)
    team out (:id)
    look {r(LianxiNpc)} 
    ($LianxiRunType) = 开始
[else]
    $to 住房-练功房
    [if] {r(LianxiNpc)}? != null
        dc {r(LianxiNpc)} stopstate
        team with {r(LianxiNpc)}
        dc {r(LianxiNpc)} eq {d药王神篇}?;
        [if] (isGiveEq) == 是
            dc {r(LianxiNpc)} uneq (Shipinid);
            dc {r(LianxiNpc)} give (:id) 1 (Shipinid)
            dc {r(LianxiNpc)} uneq (Huwanid);
            dc {r(LianxiNpc)} give (:id) 1 (Huwanid)
            eq (Shipinid)
            eq (Huwanid)
        go east;go northeast;;pack {r(LianxiNpc)}
        @dialog
        dc {r(LianxiNpc)} cai
        team out (:id)
        look {r(LianxiNpc)} 
    [else]
        @print 在练功房未找到指定LianxiNpc
    ($LianxiRunType) = 结束
$zdwk

