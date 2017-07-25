# multiAsync
multi-async task


### Demo1：multi-tasks

    multiAsync([
        function(cb){
            setTimeout(function(){
                cb('123');
            }, 1000);
        },
        function(cb){
            setTimeout(function(){
                cb('456');
            }, 3000);
        },
        function(cb){
            setTimeout(function(){
                cb('789');
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
                cb('123');
            }, 1000);
        },
        function(cb){
            setTimeout(function(){
                cb('456');
            }, 3000);
        },
        function(cb){
            setTimeout(function(){
                cb('789');
            }, 2000);
        }
    ], function(res){
        console.log(res);
    });
    
    // 第二批任务
    multiAsync([
        function(cb){
            setTimeout(function(){
                cb('abc');
            }, 1500);
        },
        function(cb){
            setTimeout(function(){
                cb();
            }, 1200);
        },
        function(cb){
            setTimeout(function(){
                cb('def');
            }, 2500);
        }
    ], function(res){
        console.log(res);
    });
    
    // 第三批任务
    multiAsync({
        a: function(cb){
            cb('xxx');
        },
        b: function(cb){
            setTimeout(function(){
                cb('yyy');
            }, 1500);
        },
        c: function(cb){
            setTimeout(function(){
                cb('zzz');
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
                        cb('123');
                    }, 1000);
                },
                function(cb){
                    setTimeout(function(){
                        cb('456');
                    }, 3000);
                },
                function(cb){
                    setTimeout(function(){
                        cb('789');
                    }, 2000);
                }
            ], function(res){
                callback(res);
            });
        },
        function(callback){
            multiAsync([
                function(cb){
                    setTimeout(function(){
                        cb('abc');
                    }, 1500);
                },
                function(cb){
                    setTimeout(function(){
                        cb();
                    }, 1200);
                },
                function(cb){
                    setTimeout(function(){
                        cb('def');
                    }, 2500);
                }
            ], function(res){
                callback(res);
            });
        },
        function(callback){
            multiAsync({
                a: function(cb){
                    cb('xxx');
                },
                b: function(cb){
                    setTimeout(function(){
                        cb('yyy');
                    }, 1500);
                },
                c: function(cb){
                    setTimeout(function(){
                        cb('zzz');
                    }, 1000);
                }
            }, function(res){
                callback(res);
            });
        },
    ], function(result){
        console.log(result);
    });

