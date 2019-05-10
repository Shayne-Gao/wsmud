//襄阳城墙
//自动报名并到北城墙 
stopstate
jh fam 8 start
select {r郭靖}
baoming {r郭靖}
$wait 500
go north[4]
@cmdDelay 800
[while] true
    <---
    kill {r蒙古兵}?
    @until {的尸体}? != null  | (:combating) == false
 //   @tip 你的追捕任务完成了，目前完成($currentN)/20个，已连续完成($comboN)个。|你($type1)死了($type2)|你要攻击谁
    [if] (:hpPer)<0.7
            @liaoshang
    --->
    //从北门开始
    go east
    go east
    go east
    go east
    //到达右上
    go south
    go south
    go south
    go south;go south
    go south
    go south
    go south
    go south
    //右下
    go west
    go west
    go west
    go west;go west
    go west
    go west
    go west
    go west
    //左下
    go north
    go north
    go north
    go north;go north
    go north
    go north
    go north
    go north
    //左上
    go east
    go east
    go east
    go east;go east
