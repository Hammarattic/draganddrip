// const apiUrl = 'https://api.aviationstack.com/v1/airports?access_key=f12b95fb3bba92d6ed5da4c6f84fb82d'; // Your API endpoint
// const contentContainer = document.getElementById('content-container');
// window.longlat={}
// // Fetch data from the API
// fetch(apiUrl)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`Network response was not ok: ${response.statusText}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         let long1 =data.longitude;
//         let lat1=data.latitude;
//
//
//          window.longlat={longitude: long1,latitude: lat1};
//         console.log(data);
//         // Check if data is an array
//         if (!Array.isArray(data.data)) {
//             throw new Error('API response is not an array');
//         }
//
//         // Loop through the fetched data
//         data.data.forEach(item => {
//             // Create a div for each item
//             const itemDiv = document.createElement('div');
//             itemDiv.classList.add('item');
//
//             // Add an image, title, and description
//             itemDiv.innerHTML = `
//
//                 <h2>${item.iata_code}</h2>
//                 <p><strong>latitude:</strong> ${item.latitude}</p>
//                 <p><strong>longitude:</strong> ${item.longitude}</p>
//
//             `;
//
//             // Append the item to the container
//             contentContainer.appendChild(itemDiv);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching data:', error);
//         contentContainer.innerHTML = `<p class="error">Failed to load data. Please try again later.</p>`;
//     });
//
