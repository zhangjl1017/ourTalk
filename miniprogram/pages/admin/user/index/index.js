// pages/index/index.js
Page({
    /**
   * 页面的初始数据
   */
    data: {
        user: []
    },
    /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function onLoad(options) {
        var _this = this;
        var db = wx.cloud.database();
        db.collection("user").get({
            success: function success(res) {
                _this.setData({
                    user: res.data
                });
            },
            fail: function fail(err) {
                wx.showToast({
                    icon: "none",
                    title: "查询记录失败"
                });
            }
        });
    },
    onDel: function onDel(e) {
        var _this2 = this;
        var id = e.currentTarget.dataset.id;
        var db = wx.cloud.database();
        db.collection("user").doc(id).remove({
            success: function success(res) {
                wx.showToast({
                    title: "删除成功"
                });
                _this2.onLoad();
                //删除成功重新加载
                        },
            fail: function fail(err) {
                wx.showToast({
                    title: "删除失败"
                });
            }
        });
        console.log(id);
    },
    onUpdate: function onUpdate(e) {
        var id = e.currentTarget.dataset.id;
        wx.navigateTo({
            url: "../upUser/upUser?id=" + id
        });
    }
});