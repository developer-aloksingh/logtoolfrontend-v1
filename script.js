


// let alldata = []; // Store all fetched data


// async function fetchData() {
//     try {
//       // Fetch data from JSONPlaceholder API
//       const response = await fetch('http://localhost:3000/api/fetchall', {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });      
//     const data = await response.json();
//     alldata=data.logs[0].logs;
//     console.log(alldata);
//     fetchAndDisplayData(alldata)
// }catch{
//     console.error('Error fetching data:', error);

// }
// }



// async function fetchAndDisplayData(alldata) {
//     try {
     
      

//       // Get table elements
//       const tableHeader = document.getElementById('tableHeader');
//       const tableBody = document.getElementById('tableBody');

//       // Create table headers from the first object's keys
//       if (alldata.length > 0) {
//         const headers = ['logLevel', 'timestamp', 'logType', 'clientIp', 'elapsedTime', 'bytes', 'user', 'ip', 'methodStatus', 'method', 'url', 'hierarchy', 'peer']; // Select specific keys to display
//         headers.forEach(header => {
//           const th = document.createElement('th');
//           th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
//           tableHeader.appendChild(th);
//         });

//         // Populate table rows with data
//         alldata.forEach(item => {
//           const row = document.createElement('tr');
//           headers.forEach(header => {
//             const td = document.createElement('td');
//             td.textContent = item[header] || 'N/A';
//             row.appendChild(td);
//           });
//           tableBody.appendChild(row);
//         });
//       } else {
//         tableBody.innerHTML = '<tr><td colspan="4">No data available</td></tr>';
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       document.getElementById('tableBody').innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
//     }
//   }



//       // Filter data based on input
//       function filterData(alldata) {
//         const filterValue = document.getElementById('nameFilter').value;
//         const filteredData = alldata.filter(item => item.user == filterValue);
//         console.log(filteredData);
        
//         // fetchAndDisplayData(filteredData);
//       }
  
//       // Event listener for input changes
//       document.getElementById('getByUser').addEventListener('onClick', filterData);



//   // Call the function when the page loads
//   window.onload = fetchData;
//   window.onload = filterData;










  let allData = []; // Store all fetched data

    async function fetchData() {
      try {
        const response = await fetch('http://localhost:3000/api/fetchall');
        alldata = await response.json();
        allData=alldata.logs[0].logs;
        console.log(alldata);
        displayData(allData); // Display all data initially
      } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('tableBody').innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
      }
    }

    function displayData(data) {
      const tableHeader = document.getElementById('tableHeader');
      const tableBody = document.getElementById('tableBody');
      
      // Clear existing content
      tableHeader.innerHTML = '';
      tableBody.innerHTML = '';

      // Create table headers
      if (data.length > 0) {
        const headers = ['logLevel', 'timestamp', 'logType', 'clientIp', 'elapsedTime', 'bytes', 'user', 'ip', 'methodStatus', 'method', 'url', 'hierarchy', 'peer'];
        headers.forEach(header => {
          const th = document.createElement('th');
          th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
          tableHeader.appendChild(th);
        });

        // Populate table rows with data
        data.forEach(item => {
          const row = document.createElement('tr');
          headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header] || 'N/A';
            row.appendChild(td);
          });
          tableBody.appendChild(row);
        });
        document.getElementById('entityNo').textContent = data.length;

      } else {
        tableBody.innerHTML = '<tr><td colspan="4">No matching data found</td></tr>';
      }
    }

    // // Filter data based on input
    // function filterData() {
    //   const filterValue = document.getElementById('nameFilter').value.toLowerCase();
    //   const filteredData = allData.filter(item => 
    //     item.user.toLowerCase().includes(filterValue)
    //   );
    //   console.log(filteredData);

      
    //   displayData(filteredData);
    // }

    // // Event listener for input changes
    // document.getElementById('nameFilter').addEventListener('input', filterData);

    // // Fetch data when the page loads
    // window.onload = fetchData;


        // Filter data based on multiple inputs
        function filterData() {
            const userFilter = document.getElementById('userFilter').value.toLowerCase();
            const ipFilter = document.getElementById('ipFilter').value;
            const timeFilter = document.getElementById('timeFilter').value;
      
            const filteredData = allData.filter(item => 
              item.user.toLowerCase().includes(userFilter) &&
              item.ip.includes(ipFilter) &&
              item.timestamp.includes(timeFilter)
            );
            displayData(filteredData);
          }
      
          // Add event listeners for input changes
          document.getElementById('userFilter').addEventListener('input', filterData);
          document.getElementById('ipFilter').addEventListener('input', filterData);
          document.getElementById('timeFilter').addEventListener('input', filterData);
      
          // Fetch data when the page loads
          window.onload = fetchData;