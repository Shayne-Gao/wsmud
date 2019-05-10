 //自动从随从哪里收药材
#select ($needCollection) =是否自动收菜,是|否,是
#select ($collectWhom) = 收谁的菜？,全部|小昭|双儿|周芷若|丫鬟,全部
#select ($needStore) =是否自动将菜交给某人,是|否,是
#select ($G_storeNpcName) = 交给谁？,鳌拜|丫鬟|双儿|程灵素,(G_storeNpcName)
#config

@cmdDelay 500


 <-recordGains
 stopstate
$to 住房-小花园

//如果要存菜,先把要存的NPC黄色的收上来 藤出1格

//存菜
[if] (needStore) == 是
    stopstate
    $to 住房-小花园
    [if] {r(G_storeNpcName)}? != null
        ($storeNpcId)={r(G_storeNpcName)}?
        dc (storeNpcId) stopstate;  
        pack (storeNpcId)
        @dialog
      
        [if] {d芦荟#}? != null
            dc (storeNpcId) give (:id) {d芦荟#} {d芦荟}
        [if] {d当归#}? != null
            dc (storeNpcId) give (:id) {d当归#} {d当归}
        [if] {d山楂叶#}? != null
            dc (storeNpcId) give (:id) {d山楂叶#} {d山楂叶}
        dc (storeNpcId) cai

<---
[if] (needCollection) == 是 && (npcName) != (storeNpcId)
    dc (npcName) stopstate;  
    pack (npcName)
    @dialog

    [if] {d芦荟#}? != null
        dc (npcName) give (:id) {d芦荟#} {d芦荟}
    [if] {d当归#}? != null
        dc (npcName) give (:id) {d当归#} {d当归}
    [if] {d山楂叶#}? != null
        dc (npcName) give (:id) {d山楂叶#} {d山楂叶}


    [if] {d石楠叶#}? != null
        dc (npcName) give (:id) {d石楠叶#} {d石楠叶}
    [if] {d金银花#}? != null
        dc (npcName) give (:id) {d金银花#} {d金银花}
    [if] {d柴胡#}? != null
        dc (npcName) give (:id) {d柴胡#} {d柴胡}
    [if] (needStore) == 是
        [if] {b石楠叶#}? != null
            give (storeNpcId) {b石楠叶#} {b石楠叶}
        [if] {b金银花#}? != null
            give (storeNpcId) {b金银花#} {b金银花}
        [if] {b柴胡#}? != null
            give (storeNpcId) {b柴胡#} {b柴胡}


    [if] {d熟地黄#}? != null
        dc (npcName) give (:id) {d熟地黄#} {d熟地黄}
    [if] {d茯苓#}? != null
        dc (npcName) give (:id) {d茯苓#} {d茯苓}
    [if] {d沉香#}? != null
        dc (npcName) give (:id) {d沉香#} {d沉香}
    [if] (needStore) == 是   
        [if] {b熟地黄#}? != null
            give (storeNpcId) {b熟地黄#} {b熟地黄}
        [if] {b茯苓#}? != null
            give (storeNpcId) {b茯苓#} {b茯苓}
        [if] {b沉香#}? != null
            give (storeNpcId) {b沉香#} {b沉香}

    [if] {d九香虫#}? != null
        dc (npcName) give (:id) {d九香虫#} {d九香虫}
    [if] {d络石藤#}? != null
        dc (npcName) give (:id) {d络石藤#} {d络石藤}
    [if] {d冬虫夏草#}? != null
        dc (npcName) give (:id) {d冬虫夏草#} {d冬虫夏草}
    [if] (needStore) == 是   
        [if] {b九香虫#}? != null
            give (storeNpcId) {b九香虫#} {b九香虫}
        [if] {b络石藤#}? != null
            give (storeNpcId) {b络石藤#} {b络石藤}
        [if] {b冬虫夏草#}? != null
            give (storeNpcId) {b冬虫夏草#} {b冬虫夏草}

    dc (npcName) cai
--->
[if] (collectWhom) == 全部
    [if] {r小昭}? != null
        ($npcName)={r小昭}
    [if] {r鳌拜}? != null
        ($npcName)={r鳌拜}
    [if] {r丫鬟}? != null
        ($npcName)={r丫鬟}
    [if] {r双儿}? != null
        ($npcName)={r双儿}
    [if] {r周芷若}? != null
        ($npcName)={r周芷若}
    [if] {r夏雪宜}? != null
        ($npcName)={r夏雪宜}
    [if] {r韦春芳}? != null
        ($npcName)={r韦春芳}
    [if] {r程灵素}? != null
        ($npcName)={r程灵素}
[else]
    [if] {r(collectWhom)}? != null
        ($npcName)={r(collectWhom)}?

($needCollection) = 否
dc (storeNpcId) cai
recordGains->

