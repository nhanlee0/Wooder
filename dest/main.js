AOS.init({
    duration: 2000,
    once: true,
});












// language 
let langCurrent = document.querySelector('.lang__current');
let langOption = document.querySelector('.lang__option');
let langItems = document.querySelectorAll('.lang__option .lang__option--item ');
let langSpan = document.querySelector('.lang__current span');
langCurrent.addEventListener('click', function (e) {
    e.stopPropagation();
    langOption.classList.toggle('active');
});

langItems.forEach(function (item) {
    item.addEventListener('click', function () {
        let textItem = this.textContent;
        let textTemp = langSpan.textContent;
        langSpan.innerText = textItem;
        this.textContent = textTemp;
        langOption.classList.remove('active');
    });
});

langOption.addEventListener('click', function (e) {
    e.stopPropagation();
});
document.addEventListener('click', function () {
    langOption.classList.remove('active');
});

// header

let menus = document.querySelectorAll('header .header__menu a');
let heightHeader = document.querySelector('header').offsetHeight;
let sections = [];

function removeActiveMenu() {
    menus.forEach(function (menu_element, menu_index) {
        menu_element.classList.remove('active');
    });
};

menus.forEach(function (element, index) {
    let className = element.getAttribute('href').replace('#', '');
    let section = document.querySelector('.' + className);
    sections.push(section);
    element.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: section.offsetTop - heightHeader,
            behavior: 'smooth'
        });
        removeActiveMenu();
        element.classList.add('active');
    });
});

window.addEventListener('scroll', function () {
    let positionScroll = window.pageYOffset;
    sections.forEach(function (section, index) {
        if (positionScroll > section.offsetTop - heightHeader && positionScroll < section.offsetTop + section.offsetHeight) {
            removeActiveMenu();
            menus[index].classList.add('active');
        } else {
            menus[index].classList.remove('active');
        }
    });
});



// BacktoTop

let backtotop = document.querySelector('.backtop');

backtotop.addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

let positionSectionProduct = document.querySelector('.product').offsetTop;

window.addEventListener('scroll', function () {
    let positionScroll = window.pageYOffset;
    if (positionScroll > positionSectionProduct) {
        backtotop.style.bottom = '70px';
    } else {
        backtotop.style.bottom = '-100%';
    }
});


// popup-video

let button_video = document.querySelectorAll('.video__item--img');
let popup_video = document.querySelector('.popup-video');
let close_popup_video = document.querySelector('.popup-video .close');
let iframe = document.querySelector('.popup-video iframe');

button_video.forEach(function (button) {
    button.addEventListener('click', function () {
        let video_id = button.getAttribute('data-video-id');
        iframe.setAttribute('src', 'https://www.youtube.com/embed/' + video_id);
        popup_video.style.display = 'flex';
    });
});

close_popup_video.addEventListener('click', function () {
    iframe.setAttribute('src', '');
    popup_video.style.display = "none";
});

document.querySelector('.popup-video').addEventListener('click', function (e) {
    iframe.setAttribute('src', '');
    popup_video.style.display = "none";
});


// Gallery 

