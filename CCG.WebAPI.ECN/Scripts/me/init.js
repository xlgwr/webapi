/* File Created: May 5, 2015 */
var users = {
    domain: '',
    userid: '',
    username:'',
    dept:'',
    userrole: ''
};
var ecnnbrs = {
    ecnnbr: ''
};
//custom function
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return (r[2]); return null;
}