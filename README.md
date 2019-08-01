# wsmud
武神传说相关的插件


## 主框架构

https://github.com/Shayne-Gao/wsmud/raw/master/wsmud_plugins.user.js
## 页面增强、小功能、学习练习计算
https://github.com/Shayne-Gao/wsmud/raw/master/wsmud_layout.user.js

## 自动副本模块
https://github.com/Shayne-Gao/wsmud/raw/master/wsmud_raid.user.js



# 使用说明
1. 安装火狐浏览器(电脑或者安卓)  http://www.firefox.com.cn/
2. 在右侧设置点开,选择附加组件
3. 在搜索栏中搜索 tampermonkey  ,并安装添加(图标是个黑色的
4. 点击上面的3个链接,并在弹出的窗口中 点击安装/install.
      若弹出来的是代码,则重新点击,直道识别为插件,并可以安装
      
5. 使用链接进入网页版游戏: http://game.wsmud.com/e/193487
     进入游戏,若插件未正常加载,则ctrl+f5 刷新
6. 第一次使用,在游戏中点击右键,设置,往下拉,有个初始化ID,点一下.之后就不用了

# 流程代码导入
1. 问我要最新的流程码,然后点击页面中间的捷径-导入全部流程,粘贴流程码点确认.
2. 点击流程,就可以看到自动日常等流程代码了
注意 流程码24小时后过期,请尽快导入

# 主要功能介绍
### 一键日常
```入口:流程 - 日常
执行一次 流程-日常配置 之后,就可以按照用户设定的计划,进行一键日常.
全程无需参与,支持完美挂机
执行内容包括 :

买绿色养精丹吃
自动跟师傅请安
20次指定副本
自动清包里的培元丹等
自动师门
自动20次指定副本
自动武道塔1-最大层
自动追捕20次
自动一键请安
自动领取日常奖励
```
### 一键学习练习打坐
```入口:流程-自动学习
根据你设定的队列自动学习练习打坐
优先去找师傅学习,如果师傅死了或者学习完了,就去按照队列练习,最后去打坐.一键提升自己! 
练习支持设定上限
练习时候自动吃冰心丹
```
### 一键传送师傅
```入口 右键
一键传送并打开学习面板
```
### 一键练习
```入口 右键或者PC侧边栏
一键传送练功房并穿上悟性装,开始按照设置里的练习列表进行练习
```
### 随从相关脚本
```一键收割随从的采药成果
一键随从练习: 把自己的悟性装给随从,然后让他练习
一键随从炼药:让程灵素炼药
等等
```
### 界面提示
```练习/学习时间提示
所需潜能提示
襄阳提醒
挖矿收益提示
物品获得提示
```
### 自动襄阳
```自动襄阳蹲门
自动襄阳城墙
襄阳蓝绿装自动分解
等
```
### 手机界面优化
点击空白聊天出可以关闭二级窗口
点击房间名称可以打开插件菜单

### 多开优化
网页title显示当前人物状态\地点\buff  方便多开监控

### 自动挖藏宝图
一键找藏宝图

以下为插件自带功能的优化:

### 自动喜宴和世界BOSS
```自动前往,击杀后自动摸尸体
如果死了会自动再摸一次尸体
然后恢复之前的工作
若之前在练习,则继续去练习 等
```
### 自动换装
设定打怪装和悟性装
右键中

### 自动施法

### 自动清包\存仓库\分解

### 常用地点和门派一键传送
右键菜单中

### 自动副本
```不断丰富副本中,最新添加青城山\五毒教等副本的自动流程
支持自动设置等待CD后开BOSS
```

### PC界面美化
```
左侧增加属性技能栏
右侧增加聊天信息分类显示
右侧增加战利品获取统计
左侧增加最近执行的命令历史拦
左侧增加常用按钮栏
```

### PC界面快捷键
```方向键: 控制人物移动
回车: 打开聊天
ESC: 关闭当前窗口
F/空格: 买卖东西时候的二次确认
Z:打坐
X:疗伤
数字键:快捷释放技能
alt+数字键: 快捷互动按键
ctrl+数字键: 动作栏按钮
H:回家
V:打开仓库
D:当铺
Y:一键挖矿
W:一键练习
其他界面上能看到的按键就不赘述了(L/B/K/S等)
```
### 其他诸多内容不一一列举了
```
发言屏蔽
自动比试
潜能开花计算
伤害统计
仓库排序
...
```

# 常见问题
Q: 为什么插件提示未成功加载呢?
A: 强制刷新一下页面就好了 ctrl+f5



# 马上会更新：
学习时间计算支持指定最大等级 按照境界指定
左侧PC的tab显示系统信息和物品获取
手机不显示学习等级的习信息
监控，如果发呆，也要看有没有鼓舞buff



# 更新记录

2019年7月31日
- 流程:增加日常中的一键扫荡困难移花宫
- 流程:优化流程代码排版
- 流程:优化随从取药 现在会取紫色药了
- 流程:增加随从炼药种类
- 流程:增加程灵素炼药领悟脚本
- 流程:增加武道塔自动用扫荡符功能
- 流程:其他功能性优化

2019年7月17日 
- 增加快捷键` 隐藏侧边栏
- 增加快捷键M 打开地图
- 更改按钮和快捷键W 为一键练习
- 修复一键练习逻辑
- 修复自动挖矿 的矿稿选择逻辑
- 自动BOSS后自动清理背包
- 优化网页title显示,可以直接看到当前状态/buff/地点等信息
- 增加一键炼药  自动装备神木王鼎炼药
- 增加命令 $lx 一键练习
- 增加命令 $lianyao 自动炼药
- 调整右键列表内容
- 增加日常完成情况显示 ( 在日志窗口)

2019年6月25日 
- 增加一键练习(到练功房 换装备 按照列表练习)
- 自动副本可以等待固定技能CD了
- 自动副本次数会根据日常完成情况自动预设
- 修复手机界面问题
- 手机点击空白聊天处 可以关闭窗口了(背包 技能等)
- 其他小优化

2019年6月17日 
- 解决手机客户端有时候背包不刷新的问题
- 增加PC端快捷导入流程和触发的入口
- 请安后自动挖矿
- 增加五毒教自动流程

2019年6月1日
- 增加青城山副本流程
- 重新对流程加载页面排版
- 右键菜单增加去练功  丐帮摸紫等功能
- 优化右键菜单排版
- 现在可以通过点击房间名称快速打开右键界面了
- 修复手机端报错的问题


2019年5月23日 
- 修改设置,增加键盘快捷键.打开设置.将常用设置放在前面
- 增加快捷键V 打开仓库
- 增加快捷键H 传送到自宅
- 增加快捷键D 传送到当铺


2019年5月20日
- 增加左侧快捷按钮,一键换装,一键练功传送等
- 修复之前的页面BUG
- 练习技能提示,现在会提示下100级 300级和等级上限所需要的潜能和时间了
- 修改部分副本代码,以提升通过率
- 技能栏显示技能ID

2019年5月10日
- 新增若干流程脚本
- 修复老流程脚本的bug
- 更改谣言显示位置

2019年5月6日
- 增加一键返回用户名密码窗口按钮 快捷键del
- 增加一键登录按钮, 会使用上次登录的大区和角色登录 快捷键 insert
- 潜能计算和提示优化,按照不同境界计算上限
- 右键菜单增加一键传送到师傅 并打开学习窗口
- 自动副本增加换装,再也不用拿着铁镐刷副本啦

2019年5月3日
- 增加一键传送师傅功能 右键执行
- 潜能计算根据当前境界来 武师800最大  宗师按照自己的技能上线计算
- 其他界面和小功能优化

2019年4月30日
节日快乐!
- 解决手机端背包打开不刷新问题 layout
- 增加技能潜能计算 技能页面信息展示 layout
- 默认潜能计算到800级,之后支持自定义
- 修复角色信息内容太长的问题
- 将一键清理移动到一阶菜单
- 传送前自动停止当前动作
- 优化学习时候的辅助信息显示


2019年4月26日 
- fix读书不显示当前等级的bug
- 更新全自动天地会和鳌拜府和简单版本温府
- 追捕开启时候会自动stopstate

2019年4月25日 
- 增加F绑定确认,Z打坐 X疗伤 的快捷键
- 武道塔自动纳入副本流程
- 点击状态栏可以关闭窗口，避免手机上因为关闭按钮太小带来的问题
- 新增天地会流程
- fix网页标题显示的问题
- fix按钮显示异常问题


2019年4月24日  funny插件中  
- 增加技能tab显示所需要潜能
- 学习技能时候显示还剩余学习时间和潜能消耗光所需时间

2019年4月23日  ss插件中 
- 更改门派传送到师傅
- 更改title，网页title更精简方便监控




# 版权说明
本插件为基于wsmud_pluginss的私人更改优化版本，原插件版权归原作者所有。严禁商用。

