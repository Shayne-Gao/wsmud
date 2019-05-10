//自动师门  买药吃药 检查当铺
// raid.flow
#select ($needQingan) = 是否自动请安(建议副本完成后请安),是|否,否
#select ($eatBluePill) = 是否自动吃蓝色养精丹,是|否,否
#config

stopstate
$sm
@tip 辛苦了， 你先去休息一下吧

[if] (needQingan) == 是
    @toolbar score
    @js ($menpai)=$("[data-prop='family']").text()
    ($location) = null
    ($senior) = null
    [if] (menpai) == 武当派
        ($location) = 武当派-太子岩
        ($senior) = 武当派首席弟子
    [else if] (menpai) == 少林派
        ($location) = 少林派-练武场
        ($senior) = 少林派大师兄
    [else if] (menpai) == 华山派
        ($location) = 华山派-练武场
        ($senior) = 华山派首席弟子
    [else if] (menpai) == 峨眉派
        ($location) = 峨嵋派-广场
        ($senior) = 峨眉大师姐
    [else if] (menpai) == 逍遥派
        ($location) = 逍遥派-林间小道
        ($senior) = 逍遥派首席弟子
    [else if] (menpai) == 丐帮
        ($location) = 丐帮-破庙密室
        ($senior) = 丐帮首席弟子
    [else if] (menpai) == 杀手楼
        ($location) = 杀手楼-练功房
        ($senior) = 金牌杀手

    [if] (menpai) == 逍遥派
        jh fam 5 start;go west
    [else]
        stopstate;$to (location)
    select {r(senior)};ask2 {r(senior)}
    select {r(senior)};ask2 {r(senior)}
    @tip 恭恭敬敬的一鞠躬|每天请一次安就可以|凑什么热闹


//买药吃药流程
($count) = {b养精丹g#}?
[if] (count) < 10 || (count) == null
    $wait 500
    $to 扬州城-药铺
    $wait 500
    select {r平一指}
    list {r平一指}
    @dialog
    [if] (count) == null
        ($count) = 10
    [else]
        ($count) = 10 - (count)
    buy (count) {d养精丹g} from {r平一指}
    $wait 500
 
[if] (eatBluePill) == 是
    use {b养精丹b}[7]
[if] {b培元丹}? != null
    $wait 500
    use {b培元丹}[10]
[if] {b朱果}? != null
    $wait 300
    use {b朱果}[{b朱果#}]


$wait 1000
//检查当铺+卖东西
$to 扬州城-当铺
$wait 500
select {r唐楠}
list {r唐楠}
[if]  {b聚气丹g}? == null
    @print 没有聚气丹需要出售
[else]   
    sell {b聚气丹g#} {b聚气丹g} to {r唐楠}
    @wait 500
    [if] {b聚气丹b}? != null
        sell {b聚气丹b#} {b聚气丹b} to {r唐楠}

$wait 1000
[if] {b养精丹g} != null
    use {b养精丹g}[5]
    $wait 500
    use {b养精丹g}[6]

dazuo
@print 执行完成
