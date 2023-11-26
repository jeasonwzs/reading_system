
window.onload() = function() {
    $.ajax({
    url: 'http://127.0.0.1:5000/bookDetail',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({ book_id: 1 }),
    success: function(data) {
        alert(data);
        return data;
    },
    error: function(error) {
        return error;
}
});
}