var initPhotoSwipeFromDOM = function (gallerySelector) {
    var parseThumbnailElements = function (el) {
        var thumbElements = el.childNodes,
            numNodes = thumbElements.length,
            items = [],
            figureEl,
            linkEl,
            size,
            item;
        for (var i = 0; i < numNodes; i++) {
            figureEl = thumbElements[i];
            if (figureEl.nodeType !== 1) {
                continue;
            }
            linkEl = figureEl.children[0];
            size = linkEl.getAttribute('data-size').split('x');
            item = {
                src: linkEl.getAttribute('href'),
                w: parseInt(size[0], 10),
                h: parseInt(size[1], 10)
            };
            if (figureEl.children.length > 1) {
                item.title = figureEl.children[1].innerHTML;
            }
            if (linkEl.children.length > 0) {

                item.msrc = linkEl.children[0].getAttribute('src');
            }
            item.el = figureEl;
            items.push(item);
        }
        return items;
    };
    var closest = function closest(el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn));
    };
    var onThumbnailsClick = function (e) {
        e = e || window.event;
        e.preventDefault ? e.preventDefault() : e.returnValue = false;
        var eTarget = e.target || e.srcElement;
        var clickedListItem = closest(eTarget, function (el) {
            return (el.tagName && el.tagName.toUpperCase() === 'FIGURE');
        });
        if (!clickedListItem) {
            return;
        }
        var clickedGallery = clickedListItem.parentNode,
            childNodes = clickedListItem.parentNode.childNodes,
            numChildNodes = childNodes.length,
            nodeIndex = 0,
            index;
        for (var i = 0; i < numChildNodes; i++) {
            if (childNodes[i].nodeType !== 1) {
                continue;
            }
            if (childNodes[i] === clickedListItem) {
                index = nodeIndex;
                break;
            }
            nodeIndex++;
        }
        if (index >= 0) {
            openPhotoSwipe(index, clickedGallery);
        }
        return false;
    };
    var photoswipeParseHash = function () {
        var hash = window.location.hash.substring(1),
            params = {};
        if (hash.length < 5) {
            return params;
        }
        var vars = hash.split('&');
        for (var i = 0; i < vars.length; i++) {
            if (!vars[i]) {
                continue;
            }
            var pair = vars[i].split('=');
            if (pair.length < 2) {
                continue;
            }
            params[pair[0]] = pair[1];
        }
        if (params.gid) {
            params.gid = parseInt(params.gid, 10);
        }
        return params;
    };
    var openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        var pswpElement = document.querySelectorAll('.pswp')[0],
            gallery,
            options,
            items;
        items = parseThumbnailElements(galleryElement);
        options = {
            galleryUID: galleryElement.getAttribute('data-pswp-uid'),
            getThumbBoundsFn: function (index) {
                var thumbnail = items[index].el.getElementsByTagName('img')[0],
                    pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                    rect = thumbnail.getBoundingClientRect();

                return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
            },
            showAnimationDuration: 0,
            hideAnimationDuration: 0
        };
        if (fromURL) {
            if (options.galleryPIDs) {
                for (var j = 0; j < items.length; j++) {
                    if (items[j].pid == index) {
                        options.index = j;
                        break;
                    }
                }
            } else {
                options.index = parseInt(index, 10) - 1;
            }
        } else {
            options.index = parseInt(index, 10);
        }
        if (isNaN(options.index)) {
            return;
        }
        if (disableAnimation) {
            options.showAnimationDuration = 0;
        }
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
        gallery.init();
    };
    var galleryElements = document.querySelectorAll(gallerySelector);
    for (var i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1);
        galleryElements[i].onclick = onThumbnailsClick;
    }
    var hashData = photoswipeParseHash();
    if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true);
    }
};


initPhotoSwipeFromDOM('.carousel-img');

















// slider

// let ListItemSlider = document.querySelectorAll('.slider__item');
// let currentSlider = 0;
// let number = document.querySelector('.slider__bottom .paging .paging__number');
// let dot_li = document.querySelectorAll('.slider__bottom .paging .paging__dotted li');

// ListItemSlider.forEach(function (itemSlider, index) {
//     if (itemSlider.classList.contains('active')) {
//         currentSlider = index;
//     }
// });

// function showNumber(index) {
//     number.innerHTML = (index).toString().padStart(2, '0');
// };

// showNumber(currentSlider + 1);
// dot_li[currentSlider].classList.add('selected');



// document.querySelector('.control__next').addEventListener('click', function () {
//     if (currentSlider < ListItemSlider.length - 1) {
//         goTo(currentSlider + 1);
//     } else {
//         goTo(0);
//     }
// });

// document.querySelector('.control__back').addEventListener('click', function () {
//     if (currentSlider > 0) {
//         goTo(currentSlider - 1);
//     } else {
//         goTo(ListItemSlider.length - 1);
//     }
// });

// function goTo(index) {
//     ListItemSlider[currentSlider].classList.remove('active');
//     ListItemSlider[index].classList.add('active');
//     dot_li[currentSlider].classList.remove('selected');
//     dot_li[index].classList.add('selected');
//     currentSlider = index;
//     showNumber(currentSlider + 1);
// };

// dot_li.forEach(function (li, index) {
//     li.addEventListener('click', function () {
//         goTo(index);
//     });
// });
// let tabPanel = $(".tabs .tab__content .tab__panel");

// $(document).on('click', '.tabs .tab__nav li', function (e) {
//     e.preventDefault();
//     $('.tabs .tab__nav li').removeClass('active');
//     $(this).addClass('active');
//     let index = $(this).index();
//     let itemPanel = tabPanel.eq(index);
//     $(".tabs .tab__content .tab__panel").removeClass('active');
//     itemPanel.addClass('active');
// });

let $ListItemSlider = $('.slider__item--wrap')

$ListItemSlider.flickity({
    prevNextButtons: false,
    freeScroll: true,
    pageDots: true,
    cellAlign: 'left',
    wrapAround: true,
    groupCells: 1,
    friction: 0.6,
    autoPlay: 3000,
    on: {
        ready: function () {
            let dotted = $('.flickity-page-dots');
            paging = $('.slider__bottom .paging__dotted');
            dotted.appendTo(paging);
        },
        change: function (index) {
            let number = $('.slider__bottom .paging__number');
            let indexPage = index + 1;
            // fix : khai báo indexpage nhưng kh dùng !!!
            number.text(indexPage.toString().padStart(2, 0))
        }
    }
});

$('.slider__bottom .control .control__back').on('click', function () {
    $ListItemSlider.flickity('previous');
})
$('.slider__bottom .control .control__next').on('click', function () {
    $ListItemSlider.flickity('next');
})


