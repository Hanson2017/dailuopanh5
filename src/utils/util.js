const synLogin='http://www.dailuopan.com/member/login/App_reurl?';

module.exports = {
    // 判断是否为一线平台
    isbest(val) {
        var isbest = false;
        if (val !== null && val !== '' && val.length > 0) {
            for (let i = 0; i < val.length; i++) {
                if (val[i].tags == '一线平台') {
                    isbest = true;
                }
            }
        }
        return isbest;
    },
    goBBs(seturl) {
        var url;

        if (localStorage.loginState) {
            var memberid = '';
            var Userid = '';
            var password = '';
            var loginState = JSON.parse(localStorage.loginState);

            memberid = loginState.r_id ? loginState.r_id : 0;
            Userid = loginState.r_Userid ? loginState.r_Userid : '';
            password = loginState.r_password ? loginState.r_password : '';

            url = synLogin + 'memberid=' + memberid + '&Userid=' + Userid + '&password=' + password + '&reurl=' + encodeURIComponent(seturl)
        }

        else {
            url = seturl;
        }

        return url;
    },
    setDate: function (date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day
    },
    setDate2: function (date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return year + '/' + month + '/' + day
    },
    setDate3: function (date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        if (month < 10) {
            month = '0' + month;
        }
        if (day < 10) {
            day = '0' + day;
        }
        return month + '-' + day
    },
    formatDate: function (date) {
        let d = this.setDate(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    formatDate2: function (date) {
        let d = this.setDate2(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    formatDate3: function (date) {
        let d = this.setDate3(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    GetQueryString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    cutText(str, word) {
        if (str.length > word) return str.substr(0, word) + "...";
        return str;
    },
    // 去掉所有的html标记
    delHtmlTag(str) {
        var strH = str.replace(/<[^>]+>/g, "");
        var arrEntities = { 'lt': '<', 'gt': '>', 'nbsp': ' ', 'amp': '&', 'quot': '"' };
        strH = strH.replace(/&(lt|gt|nbsp|amp|quot);/ig, function (all, t) { return arrEntities[t]; });
        return strH;
    },
}