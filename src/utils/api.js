'use strict';

const host = 'http://192.168.1.18:8080/MPAPI/';
// const domain = 'http://192.168.1.18:8080';
// const host = 'http://www.dailuopan.com/MPAPI/';
const domain = 'http://www.dailuopan.com';

module.exports = {
    domain: domain,
    pingji: host + 'GetGradeList',  //评级
    data: host + 'GetDataList',    //数据详情
    health: host + 'GetHealthList',//健康度
    flow: host + 'GetFlowList',//流量
    rongzi: host + 'GetPlatbackList',//融资背景
    yewu: host + 'GetServicetypeList',//业务类型
    diqu: host + 'GetPlatListAll',//地区、上线时间、存管
    black: host + 'GetBlackList',//黑名单
    zhengyi: host + 'GetYujingList',//争议
    flmfList: host + 'GetFlmfListAll',//优惠活动
    fund: host + 'GetFundList',//示范资金
    yulun: host + 'GetYulunList',//舆论监控
    fiveYears: host + 'GetOldList',//五年老平台
    search: host + 'GetSearch', //搜索
    getSearchTop: host + 'GetSearchTop', //热门搜索
    detail: host + 'GetPlatdetail',//详情页
    helpList: host + 'GetHelpList',//常见问题列表
    helpDetail: host + 'GetHelpdetail',//常见问题详情
    pingCeList: host + 'GetMparticleList', //评测列表
    pingCeDetail: host + 'GetArticledetail', //评测详情
    getUserinfo: domain + '/member/Login/QQlogin_h5', //QQ,wechat 登录
    attentionAdd: host + 'Member_follow_addplat', //添加关注
    attentionDel: host + 'Member_follow_delplat', //取消关注
    isAttention: host + 'Member_follow_hasplat', //是否关注了该平台  
    attentionList: host + 'Member_follow_getplatlist', //关注列表 
    getqqun: host + 'GetQQqun', //获取QQ群信息 
    getReportsList: host + 'GetReportsList', //数据报表列表
    getReportsDetail: host + 'GetReportsDetail', //数据报表列表
    getReportsDetail_dlp: host + 'GetReportsDetail_dlp', //贷罗盘数据报表列表
    commentListNew:host+'/Getcomment_p2p_page', //评论列表
    commentList: 'http://www.76676.com/index.php?m=member&c=index&a=public_getcomment_dlp&p2pid='
}