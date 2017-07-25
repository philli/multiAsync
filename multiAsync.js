/**
 * @file MultiAsync.js
 * @author Phil Li <zixulee@163.com>
 */

(function(root, undefined) {

    var multiAsync = function (tasks, callback) {

        var isArrTasks = Object.prototype.toString.call(tasks) === '[object Array]';

        if (tasks && (isArrTasks && tasks.length || typeof tasks === 'object') && typeof callback === 'function') {
            var res;
            var length = 0;
            var count = 0;

            // 数组
            if (isArrTasks) {
                res = [];
                length = tasks.length;
                while (tasks.length) {
                    complete(res, length - tasks.length, tasks.shift());
                }
            }
            // 对象
            else {
                res = {};
                // 单独获取length，避免非异步任务
                for (var k in tasks) {
                    length++;
                }
                for (var k in tasks) {
                    complete(res, k, tasks[k]);
                }
            }

            function complete(res, k, task) {
                if (typeof task === 'function') {
                    task(function (err, data) {
                        res[k] = data;
                        if (++count === length) {
                            callback(err, res);
                        }
                    });
                } else {
                    res[k] = undefined;
                    if (++count === length) {
                        callback({msg: 'task type error'}, res);
                    }
                }
            }
        }
    };

    'undefined' !== typeof module ? module.exports = multiAsync: root.multiAsync = multiAsync;

})(this);
