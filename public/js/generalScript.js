// Requirement
let clientSearch     = document.getElementById('clientSearch');
let btnToAddClient   = document.getElementById('btnAddClient');

// form : search date
let searchDateForm    = document.getElementById('searchDateForm');
let dateInfo          = document.getElementById('date');
let urlSearchDate     = "/dashboard";

// form : add desktop
let desktopAddForm    = document.getElementById('desktopAddForm');
let desktopNameAdd    = document.getElementById('desktopNameAdd');
let messageAddDesktop = document.getElementById('messageAddDesktop');
let urlDesktopAdd     = "/dashboard/desktop/add";

// form : edit desktop
let desktopEditForm   = document.getElementById('desktopEditForm');
let idDesktopEdit     = document.getElementById('idDesktopEdit');
let desktopNameEdit   = document.getElementById('desktopNameEdit');
let messageEditDesktop = document.getElementById('messageEditDesktop');
let urlDesktopEdit    = "/dashboard/desktop/edit";

// form : delete desktop
let desktopDeleteForm = document.getElementById('desktopDeleteForm');
let desktopDeleteId   = document.getElementById('desktopDeleteId');
let urlDesktopDelete  = "/dashboard/desktop/delete";

// form : add client
let addClientForm     = document.getElementById('addClientForm');
let urlCreateUser     = "/dashboard/client/add";

// form : add assign
let assignClientForm  = document.getElementById('assignClientForm');
let currentDate       = document.getElementById('currentDate');
let assignHourAdd     = document.getElementById('assignHourAdd');
let assignDesktopAdd  = document.getElementById('assignDesktopAdd');
let messageAdd        = document.getElementById('messageAdd');
let clientSearchInfoAssign  = document.getElementById('clientSearch'); 
let urlAddAssign      = "/dashboard/assign/add";

// form : delete assign
let assignDeleteForm  = document.getElementById('assignDeleteForm');
let idAssignDelete    = document.getElementById('idAssignDelete');
let urlDeleteAssign   = "/dashboard/assign/delete";

// other element 
let paginationContent = document.getElementById('paginationContent');
let flashMessage      = document.getElementById('flashMessage');

// Interface data
let managementContent = document.getElementById('managementContent');
let urlInitInterface = '/dashboard/info';

// Ajax 
let method;
let data;
let request = new XMLHttpRequest();
let urlSearchClient = '/dashboard/client';


/**
 * Returns searched match
 * @param {String} strs 
 */
const substringMatcher = (strs) => {
    return function findMatches(q, cb) {
        var matches = [];
        substrRegex = new RegExp(q, 'i');
        $.each(strs, function (i, str) {
            if (substrRegex.test(str))
                matches.push(str);
        })
        cb(matches);
    }
}


/**
 * Display message
 * @param {Node} node HTML node
 * @param {String} type 
 * @param {String} message 
 */
const displayMessageNode = (node, type, message) => {
    node.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show my-0 w-25 mx-auto" role="alert">
            <strong>${message}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
}

// form : add desktop
desktopAddForm.addEventListener('submit', evt => {
    evt.preventDefault();
    method = "POST";
    data = {
        name: desktopNameAdd.value
    }
    request.open(method, urlDesktopAdd);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(data));
    request.responseType = "json";
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let reponse = request.response;
                if (reponse.success) {
                    $('#modalAddDesktop').modal('toggle');
                    desktopAddForm.reset();
                    localStorage.setItem('message', reponse.message);
                    localStorage.setItem('isSuccess', reponse.success);
                    location.reload();
                } else {
                    displayMessageNode(messageAddDesktop, 'danger', reponse.message);
                }   
            } 
        } else {
            $('#modalAddDesktop').modal('toggle');
            desktopAddForm.reset();
            bootbox.alert({
                centerVertical: true,
                message: "Ressource indisponible"
            });
        }
    }
})


// form : edit desktop
desktopEditForm.addEventListener('submit', evt => {
    evt.preventDefault();
    method = "POST";
    data = {
        idDesktop: idDesktopEdit.value,
        name: desktopNameEdit.value
    }
    request.open(method, urlDesktopEdit);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(data));
    request.responseType = "json";
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let reponse = request.response;
                if (reponse.success) {
                    $('#modalEditDesktop').modal('toggle');
                    desktopEditForm.reset();
                    localStorage.setItem('message', reponse.message);
                    localStorage.setItem('isSuccess', reponse.success);
                    location.reload();
                } else {
                    displayMessageNode(messageEditDesktop, 'danger', reponse.message);
                }
            }
        } else {
            $('#modalEditDesktop').modal('toggle');
            desktopEditForm.reset();
            bootbox.alert({
                centerVertical: true,
                message: "Ressource indisponible"
            });
        }
    }
})


