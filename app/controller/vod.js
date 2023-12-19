const Controller = require('egg').Controller;
// const RPCClient = require('@alicloud/pop-core').RPCClient;

class VodController extends Controller {
    async vodClient() {
        // const regionId = 'cn-shanghai';
        // const client = new RPCClient({
        //     accessKeyId: '',
        //     accessKeySecret: '',
        //     endpoint: '',
        //     apiVersion: ''
        // });

        // return client;
        return '';
    }

    async getvodinfo(vodId) {
        const client = await this.vodClient();
        const res = await client.request('GetPlayInfo', {
            VideoId: vodId
        }, {});

        return res;
    }

    async getvod() {
        const query = this.ctx.query;
        this.ctx.validate({
            title: {type: 'string'},
            filename: {type: 'string'}
        }, query);
        const client = await this.vodClient();
        const vodback = await client.request('CreateUploadVideo', {
            Title: query.title,
            FileName: query.filename
        }, {});

        this.ctx.body = vodback;
    }

    async getvideo() {
        const videoid = this.ctx.params.videoid;
        const dbback = await this.app.model.Video.findById(videoid);
        if(dbback) {
            const videoInfo = dbback._doc;
            const vodid = videoInfo.vodvideoId;
            const vodInfo = await this.getvodinfo(vodid);
            videoInfo.vod = vodInfo;

            this.ctx.body = videoInfo;
        } else{
            this.ctx.throw(404, "视频不存在");
        }

    }
}

module.exports = VodController;