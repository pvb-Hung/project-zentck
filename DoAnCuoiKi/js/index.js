$(document).ready(function () {
    $(".mid ul li").hover(
        function () {
            $(this).find(".submenu").stop().slideDown();
        },
        function () {
            $(this).find(".submenu").stop().slideUp();
        }
    );
});

$(document).ready(function () {
    $(".category-toggle").click(function () {
        $(".category-list").slideToggle();
    });
});

$(document).ready(function () {
    $(".accordion div button").click(function () {
        var content = $(this).closest(".accordion");
        var contentText = content.find(".content");

        if ($(this).text() === '+') {
            $(this).text('-');
            contentText.slideDown();
        } else {
            $(this).text('+');
            contentText.slideUp();
        }
    });
});


function startCountdown(duration, display) {
    var timer = duration, days, hours, minutes;
    var countdownInterval = setInterval(function () {
        days = parseInt(timer / (60 * 60 * 24), 10);
        hours = parseInt((timer % (60 * 60 * 24)) / (60 * 60), 10);
        minutes = parseInt((timer % (60 * 60)) / 60, 10);

        days = days < 10 ? "0" + days : days;
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;

        display.textContent = days + " days " + hours + ":" + minutes;

        if (--timer < 0) {
            clearInterval(countdownInterval); // Stop the countdown when it reaches zero
        }
    }, 1000);
}

window.onload = function () {
    var twoDays = 60 * 60 * 24 * 2; // 2 days in seconds
    var display = document.querySelector('#countdown');
    startCountdown(twoDays, display);
};

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel-1");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);



function toggleContent(id) {
    // Ẩn toàn bộ nội dung trước
    var contents = document.querySelectorAll('.content');
    contents.forEach(content => {
        content.style.display = 'none';
    });

    // Hiện nội dung tương ứng
    var content = document.getElementById(id);
    if (content) {
        content.style.display = 'block';
    }
}

// Hiện nội dung First lần đầu khi trang được tải
toggleContent('content1');


function filterCategory(category) {
    // Ẩn toàn bộ sản phẩm
    var products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        product.style.display = 'none';
    });

    if (category === 'all') {
        // Hiện tất cả sản phẩm nếu chọn "All"
        products.forEach(product => {
            product.style.display = 'block';
        });
    } else {
        // Hiện sản phẩm thuộc danh mục được chọn
        var selectedProducts = document.querySelectorAll('.' + category);
        selectedProducts.forEach(product => {
            product.style.display = 'block';
        });
    }
}