// form : delete desktop
desktopDeleteForm.addEventListener('submit', evt => {
    evt.preventDefault();
    method = "POST";
    data = {
        idDesktop: desktopDeleteId.value,
    }
    request.open(method, urlDesktopDelete);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(data));
    request.responseType = "json";
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let reponse = request.response;
                if (reponse.success) {
                    $('#modalDeleteDesktop').modal('toggle');
                    localStorage.setItem('message', reponse.message);
                    localStorage.setItem('isSuccess', reponse.success);
                    location.reload();                  
                } else {
                    $('#modalDeleteDesktop').modal('toggle');
                    localStorage.setItem('message', reponse.message);
                    localStorage.setItem('isSuccess', reponse.success);
                    location.reload();
                }
            }
        } else {
            $('#modalDeleteDesktop').modal('toggle');
            bootbox.alert({
                centerVertical: true,
                message: "Ressource indisponible"
            });
        }
    }
});


// Autocomplete
clientSearch.addEventListener('keyup', evt => {
    method = "POST";
    let clientInfo = "";
    clientInfo += evt.currentTarget.value;

    if (clientInfo == ""){
        btnToAddClient.setAttribute('disabled','disabled');
    }

    if(clientInfo.length >= 3){
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
                    let reponse   = request.response;
                    let arrayData = [];

                    if(reponse.userList.length == 0) {
                        btnToAddClient.removeAttribute('disabled');
                    }

                    for (let j = 0; j < reponse.userList.length; j++ ) {
                        arrayData.push(`${reponse.userList[j].id} - ${reponse.userList[j].surname} ${reponse.userList[j].name}`)
                    }

                    $('#clientSearch').autocomplete({
                        autoFocus: true,
                        source: arrayData
                    });
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
    } else {
        btnToAddClient.setAttribute('disabled', 'disabled');
    }
});


// add client if not found
if(btnToAddClient) {
    btnToAddClient.addEventListener('click', evt => {
        $('#modalAddAssign').modal('toggle');
        $('#modalAddClient').modal('toggle');
        assignClientForm.reset();
        method = "POST";

        addClientForm.addEventListener('submit', evt => {
            evt.preventDefault();
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
                        $('#modalAddAssign').modal('toggle');
                        $('#modalAddClient').modal('toggle');
                        addClientForm.reset();

                        if(reponse.success) {
                            displayMessage(messageAdd, 'success', reponse.message);
                        } else {
                            displayMessage(messageAdd, 'danger', reponse.message);
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
                    addClientForm.reset();
                    bootbox.alert({
                        centerVertical: true,
                        message: "Ressource indisponible"
                    });
                }
            }
        })
    })
}


// form : add assign
assignClientForm.addEventListener('submit', evt => {
    evt.preventDefault();
    method = "POST";
    data = {
        currentDate: currentDate.value,
        hours: assignHourAdd.value,
        desktopId: assignDesktopAdd.value,
        client: clientSearchInfoAssign.value
    }
    request.open(method, urlAddAssign);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(data));
    request.responseType = "json";
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let reponse = request.response;
                if (reponse.success) {
                    displayMessageNode(flashMessage, 'success', reponse.message);
                    $('#modalAddAssign').modal('toggle');
                    assignClientForm.reset();
                    localStorage.setItem('message', reponse.message);
                    localStorage.setItem('isSuccess', reponse.success);
                    location.reload();
                } else {
                    displayMessageNode(messageAdd, 'danger', reponse.message);
                }
            }
        } else {
            $('#modalAddAssign').modal('toggle');
            assignClientForm.reset();
            
            bootbox.alert({
                centerVertical: true,
                message: "Ressource indisponible"
            });
        }
    }
})


// form : delete assign
assignDeleteForm.addEventListener('submit', evt => {
    evt.preventDefault();
    method = "POST";
    data = {
        idAssign: idAssignDelete.value
    }
    request.open(method, urlDeleteAssign);
    request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    request.send(JSON.stringify(data));
    request.responseType = "json";
    request.onload = () => {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                let reponse = request.response;
                if (reponse.success) {
                    $('#modalDeleteAssign').modal('toggle');
                    localStorage.setItem('message', reponse.message);
                    localStorage.setItem('isSuccess', reponse.success);
                    location.reload();
                } else {
                    $('#modalDeleteAssign').modal('toggle');
                    localStorage.setItem('message', reponse.message);
                    localStorage.setItem('isSuccess', reponse.success);
                    location.reload();
                }
            }
        } else {
            $('#modalDeleteAssign').modal('toggle');
            assignClientForm.reset();
            bootbox.alert({
                centerVertical: true,
                message: "Ressource indisponible"
            });
        }
    }
})

if(localStorage.getItem('message')){
    if (localStorage.getItem('isSuccess')){
        displayMessageNode(flashMessage, 'success', localStorage.getItem('message'));
    } else {
        displayMessageNode(flashMessage, 'danger', localStorage.getItem('message'));
    }
    localStorage.clear();
}