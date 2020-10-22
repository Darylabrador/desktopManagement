let method = "POST";
let request = new XMLHttpRequest();

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


// Add assign
let btnAddAssign = document.querySelectorAll('.btnAddAssign');

if (btnAddAssign.length != 0) {
    btnAddAssign.forEach(btn => {
        btn.addEventListener('click', evt => {
            $('#modalAddAssign').modal('toggle');
            document.getElementById('assignDateAdd').value    = "";
            document.getElementById('assignHourAdd').value    = "";
            document.getElementById('assignDesktopAdd').value = "";
        })
    })
}


// delete assign
let btnDeleteAssign = document.querySelectorAll('.btnDeleteAssign');

if (btnDeleteAssign.length != 0) {
    btnDeleteAssign.forEach(btn => {
        btn.addEventListener('click', evt => {
            $('#modalDeleteAssign').modal('toggle');
            document.getElementById('assignDateDelete').value    = "";
            document.getElementById('assignHourDelete').value    = "";
            document.getElementById('assignClientDelete').value  = "";
            document.getElementById('assignDesktopDelete').value = "";
        })
    })
}

// Autocomplete
let clientSearch = document.getElementById('clientSearch');

clientSearch.addEventListener('keyup', evt => {
    let clientInfo = "";
    let btnToAddClient = document.getElementById('btnAddClient');
    clientInfo += evt.currentTarget.value;

    if (clientInfo == ""){
        btnToAddClient.setAttribute('disabled','disabled');
    }

    if(clientInfo.length >= 3){
        let urlSearchClient = '/dashboard/client';
        let dataSend = {
            clientInfoSearched: clientInfo
        }
        request.open(method, urlSearchClient);
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
        request.send(JSON.stringify(dataSend));
        request.responseType = "json";
        
        request.onload = () => {
            if(request.readyState === XMLHttpRequest.DONE) {
                if(request.status === 200) {
                    let reponse = request.response;
                    console.log(reponse);
                    
                    $("#clientSearch").autocomplete({
                        source: reponse.userList
                    });

                    if(reponse.userList.length == 0) {
                        btnToAddClient.removeAttribute('disabled');
                    }
                }else{
                    $('#modalAddAssign').modal('toggle');
                    bootbox.alert({
                        centerVertical: true,
                        message: "Une erreur est survenue"
                    });
                }
            } else {
                $('#modalAddAssign').modal('toggle');
                bootbox.alert({
                    centerVertical: true,
                    message: "Ressource indisponible"
                });
            }
        }
    } 
});


// add client if not found
let btnAddClient = document.getElementById('btnAddClient');

if(btnAddClient) {
    btnAddClient.addEventListener('click', evt => {
        $('#modalAddAssign').modal('toggle');
        $('#modalAddClient').modal('toggle');

        let addClientForm = document.getElementById('addClientForm');
        addClientForm.addEventListener('submit', evt => {
            evt.preventDefault();
            let urlCreateUser = "/dashboard/client/add";
            let dataSend = {
                name: document.getElementById('name').value,
                surname: document.getElementById('surname').value
            }
            request.open(method, urlCreateUser);
            request.setRequestHeader('Content-type', 'application/json; charset= utf-8');
            request.send(JSON.stringify(dataSend));

            request.onload = () => {
                if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        let reponse = request.response;
                        let messageAdd = document.getElementById('messageAdd');
                        $('#modalAddAssign').modal('toggle');
                        $('#modalAddClient').modal('toggle');
                        addClientForm.reset();

                        if(reponse.success) {
                            messageAdd.innerHTML = `
                                <div class="alert alert-success alert-dismissible fade show my-0" role="alert">
                                    <strong>${reponse.message}</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            `;
                        } else {
                            messageAdd.innerHTML = `
                                <div class="alert alert-danger alert-dismissible fade show my-0" role="alert">
                                    <strong>${reponse.message}</strong>
                                    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                            `;
                        }
                    } else {
                        $('#modalAddClient').modal('toggle');
                        bootbox.alert({
                            centerVertical: true,
                            message: "Une erreur est survenue"
                        });
                    }
                } else {
                    $('#modalAddClient').modal('toggle');
                    bootbox.alert({
                        centerVertical: true,
                        message: "Ressource indisponible"
                    });
                }
            }
        })
    })
}