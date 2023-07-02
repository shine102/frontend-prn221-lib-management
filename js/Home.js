$(document).ready(() => {
    // fetch("http://139.59.115.128/api/Books", {
    //     headers: { Authentication: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjg4MjEyMTc3LCJleHAiOjE2ODgyMjI5NzcsImlhdCI6MTY4ODIxMjE3NywiaXNzIjoiVGVzdElzc3VlciIsImF1ZCI6IlRlc3RBdWRpZW5jZSJ9.zlgbzOF3JPSH3oBWRv5Z_JGUpDGVZDL6_YCbzYuMSus' }
    // }).then(data => LoadDataToView(data))

    fetch('http://139.59.115.128/api/Books', {
        headers: { 'Authentication': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6IkFkbWluIiwibmJmIjoxNjg4MjEyMTc3LCJleHAiOjE2ODgyMjI5NzcsImlhdCI6MTY4ODIxMjE3NywiaXNzIjoiVGVzdElzc3VlciIsImF1ZCI6IlRlc3RBdWRpZW5jZSJ9.zlgbzOF3JPSH3oBWRv5Z_JGUpDGVZDL6_YCbzYuMSus' }
    })
        .then(resp => resp.json())
        .then(json => console.log(JSON.stringify(json)))

})


var LoadDataToView = (data) => {
    console.log("aaa" + JSON.stringify(data))
    var book = JSON.parse(data)
    document.getElementById("BookViewRoot").innerHTML = `<div class="col-lg-3 col-md-3 col-sm-4 col-xs-6 slick-slide slick-active"
    data-slick-index="0" aria-hidden="false" style="width: 282px;">
    <div id='LI_1'>
        <div id='DIV_2'>
            <figure id='FIGURE_4'>
                <img width='250' class='img-responsive lazyMain'
                    style='display: block;' alt='' id='IMG_6'
                    src=${book.title}>
            </figure>
            <div id="DIV_7">
                <h2 id="H2_8">
                    ${book.imageLink}
                </h2>
                <span id="SPAN_9">

                    Alan Beaulieu</span>
                <!--<span id="SPAN_10"><del
                        id="DEL_11"><span
                            id="SPAN_12"><span
                                id="SPAN_13">$</span>3.00</span></del> <ins
                        id="INS_14"><span
                            id="SPAN_15"><span
                                id="SPAN_16">$</span>2.00</span></ins></span>-->
            </div>
            <div id="DIV_17">
                <div id="DIV_18">
                    <a id="A_19"
                        ng-click="showFullData(&#39;059655558X&#39;,&#39;http://books.google.co.in/books?id=1PgCCVryjOQC&amp;printsec=frontcover&amp;dq=isbn:059655558X&amp;hl=&amp;cd=1&amp;source=gbs_api&#39;,&#39;basic&#39;);"><img
                            src="./Library Management System – WordPress theme_files/eye.png"
                            class="frnt_det_btn"><span
                            class="f_detail">Detail</span></a>
                    <a class="A_20"
                        href="https://wordpress.library-management.com/" style="background: green;
color: white;"><span class="f_available">Available</span>
                        (1)</a>
                </div>
            </div>
        </div>

    </div>
</div>"`
}


class Book {
    constructor(id, title, author, content, categoryId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.categoryId = categoryId;
    }
}