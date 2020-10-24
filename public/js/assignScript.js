let btnAddAssign    = document.querySelectorAll('.btnAddAssign');
let btnDeleteAssign = document.querySelectorAll('.btnDeleteAssign');

// Add assign
if (btnAddAssign.length != 0) {
    btnAddAssign.forEach(btn => {
        btn.addEventListener('click', evt => {
            $('#modalAddAssign').modal('toggle');
            document.getElementById('assignHourAdd').value = btn.getAttribute('data-hours');
            document.getElementById('assignDesktopAdd').value = btn.getAttribute('data-desktopId');
            document.getElementById('currentDate').value = document.getElementById('date').value;
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