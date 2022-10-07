

document.addEventListener('myEvent', function (e) {
    console.log(e.detail);
    document.getElementById('result1').innerHTML = e.detail;
});

function fireEvent() {
    // custom event oluşturma
    var event = new CustomEvent('myEvent', { "detail": "Trigger custom event Example "
    });
    //gönder
    document.dispatchEvent(event);
}


document.getElementsByTagName("button")[0].onclick = function () {
    fireEvent();
}