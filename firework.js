(function(){


        var endMove = true;


        var yindaoceng20160119 = false; // 是否显示过引导页

        var strCookie;
        var arrCookie;

        strCookie = document.cookie;
        arrCookie = strCookie.split("; ");

        for (var i = 0; i < arrCookie.length; i++) {
            var arr = arrCookie[i].split("=");
            if ("yindaoceng20160119" == arr[0]) {
                yindaoceng20160119 = true;
                break;
            }
        }

        // 初始化引导层显示状态
        if (yindaoceng20160119) {
            $("#yanhua").hide();
        }

// 关闭引导页
        function closeYindao() {
            var Days = 1;
            var exp = new Date();
            exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
            document.cookie = "yindaoceng20160119=yes;path=/;domain=10086.cn;expires=" + exp.toGMTString();

        }

        $(document).click(function (event) {
            $("#yanhua").hide();
            closeYindao();
            endMove=false;
            event.stopPropagation();
        });
        function stop(){
            closeYindao();
            return false;
        }


    var canvas = document.getElementById("cas");
    var ocas = document.createElement("canvas");


    if (ocas.getContext("2d")) {

        var octx = ocas.getContext("2d");
        var ctx = canvas.getContext("2d");
        ocas.width = canvas.width = 1 * window.innerWidth;
        ocas.height = canvas.height = 1.3 * window.innerHeight;
        var bigbooms = [];

        window.onload = function () {
            initAnimate();
        }

        function initAnimate() {
            drawBg();

            lastTime = new Date();
            animate();
        }

        var lastTime;
        var op = 0.9;
        function animate() {
            if(endMove){
                if(!yindaoceng20160119){
                    op-=0.13;
                    (function(){
                        if(op<0.1){
                            $("#yanhua").fadeTo("slow",0);
                        }else{
                            $("#yanhua").fadeTo("slow",op);
                        }
                    }());
                }
                ctx.save();
                ctx.fillStyle = "rgba(0,5,19,0.1)";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.restore();


                var newTime = new Date();
                if (newTime - lastTime > 250 + (window.innerHeight - 13.5) / 2) {
                    var random = Math.random() * 350 > 2 ? true : false;
                    var x = getRandom(canvas.width / 7, canvas.width * 4 / 5);
                    var y = getRandom(60, 80);
                    if (random) {
                        var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 2, "#FFF", {x: x, y: y});
                        bigbooms.push(bigboom)
                    }
                    else {
                        var bigboom = new Boom(getRandom(canvas.width / 3, canvas.width * 2 / 3), 4, "#FFF", {
                            x: canvas.width / 2,
                            y: 100
                        }, document.querySelectorAll(".shape")[parseInt(getRandom(0, document.querySelectorAll(".shape").length))]);
                        bigbooms.push(bigboom)
                    }
                    lastTime = newTime;
                    //console.log(bigbooms)

                    if (bigbooms.length == 5) {
                        closeYindao();
                        return false;
                    }
                }
                bigbooms.foreach(function (index) {
                    var that = this;
                    if (!this.dead) {
                        this._move();
                        this._drawLight();
                    }
                    else {
                        this.booms.foreach(function (index) {
                            if (!this.dead) {
                                this.moveTo(index);
                            }
                            else if (index === that.booms.length - 2) {
                                bigbooms[bigbooms.indexOf(that)] = null;
                            }
                        })
                    }
                });

                raf(animate);
            }else{
                return false;
            }

        }

        function drawMoon() {
            var moon = document.getElementById("moon");

        }

        Array.prototype.foreach = function (callback) {
            for (var i = 0; i < this.length; i++) {
                if (this[i] !== null) callback.apply(this[i], [i])
            }
        }
        var raf = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
                window.setTimeout(callback, 950 / 520);
            };

        var Boom = function (x, r, c, boomArea, shape) {
            this.booms = [];
            this.x = x;
            this.y = (canvas.height / 3.2 + r);
            /*烟花高度*/
            this.r = r;
            this.c = c;
            this.shape = shape || false;
            this.boomArea = boomArea;
            this.theta = 0;
            this.dead = false;
            this.ba = parseInt(getRandom(320, 2300));
            /*发射*/
        }
        Boom.prototype = {
            _paint: function () {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 8, 2 * Math.PI);
                ctx.fillStyle = this.c;
                ctx.fill();
            },
            _move: function () {
                var dx = this.boomArea.x - this.x, dy = this.boomArea.y - this.y;
                this.x = this.x + dx * 0.01;
                this.y = this.y + dy * 0.01;

                if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
                    if (this.shape) {
                        this._shapBoom();
                    }
                    else this._boom();
                    this.dead = true;
                }
                else {
                    this._paint();
                }
            },
            _drawLight: function () {
                ctx.save();
                ctx.fillStyle = "rgba(10,228,200,0.3)";
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r + 2 * Math.random() + 1, 0.1, 2 * Math.PI);
                /*l两广范围*/
                ctx.fill();
                ctx.restore();
            },
            _boom: function () {
                var fragNum = getRandom(80, 100);
                var style = getRandom(0, 10) >= 5 ? 1 : 2;
                var color;
                if (style === 1) {
                    color = {
                        a: parseInt(getRandom(128, 255)),
                        b: parseInt(getRandom(128, 255)),
                        c: parseInt(getRandom(128, 255))
                    }
                }

                var fanwei = parseInt(getRandom(350, 250));
                /*大小*/
                for (var i = 0; i < fragNum; i++) {
                    if (style === 2) {
                        color = {
                            a: parseInt(getRandom(128, 255)),
                            b: parseInt(getRandom(128, 255)),
                            c: parseInt(getRandom(128, 255))
                        }
                    }
                    var a = getRandom(-Math.PI, Math.PI);
                    var x = getRandom(0, fanwei) * Math.cos(a) + this.x;
                    var y = getRandom(0, fanwei) * Math.sin(a) + this.y;
                    var radius = getRandom(1.6, 2.5)
                    /*眼花粗细*/
                    var frag = new Frag(this.x, this.y, radius, color, x, y);
                    this.booms.push(frag);
                }
            },
            _shapBoom: function () {
                var that = this;
                putValue(ocas, octx, this.shape, 8, function (dots) {
                    var dx = canvas.width / 2 - that.x;
                    var dy = canvas.height / 2 - that.y;
                    for (var i = 0; i < dots.length; i++) {
                        color = {a: dots[i].a, b: dots[i].b, c: dots[i].c}
                        var x = dots[i].x;
                        var y = dots[i].y;
                        var radius = 1;
                        var frag = new Frag(that.x, that.y, radius, color, x - dx, y - dy);
                        that.booms.push(frag);
                    }
                })
            }
        }


        function imgload(img, callback) {
            if (img.complete) {
                callback.call(img);
            }
            else {
                img.onload = function () {
                    callback.call(this);
                }
            }
        }

        function getRandom(a, b) {
            return Math.random() * (b - a) + a;
        }

        var maxRadius = 1, stars = [];

        function drawBg() {
            for (var i = 0; i < 100; i++) {
                var r = Math.random() * maxRadius;
                var x = Math.random() * canvas.width;
                var y = Math.random() * 3 * canvas.height - canvas.height;
                var star = new Star(x, y, r);

            }

        }

        var Star = function (x, y, r) {
            this.x = x;
            this.y = y;
            this.r = r;
        }
        Star.prototype = {
            paint: function () {

            }
        }

        var Frag = function (centerX, centerY, radius, color, tx, ty) {
            this.tx = tx;
            this.ty = ty;
            this.x = centerX;
            this.y = centerY;
            this.dead = false;
            this.centerX = centerX;
            this.centerY = centerY;
            this.radius = radius;
            this.color = color;
        }

        Frag.prototype = {
            moveTo: function (index) {
                this.ty = this.ty + 0.4;
                /*眼花弧度*/
                var dx = this.tx - this.x, dy = this.ty - this.y;
                this.x = Math.abs(dx) < 0.1 ? this.tx : (this.x + dx * 0.1);
                this.y = Math.abs(dy) < 0.1 ? this.ty : (this.y + dy * 0.1);
                if (dx === 0 && Math.abs(dy) <= 100) {
                    this.dead = false;
                }
                this.paint();
            },
            paint: function () {
                ctx.save();
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
                ctx.fillStyle = "rgba(" + this.color.a + "," + this.color.b + "," + this.color.c + ",1)";
                ctx.fill();
                ctx.restore();
            }
        }
    }



})();
