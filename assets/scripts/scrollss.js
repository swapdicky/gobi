var controller;

function initMainCode() {
    var isMobile = window.matchMedia("(max-width: 768px)").matches;
    // Lazy load videos when they scroll into view
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const video = entry.target;
                if (video.paused) {
                    video.play().catch(e => console.log('Video play failed:', e));
                }
            } else {
                const video = entry.target;
                if (!video.paused) {
                    video.pause();
                }
            }
        });
    }, {
        threshold: 0.25,
        rootMargin: '50px'
    });

    // Observe all videos
    document.querySelectorAll('video[autoplay]').forEach(video => {
        video.removeAttribute('autoplay');
        video.pause();
        videoObserver.observe(video);
    });

    controller = new ScrollMagic.Controller({
        refreshInterval: 0
    });

    // Mobile: prevent pin jumps caused by the browser address bar showing/hiding.
    // The address bar only changes viewport HEIGHT (not width), which would make
    // ScrollMagic recalculate every percentage-based pin duration and jump.
    // Block height-only resize events so ScrollMagic keeps its cached viewport size.
    if (isMobile) {
        var lastWidth = window.innerWidth;
        window.addEventListener('resize', function (e) {
            if (window.innerWidth === lastWidth) {
                e.stopImmediatePropagation();
            } else {
                lastWidth = window.innerWidth;
            }
        }, true);
    }
     // Pin section-landing for parallax effect
    new ScrollMagic.Scene({
        triggerElement: '#section-landing',
        triggerHook: 0,
        duration: 600
    })
    .setPin('#section-landing')
    .addTo(controller);   
    // Parallax effect for landing backgrounds - combined for better performance
    var landingParallaxTimeline = gsap.timeline();
    
    // Landing bg-1
    landingParallaxTimeline.to('.landing-bg-1', {
        y: 200,
        ease: Linear.easeNone
    }, 0);
    
    // Landing bg-2
    landingParallaxTimeline.to('.landing-bg-2', {
        y: '0vh',
        scale: 1,
        ease: Linear.easeNone
    }, 0);
    
    // Landing bg-4
    landingParallaxTimeline.to('.landing-bg-4', {
        y: '-30vh',
        scale: 1.2,
        ease: Linear.easeNone
    }, 0);
    
    // Landing bg-5
    landingParallaxTimeline.to('.landing-bg-5', {
        y: '-50vh',
        scale: 1.3,
        ease: Linear.easeNone
    }, 0);
    
    // Landing bg-6
    landingParallaxTimeline.to('.landing-bg-6', {
        x: -800,
        y: -40,
        scale: 1,
        ease: Linear.easeNone
    }, 0);
    
    new ScrollMagic.Scene({
        triggerElement: '#section-landing',
        triggerHook: 0,
        duration: '300%'
    })
    .setTween(landingParallaxTimeline)
    .addTo(controller);

    var landingTruckTimeline = gsap.timeline();
    landingTruckTimeline.to('.landing-truck', {
        x: 500,
        y: '6vh',
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '#section-landing',
        triggerHook: 0,
        duration: "100%",
        offset:1200
    })
    .setTween(landingTruckTimeline)
    .addTo(controller);
    
    // On mobile, swap the ss2 overlay images for their mobile versions
    if (isMobile) {
        document.querySelector('.ss2-info-topa').src = 'assets/images/gobi-webp/ss2-img2a-mobile.jpg';
        document.querySelector('.ss2-info-topb').src = 'assets/images/gobi-webp/ss2-img2b-mobile.jpg';
        document.querySelector('.ss2-info-topc').src = 'assets/images/gobi-webp/ss2-img2c-mobile.jpg';
    }
    
    // Pin ss2-info-graph-1 with 3 separate ball animations
    var ss2BallTimeline = gsap.timeline();
    
    // Step 1: Ball 1 follows first path
    ss2BallTimeline.to('.ss2-info-ball-1', {
        left: '60.03%',
        top: '68.09%',
        duration: 0.25,
        ease: Linear.easeNone,
        onStart: function() {
            document.querySelector('.ss2-info-topa').style.display = 'block';
        },
        onUpdate: function() {
            var ball = document.querySelector('.ss2-info-ball-1');
            var ballLeft = parseFloat(ball.style.left);
            document.querySelector('.ss2-info-topa').style.clipPath = 'polygon(0 0, ' + ballLeft + '% 0, ' + ballLeft + '% 100%, 0 100%)';
        },
        onReverseComplete: function() {
            document.querySelector('.ss2-info-topa').style.display = 'none';
        }
    });
    
    ss2BallTimeline.to('.ss2-info-ball-1', {
        left: '64.17%',
        top: '65.12%',
        duration: 0.25,
        ease: Linear.easeNone,
        onUpdate: function() {
            var ball = document.querySelector('.ss2-info-ball-1');
            var ballLeft = parseFloat(ball.style.left);
            document.querySelector('.ss2-info-topa').style.clipPath = 'polygon(0 0, ' + ballLeft + '% 0, ' + ballLeft + '% 100%, 0 100%)';
        }
    });
    
    ss2BallTimeline.to('.ss2-info-ball-1', {
        left: '65.82%',
        top: '69.89%',
        duration: 0.25,
        ease: Linear.easeNone,
        onUpdate: function() {
            var ball = document.querySelector('.ss2-info-ball-1');
            var ballLeft = parseFloat(ball.style.left);
            document.querySelector('.ss2-info-topa').style.clipPath = 'polygon(0 0, ' + ballLeft + '% 0, ' + ballLeft + '% 100%, 0 100%)';
        }
    });
    
    ss2BallTimeline.to('.ss2-info-ball-1', {
        left: '68.10%',
        top: '75.08%',
        duration: 0.25,
        ease: Linear.easeNone,
        onUpdate: function() {
            var ball = document.querySelector('.ss2-info-ball-1');
            var ballLeft = parseFloat(ball.style.left);
            document.querySelector('.ss2-info-topa').style.clipPath = 'polygon(0 0, ' + ballLeft + '% 0, ' + ballLeft + '% 100%, 0 100%)';
        },
        onComplete: function() {
            document.querySelector('.ss2-info-topa').classList.add('on');
        }
    });
    
    // Step 2: Ball 2 follows second path
    ss2BallTimeline.to('.ss2-info-ball-2', {
        left: '58.65%',
        top: '72.28%',
        duration: 0.5,
        ease: Linear.easeNone,
        onStart: function() {
            document.querySelector('.ss2-info-topb').style.display = 'block';
        },
        onUpdate: function() {
            var ball = document.querySelector('.ss2-info-ball-2');
            var ballLeft = parseFloat(ball.style.left);
            document.querySelector('.ss2-info-topb').style.clipPath = 'polygon(0 0, ' + ballLeft + '% 0, ' + ballLeft + '% 100%, 0 100%)';
        },
        onReverseComplete: function() {
            document.querySelector('.ss2-info-topb').style.display = 'none';
        }
    });
    
    ss2BallTimeline.to('.ss2-info-ball-2', {
        left: '61.58%',
        top: '76.48%',
        duration: 0.5,
        ease: Linear.easeNone,
        onUpdate: function() {
            var ball = document.querySelector('.ss2-info-ball-2');
            var ballLeft = parseFloat(ball.style.left);
            document.querySelector('.ss2-info-topb').style.clipPath = 'polygon(0 0, ' + ballLeft + '% 0, ' + ballLeft + '% 100%, 0 100%)';
        },
        onComplete: function() {
            document.querySelector('.ss2-info-topb').classList.add('on');
        }
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.ss2-info-graph-1',
        triggerHook: 0,
        duration: '200%'
    })
    .setPin('.ss2-info-graph-1')
    .setTween(ss2BallTimeline)
    .on('enter', function() {
        document.querySelector('.ss2-scroll-hints').classList.add('active');
    })
    .on('leave', function() {
        document.querySelector('.ss2-scroll-hints').classList.remove('active');
    })
    .addTo(controller);
    
    // Zoom out animation for all zoom-out-center elements
    document.querySelectorAll('.zoom-out-center').forEach(function(element, index) {
        var zoomOutTimeline = gsap.timeline();
        zoomOutTimeline.to(element.querySelector('.pair-right'), {
            scale: 1.15,
            ease: Linear.easeNone
        });
        
        new ScrollMagic.Scene({
            triggerElement: element,
            triggerHook: 0.8,
            duration: '100%'
        })
        .setTween(zoomOutTimeline)
        .addTo(controller);
    });
    
    // Parallax effect for section 3 backgrounds
    // Pin section 3 landing
    new ScrollMagic.Scene({
        triggerElement: '#section-3 .section-landing',
        triggerHook: 0,
        duration: 800
    })
    .setPin('#section-3 .section-landing')
    .addTo(controller);
    
    var ss3Bg1Timeline = gsap.timeline();
    ss3Bg1Timeline.to('.ss3-bg-1', {
        y: isMobile ? 100 : 300,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '#section-3 .section-landing',
        triggerHook: 0,
        duration: '150%'
    })
    .setTween(ss3Bg1Timeline)
    .addTo(controller);
    
    var ss3Bg2Timeline = gsap.timeline();
    ss3Bg2Timeline.to('.ss3-bg-2', {
        y: isMobile ?  0 : -300,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '#section-3 .section-landing',
        triggerHook: 0,
        duration: '150%'
    })
    .setTween(ss3Bg2Timeline)
    .addTo(controller);
    
    // Pin ss3-info-graph-0 with ball animation
    var ss3BallTimeline = gsap.timeline();
    
    if (isMobile) {
        // Mobile: skip the ball reveal animation, just pan the wrap left to right
        ss3BallTimeline.fromTo('.ss3-info-graph-wrap',
            { x: 0 },
            { x: '-200vw', ease: Linear.easeNone }
        );
    } else {
        // Step 1: Ball 1 and msg 1 appear
        ss3BallTimeline.to('.ss3-ball-wrap-1', {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        });
        
        ss3BallTimeline.to('.ss3-msg-1', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        }, '-=1');
        
        // Step 2: Ball 2, msg 2 and connector 1 appear
        ss3BallTimeline.to('.ss3-ball-wrap-2', {
            x: '-50%',
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        });
        
        ss3BallTimeline.to('.ss3-msg-2', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        }, '-=1');
        
        ss3BallTimeline.to('.ss3-connector-1', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        }, '-=1');
        
        // Step 3: Ball 3, msg 3 and connector 2 appear
        ss3BallTimeline.to('.ss3-ball-wrap-3', {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        });
        
        ss3BallTimeline.to('.ss3-msg-3', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        }, '-=1');
        
        ss3BallTimeline.to('.ss3-connector-2', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        }, '-=1');
    }
    
    new ScrollMagic.Scene({
        triggerElement: '.ss3-info-graph-0',
        triggerHook: 0,
        duration: '200%'
    })
    .setPin('.ss3-info-graph-0')
    .setTween(ss3BallTimeline)
    .addTo(controller);
    
    // Pin ss3-info-graph-1 with 6-step animation
    var ss3Graph1Timeline = gsap.timeline();
    
    if (isMobile) {
        // Mobile: skip overlays and scale, just pan the image from center to right
        ss3Graph1Timeline.fromTo('.ss3-graph1-img-wrap',
            { x: 0 },
            { x: '-300px', ease: Linear.easeNone }
        );
    } else {
        // Step 1: Show overlay 2 and 3 together
        ss3Graph1Timeline.to('.ss3-graph1-overlay-2', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        });
        
        ss3Graph1Timeline.to('.ss3-graph1-overlay-3', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        }, '<');
        
        // Step 3: Pan and zoom
        ss3Graph1Timeline.to('.ss3-graph1-img-wrap', {
            x: '-7%',
            y: '-5%',
            scale: 1.15,
            duration: 1,
            ease: Power2.easeOut,
            force3D: true
        });
        
        // Step 4: Show overlay 4
        ss3Graph1Timeline.to('.ss3-graph1-overlay-4', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        });
        
        // Step 5: Show overlay 5
        ss3Graph1Timeline.to('.ss3-graph1-overlay-5', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        });
        
        // Step 6: Show overlay 6
        ss3Graph1Timeline.to('.ss3-graph1-overlay-6', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        });
        
        // Step 7: Show overlay 7
        ss3Graph1Timeline.to('.ss3-graph1-overlay-7', {
            opacity: 1,
            duration: 1,
            ease: Power2.easeOut
        });
        
        // Step 7: Restore to original size and position
        ss3Graph1Timeline.to('.ss3-graph1-img-wrap', {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1,
            ease: Power2.easeOut,
            force3D: true
        });
    }
    
    new ScrollMagic.Scene({
        triggerElement: '.ss3-info-graph-1',
        triggerHook: 0,
        duration: isMobile ? '100%' : '400%'
    })
    .setPin('.ss3-info-graph-1')
    .setTween(ss3Graph1Timeline)
    .addTo(controller);
    
    // Pin ss3-info-graph-2 with 4-step animation
    var ss3Graph2Timeline = gsap.timeline();
    
    // Step 1: Show overlay 2
    ss3Graph2Timeline.to('.ss3-graph2-overlay-2', {
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut
    });
    
    // Step 2: Show overlay 3
    ss3Graph2Timeline.to('.ss3-graph2-overlay-3', {
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut
    });
    
    // Step 3: Show overlay 4
    ss3Graph2Timeline.to('.ss3-graph2-overlay-4', {
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut
    });
    
    // Step 4: Show overlay 5
    ss3Graph2Timeline.to('.ss3-graph2-overlay-5', {
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.ss3-info-graph-2',
        triggerHook: 0,
        duration: '150%'
    })
    .setPin('.ss3-info-graph-2')
    .setTween(ss3Graph2Timeline)
    .addTo(controller);
    
    // Pin section 4 landing
    new ScrollMagic.Scene({
        triggerElement: '#section-4 .section-landing',
        triggerHook: 0,
        duration: 800
    })
    .setPin('#section-4 .section-landing')
    .addTo(controller);
    
    // Parallax effect for section 4 backgrounds
    var ss4Bg1Timeline = gsap.timeline();
    ss4Bg1Timeline.to('.ss4-bg-1', {
        y: isMobile ? 100 : 300,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '#section-4 .section-landing',
        triggerHook: 0,
        duration: '150%'
    })
    .setTween(ss4Bg1Timeline)
    .addTo(controller);
    
    var ss4Bg2Timeline = gsap.timeline();
    ss4Bg2Timeline.to('.ss4-bg-2', {
        y: isMobile ? 0 : -200,
        ease: Linear.easeNone,
        duration: 1
    });
    ss4Bg2Timeline.to('.ss4-bg-2', {
        scale: isMobile ? 1 : 1.5,
        ease: Linear.easeNone,
        duration: 0.8
    }, '<0.2');
    ss4Bg2Timeline.to('.ss4-bg-2-overlay', {
        opacity: .8,
        ease: Linear.easeNone,
        duration: 0.5
    }, '-=0.2');
    
    new ScrollMagic.Scene({
        triggerElement: '#section-4 .section-landing',
        triggerHook: 0,
        duration: '150%'
    })
    .setTween(ss4Bg2Timeline)
    .addTo(controller);
    
    // Pin section 5 landing
    new ScrollMagic.Scene({
        triggerElement: '#section-5 .section-landing',
        triggerHook: 0,
        duration: 800
    })
    .setPin('#section-5 .section-landing')
    .addTo(controller);
    
    // Parallax effect for section 5 backgrounds
    var ss5Bg1Timeline = gsap.timeline();
    ss5Bg1Timeline.to('.ss5-bg-1', {
        y: isMobile ? 100 : 300,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '#section-5 .section-landing',
        triggerHook: 0,
        duration: '150%'
    })
    .setTween(ss5Bg1Timeline)
    .addTo(controller);
    
    var ss5Bg2Timeline = gsap.timeline();
    ss5Bg2Timeline.to('.ss5-bg-2', {
        y: isMobile ?  0 : -300,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '#section-5 .section-landing',
        triggerHook: 0,
        duration: '150%'
    })
    .setTween(ss5Bg2Timeline)
    .addTo(controller);
    
    // Parallax effect for ss4-info-graph-2-inner
    var ss4InnerTimeline = gsap.timeline();
    ss4InnerTimeline.to('.ss4-info-graph-2-inner', {
        y: 200,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 1,
        duration: 2400
    })
    .setTween(ss4InnerTimeline)
    .addTo(controller);
    
    // Parallax effect for ss4-info-graph-2-img
    var ss4ImgTimeline = gsap.timeline();
    ss4ImgTimeline.to('.ss4-info-graph-2-img', {
        y: 200,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 1,
        duration: 2400
    })
    .setTween(ss4ImgTimeline)
    .addTo(controller);
    
    // Car-1 animation following SVG path
    var carRotationTimeline = gsap.timeline();
    carRotationTimeline
        .to('.car-1', {
           motionPath: {
                path: "M261.6,431.9s-38.1,239.3,48.7,440.5,158.8,260.5,186.4,279.5,150.4,122.8,169.4,144",
                align: "self",
                autoRotate: -90,
                end: 0.9
            },
            duration: isMobile ? 1100 : 2200,
            ease: Linear.easeOut
        })

    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: .4,
        duration: isMobile ? 1200 : 2400
    })
    .setTween(carRotationTimeline)
    .addTo(controller);
    
    // Car-1b animation (starts earlier)
    var car1bRotationTimeline = gsap.timeline();
    car1bRotationTimeline
        .to('.car-1b', {
           motionPath: {
                path: "M261.6,431.9s-38.1,239.3,48.7,440.5,158.8,260.5,186.4,279.5,150.4,122.8,169.4,144",
                align: "self",
                autoRotate: -90,
                end: .9
            },
            duration: isMobile ? 1100 : 2200,
            ease: Linear.easeOut
        })

    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 1,
        duration: isMobile ? 800 : 1600
    })
    .setTween(car1bRotationTimeline)
    .addTo(controller);
    
    // Car-2 animation following new SVG path
    var car2RotationTimeline = gsap.timeline();
    car2RotationTimeline
        .to('.car-2', {
            motionPath: {
                path: "M395.5,503.6s70.9,142.2,75.2,364.6-94.7,374.8,45.1,485,184.2,135.5,184.2,135.5",
                align: "self",
                autoRotate: -90,
                end: 0.9
            },
            duration: isMobile ? 1400 : 2800,
            ease: Linear.easeOut
        })

    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 1,
        duration: isMobile ? 1100 : 2200,
        offset: isMobile ? 200 : 400
    })
    .setTween(car2RotationTimeline)
    .addTo(controller);
    
    // Car-3 animation following new SVG path
    var car3RotationTimeline = gsap.timeline();
    car3RotationTimeline
        .to('.car-3', {
            motionPath: {
                path: "M1620,237.1s-84.3,282.4-558.7,460.2",
                align: "self",
                autoRotate: -90
            },
            duration: isMobile ? 0.45 : 0.9,
            ease: Linear.easeNone
        })

    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 0.2,
        duration: isMobile ? 1000 : 2000
    })
    .setTween(car3RotationTimeline)
    .addTo(controller);
    
    // Car-4 animation following new SVG path
    var car4RotationTimeline = gsap.timeline();
    car4RotationTimeline
        .to('.car-4', {
            motionPath: {
                path: "M1083.9,643.7s155.3,279.5,146.8,511.1-152.5,420.7-214.6,468.7-112.9,166.6-112.9,166.6",
                align: "self",
                autoRotate: -90,
                end: 0.7
            },
            duration: isMobile ? 0.35 : 0.7,
            ease: Linear.easeNone
        })
    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 0.3,
        duration: isMobile ? 1400 : 2800
    })
    .setTween(car4RotationTimeline)
    .addTo(controller);
    
    // Car-4b animation (starts earlier)
    var car4bRotationTimeline = gsap.timeline();
    car4bRotationTimeline
        .to('.car-4b', {
            motionPath: {
                path: "M1083.9,643.7s155.3,279.5,146.8,511.1-152.5,420.7-214.6,468.7-112.9,166.6-112.9,166.6",
                align: "self",
                autoRotate: -90,
                end: .7
            },
            duration: isMobile ? 0.35 : 0.7,
            ease: Linear.easeNone
        })
    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 0.5,
        duration: isMobile ? 900 : 1800
    })
    .setTween(car4bRotationTimeline)
    .addTo(controller);
    
    // Car-5 animation following new SVG path
    var car5RotationTimeline = gsap.timeline();
    car5RotationTimeline
        .to('.car-5', {
            motionPath: {
                path: "M1414.3,567.5s-81.9,177.9-242.8,372.7-186.4,203.3-240,279.5",
                align: "self",
                autoRotate: -90,
                end: 0.7
            },
            duration: isMobile ? 0.45 : 0.9,
            ease: Linear.easeNone
        })
    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 0.2,
        duration: isMobile ? 900 : 1800
    })
    .setTween(car5RotationTimeline)
    .addTo(controller);
    
    // Animate ss4-cc-train moving down with scroll
    var ccTrainTimeline = gsap.timeline();
    var ccTrainDuration = isMobile ? 6000 : 12000;
    var ccTrainY = isMobile ? 10000 : 12000;
    var ccTrainOffset = isMobile ? 400 : 800;
    
    ccTrainTimeline.to('.ss4-cc-train', {
        y: ccTrainY,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-2',
        triggerHook: 0.5,
        duration: ccTrainDuration,
        offset: ccTrainOffset
    })
    .setTween(ccTrainTimeline)
    .addTo(controller);
    
    // Pin ss4-info-graph-1 and animate in 5 steps
    var ss4Timeline = gsap.timeline();
    
    // Step 1: Move train in first
    ss4Timeline.to('.ss4-train', {
        x: 0,
        y: 0,
        duration: 1,
        ease: Power2.easeOut,
        onComplete: function() {
            document.querySelector('.ss4-ssa').style.opacity = '1';
        },
        onReverseComplete: function() {
            document.querySelector('.ss4-ssa').style.opacity = '0';
        }
    });
    
    // Step 2: Move carside1 in
    ss4Timeline.to('.ss4-carside1', {
        x: 0,
        y: 0,
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut
    });
    
    // Step 3: Fade in carside2
    ss4Timeline.to('.ss4-carside2', {
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut
    });
    
    // Step 4: Fade in carside3
    ss4Timeline.to('.ss4-carside3', {
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut,
        onStart: function() {
            document.querySelector('.ss4-ssb').style.opacity = '1';
        },
        onReverseComplete: function() {
            document.querySelector('.ss4-ssb').style.opacity = '0';
        }
    });
    
    // Step 5: Fade in carside4
    ss4Timeline.to('.ss4-carside4', {
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut
    });
    
    // Step 6: Fade in carside5
    ss4Timeline.to('.ss4-carside5', {
        opacity: 1,
        duration: 1,
        ease: Power2.easeOut
    });
    
    // Calculate the image height and viewport height to center the pin
    var ss4Element = document.querySelector('.ss4-info-graph-1');
    var ss4Height = ss4Element ? ss4Element.offsetHeight : 0;
    var viewportHeight = window.innerHeight;
    var ss4TriggerHookValue = (viewportHeight / 2 - ss4Height / 2) / viewportHeight;
    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-info-graph-1',
        triggerHook: .1,
        duration: '200%'
    })
    .setPin('.ss4-info-graph-1')
    .setTween(ss4Timeline)
    .addTo(controller);
    
    // ss4-chart animation in sequence
    var ss4ChartTimeline = gsap.timeline({ paused: true });
    
    // Step 1: ss4-bar1 grows
    ss4ChartTimeline.to('.ss4-bar1', {
        height: 105,
        duration: 0.4,
        ease: Power2.easeOut
    }, 0);
    
    // Step 2: ss4-dottedline1 extends (overlap >50% with bar1)
    ss4ChartTimeline.to('.ss4-dottedline1', {
        width: 500,
        duration:1,
        ease: Power2.easeOut
    }, 0.15);
    
    // Step 3: ss4-chart-truck slides in (overlap >50% with dottedline1)
    ss4ChartTimeline.to('.ss4-chart-truck', {
        x: 0,
        duration: 1,
        ease: Power2.easeOut
    }, 0.5);
    
    // Step 4: ss4-bar2 grows (overlap >50% with truck)
    ss4ChartTimeline.to('.ss4-bar2', {
        height: 245,
        duration: 1,
        ease: Power2.easeOut
    }, 0.8);
    
    // Step 5: ss4-dottedline2 extends (overlap >50% with bar2)
    ss4ChartTimeline.to('.ss4-dottedline2', {
        width: 500,
        duration: 1,
        ease: Power2.easeOut
    }, 0.75);
    
    // Step 6: ss4-chart-train slides in (overlap >50% with dottedline2)
    ss4ChartTimeline.to('.ss4-chart-train', {
        x: 0,
        duration: 1,
        ease: Power2.easeOut
    }, 1.1);
    
    new ScrollMagic.Scene({
        triggerElement: '.ss4-chart',
        triggerHook: 0.5
    })
    .on('enter', function() {
        ss4ChartTimeline.play();
    })
    .on('leave', function(event) {
        if (event.scrollDirection === 'REVERSE') {
            ss4ChartTimeline.reverse();
        }
    })
    .addTo(controller);
    
    // Parallax effect for footer image
    var footerImgTimeline = gsap.timeline();
    footerImgTimeline.to('.footer-img', {
        y: -280,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.footer-img',
        triggerHook: .25,
        duration: '100%'
    })
    .setTween(footerImgTimeline)
    .addTo(controller);
    
    // Parallax effect for cloud-1 (moving up)
    var cloud1Timeline = gsap.timeline();
    cloud1Timeline.to('.cloud-1', {
        y: -200,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.cloude-bg',
        triggerHook: 1,
        duration: '100%'
    })
    .setTween(cloud1Timeline)
    .addTo(controller);
    
    // Parallax effect for cloud-2 (moving down)
    var cloud2Timeline = gsap.timeline();
    cloud2Timeline.to('.cloud-2', {
        y: 200,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.cloude-bg',
        triggerHook: 1,
        duration: '100%'
    })
    .setTween(cloud2Timeline)
    .addTo(controller);
    
    // Parallax effect for cloud-3 (moving up)
    var cloud3Timeline = gsap.timeline();
    cloud3Timeline.to('.cloud-3', {
        y: -200,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.cloud-3',
        triggerHook: 1,
        duration: '100%'
    })
    .setTween(cloud3Timeline)
    .addTo(controller);
    
    // Parallax effect for cloud-4 (moving down)
    var cloud4Timeline = gsap.timeline();
    cloud4Timeline.to('.cloud-4', {
        y: 200,
        ease: Linear.easeNone
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.cloud-4',
        triggerHook: 1,
        duration: '100%'
    })
    .setTween(cloud4Timeline)
    .addTo(controller);
    
    // Pin ss5-info-graph-1 and animate blocks in 5 steps
    var ss5Timeline = gsap.timeline();
    
    // Mobile: Translate ss5-info-graph-1-inner to right edge during pin
    if (isMobile) {
        // Train follows the pan on mobile
        ss5Timeline.to('.ss5-block-train', {
            x: '-15%',
            duration: 1,
            ease: Linear.easeNone
        }, 0);
        
        ss5Timeline.to('.ss5-info-graph-1-inner', {
            x: '-100%',
            duration: 1,
            ease: Linear.easeNone
        }, .5);
    }
    
    // Step 1: Scale ss5-block-1 from 2 to 1
    if (!isMobile) {
        ss5Timeline.fromTo('.ss5-block-1', 
            { scale: 2, x: 1000, opacity: 0 },
            {
                scale: 1,
                x: 0,
                opacity: 1,
                duration: 1,
                ease: Power2.easeOut,
                onComplete: function() {
                    document.querySelector('.ss5-txt-1-top').classList.add('show');
                    document.querySelector('.ss5-txt-1-bottom').classList.add('show');
                },
                onReverseComplete: function() {
                    document.querySelector('.ss5-txt-1-top').classList.remove('show');
                    document.querySelector('.ss5-txt-1-bottom').classList.remove('show');
                }
            });
    }
    
    // Step 2: Scale ss5-block-2 from 2 to 1
    if (!isMobile) {
        ss5Timeline.fromTo('.ss5-block-2',
            { scale: 2, x: 1000, opacity: 0 },
            {
                scale: 1,
                x: 0,
                opacity: 1,
                duration: 1,
                ease: Power2.easeOut,
                onComplete: function() {
                    document.querySelector('.ss5-txt-2-top').classList.add('show');
                    document.querySelector('.ss5-txt-2-bottom').classList.add('show');
                },
                onReverseComplete: function() {
                    document.querySelector('.ss5-txt-2-top').classList.remove('show');
                    document.querySelector('.ss5-txt-2-bottom').classList.remove('show');
                }
            });
    }
    
    // Step 3: Scale ss5-block-3 from 2 to 1
    if (!isMobile) {
        ss5Timeline.fromTo('.ss5-block-3',
            { scale: 2, x: 1000, opacity: 0 },
            {
                scale: 1,
                x: 0,
                opacity: 1,
                duration: 1,
                ease: Power2.easeOut,
                onComplete: function() {
                    document.querySelector('.ss5-txt-3-top').classList.add('show');
                    document.querySelector('.ss5-txt-3-bottom').classList.add('show');
                },
                onReverseComplete: function() {
                    document.querySelector('.ss5-txt-3-top').classList.remove('show');
                    document.querySelector('.ss5-txt-3-bottom').classList.remove('show');
                }
            });
    }
    
    // Step 4: Scale ss5-block-4 from 2 to 1
    if (!isMobile) {
        ss5Timeline.fromTo('.ss5-block-4',
            { scale: 2, x: 1000, opacity: 0 },
            {
                scale: 1,
                x: 0,
                opacity: 1,
                duration: 1,
                ease: Power2.easeOut,
                onComplete: function() {
                    document.querySelector('.ss5-txt-4-top').classList.add('show');
                    document.querySelector('.ss5-txt-4-bottom').classList.add('show');
                },
                onReverseComplete: function() {
                    document.querySelector('.ss5-txt-4-top').classList.remove('show');
                    document.querySelector('.ss5-txt-4-bottom').classList.remove('show');
                }
            });
    }
    
    // Train moves from step 1 to step 5
    ss5Timeline.to('.ss5-block-train', {
        xPercent: 70,
        duration: 5,
        ease: Linear.easeNone
    }, 0);
    
    // Sky parallax - move left from step 1 to step 5
    ss5Timeline.to('.ss5-sky', {
        x: '-75%',
        duration: 5,
        ease: Linear.easeNone
    }, 0);
    

    // Calculate the image height and viewport height to center the pin
    var ss5Element = document.querySelector('.ss5-info-graph-1');
    var ss5Height = ss5Element ? ss5Element.offsetHeight : 0;
    var viewportHeight = window.innerHeight;
    var triggerHookValue = (viewportHeight / 2 - ss5Height / 2) / viewportHeight;
    
    new ScrollMagic.Scene({
        triggerElement: '.ss5-info-graph-1',
        triggerHook: 0,
        duration: '300%'
    })
    .setPin('.ss5-info-graph-1')
    .setTween(ss5Timeline)
    .on('enter', function() {
        document.querySelector('.ss5-scroll-hints').classList.add('active');
    })
    .on('leave', function() {
        document.querySelector('.ss5-scroll-hints').classList.remove('active');
    })
    .addTo(controller);
    
    // Train continues to move from 70% to 300% after scrolling 600px more
    var trainContinueTimeline = gsap.timeline();
    trainContinueTimeline.to('.ss5-block-train', {
        xPercent: isMobile ? 400 : 200,
        duration:  isMobile ? 0.2 : 1,
        ease: isMobile ? Linear.easeNone : Power2.easeOut
    });
    
    new ScrollMagic.Scene({
        triggerElement: '.ss5-info-graph-1-after',
        triggerHook: 1,
        duration: isMobile ? 1200: 600,
        offset: 0
    })
    .setTween(trainContinueTimeline)
    .addTo(controller);
    
    // Animate ss5-cc-train moving down within ss5-rail
    var ss5CcTrainTimeline = gsap.timeline();
    ss5CcTrainTimeline.fromTo('.ss5-cc-train', 
        { y: -1000 },
        { y: 2000, ease: Linear.easeNone }
    );
    
    new ScrollMagic.Scene({
        triggerElement: '.ss5-rail',
        triggerHook: 0.5,
        duration: 2200
    })
    .setTween(ss5CcTrainTimeline)
    .addTo(controller);
    
    // Mobile only: Pin ss5-img3 and pan the scaled image to the right
    if (isMobile) {
        var ss5Img3Timeline = gsap.timeline();
        ss5Img3Timeline.fromTo('.ss5-img3 .inner-graph-wild',
            { x: '0' },
            { x: '-50vw', ease: Linear.easeNone }
        );
        
        new ScrollMagic.Scene({
            triggerElement: '.ss5-img3',
            triggerHook: 0.2,
            duration: '100%'
        })
        .setPin('.ss5-img3')
        .setTween(ss5Img3Timeline)
        .addTo(controller);
    }
    
    document.querySelectorAll('.half-section-block').forEach(function(outerDiv) {
        var timeline = gsap.timeline();
        
        timeline
            .fromTo(outerDiv.querySelector('.pair-left'), 
                { scale: 1 },
                { scale: 1, duration: 1 }
            )
            .fromTo(outerDiv.querySelector('.pair-right'), 
                { scale: 1},
                { scale: 1, duration: 1 },
                "<"
            );
        
        var scene = new ScrollMagic.Scene({
            triggerElement: outerDiv,
            duration: "80%",
            triggerHook: 0.8
        })
        .setTween(timeline)
        .addTo(controller);
    });
    
    $('.qoute-wrap').each(function() {
        var $quote = $(this);
        var $h3 = $quote.find('h3');
        var wHeight = $(window).height();
        var isInnerQoute2 = $(this).closest('.inner-qoute-2').length > 0;
        var highlightColor = isInnerQoute2 ? '#fff' : '#011774';
        
        var text = $h3.text();
        var words = text.split(/(\s+)/);
        var wrappedText = '';
        
        for (var i = 0; i < words.length; i++) {
            if (words[i].trim() === '') {
                wrappedText += words[i];
            } else {
                wrappedText += '<span class="word">' + words[i] + '</span>';
            }
        }
        $h3.html(wrappedText);
        
        var $words = $h3.find('.word');
        var timeline = new TimelineMax();
        
        $words.each(function(index) {
            var delay = index * 0.1;
            timeline.to(this, 0.01,
                {
                    color: highlightColor,
                    ease: Linear.easeNone,
                    delay: delay
                }
            );
        });
        
        new ScrollMagic.Scene({
            triggerElement: this,
            triggerHook: 0.8,
            duration: wHeight * 0.5
        })
        .setTween(timeline)
        .addTo(controller);
    });
}

$(document).ready(function() {
    initMainCode();
    
    $(".owl-carousel").owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: false,
        slideBy: 1,
        center: true,
        smartSpeed: 2000,
        responsive: {
            0: {
                items: 1.5,
                margin: 10
            },
            768: {
                items: 3,
                margin: 50
            },
            1000: {
                items: 3,
                margin: 20
            }
        }
    });
    
    $('.next-slide').click(function() {
        $('.owl-carousel').trigger('next.owl.carousel');
    });
    
    $('.prev-slide').click(function() {
        $('.owl-carousel').trigger('prev.owl.carousel');
    });
});
