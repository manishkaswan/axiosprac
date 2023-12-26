const btn = document.getElementById("btn");
const dataContainer = document.getElementById('data-container');
const editIcon = document.createElement('span');
editIcon.innerHTML = '&#9998;';
const appointmentbtn = document.createElement('button');

function createDeleteButton(appointmentId) {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteAppointment(appointmentId);
    });
    return deleteButton;
}

function createEditButton(appointment) {
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.addEventListener('click', () => {
        document.getElementById("namef").value = appointment.namef;
        document.getElementById("emailf").value = appointment.emailf;
        document.getElementById("numberf").value = appointment.numberf;
    });
    return editButton;
}

function deleteAppointment(appointmentId) {
    axios.delete(`https://crudcrud.com/api/9613efbd7846417ba3ebdf9cdca74e28/appointmentdata/${appointmentId}`)
        .then((response) => {
            console.log(response);
            fetchDataAndDisplay();
        })
        .catch((error) => {
            console.log(error);
        });
}

function fetchDataAndDisplay() {
    axios.get("https://crudcrud.com/api/9613efbd7846417ba3ebdf9cdca74e28/appointmentdata")
        .then((result) => {
            dataContainer.innerHTML = '';
            result.data.forEach((appointment) => {
                const appointmentDiv = document.createElement('div');
                appointmentDiv.innerHTML = `
                    <p>Name: ${appointment.namef}</p>
                    <p>Email: ${appointment.emailf}</p>
                    <p>Number: ${appointment.numberf}</p>
                    <hr>
                `;
                const deleteButton = createDeleteButton(appointment._id);
                const editButton = createEditButton(appointment);
                appointmentDiv.appendChild(deleteButton);
                appointmentDiv.appendChild(editButton);
                dataContainer.appendChild(appointmentDiv);
            });
        })
        .catch((error) => {
            console.log(error);
        });
}

btn.addEventListener("click", () => {
    const namef = document.getElementById("namef").value;
    const emailf = document.getElementById("emailf").value;
    const numberf = document.getElementById("numberf").value;
    const obj = {
        namef,
        emailf,
        numberf
    };

    axios.post("https://crudcrud.com/api/9613efbd7846417ba3ebdf9cdca74e28/appointmentdata", obj)
        .then((response) => {
            console.log(response);
            fetchDataAndDisplay();
        })
        .catch((err) => {
            console.log(err);
        });
});

window.addEventListener('load', () => {
    fetchDataAndDisplay();
});
