axios.defaults.withCredentials = true;

window.onload = () => {
    axios.get("http://localhost:3000/api/expenses")
    .then(function (response) {
        if (response.data.error) {
            alert(response.data.error);
        } else {
            response.data.forEach(element => {
                // Get a reference to the table
                let tableRef = document.getElementById("lista_despesas");

                // Insert a row at the end of the table
                let newRow = tableRef.insertRow(-1);

                // Insert a cell in the row at index 0
                let id = newRow.insertCell(0);
                let date = newRow.insertCell(1);
                let description = newRow.insertCell(2);
                let parcel = newRow.insertCell(3);
                let status = newRow.insertCell(4);
                let category_id = newRow.insertCell(5);
                let card_id = newRow.insertCell(6);

                id.innerHtml = element.id;
                date.innerHtml = element.date;
                description.innerHtml = element.description;
                parcel.innerHtml = element.parcel;
                status.innerHtml = element.status;
                category_id.innerHtml = element.category_id;
                card_id.innerHtml = element.card_id;
            });
        }
    })
    .catch(function (error) {
        alert(error);
    });
}