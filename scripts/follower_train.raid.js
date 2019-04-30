//让随从去练习技能
#select ($runType)=开始还是结束?,开始|结束,开始
#select ($npc)=让谁练习?,双儿|鳌拜|丫鬟,双儿
#select ($isGiveEq)=是否使用你的装备?,是|否,是
#input ($lingid)= 神龙令id,gi2x3e42754
#input ($shouzhuoid)= 手镯id,8o6l3e079b5
#input ($skill)= 要练习的技能,club
#input ($skillMax)= 练多少级?,800
#config

@cmdDelay 600
stopstate

[if] (runType) == 开始
    $to 住房-小花园
    [if] {r(npc)}? != null
        dc {r(npc)} stopstate
        team with {r(npc)}
        go southwest;go west
        [if] (isGiveEq) == 是
            uneq (lingid); uneq (shouzhuoid)
            give {r(npc)} 1 (lingid);dc {r(npc)} eq (lingid)
            give {r(npc)} 1 (shouzhuoid);dc {r(npc)} eq (shouzhuoid)
        dc {r(npc)} lianxi club (skillMax)
        team out (:id)
        look {r(npc)} 
    [else]
        @print 在花园未找到指定NPC
[else]
    $to 住房-练功房
    [if] {r(npc)}? != null
        dc {r(npc)} stopstate
        team with {r(npc)}
        [if] (isGiveEq) == 是
            dc {r(npc)} uneq (lingid);dc {r(npc)} give (:id) 1 (lingid)
            dc {r(npc)} uneq (shouzhuoid);dc {r(npc)} give (:id) 1 (shouzhuoid)
            eq (lingid)
            eq (shouzhuoid)
        go east;go northeast;;pack {r(npc)}
        @dialog
        dc {r(npc)} eq {d药王神篇};dc {r(npc)} cai
        team out (:id)
        look {r(npc)} 
    [else]
        @print 在练功房未找到指定NPC

$zdwk
