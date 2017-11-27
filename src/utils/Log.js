//noinspection JSAnnotator
/**
 *
 * Created by quanke(http://quanke.name) on 2017/5/12.
 */


var Log = {
    d: function (tag: string,
                 msg: string): void {
        if (false) {
            console.log(tag, msg);
        }
        // RCTLog.d(tag, msg);
    }, i: function (tag: string,
                    msg: string): void {
        if (false) {
            console.log(tag, msg);
        }
        // RCTLog.i(tag, msg);
    }, e: function (tag: string,
                    msg: string): void {
        if (true) {
            console.log(tag, msg);
        }
        // RCTLog.e(tag, msg);
    },
};

module.exports = Log;