// Banner 
let $carousel = $('.carousel');

$carousel.flickity({
    prevNextButtons: false,
    freeScroll: true,
    pageDots: false,
    cellAlign: 'left',
    wrapAround: true,
    autoPlay: true,
    groupCells: true,
    friction: 0.6,
    fullscreen: true,
});







// Tag

let newsTag = document.querySelectorAll('.news__tags .tag')
let newsList = document.querySelectorAll('.news__list')

newsTag.forEach(function (item, index) {
    item.addEventListener('click', function () {
        let tagID = index + 1;
        newsTag.forEach(function (tag) {
            tag.classList.remove('active')
        })
        newsList.forEach(function (tag) {
            tag.classList.remove('active')
        })
        item.classList.add('active')
        document.querySelector('.news__list-' + tagID).classList.add('active')
    })
})



// FAQ

$(document).ready(function () {
    $(document).on('click', '.accordion .itemAcc .titleAcc', function () {
        $(".accordion .itemAcc").not($(this).parent()).removeClass('active');
        $(".accordion .itemAcc .panel").not($(this).next()).slideUp();
        $(this).next().slideToggle();
        $(this).parent().addClass('active');
    })
});







// Tab

let tabPanel = $(".tabs .tab__content .tab__panel");

$(document).on('click', '.tabs .tab__nav li', function (e) {
    e.preventDefault();
    $('.tabs .tab__nav li').removeClass('active');
    $(this).addClass('active');
    let index = $(this).index();
    let itemPanel = tabPanel.eq(index);
    $(".tabs .tab__content .tab__panel").removeClass('active');
    itemPanel.addClass('active');
});



// tags

$(document).ready(function () {
    $('#addTagBtn').click(function () {
        $('#tags option:selected').each(function () {
            $(this).appendTo($('#selectedTags'));
        });
    });
    $('#removeTagBtn').click(function () {
        $('#selectedTags option:selected').each(function (el) {
            $(this).appendTo($('#tags'));
        });
    });
    $('.tagRemove').click(function (event) {
        event.preventDefault();
        $(this).parent().remove();
    });
    $('ul.tags').click(function () {
        $('#search-field').focus();
    });
    $('#search-field').keypress(function (event) {
        if (event.which == '13') {
            if ($(this).val() != '') {
                $('<li class="addedTag">' + $(this).val() + '<span class="tagRemove" onclick="$(this).parent().remove();">x</span><input type="hidden" value="' + $(this).val() + '" name="tags[]"></li>').insertBefore('.tags .tagAdd');
                $(this).val('');
            }
        }
    });

});


// Form

$(".btnContact").click(function (e) {

    let nameForm = $("input[name ='nameForm']").val();
    let email = $("input[name ='email']").val();
    let telephone = $("input[name ='telephone']").val();
    let content = $("textarea[name ='content']").val();
    // console.log(nameForm, email, telephone, content);

    let errors = {
        nameForm: [],
        email: [],
        telephone: []
    };
    if (nameForm == "") {
        errors.nameForm.push('Tên không được để trống');
    } else {
        if (nameForm.length < 8) {
            errors.nameForm.push('Tên phải lớn hơn 8 kí tự');
        }
    }

    if (email == "") {
        errors.email.push('Email không được để trống');
    } else {
        if (!isEmail(email)) {
            // kiem tra sai
            errors.email.push('Email không hợp lệ');
        }
    }

    if (telephone == "") {
        errors.telephone.push('Số điện thoại không được để trống');
    } else {
        if (telephone.length < 10 || telephone.length > 11) {
            errors.telephone.push('SĐT chỉ được phép 10 đến 11 kí tự');
        }
    }
    let success = true;
    for (let index in errors) {
        $(`input[name=${index}]`).parent().find('.error').remove();
        if (errors[index].length > 0) {
            success = false;

            let htmlError = `<div class="error" style="color:#bf081f;">${errors[index][0]}</div>`;
            $(`input[name=${index}]`).parent().append(htmlError);
        }
    }

    if (success == true) {
        alert("Đăng nhập thành công");
        // do something
    }

})
function isEmail(string_email) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(string_email)) {
        return true;
    }
    return false;
}

// let tlProduct = new gsap.timeline();
// let title = $('.furniture__text'),
//     titleDecor = $('.decor__text'),
//     des = $('.furniture__img'),
//     desDecor = $('.furniture__img-decor');

// tlProduct.from(title, { duration: 0.4, autoAlpha: 0, x: -150 })
//     .from(des, { duration: 0.4, autoAlpha: 0, x: 150 }, '-=0.2')
//     .from(titleDecor, { duration: 0.4, autoAlpha: 0, x: 150 }, '-=0.1')
//     .from(desDecor, { duration: 0.4, autoAlpha: 0, x: -150 }, '-=0.4');
















