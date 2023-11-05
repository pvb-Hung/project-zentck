var menuIcon = document.getElementById("menu-icon");
var slideMenu = document.getElementById("mySlideMenu");

slideMenu.style.width = "0";

menuIcon.addEventListener("click", function () {
    if (slideMenu.style.width === "0px" || slideMenu.style.width === "") {
        slideMenu.style.width = "75%";
    } else {
        slideMenu.style.width = "0";
    }
});

function closeSlideMenu() {
    slideMenu.style.width = "0";
}

function toggleContent(element) {
    var content = element.nextElementSibling;
    var button = element.querySelector("button");

    if ($(content).is(":hidden")) {
        $(content).slideDown();
        button.textContent = "-";
    } else {
        $(content).slideUp();
        button.textContent = "+";
    }
}