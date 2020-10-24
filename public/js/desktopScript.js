let btnEditDesktop   = document.querySelectorAll('.btnEditDesktop');
let btnDeleteDesktop = document.querySelectorAll('.btnDeleteDesktop');
let desktopName      = document.querySelectorAll('.desktopName');

// edit desktop
if (btnEditDesktop.length != 0 && desktopName.length != 0) {
    for (let i = 0; i < btnEditDesktop.length; i++) {
        btnEditDesktop[i].addEventListener('click', evt => {
            $('#modalEditDesktop').modal('toggle');
            document.getElementById('idDesktopEdit').value = btnEditDesktop[i].getAttribute('data-desktopId');
            document.getElementById('desktopNameEdit').value = desktopName[i].textContent;
        });
    }
}

// delete desktop
if (btnDeleteDesktop.length != 0) {
    btnDeleteDesktop.forEach(btn => {
        btn.addEventListener('click', evt => {
            $('#modalDeleteDesktop').modal('toggle');
            document.getElementById('desktopDeleteId').value = btn.getAttribute('data-desktopId');
        });
    });
}