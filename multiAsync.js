/**
 * @file MultiAsync.js
 * @url https://github.com/philli/multiAsync/blob/master/multiAsync.js
 * @author Phil Li <zixulee@163.com>
 */

(function(root, undefined) {

    var multiAsync = function (tasks, callback) {

        var isArrTasks = Object.prototype.toString.call(tasks) === '[object Array]';

        if (tasks && (isArrTasks && tasks.length || typeof tasks === 'object') && typeof callback === 'function') {
            var res;
            var resErr;
            var length = 0;
            var count = 0;

            // 数组
            if (isArrTasks) {
                resErr = [];
                res = [];
                length = tasks.length;
                while (tasks.length) {
                    complete(resErr, res, length - tasks.length, tasks.shift());
                }
            }
            // 对象
            else {
                resErr = {};
                res = {};
                // 单独获取length，避免非异步任务
                for (var t in tasks) {
                    length++;
                }
                for (var k in tasks) {
                    complete(resErr, res, k, tasks[k]);
                }
            }

            function complete(resErr, res, k, task, params) {
                if (typeof task === 'function') {
                    task(function (err, data) {
                        err && (resErr[k] = err);
                        res[k] = data;
                        if (++count === length) {
                            if (isArrTasks) {
                                !resErr.length && (resErr = null);
                            } else {
                                var hasErr;
                                for (var r in resErr) {
                                    hasErr = 1;
                                }
                                !hasErr && (resErr = null);
                            }
                            callback(resErr, res);
                        }
                    }, params);
                } else if (Object.prototype.toString.call(task) === '[object Array]') {
                    complete(resErr, res, k, task[0], task[1]);
                } else {
                    resErr[k] = {msg: 'task type error'};
                    res[k] = undefined;
                    if (++count === length) {
                        callback(resErr, res);
                    }
                }
            }
        }
    };

    'undefined' !== typeof module ? module.exports = multiAsync: root.multiAsync = multiAsync;

})(this);
