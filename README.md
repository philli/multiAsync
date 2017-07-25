# multiAsync
multi-async task


### Demo1：multi-tasks

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
    ], function(res){
        console.log(res);
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
    ], function(res){
        console.log(res);
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
    ], function(res){
        console.log(res);
    });
    
    // 第三批任务
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
    }, function(res){
        console.log(res);
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
            ], function(res){
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
            ], function(res){
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
            }, function(res){
                callback(null, res);
            });
        },
    ], function(result){
        console.log(result);
    });

