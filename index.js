const btn = document.getElementById("btn");
const dataContainer = document.getElementById('data-container');
const appointmentbtn = document.createElement('button');
function createDeleteButton(appointmentId) {
    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteAppointment(appointmentId);
    });
    return deleteButton;
}
function deleteAppointment(appointmentId) {
    axios.delete(`https://crudcrud.com/api/9613efbd7846417ba3ebdf9cdca74e28/appointmentdata/${appointmentId}`)
        .then((response) => {
            console.log(response);
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
        })
        .catch((err) => {
            console.log(err);
        });
});

window.addEventListener('load', () => {
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
                dataContainer.appendChild(appointmentDiv);
                const deleteButton = createDeleteButton(appointment._id);
                appointmentDiv.appendChild(deleteButton);
                dataContainer.appendChild(appointmentDiv);
                appointmentbtn.addEventListener("click",()=>{
                    console.log("i'm delete button");
                    // axios.delete("https://crudcrud.com/api/9613efbd7846417ba3ebdf9cdca74e28/appointmentdata")
                })
            });
        })
        .catch((error) => {
            console.log(error);
        });
        
});
