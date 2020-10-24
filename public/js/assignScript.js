let btnAddAssign    = document.querySelectorAll('.btnAddAssign');
let btnDeleteAssign = document.querySelectorAll('.btnDeleteAssign');

// Add assign
if (btnAddAssign.length != 0) {
    btnAddAssign.forEach(btn => {
        btn.addEventListener('click', evt => {
            $('#modalAddAssign').modal('toggle');
            document.getElementById('assignHourAdd').value = evt.currentTarget.getAttribute('data-hours');
            document.getElementById('assignDesktopAdd').value = evt.currentTarget.getAttribute('data-desktopId');
            document.getElementById('assignDateAdd').value = document.getElementById('date').value;
        })
    })
}


// delete assign
if (btnDeleteAssign.length != 0) {
    btnDeleteAssign.forEach(btn => {
        btn.addEventListener('click', evt => {
            $('#modalDeleteAssign').modal('toggle');
            document.getElementById('idAssignDelete').value = evt.currentTarget.getAttribute('data-idAssign');
        })
    })
}