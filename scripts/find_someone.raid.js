
//寻人
#select ($name)= 你想找谁?,兰奢待|墨匿|织交|十六夜月
#config

stopstate
<---
$to (loc)
[if] {r(name)}? == null
    @print (loc)没找到(name)
[else]
    @print (loc)找到(name)!!!
    look {r(name)}
    [exit]
--->
($loc) = 扬州城-矿山
($loc) = 帮会-练功房
($loc) = 杀手楼-书房
($loc) = 华山派-落雁峰
($loc) = 逍遥派-地下石室
