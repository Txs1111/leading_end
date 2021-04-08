(function () {
    var opt = {
        'type': 1,
        'pageShow': function () {
        },
        'pageHide': function () {
        },
        'useShakeDevice': {
            'speed': 30, 'callback': function () {
            }
        },
        'useParallax': true,
        'useArrow': true,
        'useAnimation': true,
        'useMusic': {'autoPlay': true, 'loopPlay': true, 'src': 'http://mat1.gtimg.com/news/2015/love/FadeAway.mp3'}
    };
    window.H5FullscreenPage = {
        'init': function (option) {
            $.extend(opt, option);
            initDom(opt);
            initEvent(opt);
        }
    };
    var obj = {
        '1': {
            'upDrag': function (percentage, item) {
                var translateY = 1 - 0.7 * percentage;
                item.next().css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            }, 'downDrag': function (percentage, item) {
                var translateY = -(0.7 * percentage);
                item.prev().css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                item.css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            }, 'nextSlide': function (item) {
                item.css('-webkit-transform', 'translate3d(0,-100%,0)');
                item.next().css('-webkit-transform', 'translate3d(0,0,0)');
            }, 'prevSlide': function (item) {
                item.prev().css('-webkit-transform', 'scale(1)');
                item.css('-webkit-transform', 'translate3d(0,100%,0)');
            }, 'showSlide': function (item) {
                item.css('-webkit-transform', 'scale(1)');
                item.next().css('-webkit-transform', 'translate3d(0,100%,0)');
            }
        }, '2': {
            'upDrag': function (percentage, item) {
                var scale = 1 - 0.2 * percentage;
                var translateY = 1 - 0.7 * percentage;
                item.css('-webkit-transform', 'scale(' + scale + ')');
                item.next().css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
                item[0].childNodes[1].pause();
                item[0].childNodes[5].childNodes[1].style.display = 'inline-block';
                item[0].childNodes[5].childNodes[3].style.display = 'none';;
            }, 'downDrag': function (percentage, item) {
                var scale = 0.8 - 0.2 * percentage;
                var translateY = -(0.7 * percentage);
                item.css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
                item.prev().css('-webkit-transform', 'scale(' + scale + ')');
                item[0].childNodes[1].pause();
                item[0].childNodes[5].childNodes[1].style.display = 'inline-block';
                item[0].childNodes[5].childNodes[3].style.display = 'none';;
            }, 'nextSlide': function (item) {
                item.css('-webkit-transform', 'scale(.8)');
                item.next().css('-webkit-transform', 'translate3d(0,0,0)');
            }, 'prevSlide': function (item) {
                item.prev().css('-webkit-transform', 'scale(1)');
                item.css('-webkit-transform', 'translate3d(0,100%,0)');
            }, 'showSlide': function (item) {
                item.css('-webkit-transform', 'scale(1)');
                item.next().css('-webkit-transform', 'translate3d(0,100%,0)');
            }
        }, '3': {
            'upDrag': function (percentage, item) {
                var translateY = 1 - 0.4 * percentage;
                item.css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                item.next().css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            }, 'downDrag': function (percentage, item) {
                var translateY = -(0.4 * percentage);
                item.prev().css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                item.css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            }, 'nextSlide': function (item) {
                item.css('-webkit-transform', 'translate3d(0,-100%,0)');
                item.next().css('-webkit-transform', 'translate3d(0,0,0)');
            }, 'prevSlide': function (item) {
                item.prev().css('-webkit-transform', 'scale(1)');
                item.css('-webkit-transform', 'translate3d(0,100%,0)');
            }, 'showSlide': function (item) {
                item.css('-webkit-transform', 'scale(1)');
                item.next().css('-webkit-transform', 'translate3d(0,100%,0)');
            }
        }, '4': {
            'upDrag': function (percentage, item) {
                var translateY = 1 - 0.4 * percentage;
                item.css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                item.next().css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            }, 'downDrag': function (percentage, item) {
                var translateY = -(0.4 * percentage);
                item.prev().css('-webkit-transform', 'translate3d(0,' + (translateY * 100 - 100) + '%,0)');
                item.css('-webkit-transform', 'translate3d(0,' + translateY * 100 + '%,0)');
            }, 'nextSlide': function (item) {
                item.addClass('zindex');
                setTimeout(function () {
                    item.removeClass('no-animation').css('-webkit-transform', 'translate3d(0,-100%,0)');
                    item.next().removeClass('zindex').addClass('no-animation').css('-webkit-transform', 'translate3d(0,0,0)');
                }, 100);
            }, 'prevSlide': function (item) {
                item.prev().css('-webkit-transform', 'translate3d(0,0,0)');
                item.next().css('-webkit-transform', 'translate3d(0,100%,0)');
                item.removeClass('zindex');
            }, 'showSlide': function (item) {
                item.css('-webkit-transform', 'scale(1)');
                item.next().css('-webkit-transform', 'translate3d(0,100%,0)');
            }
        }
    };
    var dragThreshold = 0.15;
    var dragStart = null;
    var percentage = 0;
    var currentItem;

    function touchStart(event) {
        if (dragStart !== null)return;
        var item = $(event.target).closest('.item');
        if (!item.length) {
            $('.overlay').hide();
            return;
        }
        if (event.touches) {
            event = event.touches[0];
        }
        dragStart = event.clientY;
        item.addClass('no-animation');
        item.next().addClass('no-animation');
        item.prev().addClass('no-animation');
    }

    function touchMove(event) {
        event.preventDefault();
        if (dragStart === null)return;
        var item = $(event.target).closest('.item');
        if (!item.length) {
            $('.overlay').hide();
            return;
        }
        if (event.touches) {
            event = event.touches[0];
        }
        percentage = (dragStart - event.clientY) / window.screen.height;
        if (percentage > 0) {
            var scale = 1 - 0.5 * percentage;
            obj[opt.type].upDrag(percentage, item);
        } else if (item.prev()) {
            obj[opt.type].downDrag(percentage, item);
        }
    }

    function touchEnd(event) {
        $('.overlay').show();
        dragStart = null;
        var item = $(event.target).closest('.item');
        if (!item.length) {
            $('.overlay').hide();
            return;
        }
        item.removeClass('no-animation');
        item.next().removeClass('no-animation');
        item.prev().removeClass('no-animation');
        if (percentage >= dragThreshold) {
            nextSlide(item);
        } else if (Math.abs(percentage) >= dragThreshold) {
            prevSlide(item);
        } else {
            showSlide(item);
        }
        percentage = 0;
    }

    function swipeUp(event) {
        var item = $(event.target).closest('.item');
        if (!item.length) {
            return;
        }
        nextSlide(item);
    }

    function swipeDown(event) {
        var item = $(event.target).closest('.item');
        if (!item.length) {
            return;
        }
        prevSlide(item);
    }

    function nextSlide(item) {
        if (item.next().length) {
            item.attr('state', 'prev');
            item.siblings('.item').removeAttr('state');
            currentItem = item.next();
            currentItem.attr('state', 'next');
            orderPart(item.next());
            obj[opt.type].nextSlide(item);
        } else {
            obj[opt.type].showSlide(item);
        }
    }

    function prevSlide(item) {
        if (item.prev().length) {
            item.attr('state', 'prev');
            item.siblings('.item').removeAttr('state');
            currentItem = item.prev();
            currentItem.attr('state', 'next');
            obj[opt.type].prevSlide(item);
        } else {
            obj[opt.type].showSlide(item);
        }
    }

    function showSlide(item) {
        obj[opt.type].showSlide(item);
    }

    function initDom(opt) {
        $('body').addClass('H5FullscreenPage');
        currentItem = $('.item').first();
        currentItem.attr('state', 'next');
        if (opt.useAnimation) {
            var items = $('.item');
            items.find('.part').addClass('hide');
            orderPart(items.first());
        }
        $('body').append('<div class="overlay"></div>');

    }

    function orderPart(dom) {
        var parts = $(dom).find('.part');
        parts.forEach(function (item) {
            var time = $(item).attr('data-delay') || 100;
            setTimeout(function () {
                $(item).removeClass('hide');
            }, time);
        });
    }

    function initEvent(opt) {
        if (opt.useParallax) {
            var orginData = {x: 0, y: 0};
            window.addEventListener('deviceorientation', function (event) {
                var gamma = event.gamma;
                var beta = event.beta;
                var x = -gamma;
                var y = -beta;
                if (Math.abs(Math.abs(x) - Math.abs(orginData.x)) < 0.1 || Math.abs(Math.abs(y) - Math.abs(orginData.y)) < 0.1) {
                    orginData.x = x;
                    orginData.y = y;
                    return;
                } else {
                    orginData.x = x;
                    orginData.y = y;
                }
                var halfWidth = window.innerWidth / 2;
                var halfHeight = window.innerHeight / 2;
                var max = 5;
                var items = $('.parallax');
                items.forEach(function (item) {
                    var dx = (item.getBoundingClientRect().width / max) * (x / halfWidth);
                    var dy = (item.getBoundingClientRect().width / max) * (y / halfHeight);
                    if ($(item).hasClass('item')) {
                        dx = -dx / 1 + 50;
                        dy = -dy / 1 + 50;
                        item.style['background-position'] = '' + dx + '% ' + dy + '%';
                    } else {
                        item.style['transform'] = item.style['-webkit-transform'] = 'translate3d(' + dx + 'px,' + dy + 'px,0)';
                    }
                });
            }, false);
        }
        if (opt.useShakeDevice && opt.useShakeDevice.speed) {
            var x = y = z = lastX = lastY = lastZ = 0;
            if (window.DeviceMotionEvent) {
                window.addEventListener('devicemotion', function (eventData) {
                    var acceleration = event.accelerationIncludingGravity;
                    x = acceleration.x;
                    y = acceleration.y;
                    z = acceleration.z;
                    if (Math.abs(x - lastX) > opt.useShakeDevicespeed || Math.abs(y - lastY) > opt.useShakeDevicespeed || Math.abs(z - lastZ) > opt.useShakeDevicespeed) {
                        opt.useShakeDevice.callback && opt.useShakeDevice.callback(currentItem);
                    }
                    lastX = x;
                    lastY = y;
                    lastZ = z;
                }, false);
            }
        }
        $('.music').on('tap', function () {
            $(this).toggleClass('play');
            var audio = document.getElementById('audio');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
        $(document).on('touchmove', function (e) {
            //e.preventDefault();
        });
        if (opt.type > 4) {
            opt.type = opt.type - 4;
            $('.item').on({'swipeUp': swipeUp, 'swipeDown': swipeDown});
        } else {
            $('.item').on({
                'touchstart': touchStart,
                'touchmove': touchMove,
                'touchend': touchEnd,
                'touchcancel': touchEnd
            });
        }
        $('.item').on('tap', function () {
            $('.overlay').hide();
        });
        $('.item').on('transitionend webkitTransitionEnd', function (event) {
            $('.overlay').hide();
            if ($(event.target).attr('state') == 'next') {
                opt.pageShow(event.target);
            } else {
                opt.pageHide(event.target);
            }
        });
        $('.overlay').on('tap', function () {
            $('.overlay').hide();
        });
    }
})();