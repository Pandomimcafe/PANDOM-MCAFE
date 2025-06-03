


function sendToGoogleSheets(index, reward) {
    fetch("https://script.google.com/macros/s/AKfycbz2QJqDqars2bjBeN9tdekT8_HVxca7myISC9fWMwvQq43jbhOvvm8dMO5PI6o7TWj51g/exec", {
        method: "POST",
        body: JSON.stringify({ index, reward }),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(res => console.log("Gönderildi:", res.status));
}
