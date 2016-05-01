(function () {

    var $image_layer, $king, $title, $flower,center_x, center_y, fade_length, max_x, max_y, min_opacity, mouse_move_handler, perspective, transform, win_h, win_w;
    transform = function (elem, transform) {
        elem.style.webkitTransform = transform;
        return elem.style.transform = transform;
    };
    win_w = window.innerWidth;
    win_h = window.innerHeight;
    center_x = win_w / 2;
    center_y = win_h / 2;
    max_x = win_w * 0.02;
    max_y = win_h * 0.02;
    perspective = 1200;

    $image_layer = document.getElementById('girl');
    $king = document.getElementById('king')
    $title = document.getElementById('title')
    $flower=document.getElementById('flower')

    mouse_move_handler = function (max_x, max_y,ratio_x, ratio_y, layer) {
        var transform_val;
        transform_val = 'perspective(' + perspective + ') translate3d(' + max_x * ratio_x + 'px, ' + max_y * ratio_y + 'px, ' + max_x * 0 + 'px)';
        return transform(layer, transform_val);
    };

    document.addEventListener('mousemove', function (event) {
        var mouse_x, mouse_y, ratio_x, ratio_y;
        if (window.event) {
            event = window.event;
        }
        mouse_x = event.clientX;
        mouse_y = event.clientY;
        ratio_x = 1 - mouse_x / center_x;
        ratio_y = 1 - mouse_y / center_y;
        mouse_move_handler(max_x * 0.5, max_y * 0.5, ratio_x, ratio_y, $image_layer);
        mouse_move_handler(max_x * 0.5, max_y * 0.5, ratio_x, ratio_y, $king);
        mouse_move_handler(max_x * 0.3, max_y * 0.3, ratio_x, ratio_y, $title);
        mouse_move_handler(max_x, max_y, ratio_x, ratio_y, $flower);

    }, false);

    var elem = document.querySelector('#drag');
    var draggie = new Draggabilly(elem, {
        axis: 'x',
        containment: true
    });

    var $background2 = $('.background2');
    var $background3 = $('.background3');
    var original,last,rightPosition,lastTime;
    var left=1, middel=0, right=0;

    draggie.on('dragStart', function () {
        original = $('#drag').position().left;
        lastTime = $('#drag').position().left;
        $("#dragUI").removeClass("dragUI");
    });
    draggie.on('dragMove', function () {

        rightPosition = $background3.position().left + $('#drag').position().left - lastTime;
        lastTime = $('#drag').position().left;
        $background2.css({
            left: $('#drag').position().left + 'px',
        });
        $background3.css({
            left: rightPosition + 'px',
        });
    });
    draggie.on('dragEnd', function () {
        last = $('#drag').position().left;
        if(left==1)
        {
            if (last - original < $(window).width()/2) //->middle
            {
                $background2.css({
                    left: $(window).width() / 2 + 'px',
                });

                $background3.css({
                    left: -20 + '%'
                });

                $('#drag').css({
                    left: $(window).width() / 2 + 'px',
                });


                middel = 1;
            }
            else
            {                                    //->right
                $background2.css({
                    left: 100 + '%',
                });
                $background3.css({
                    left: 0 + '%'
                });
                $('#drag').css({
                    left: 100 + '%',
                });
                right = 1;
            }
            left = 0;
        }
        else if(middel == 1)
        {
            if(last-original>0)  //->right
            {
                $background2.css({
                    left: 100 + '%',
                });
                $background3.css({
                    left: 0 + '%'
                });
                $('#drag').css({
                    left: 100 + '%',
                });
                right = 1;
            }
            else {             //->left
                $background2.css({
                    left: 0 + 'px',
                });
                $background3.css({
                    left: -100 + '%'
                });
                $('#drag').css({
                    left: 0 + 'px',
                });
                left = 1;
            }
            middel = 0;
        }
        else {
            if (original-last < $(window).width() / 2) //->middle
            {
                $background2.css({
                    left: 50 + '%',
                });
                $background3.css({
                    left: -20 + '%'
                });
                $('#drag').css({
                    left: $(window).width() / 2 + 'px',
                });
                middel = 1;
            }
            else {

                $background2.css({
                    left: 0+ 'px',
                });
                $background3.css({
                    left: -100 + '%'
                });
                $('#drag').css({
                    left: 0 + 'px',
                });
                left = 1;
            }
            right = 0;
        }
    });

    var elem2 = document.querySelector('#light2');
    var draggie2 = new Draggabilly(elem2, {
        containment: true
    });
    draggie2.on('dragStart', function () {
        $(".light").css("display", "block");
        $(".light2").css("background-size", "300px");

    });

    draggie2.on('dragEnd', function () {
        $(".light").css("display", "none");
        $(".light2").css("background-size", "200px");
    });


    var clicktime = 0;

    document.getElementById("king6").addEventListener("click", displaySing);
    document.getElementById("king7").addEventListener("click", displaySing);

    function displaySing() {

        $(".king6").css("opacity", "0");
        $(".king7").css("opacity", "0");
        $(".king5").addClass("startSing");
        $(".musicNote").addClass("noteMoving");

        if (clicktime<2){
        var nodes = document.createElement("img");

        nodes.className = "noteAni";
        nodes.setAttribute('id', 'musicFall');
        nodes.setAttribute('src', 'InteractionDesign01Scene05/Music-Note-Animation-02.gif');
        var ele = document.getElementById("musicNote");
        ele.appendChild(nodes);
        }

        setTimeout(function () {
            // Do something after 1 second
            $(".king6").css("opacity", "1");
            $(".king7").css("opacity", "1");
            $(".king5").removeClass("startSing");
            $(".musicNote").removeClass("noteMoving");
            if (clicktime < 2){
            var olddiv = document.getElementById("musicFall");
            ele.removeChild(olddiv);
            }
        }, 3500);

        
    }
    
    document.getElementById("breakBar").addEventListener("click", breakWall);
    document.getElementById("breakBar2").addEventListener("click", breakWall);
    function breakWall()
    {
        clicktime++;
        if(clicktime==1)
        {
            $(".breakBar2").css("display", "none");
            
            
        }
        if (clicktime == 2) {
            $(".breakBar").css("display", "none");
            $("#musicNote").removeClass("musicFalling");
            $("#musicNote").addClass("musicNote");
            $("#lightContainer").addClass("bigger");
        }
    }

    window.onscroll = function () { play() };

    function play() {
        //if ($(document).scrollTop() > 545) {
        //}
        if ($(document).scrollTop() > 2700 && $(document).scrollTop()<3200 ) {
            $('#interaction').css("opacity", "1");
            $('#background2').css("left", "0");
            $('#drag').css("left", "0");
            $('#background3').css("left", "-100%");
        }
        else {
            $('#interaction').css("opacity", "0");
            $('#draggable').css("opacity", "1");
        }
    }

    document.getElementById("plus").addEventListener("click", addNotes);
    function addNotes() {
        var nodes = document.createElement("div");
        nodes.className = "notes";
        var x = getRandomArbitrary(0,50);
        var y = getRandomArbitrary(10, 50);

        nodes.style.left = x+"%";
        nodes.style.top = y+"%";
        nodes.innerHTML = "<textarea rows='5' cols='20'></textarea>";
        var ele = document.getElementById("interaction2");
        ele.appendChild(nodes);

    }

    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }


    $("#bear").dblclick(function () {
        $("#interaction2").toggleClass("small");
    });

    $("#minus").dblclick(function () {
        $("#interaction2").toggleClass("small");
    });
    

}.call(this));