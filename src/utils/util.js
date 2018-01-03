module.exports = {
    setDate:function(date) {
        var year = date.getFullYear()
        var month = date.getMonth() + 1
        var day = date.getDate()
        return year + '-' + month + '-' + day
    },
    formatDate:function(date) {
        let d = this.setDate(new Date(parseInt(date.replace("/Date(", "").replace(")/", ""))));
        return d;
    },
    GetQueryString:function(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }
}