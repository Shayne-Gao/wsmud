//让随从去练习技能
#select ($runType)=开始还是结束?,开始|结束,开始
#select ($npc)=让谁练习?,双儿|鳌拜|丫鬟,鳌拜

#select ($isGiveEq)=是否使用你的装备?,是|否,是
#input ($skill)= 要练习的技能,shedaoqigong
#input ($skillMax)= 练多少级?,800
#config

@cmdDelay 600
stopstate

[if] (runType) == 开始
    $to 住房-小花园
    [if] {r(npc)}? == null
        $to 住房-练功房
        [if] {r(npc)}? == null 
            @print 未找到指定NPC          
            [exit]
    dc {r(npc)} stopstate
    team with {r(npc)}
    go southwest;go west
    [if] (isGiveEq) == 是  
        $eq 2
        ($Shipinid) = (:eq7)
        ($Huwanid)=(:eq8)
        uneq (Shipinid); 
        uneq (Huwanid)
        give {r(npc)} 1 (Shipinid);
        dc {r(npc)} eq (Shipinid)
        give {r(npc)} 1 (Huwanid);
        dc {r(npc)} eq (Huwanid)
    dc {r(npc)} lianxi (skill) (skillMax)
    team out (:id)
    look {r(npc)} 
[else]
    $to 住房-练功房
    [if] {r(npc)}? != null
        dc {r(npc)} stopstate
        team with {r(npc)}
        [if] (isGiveEq) == 是
            dc {r(npc)} uneq (Shipinid);
            dc {r(npc)} give (:id) 1 (Shipinid)
            dc {r(npc)} uneq (Huwanid);
            dc {r(npc)} give (:id) 1 (Huwanid)
            eq (Shipinid)
            eq (Huwanid)
        go east;go northeast;;pack {r(npc)}
        @dialog
        dc {r(npc)} eq {d药王神篇};dc {r(npc)} cai
        team out (:id)
        look {r(npc)} 
    [else]
        @print 在练功房未找到指定NPC

$zdwk
