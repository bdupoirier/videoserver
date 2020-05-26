$(function () {
    // Sidebar toggle behavior
    console.log("enclenché");
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar, #content').toggleClass('active');
    });
});
