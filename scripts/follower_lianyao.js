// raid.flow
//
[if](LYSC_name) == null
   ($LYSC_name) = 程灵素
[if](LY_number) == null
  ($LY_number) = 3
[if](LY_boss) == null
  ($LY_boss) = (:id)
[if](LY_yaofang) == null
  ($LY_yaofang) = 熟地黄 沉香 冬虫夏草 沉香 九香虫 络石藤 茯苓
[if](LY_yaoname) == null
  ($LY_yaoname) = 冰心丹
[if](LY_geiyao) == null
  ($LY_geiyao) = 关闭
[if](LY_cmd) = null 
  ($LY_cmd) = lianxi force
#input ($LYSC_name) = 随从名字,(LYSC_name)
#input ($LY_number) = 炼药数量,(LY_number)
#select ($LY_item) = 指定炼什么药?,学习(蓝)|学习(黄)|练习(蓝)|练习(黄)|招架(蓝)|自己指定,练习(黄)
#input ($LY_yaofang) = 或者自己指定炼方,(LY_yaofang)
#input ($LY_yaoname) = 以及药名,(LY_yaoname)
#input ($LY_cmd) = 炼药是自己干嘛?,(LY_cmd)
#select ($LY_geiyao) = 给随从炼药用的药材,开启|关闭,(LY_geiyao)
#config
<-stopSSAuto

//根据选择,获取丹方药名
[if] (LY_item)==练习(黄)
  ($LY_yaofang) = 熟地黄 沉香 冬虫夏草 沉香 九香虫 络石藤 茯苓
  ($LY_yaoname) = 冰心丹
  ($yao_level)=3
[else if] (LY_item)==练习(蓝)
  ($LY_yaofang) = 沉香 茯苓 石楠叶 熟地黄 石楠叶 沉香
  ($LY_yaoname) = 冰心丹
  ($yao_level)=2
[else if] (LY_item)==学习(黄)
  ($LY_yaofang) = 茯苓 熟地黄 九香虫 冬虫夏草 沉香 络石藤 沉香
  ($LY_yaoname) = 清心丹
  ($yao_level)=3
[else if] (LY_item)==学习(蓝)
  ($LY_yaofang) = 柴胡 茯苓 熟地黄 石楠叶 金银花 柴胡
  ($LY_yaoname) = 清心丹
  ($yao_level)=2
[else if] (LY_item)==招架(蓝)
  ($LY_yaofang) = 金银花 熟地黄 沉香 茯苓 石楠叶 金银花
  ($LY_yaoname) = 归心散
  ($yao_level)=2


@print <hir>炼药:(LY_yaoname) (LY_number)个。</hir>
@print <hir>丹方:(LY_yaofang)</hir>


stopstate
$to 住房-小花园
($id) =  {r(LYSC_name)}
dc (id) stopstate
team with (id)
go southwest,go east

@js ($yao_list)= '(LY_yaofang)'.split(" ")
@js ($yao_list_l)= '(LY_yaofang)'.split(" ").length

[if](LY_geiyao) == 开启
  ($n) = 0
  [while](n)<(yao_list_l)
    @js ($yao) = '(LY_yaofang)'.split(" ")[(n)]
    give (id) (LY_number) {b(yao)}
    ($n) = (n) + 1

select (id);pack (id)
@dialog
($num) = 0
[while](num) < (LY_number)
  @print <hir>炼药中..:(LY_yaoname) (LY_item) (num)/(LY_number)个。</hir>
  @print <hir>丹方:(LY_yaofang)</hir>
  dc (id) lianyao2 start (yao_level)
  ($n) = 0
  [while](n)<(yao_list_l)
     @js ($yao) = '(LY_yaofang)'.split(" ")[(n)]
     go west;go west;(LY_cmd)
     @print  <hir>炼药中..:(LY_yaoname) (num)/(LY_number)个 第(n)步</hir>
     @wait 12000
     stopstate;go east;go east
     dc (id) lianyao2 add {d(yao)}
     ($n) = (n) + 1
  go west;go west;(LY_cmd)
  @wait 12000
  stopstate;go east;go east

  dc (id) lianyao2 stop
  @wait 3000
  ($num) = (num) + 1
  
select (id);pack (id)
dc (id) give {r(LY_boss)} (LY_number) {d(LY_yaoname)}
go west,go northeast
dc (id) cai
team out
$zdwk
stopSSAuto->

