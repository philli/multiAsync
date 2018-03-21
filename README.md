# multiAsync
multi-async task


### Demo1：multi-tasks

    multiAsync([
        function(cb){
            setTimeout(function(){
                cb(null, '123');
            }, 1000);
        },
        // 带参数
        [function(cb, str){
            setTimeout(function(){
                cb(null, str);
            }, 3000);
        }, '456'],
        // 带参数
        [function(cb, options){
            setTimeout(function(){
                cb(null, options.str);
            }, 2000);
        }, {
            str: '789'
        }]
    ], function(err, res){
        console.log(err, res);
    });


### Demo2：multi-batch-multi-task

    // 第一批任务
    multiAsync([
        function(cb){
            setTimeout(function(){
                cb(null, '123');
            }, 1000);
        },
        function(cb){
            setTimeout(function(){
                cb(null, '456');
            }, 3000);
        },
        function(cb){
            setTimeout(function(){
                cb(null, '789');
            }, 2000);
        }
    ], function(err, res){
        console.log(err, res);
    });
    
    // 第二批任务
    multiAsync([
        function(cb){
            setTimeout(function(){
                cb(null, 'abc');
            }, 1500);
        },
        function(cb){
            setTimeout(function(){
                cb(null);
            }, 1200);
        },
        function(cb){
            setTimeout(function(){
                cb(null, 'def');
            }, 2500);
        }
    ], function(err, res){
        console.log(err, res);
    });
    
    // 第三批任务
    multiAsync({
        a: function(cb){
            cb(null, 'xxx');
        },
        // 带参数
        b: [function(cb, str){
            setTimeout(function(){
                cb(null, str);
            }, 1500);
        }, 'yyy'],
        c: function(cb){
            setTimeout(function(){
                cb(null, 'zzz');
            }, 1000);
        }
    }, function(err, res){
        console.log(err, res);
    });


### Demo3：multi-multi-batch-multi-task
    
    multiAsync([
        function(callback){
            multiAsync([
                function(cb){
                    setTimeout(function(){
                        cb(null, '123');
                    }, 1000);
                },
                function(cb){
                    setTimeout(function(){
                        cb(null, '456');
                    }, 3000);
                },
                function(cb){
                    setTimeout(function(){
                        cb(null, '789');
                    }, 2000);
                }
            ], function(err, res){
                callback(null, res);
            });
        },
        function(callback){
            multiAsync([
                function(cb){
                    setTimeout(function(){
                        cb(null, 'abc');
                    }, 1500);
                },
                function(cb){
                    setTimeout(function(){
                        cb(null);
                    }, 1200);
                },
                function(cb){
                    setTimeout(function(){
                        cb(null, 'def');
                    }, 2500);
                }
            ], function(err, res){
                callback(null, res);
            });
        },
        function(callback){
            multiAsync({
                a: function(cb){
                    cb(null, 'xxx');
                },
                b: function(cb){
                    setTimeout(function(){
                        cb(null, 'yyy');
                    }, 1500);
                },
                c: function(cb){
                    setTimeout(function(){
                        cb(null, 'zzz');
                    }, 1000);
                }
            }, function(err, res){
                callback(null, res);
            });
        },
    ], function(err, result){
        console.log(err, result);
    });

