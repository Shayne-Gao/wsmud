// ==UserScript==
// @name        wsmud_funny
// @namespace   suqing
// @version     0.2.4
// @author      sq shayne-gao
// @match       http://www.wsmud.com/*
// @match       http://game.wsmud.com/*
// @homepage    https://greasyfork.org/zh-CN/scripts/380709
// @description 武神传说脚本，内置了许多小功能。
// @run-at      document-start
// @require     http://code.jquery.com/jquery-3.3.1.min.js
// @grant       unsafeWindow
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_getValue
// @grant       GM_setClipboard
// ==/UserScript==
//2019年4月24日 17:33:52 增加技能tab显示所需要潜能,学习技能时候显示还剩余学习时间和潜能消耗光所需时间

(function() {
    'use strict';
    let funny = {
        version: GM_info.script.version,
        data: {},
        role: {},
        data_skill_limit: 0,
        data_login: 0,
        data_id: "12345678910",
        data_jy: 0,
        data_qn: 0,
        state: "data.state",
        data_autokill_xy: true,
        layout_left: true,
    };
    unsafeWindow.funny = funny;
    let fn = {
        send: function(message) {
            if (typeof message === "string") {
                sendmessage(message);
            } else if (message instanceof Array) {
                action(message);
                async function action(message) {
                    for (const m of message) (typeof m === "number") ? (await fn.sleep(m)) : sendmessage(m);
                }
            }
            function sendmessage(message) {
                $("#sendmessage").attr("cmd") ? $("#sendmessage").attr("cmd", message) : $(".container").append($(`<span id="sendmessage" cmd="${message}"><span>`));
                $("#sendmessage").click();
            }
        },
        sleep: function(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },
        scroll: function(name) {
            if (name === undefined) return;
            let a = $(name)[0].scrollTop,
                b = $(name)[0].scrollHeight,
                h = Math.ceil($(name).height()); // 向上取整
                // console.log(`fn.scroll => a=${a} b=${b} h=${h}`);
            if (a < b - h) {
                let add = (b - h < 120) ? 1 : Math.ceil((b - h) / 120);
                $(name)[0].scrollTop = a + add;
                setTimeout(`fn.scroll("${name}")`, 1000/120);
            }
        },
        deepCopy: function (object) {
            let result = {};
            for (const key in object) {
                result[key] = typeof object[key] === "object" ? fn.deepCopy(object[key]) : object[key];
            }
            return result;
        },
        getTime: function() {
            let date = new Date();
            let h = parseInt(date.getHours());
            let m = parseInt(date.getMinutes());
            h = h < 10 ? `0${h}` : `${h}`;
            m = m < 10 ? `0${m}` : `${m}`;
            return `${h}:${m}`;
        },
    };
    unsafeWindow.fn = fn;
    let listener = {
        onmessage: function(message) {
            let data = message.data;
            if (/{(.*)}/.test(data)) data = (new Function(`return ${data};`))();
            if (typeof data === "string") {
                listener.extends.text.forEach(fn => fn(message));
                return;
            } else if (typeof data === "object") {
                switch (data.type) {
                    case "roles":
                        funny.data.roles = data;
                        break;
                    case "login":
                        funny.data.id = data.id;
                        break;
                    case "dialog":
                        listener.extends.dialog.forEach(fn => fn(data));
                        break;
                    case "msg":
                        listener.extends.msg.forEach(fn => fn(data));
                        funny.onmessage_fn.apply(this, arguments);
                        $(".channel").html("");
                        return;
                    case "room":
                        listener.extends.room.forEach(fn => fn(message, data));
                        return;
                    case "exits":
                        break;
                    case "item":
                        break;
                    case "items":
                        break;
                    case "itemadd":
                        listener.extends.itemadd.forEach(fn => fn(data));
                        break;
                    case "itemremove":
                        break;
                    case "actions":
                        break;
                    case "addAction":
                        break;
                    case "state":
                        funny.state = data.state;
                        listener.extends.state.forEach(fn => fn(message, data));
                        return;
                    case "perform":
                        break;
                    case "status":
                        break;
                    case "combat":
                        break;
                    case "dispfm":
                        break;
                    case "sc":
                        break;
                    case "time":
                        break;
                    case "disobj":
                        // {type: "disobj", id: "9s0d3e59a38", time: 0, count: 1}
                        break;
                    default:
                        console.log(data);
                        break;
                }
            }
            funny.onmessage_fn.apply(this, arguments);
        },
        sendmessage: function(message) {
            funny.webSocket.send(message);
            $(".console").append(`<div> >> ${message}</div>`);
            fn.scroll(".console");
        },
        extends: {
            text: [],
            dialog: [],
            msg: [],
            room: [],
            state: [],
            itemadd: [],
        },
        addListener: function(type, fn) {
            listener.extends[type].push(fn);
        },
    };
    unsafeWindow.listener = listener;
    listener.addListener("text", function(message) {
        let data = message.data;
        if (/重新连线|欢迎登陆/.test(data)) {
            funny.data_login += 1;
            $(".content-message pre").append(`${data}\n`);
            if (funny.data_login === 1) {
                $(".content-message pre").append(`wsmud_funny ${funny.version} 苏轻/墨匿祝您游戏愉快！\n`);
                getScore();
            }
            async function getScore() {
                $("[command=score]").click();
                await fn.sleep(100);
                $("[for=1]").click();
                await fn.sleep(100);
                $("[for=0]").click();
                await fn.sleep(100);
                $("[command=skills]").click();
                await fn.sleep(100);
                $("[command=pack]").click();
                await fn.sleep(100);
                $("[command=tasks]").click();
                await fn.sleep(100);
                $("[command=showcombat]").click(); // 点击动作
                await fn.sleep(100);
                $("[command=showtool]").click();   // 点击菜单
                await fn.sleep(1000);
                $(".dialog-close").click();
            };
        } else if (/你获得了(.*)点经验，(.*)点潜能/.test(data)) {
            funny.onmessage_fn.apply(this, arguments);
            let a = data.match(/你获得了(.*)点经验，(.*)点潜能/);
            funny.data_jy += parseInt(a[1]);
            funny.data_qn += parseInt(a[2]);
            $(".remove_data_jyqn").remove();
            $(".content-message pre").append(
                $(`<span class="remove_data_jyqn"></span>`)
                .append(`合计 => 经验:${funny.data_jy} 潜能:${funny.data_qn}\n`)
            );
        } else if (/你轻声吟道/.test(data)) {
        } else if (/看起来(.*)想杀死你/.test(data)) {
            let a = data.match(/看起来(.*)想杀死你！/);
            $(".content-message pre").append(`<hir>${a[1]} => 开始攻击你！<hir>\n`);
        } else if (/你对著(.*)喝道/.test(data)) {
            let a = data.match(/你对著(.*)喝道/);
            $(".content-message pre").append(`<hir>你 => 开始攻击${a[1]}！<hir>\n`);
        } else if (/你扑向(.*)/.test(data)) {
            let a = data.match(/你扑向(.*)！/);
            $(".content-message pre").append(`<hir>你 => 开始攻击${a[1]}！<hir>\n`);
        } else if (/造成(.*)点/.test(data)) {
            let a = data.split(/.*造成<wht>|.*造成<hir>|<\/wht>点|<\/hir>点/);
            let b = a[2].split(/伤害|\(|</);
            if (b[0] === "暴击") {
                $(".content-message pre").append(`${b[2]}受到<hir>${a[1]}</hir>点<hir>${b[0]}</hir>伤害！\n`);
            } else {
                $(".content-message pre").append(`${b[2]}受到<wht>${a[1]}</wht>点伤害！\n`);
            }
        } else if (/你的最大内力增加了/.test(data)) {
            funny.onmessage_fn.apply(this, arguments);
            let a = data.match(/你的最大内力增加了(.*)点。/);
            let n = parseInt(a[1]),
              max = parseInt(funny.role.max_mp),
            limit = parseInt(funny.role.limit_mp);
            let time = (limit - max) / (n * 6); // X分钟 => X小时X分钟
            let timeString = time < 60 ? `${parseInt(time)}分钟` : `${parseInt(time / 60)}小时${parseInt(time % 60)}分钟`;
            $(".remove_dzsj").remove();
            $(".content-message pre").append(`<span class="remove_dzsj">当前内力: ${max}\n上限内力: ${limit}\n需要时间: ${timeString}\n</span>`);
        } else if (/无数花瓣夹杂着寒气/.test(data)) {
            let a = data.match(/无数花瓣夹杂着寒气将(.*)围起/);
            $(".content-message pre").append(`<him>「太上忘情」 => ${a[1]}（无法躲闪）</him>\n`);
        } else if (/数息后只留下一堆玄色石头/.test(data)) {
            let a = data.match(/只见(.*)发出一阵白光/);
            $(".content-message pre").append(`你分解了 => ${a[1]}\n`);
        } else {
            funny.onmessage_fn.apply(this, arguments);
        }
        fn.scroll(".content-message");
    });
    listener.addListener("msg", function(data) {
        data.name = (data.name === "" || data.name === undefined) ? "" : `${data.name}：`;
        if (data.ch === "chat") {
            let levels = ["<hic>闲聊</hic>", "<hic>闲聊</hic>", "<hic>闲聊</hic>", "<hiy>宗师</hiy>", "<hiz>武圣</hiz>", "<hio>武帝</hio>", "<hir>武神</hir>"];
            $(".chat").append(
                $(`<span cmd="look3 ${data.uid}"><hic>【${levels[data.lv]}】${data.name}${data.content}</hic><br></span>`)
                .click(function() { fn.send(`${$(this).attr("cmd")}`); })
            );
        } else if (data.ch === "fam") {
            $(".fam").append(
                $(`<span cmd="look3 ${data.uid}"><hiy>【${data.fam}】${data.name}${data.content}</hiy><br></span>`)
                .click(function() { fn.send(`${$(this).attr("cmd")}`); })
            );
        } else if (data.ch === "pty") {
            $(".pty").append(
                $(`<span cmd="look3 ${data.uid}"><hiz>【帮派】${data.name}${data.content}</hiz><br></span>`)
                .click(function() { fn.send(`${$(this).attr("cmd")}`); })
            );
        } else if (data.ch === "tm") {
            $(".tm").append(`<hig>【队伍】${data.name}${data.content}</hig><br>`);
        } else if (data.ch === "es") {
            $(".es").append(`<hio>【${data.server}】${data.name}${data.content}</hio><br>`);
        } else if (data.ch === "rumor") {
            if (data.content.includes("闭关修炼")) {
                let a = data.content.match(/听说武帝(.*)闭关修炼似有所悟，你随之受益获得了(.*)经验，(.*)潜能/);
                $(".rumor").append(`<him>【谣言】武帝「${a[1]}」出关，奖励经验潜能${a[3]}点。</him><br>`);
            } else if (data.content.includes("听说郭大侠收到线报蒙古大军近日将会进攻襄阳")) {
                $(".rumor").append(`<him>【谣言】蒙古大军将会进攻襄阳！　<wht>${fn.getTime()}</wht></him><br>`);
            } else if (data.content.includes("出现在")) {
                // 听说邀月出现在逍遥派-青草坪一带。
                let a = data.content.match(/听说(.*)出现在(.*)-(.*)一带。/);
                $(".rumor").append(`<him>【谣言】${a[1]}出现在${a[2]}${a[3]}！　<wht>${fn.getTime()}</wht></him><br>`);
            } else {
                $(".rumor").append(`<him>【谣言】${data.content}</him><br>`);
            }
            // if (funny.data.id === "j9h729c52bc") fn.send("chat *好样的");
        } else if (data.ch === "sys") {
            if (/欢迎登录|非法收益/.test(data.content)) return;
            if (data.content.includes("挖矿技巧")) {
                let a = data.content.match(/(.*)捡到一本挖矿指南/);
                data.content = `${a[1]}使用了挖矿指南！`;
            }
            $(".sys").append(`<hir>【系统】${data.content}　<wht>${fn.getTime()}</wht></hir><br>`);
        } else {
            console.log(data);
        }
        fn.scroll(`.${data.ch}`);
    });
    // tasks
    listener.addListener("dialog", function(data) {
        if (data.dialog === "tasks" && data.items) {
            let fb, qa, wd1, wd2, wd3, sm1, sm2, ym1, ym2, yb1, yb2;
            data.items.forEach(item => {
                if (item.state === 2) fn.send(`taskover ${item.id}`); // 自动完成
                if (item.id === "signin") {
                    let a = item.desc.match(/师门任务：(.*)，副本：<(.*)>(.*)\/20<(.*)>/);
                    let b = item.desc.match(/(.*)武道塔(.*)，进度(.*)\/(.*)<(.*)>，<(.*)>(.*)首席请安。<(.*)>/);
                    (parseInt(a[3]) < 20) ? fb = `<hig>${a[3]}</hig>` : fb = a[3];
                    (parseInt(b[3]) < parseInt(b[4])) ? wd1 = `<hig>${b[3]}</hig>` : wd1 = b[3];
                    wd2 = b[4];
                    /可以重置/.test(b[2]) ? wd3 = "<hig>可以重置</hig>" : wd3 = "已经重置";
                    /已经/.test(b[7]) ? qa = "已经请安" : qa = "<hig>尚未请安</hig>";
                } else if (item.id === "sm") {
                    let a = item.desc.match(/目前完成(.*)\/20个，共连续完成(.*)个。/);
                    (parseInt(a[1]) < 20) ? sm1 = `<hig>${a[1]}</hig>` : sm1 = a[1];
                    sm2 = a[2];
                } else if (item.id === "yamen") {
                    let a = item.desc.match(/目前完成(.*)\/20个，共连续完成(.*)个。/);
                    (parseInt(a[1]) < 20) ? ym1 = `<hig>${a[1]}</hig>` : ym1 = a[1];
                    ym2 = a[2];
                } else if (item.id === "yunbiao") {
                    let a = item.desc.match(/本周完成(.*)\/20个，共连续完成(.*)个。/);
                    (parseInt(a[1]) < 20) ? yb1 = `<hig>${a[1]}</hig>` : yb1 = a[1];
                    yb2 = a[2];
                }
            });
            let html = `门派请安 => ${qa}\n武道之塔 => ${wd1}/${wd2} ${wd3}\n`;
            html += `日常副本 => ${fb}/20\n师门任务 => ${sm1}/20 ${sm2}连\n`;
            html += `衙门追捕 => ${ym1}/20 ${ym2}连\n每周运镖 => ${yb1}/20 ${yb2}连\n`;
            $(".remove_tasks").remove();
            $(".content-message pre").append($(`<span class="remove_tasks"><span>`).html(html));
            fn.scroll(".content-message");
        }
    });
    // score
    listener.addListener("dialog", function(data) {
        if (data.dialog === "score") {
            for (const key in data) funny.role[key] = data[key];
            for (const key in funny.role) $(`.role_${key}`).html(funny.role[key]);
        }
    });
    // skills
    listener.addListener("dialog", function(data) {
        // console.log(data);
        // {type: "dialog", dialog: "skills", id: "quanzhenjianfa", level: 387, exp: 31}
        // {type: "dialog", dialog: "skills", id: "anranxiaohun", exp: 84}
        if (data.dialog === "skills") {
            funny.skills = data.items || funny.skills || [];
            if (data.items) {
                funny.data_skill_limit = parseInt(data.limit);
            } else if (data.id && data.exp) {
                if (data.level) {
                    for (const skill of funny.skills) {
                        if (skill.id === data.id) {
                            skill.level = data.level;
                            break;
                        }
                    }
                }
                let name = "", k = 0, level = 0;
                let djsx = funny.data_skill_limit; // 上限
                let xxxl = parseInt(funny.role.study_per);   // 学习效率
                let lxxl = parseInt(funny.role.lianxi_per);  // 练习效率
                let xtwx = parseInt(funny.role.int);         // 先天悟性
                let htwx = parseInt(funny.role.int_add);     // 后天悟性
                if (funny.skills) {
                    for (const skill of funny.skills) {
                        if (skill.id === data.id) {
                            name = skill.name;
                            level = parseInt(skill.level);
                            if (/<wht>.*/.test(name)) k = 1; // 白
                            if (/<hig>.*/.test(name)) k = 2;
                            if (/<hic>.*/.test(name)) k = 3;
                            if (/<hiy>.*/.test(name)) k = 4;
                            if (/<hiz>.*/.test(name)) k = 5;
                            if (/<hio>.*/.test(name)) k = 6; // 橙
                            if (/<hir>.*/.test(name)) k = 7; // 红
                            break;
                        }
                    }
                }
                //技能所需潜能
                let qianneng = (djsx * djsx - level * level) * 2.5 * k;
                //人物当前潜能funny
                let ownQN =  parseInt(funny.role.pot)
                if (funny.state === "你正在练习技能") {
                    let time = qianneng / (xtwx + htwx) / (1 + lxxl / 100 - xtwx / 100) / 12;
                    let timeString = time < 60 ? `${parseInt(time)}分钟` : `${parseInt(time / 60)}小时${parseInt(time % 60)}分钟`;
                    $(".remove_lx").remove();
                    // 练习每一跳的消耗公式＝（先天悟性＋后天悟性）×（1＋练习效率%－先天悟性%）
                    $(".content-message pre").append(`练习${name}消耗了${parseInt(qianneng / time / 12)}点潜能。\n`);
                    $(".content-message pre").append(`<span class="remove_lx">角色悟性: ${xtwx}＋${htwx}\n练习效率: ${lxxl}%\n等级上限: ${djsx}级\n需要潜能: ${qianneng}\n需要时间: ${timeString}\n</span>`);
                    fn.scroll(".content-message");
                } else if (funny.state === "你正在读书") {
                    // 学习每一跳的消耗公式＝（先天悟性＋后天悟性）×（1＋学习效率%－先天悟性%）×3
                    let cost = (xtwx + htwx) * (1 +  xxxl / 100 - xtwx / 100) * 3;
                    $(".content-message pre").append(`学习${name}消耗了${parseInt(cost)}点潜能。\n`);
                    if (funny.data.id === "j9h729c52bc") {
                        let time = qianneng / cost / 12;
                        let timeString = time < 60 ? `${parseInt(time)}分钟` : `${parseInt(time / 60)}小时${parseInt(time % 60)}分钟`;
                        $(".content-message pre").append(`练满时间 => ${timeString}\n`);
                    }
                    fn.scroll(".content-message");
                }else if (funny.state.startWith("你正在学习")) {
                    // 学习每一跳的消耗公式＝（先天悟性＋后天悟性）×（1＋学习效率%）×3
                    let cost = (xtwx + htwx) * (1 +  xxxl / 100 ) * 3;
                    $(".content-message pre").append(`学习${name}消耗了${parseInt(cost)}点潜能。\n`);
                        let time = qianneng / cost / 12;
                        let leftTime = ownQN / cost / 12
                        let timeString = time < 60 ? `${parseInt(time)}分钟` : `${parseInt(time / 60)}小时${parseInt(time % 60)}分钟`;
                        let leftTimeString = leftTime < 60 ? `${parseInt(leftTime)}分钟` : `${parseInt(leftTime / 60)}小时${parseInt(leftTime % 60)}分钟`;
                    $(".content-message pre").append(`练满时间 => ${timeString}  潜能耗尽时间 => ${leftTimeString}\n`);
                    fn.scroll(".content-message");
                }
            }
        }
    });

	//用来判断的自实现函数
    String.prototype.startWith=function(str){
        var reg=new RegExp("^"+str);
        return reg.test(this);
    }

    // pack
    listener.addListener("dialog", function(data) {
        if (data.dialog === "pack") {
            funny.pack = funny.pack || {};
            funny.pack.money = data.money || funny.pack.money || 0;
            funny.pack.max = data.max_item_count || funny.pack.max || 0;
            funny.pack.items = data.items || funny.pack.items || [];
            funny.pack.eqs = data.eqs || funny.pack.eqs || [];

            if (data.name && !/wht/.test(data.name)) {
                funny.pack.total = funny.pack.total || {};
                funny.pack.total[data.name] ?
                (funny.pack.total[data.name] ++) : (funny.pack.total[data.name] = 1);
                let remove = "remove_pack_" + data.name.replace(/\/|<|>/g, "");
                $(`.${remove}`).remove();
                $(".channel-pack").append(`<span class="${remove}">统计 => ${data.name} => <wht>${funny.pack.total[data.name]}</wht><br></span>`);
                fn.scroll(".channel-pack");
            }

            if (data.can_use == 1 && /养精丹|朱果|潜灵果/.test(data.name)) {
                let count = data.count > 10 ? 10 : data.count;
                let cmd = [];
                for (let i = 0; i < count; i ++) {
                    cmd.push(`use ${data.id}`);
                    cmd.push(500);
                }
                $(".content-message pre").append(
                    $(`<div class="item-commands"></div>`).append(
                        $(`<span>快捷使用${count}次 => ${data.name}</span>`).click(() => {
                            fn.send(cmd);
                        }),
                    ),
                );
            }

            if (data.name) {
                if (/<hig>大宋(.*)<\/hig>|<hig>蒙古(.*)<\/hig>|<hig>笠子帽<\/hig>/.test(data.name)) {
                    fn.send(`fenjie ${data.id}`);
                } else {
                    console.log(data);
                }
            }
        }
    });

    listener.addListener("room", function(message, data) {
        if (/cmd cmd=/.test(data.desc)) {
            data.desc = data.desc.replace("<hig>椅子</hig>", "椅子");
            let a = data.desc.match(/<cmd cmd='([^']+)'>([^<]+)<\/cmd>/g);
            a.forEach(desc => data.desc = `<hic>${desc}</hic>　${data.desc}`);
            let mask = fn.deepCopy(message);
            mask.data = JSON.stringify(data);
            funny.onmessage_fn.apply(this, [mask]);
        } else {
            funny.onmessage_fn.apply(this, [message]);
        }
    });
    listener.addListener("state", function(message, data) {
        if (data.desc && data.desc.length > 0) {
            data.desc = [];
            let mask = fn.deepCopy(message);
            mask.data = JSON.stringify(data);
            funny.onmessage_fn.apply(this, [mask]);
        } else {
            funny.onmessage_fn.apply(this, [message]);
        }
    });

    listener.addListener("itemadd", function(data) {
        if (/蒙古兵|十夫长|百夫长|千夫长|万夫长/.test(data.name)) {
            if (data.id) fn.send(`kill ${data.id}`);
        }
    });



    if (WebSocket) {
        unsafeWindow.WebSocket = function(url) {
            funny.webSocket = new WebSocket(url);
        };
        unsafeWindow.WebSocket.prototype = {
            get url() {
                return funny.webSocket.url;
            },
            get protocol() {
                return funny.webSocket.protocol;
            },
            get readyState() {
                return funny.webSocket.readyState;
            },
            get bufferedAmount() {
                return funny.webSocket.bufferedAmount;
            },
            get extensions() {
                return funny.webSocket.extensions;
            },
            get binaryType() {
                return funny.webSocket.binaryType;
            },
            set binaryType(type) {
                funny.webSocket.binaryType = type;
            },
            get onerror() {
                return funny.webSocket.onerror;
            },
            set onerror(fn) {
                funny.webSocket.onerror = fn;
            },
            get onopen() {
                return funny.webSocket.onopen;
            },
            set onopen(fn) {
                funny.webSocket.onopen = fn;
            },
            get onclose() {
                return funny.webSocket.onclose;
            },
            set onclose(fn) {
                funny.webSocket.onclose = fn;
            },
            close: function () {
                funny.webSocket.close();
            },
            get onmessage() {
                return funny.webSocket.onmessage;
            },
            set onmessage(fn) {
                funny.onmessage_fn = fn;
                funny.webSocket.onmessage = listener.onmessage;
            },
            send: function (message) {
                listener.sendmessage(message);
            },
        };
    };

    $(document).ready(function() {
        // mobile
        let agent = navigator.userAgent.toLowerCase();
        let isMobile = /ipad|iphone|android|mobile/.test(agent);
        if (isMobile) {
            console.log(agent);
            return;
        }
        // 样式优化
        $(".signinfo").addClass("hide");
        GM_addStyle(`.room_desc{overflow:hidden;white-space:nowrap;}`);
        GM_addStyle(`.channel{display:none;}`);
        GM_addStyle(`.content-bottom{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;}`);
        GM_addStyle(`.room-item>.item-name{margin-left:14px;}`);
        $(".room_items")[0].style.maxHeight = "240px";
        $(".state-bar")[0].style.overflow = "hidden";
        $(".combat-commands")[0].style.overflow = "hidden";
        $(".dialog-content")[0].style.overflowX = "hidden";
        // 三栏布局
        $("body").append($(`<div class="left box"></div>`));
        $("body").append($(`<div class="right box"></div>`));
        $(".container").addClass("box");
        $(".login-content").addClass("box");
        GM_addStyle(`body{width:100%;display:flex;flex-flow:row no-wrap;}`);
        GM_addStyle(`.box{width:600px;flex: 0 0 auto;}`);
        GM_addStyle(`.container,.login-content{flex:1 0 auto;}`);
        GM_addStyle(`.left{order:-1;width:300px} .right{order:1;}`);
        // 左边
        $(".left").append(
            $(`<div class="left-nav item-commands" style="text-align:center;margin-left:10px;"></div>`).append(
                $(`<span id="click_role">属性</span>`).click(function() {
                    $(".left-hide").hide();
                    $(".left-role").show();
                }),
                $(`<span>技能</span>`).click(function() {
                    layoutSkill();
                    $(".left-hide").hide();
                    $(".left-skill").show();
                }),
                $(`<span>背包</span>`).click(function() {
                    // layoutPack();
                    $(".left-hide").hide();
                    $(".left-pack").show();
                }),
                $(`<span>备用</span>`),
                $(`<span>刷新数据</span>`).click(function() {
                     refreshScore();
                     async function refreshScore() {
                         $("[command=score]").click();
                         await fn.sleep(100);
                         $("[command=skills]").click();
                         await fn.sleep(100);
                         $("[command=pack]").click();
                         await fn.sleep(100);
                         $("[command=tasks]").click();
                         await fn.sleep(1000);
                         $(".dialog-close").click();
                     };
                }),
            ),
            $(`<div class="left-role left-hide"></div>`).append(
                $(`<table></table>`).append(
                    $(`<tr></tr>`).append(`<td colspan="4"><hiy>角色信息</hiy></td>`),
                    $(`<tr><td colspan="4" class="role_name">ROLE_NAME</td></tr>`),
                    $(`<tr><td>ID</td><td colspan="3" class="role_id"></td></tr>`),
                    $(`<tr><td>性别</td><td class="role_gender"></td><td>境界</td><td class="role_level"></td></tr>`),
                    $(`<tr><td>年龄</td><td colspan="3" class="role_age"></td></tr>`),
                    $(`<tr><td>经验</td><td colspan="3"><hig class="role_exp"></hig></td></tr>`),
                    $(`<tr><td>潜能</td><td colspan="3"><hig class="role_pot"></hig></td></tr>`),
                    $(`<tr></tr>`).append(
                        $(`<td>气血</td>`), $(`<td colspan="3"><span class="role_hp"></span>/<hic class="role_max_hp"></hic></td>`),
                    ),
                    $(`<tr><td>内力</td><td colspan="3"><span class="role_mp"></span>/<hic class="role_max_mp"></hic></td></tr>`),
                    $(`<tr><td>内力上限</td><td colspan="3"><hic class="role_limit_mp"></hic></td></tr>`),
                    $(`<tr><td>臂力</td><td><hiy class="role_str"></hiy>＋<span class="role_str_add"></span></td><td>根骨</td><td><hiy class="role_con"></hiy>＋<span class="role_con_add"></span></td></tr>`),
                    $(`<tr><td>身法</td><td><hiy class="role_dex"></hiy>＋<span class="role_dex_add"></span></td><td>悟性</td><td><hiy class="role_int"></hiy>＋<span class="role_int_add"></span></td></tr>`),
                    $(`<tr><td>攻击</td><td><hig class="role_gj"></hig></td><td>终伤</td><td><hig class="role_add_sh"></hig></td></tr>`),
                    $(`<tr><td>防御</td><td><hig class="role_fy"></hig></td><td>命中</td><td><hig class="role_mz"></hig></td></tr>`),
                    $(`<tr><td>招架</td><td><hig class="role_zj"></hig></td><td>躲闪</td><td><hig class="role_ds"></hig></td></tr>`),
                    $(`<tr><td>暴击</td><td><hig class="role_bj"></hig></td><td>攻速</td><td><hig class="role_gjsd"></hig></td></tr>`),
                    $(`<tr><td>门派</td><td><hic class="role_family"></hic></td><td>功绩</td><td><hic class="role_gongji"></hic></td></tr>`),
                    $(`<tr><td>忽视防御</td><td class="role_diff_fy"></td><td>伤害减免</td><td class="role_diff_sh"></td></tr>
                    <tr><td>暴击伤害</td><td class="role_add_bj"></td><td>暴击抵抗</td><td class="role_diff_bj"></td></tr>
                    <tr><td>增加忙乱</td><td class="role_busy"></td><td>忽视忙乱</td><td class="role_diff_busy"></td></tr>
                    <tr><td>释放速度</td><td class="role_releasetime"></td><td>冷却速度</td><td class="role_distime"></td></tr>
                    <tr><td>打坐效率</td><td class="role_dazuo_per"></td><td>内力减耗</td><td class="role_expend_mp"></td></tr>
                    <tr><td>练习效率</td><td class="role_lianxi_per"></td><td>学习效率</td><td class="role_study_per"></td></tr>`)
                ),
            ),
            $(`<div class="left-skill left-hide"></div>`).append(
                $(`<table></table>`).append(
                    $(`<thead></thead>`).append(
                        $(`<tr><td colspan="3"><hiy>技能信息</hiy></td></tr>`),
                        $(`<tr><td>技能</td><td>等级</td><td>所需潜能</td></tr>`),
                    ),
                    $(`<tbody></tbody>`),
                ),
            ),
            $(`<div class="left-pack left-hide"></div>`).append(
                $(`<table><thead><hiy>还没敲</hiy></thead><tbody></tbody></table>`),
            ),
            $(`<div class="left-console console"></div>`),
            $(`<div class="left-send item-commands"></div>`).append(
                $(`<input type="text" readonly onfocus="this.removeAttribute('readonly');" id="send_value">`)
                .keypress(function(key) {
                    if (key.which == 13) $("#send_btn").click();
                }),
                $(`<span id="send_btn">发送</span>`).click(function() {
                    let value = $("#send_value").val();
                    if (value) fn.send(value);
                    $("#send_value").val("");
                }),
            ),
        );


        GM_addStyle(`.left{display:flex;flex-direction:column;flex-wrap:nowrap;}`);
        GM_addStyle(`.left table{table-layout:fixed;border-collapse:collapse;margin:0 10px 0 10px;}`);
        GM_addStyle(`.left td{width:88px;text-align:center;white-space:nowrap;border:gray solid 1px;}`);

        GM_addStyle(`.left-role{flex: 0 0 auto;}`);
        GM_addStyle(`.left-skill{flex: 1 0 auto;height:500px;overflow:auto;}`);
        GM_addStyle(`.left-pack{flex: 1 0 auto;height:500px;overflow:auto;font-size:12px;}`);
        GM_addStyle(`.left-console{flex:1 0 auto;height:100px;overflow:auto;border:gray solid 1px;margin:10px 10px 0 10px}`);
        GM_addStyle(`.left-send{flex:0 0 auto;height:auto;display:flex;}`);

        GM_addStyle(`.left-send input{flex:1 0 auto;height:auto;background-color:gray;color:white;font-size:16px;margin:5px 10px 0 10px;}`);

        $(".left span")[0].click();
        function layoutSkill() {
            let array = funny.skills || [];
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < array.length - i - 1; j++) {
                    if (array[j].level < array[j + 1].level) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    }
                    if (!/<wht>/.test(array[j].name) && /<wht>/.test(array[j + 1].name)) {
                        [array[j], array[j + 1]] = [array[j + 1], array[j]];
                    }
                }
            }
            $(".left-skill tbody").html(""); // clear
            //获取相关角色信息
            let djsx = funny.data_skill_limit; // 上限
            //书写技能相关的表头
              $(".left-skill tbody").append(
                    $(`<tr></tr>`).append(
                        $(`<td></td>`).append(`技能上限`),
                      //  $(`<td></td>`).append(`${skill.id}`),
					    $(`<td></td>`).append(`${djsx}`),
                    ),
                );
            array.forEach(skill => {
            	let level = parseInt(skill.level);
                let name = skill.name;
                let k=0
                if (/<wht>.*/.test(name)) k = 1; // 白
                if (/<hig>.*/.test(name)) k = 2;
                if (/<hic>.*/.test(name)) k = 3;
                if (/<hiy>.*/.test(name)) k = 4;
                if (/<hiz>.*/.test(name)) k = 5;
                if (/<hio>.*/.test(name)) k = 6; // 橙
                if (/<hir>.*/.test(name)) k = 7; // 红

            	let qianneng = (djsx * djsx - level * level) * 2.5 * k;
                $(".left-skill tbody").append(
                    $(`<tr></tr>`).append(
                        $(`<td></td>`).append(`${skill.name}`),
                        $(`<td></td>`).append(`${skill.level}`),
                      //  $(`<td></td>`).append(`${skill.id}`),
					    $(`<td></td>`).append(`${qianneng}`),

                    ),
                );
            });
        }
        function layoutPack() {
            let array = funny.pack.items || [];
            $(".left-pack tbody").append(
                $(`<tr></tr>`).append(
                    $(`<td colspan="3"></td>`).append(`<hiy>背包</hiy>`)
                ),
                $(`<tr><td>物品</td><td>指令</td></tr>`),
            )
            array.forEach(item => {

                $(".left-pack tbody").append(
                    $(`<tr></tr>`).append(
                        $(`<td></td>`).append(`${item.name}<br>${item.count} ${item.unit}`),
                        $(`<td class="item-commands"></td>`).append(
                            $(`<span>查看</span>`).click(function() {
                                fn.send(`checkobj ${item.id} from item`);
                            }),
                            item.can_combine ? $(`<span cmd="_confirm combine ${item.id} 10">合成</span>`) : $(),
                        ),
                    ),
                );
            });
        }

        // 右边
        $(".right").append(
            $(`<div class="msg chat"></div>`),
            $(`<div class="msg tm"></div>`),
            $(`<div class="msg fam"></div>`),
            $(`<div class="msg pty"></div>`),
            $(`<div class="msg es"></div>`),
            $(`<div class="msg sys rumor"></div>`),
            $(`<div class="msg pickup channel-pack"></div>`),
            $(`<div class="msg item-commands"></div>`).append(
                $(`<span>切</span>`).click(function() {
                    if (funny.layout_left) {
                        $(".left")[0].style.order = "1";
                        $(".right")[0].style.order = "-1";
                    } else {
                        $(".left")[0].style.order = "-1";
                        $(".right")[0].style.order = "1";
                    }
                    funny.layout_left = !funny.layout_left;
                }),
                $(`<span>点</span>`).click(function() {
                    $(".clear-channel").show(500, function() {
                        setTimeout(function() {
                            $(".clear-channel").hide(500);
                        }, 10000);
                    });
                }),

            ),
            $(`<div class="msg item-commands clear-channel"></div>`).append(
                $(`<span>世界清屏</span>`).click(() => $(".chat").html("")),
                $(`<span>队伍清屏</span>`).click(() => $(".tm").html("")),
                $(`<span>门派清屏</span>`).click(() => $(".fam").html("")),
                $(`<span>全区清屏</span>`).click(() => $(".es").html("")),
                $(`<span>帮派清屏</span>`).click(() => $(".pty").html("")),
                $(`<span>系统清屏</span>`).click(() => $(".sys").html("")),
                $(`<span>统计清屏</span>`).click(() => $(".channel-pack").html("")),
                $(`<span>游戏清屏</span>`).click(() => $(".content-message pre").html("")),
            ),
        );
        $(".clear-channel").hide();
        GM_addStyle(`.right{height:100%;display:flex;flex-direction:column;}`);
        GM_addStyle(`.msg{height:auto;overflow:auto;flex: 0 0 auto;font-size:14px;line-height:16px;max-height:160px;}`);
        GM_addStyle(`.chat{flex:1 1 auto;max-height:100%;}`);
        //增加关闭按钮大小
        GM_addStyle(`.dailog_close{width:80px;}`);
    });
})();
