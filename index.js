const btn = document.getElementById("btn");
const dataContainer = document.getElementById('data-container');

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
            });
        })
        .catch((error) => {
            console.log(error);
        });
});
