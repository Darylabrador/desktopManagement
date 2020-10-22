// edit desktop
let btnEditDesktop = document.querySelectorAll('.btnEditDesktop');
let desktopName = document.querySelectorAll('.desktopName');

if (btnEditDesktop.length != 0 && desktopName.length != 0) {
    for (let i = 0; i < btnEditDesktop.length; i++) {
        btnEditDesktop[i].addEventListener('click', evt => {
            $('#modalEditDesktop').modal('toggle');
            document.getElementById('desktopEditId').value = evt.currentTarget.getAttribute('data-desktopId');
            document.getElementById('desktopNameEdit').value = desktopName[i].textContent;
        });
    }
}

// delete desktop
let btnDeleteDesktop = document.querySelectorAll('.btnDeleteDesktop');

if (btnDeleteDesktop.length != 0) {
    btnDeleteDesktop.forEach(btn => {
        btn.addEventListener('click', evt => {
            $('#modalDeleteDesktop').modal('toggle');
            document.getElementById('desktopDeleteId').value = evt.currentTarget.getAttribute('data-desktopId');
        });
    });
}


//