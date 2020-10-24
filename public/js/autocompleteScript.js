// Requirement
let clientSearch     = document.getElementById('clientSearch');
let btnToAddClient   = document.getElementById('btnAddClient');
let messageAdd       = document.getElementById('messageAdd');
let addClientForm    = document.getElementById('addClientForm');
let assignClientForm = document.getElementById('assignClientForm');

// Ajax 
let method = "POST";
let request = new XMLHttpRequest();
let urlSearchClient = '/dashboard/client';
let urlCreateUser   = "/dashboard/client/add";


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
 * @param {String} type 
 * @param {String} message 
 */
const displayMessage = (type, message) => {
    messageAdd.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show my-0" role="alert">
            <strong>${message}</strong>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    `;
}


// Autocomplete
clientSearch.addEventListener('keyup', evt => {
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
                            displayMessage('success', reponse.message);
                        } else {
                            displayMessage('danger', reponse.message);
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