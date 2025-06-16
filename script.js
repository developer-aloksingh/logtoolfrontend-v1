

  let allData = []; // Store all fetched data
  



  //fetch data saved in broweser after upoad file
  function fetchData() {
    try {
        // Retrieve data from localStorage
        const savedData = localStorage.getItem('apiData');

        if (savedData) {
            // Parse JSON string to object
            const parsedData = JSON.parse(savedData).data;
            console.log(parsedData)
            allData=parsedData;
            if (allData.length == 0) {
              document.getElementById('entityNo').textContent = 'loading.....';
            }
            displayData(allData); // Display all data initially
            
        } else {
            output.textContent = 'No data found in localStorage.';
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('savedData').textContent = 'Error: ' + error.message;
    }
}






    //fetch data from server and show on table

    // async function fetchData() {
    //   try {
    //     const response = await fetch('http://localhost:3000/api/fetchall');
    //     alldata = await response.json();
    //     allData=alldata.logs[0].logs;
    //     console.log(allData);
    //     displayData(allData); // Display all data initially
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     document.getElementById('tableBody').innerHTML = '<tr><td colspan="4">Error loading data</td></tr>';
    //   }
    // }



    //map data in table
    function displayData(data) {
      const tableHeader = document.getElementById('tableHeader');
      const tableBody = document.getElementById('tableBody');
      
      // Clear existing content
      tableHeader.innerHTML = '';
      tableBody.innerHTML = '';

      // Create table headers
      if (data.length > 0) {
        const headers = ['logLevel', 'timestamp', 'logType', 'elapsedTime', 'bytes', 'user', 'clientIp', 'methodStatus', 'port', 'method', 'url', 'hierarchy', 'peer', 'other'];
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
        document.getElementById('entityNo').textContent = `No. of Data : ${data.length}`;







        methodChart(allData);
        statusChart(allData);
        logTypeChart(allData)

       





        

      } else {
        tableBody.innerHTML = '<tr><td colspan="4">No matching data found</td></tr>';
      }
    }















        // Filter data based on multiple inputs
        function filterData() {
            const userFilter = document.getElementById('userFilter').value;
            const ipFilter = document.getElementById('ipFilter').value;
            const timeFilter = document.getElementById('timeFilter').value;
            const methodFilter = document.getElementById('methodFilter').value;
            const statusFilter = document.getElementById('statusFilter').value;
            const logTypeFilter = document.getElementById('logTypeFilter').value;
            const otherFilter = document.getElementById('otherFilter').value;
       
 
            
            

            try {
              const filteredData = allData.filter(item => 
                item.user.includes(userFilter) &&
                item.clientIp.includes(ipFilter) &&
                item.timestamp.includes(timeFilter)&&
                item.method.includes(methodFilter) &&
                item.methodStatus.includes(statusFilter) &&
                item.logType.includes(logTypeFilter) &&
                item.other.includes(otherFilter) 
                  
              );
              displayData(filteredData);
              methodChart(filteredData);
              statusChart(filteredData);
              logTypeChart(filteredData);
            } catch (error) {
              console.log(error);
              
            }
      
            
          }
      


          // Add event listeners for input changes 
          document.getElementById('userFilter').addEventListener('input', filterData);
          document.getElementById('ipFilter').addEventListener('input', filterData);
          document.getElementById('timeFilter').addEventListener('input', filterData);
          document.getElementById('methodFilter').addEventListener('input', filterData);
          document.getElementById('statusFilter').addEventListener('input', filterData);
          document.getElementById('logTypeFilter').addEventListener('input', filterData);
          document.getElementById('otherFilter').addEventListener('input', filterData);



















          








         // Filter data based on timestamp inputs

         function filterByTimestampRange() {
          const startTimestamp = document.getElementById('startTimestampFilter').value;
          const endTimestamp = document.getElementById('endTimestampFilter').value;
      
          const startDate = startTimestamp ? new Date(startTimestamp) : null;
          const endDate = endTimestamp ? new Date(endTimestamp) : null;
      
          const filteredData = allData.filter(item => {
              const itemDate = new Date(item.timestamp); // Handles 2025-12-12T04:50:32+05:30 format
              return (
                  (!startDate || itemDate >= startDate) &&
                  (!endDate || itemDate <= endDate)
              );
          });
          console.log(filteredData);
          
      
          displayData(filteredData);
          methodChart(filteredData);
          statusChart(filteredData);
      }
      
      // Add event listeners for input changes
      document.getElementById('startTimestampFilter').addEventListener('input', filterByTimestampRange);
      document.getElementById('endTimestampFilter').addEventListener('input', filterByTimestampRange);
 

  




      //top 10 user
      try {
        if (!Array.isArray(allData)) {
          throw new Error('allData is not an array');
        }
      
        // Step 1: Get unique users and their userCount (assuming userCount is consistent per user)
        const userCounts = [...new Set(allData.map(item => item.user))]
          .reduce((acc, user) => {
            const item = allData.find(item => item.user === user && typeof item.userCount === 'number');
            if (item) {
              acc[user] = item.userCount;
            } else {
              console.warn(`No valid userCount for user: ${user}`);
            }
            return acc;
          }, {});
      
        console.log('User counts:', userCounts);
      
        // Step 2: Get top 10 users
        const top10Users = Object.entries(userCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 10)
          .map(([user]) => user);
      
        console.log('Top 10 users:', top10Users);
      
        // Step 3: Filter original array
        const filteredData10 = allData.filter(item => {
          if (!item || typeof item.user !== 'string') {
            console.warn('Skipping invalid item:', item);
            return false;
          }
          return top10Users.includes(item.user);
        });
      
        console.log('Filtered data:', filteredData10);
      
      } catch (error) {
        console.error('Error filtering top 10 users:', error.message);
      }
      
      

















          // Fetch data when the page loads
          window.onload = fetchData;























      // pie chart methods
          function methodChart(params) {
          

        const getCount = params.filter(item => item.method.includes('Get'));
        const postCount = params.filter(item => item.method.includes('Post'));

         // Manual data input (modify labels and data as needed)
         const labels = ['Get', 'Post'];
         const piedata = [getCount.length, postCount.length]; // Number of occurrences for each label
 
         // Generate colors for pie slices
         function generateColors(count) {
             const colors = [];
             for (let i = 0; i < count; i++) {
                 const hue = (i * 360 / count) % 360;
                 colors.push(`hsl(${hue}, 70%, 80%)`);
             }
             return colors;
         }
 
         // Draw pie chart
         function drawPieChart(canvas, data, labels, colors) {
             const ctx = canvas.getContext('2d');
             const centerX = canvas.width / 2;
             const centerY = canvas.height / 2;
             const radius = Math.min(centerX, centerY) - 10;
             const total = data.reduce((sum, val) => sum + val, 0);
 
             let startAngle = 0;
             for (let i = 0; i < data.length; i++) {
                 const sliceAngle = (data[i] / total) * 2 * Math.PI;
                 ctx.beginPath();
                 ctx.moveTo(centerX, centerY);
                 ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                 ctx.fillStyle = colors[i];
                 ctx.fill();
                 ctx.strokeStyle = '#ffffff';
                 ctx.lineWidth = 2;
                 ctx.stroke();
                 startAngle += sliceAngle;
             }
 
             // Add legend
             const legend = document.getElementById('legend');
             legend.innerHTML = '';
             labels.forEach((label, i) => {
                 const div = document.createElement('div');
                 div.className = 'legend-item';
                 div.innerHTML = `
                     <span class="legend-color" style="background-color: ${colors[i]}"></span>
                     ${label}: ${data[i]}
                 `;
                 legend.appendChild(div);
             });
         }
 
         // Draw chart with manual data
         const colors = generateColors(labels.length);
         const canvas = document.getElementById('myPieChart');
         drawPieChart(canvas, piedata, labels, colors);
 
          }

        //pie chrt methods





        //pie chart status codes
           function statusChart(params) {
          

            const _200 = params.filter(item => item.methodStatus.includes('200'));
            const _300 = params.filter(item => item.methodStatus.includes('300'));
            const _400 = params.filter(item => item.methodStatus.includes('400'));
            const _500 = params.filter(item => item.methodStatus.includes('500'));
    
             // Manual data input (modify labels and data as needed)
             const labels = ['200', '300', '400', '500'];
             const piedata = [_200.length, _300.length, _400.length, _500.length]; // Number of occurrences for each label
     
             // Generate colors for pie slices
             function generateColors(count) {
                 const colors = [];
                 for (let i = 0; i < count; i++) {
                     const hue = (i * 360 / count) % 360;
                     colors.push(`hsl(${hue}, 70%, 80%)`);
                 }
                 return colors;
             }
     
             // Draw pie chart
             function drawPieChart(canvas, data, labels, colors) {
                 const ctx = canvas.getContext('2d');
                 const centerX = canvas.width / 2;
                 const centerY = canvas.height / 2;
                 const radius = Math.min(centerX, centerY) - 10;
                 const total = data.reduce((sum, val) => sum + val, 0);
     
                 let startAngle = 0;
                 for (let i = 0; i < data.length; i++) {
                     const sliceAngle = (data[i] / total) * 2 * Math.PI;
                     ctx.beginPath();
                     ctx.moveTo(centerX, centerY);
                     ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                     ctx.fillStyle = colors[i];
                     ctx.fill();
                     ctx.strokeStyle = '#ffffff';
                     ctx.lineWidth = 2;
                     ctx.stroke();
                     startAngle += sliceAngle;
                 }
     
                 // Add legend
                 const legend = document.getElementById('legendstatus');
                 legend.innerHTML = '';
                 labels.forEach((label, i) => {
                     const div = document.createElement('div');
                     div.className = 'legend-item';
                     div.innerHTML = `
                         <span class="legend-color" style="background-color: ${colors[i]}"></span>
                         ${label}: ${data[i]}
                     `;
                     legend.appendChild(div);
                 });
             }
     
             // Draw chart with manual data
             const colors = generateColors(labels.length);
             const canvas = document.getElementById('myPieChartstatus');
             drawPieChart(canvas, piedata, labels, colors);
     
              }



    
            //pie chrt log type




       // pie chart logTypeChart

       function logTypeChart(params) {
          

        const squidCount = params.filter(item => item.logType.includes('AN_SQUID_LOG'));
        const arrayosCount = params.filter(item => item.logType.includes('id=Arrayos'));

         // Manual data input (modify labels and data as needed)
         const labels = ['AN_SQUID_LOG', 'id=Arrayos'];
         const piedata = [squidCount.length, arrayosCount.length]; // Number of occurrences for each label
 
         // Generate colors for pie slices
         function generateColors(count) {
             const colors = [];
             for (let i = 0; i < count; i++) {
                 const hue = (i * 360 / count) % 360;
                 colors.push(`hsl(${hue}, 70%, 80%)`);
             }
             return colors;
         }
 
         // Draw pie chart
         function drawPieChart(canvas, data, labels, colors) {
             const ctx = canvas.getContext('2d');
             const centerX = canvas.width / 2;
             const centerY = canvas.height / 2;
             const radius = Math.min(centerX, centerY) - 10;
             const total = data.reduce((sum, val) => sum + val, 0);
 
             let startAngle = 0;
             for (let i = 0; i < data.length; i++) {
                 const sliceAngle = (data[i] / total) * 2 * Math.PI;
                 ctx.beginPath();
                 ctx.moveTo(centerX, centerY);
                 ctx.arc(centerX, centerY, radius, startAngle, startAngle + sliceAngle);
                 ctx.fillStyle = colors[i];
                 ctx.fill();
                 ctx.strokeStyle = '#ffffff';
                 ctx.lineWidth = 2;
                 ctx.stroke();
                 startAngle += sliceAngle;
             }
 
             // Add legend
             const legend = document.getElementById('legendLogType');
             legend.innerHTML = '';
             labels.forEach((label, i) => {
                 const div = document.createElement('div');
                 div.className = 'legend-item';
                 div.innerHTML = `
                     <span class="legend-color" style="background-color: ${colors[i]}"></span>
                     ${label}: ${data[i]}
                 `;
                 legend.appendChild(div);
             });
         }
 
         // Draw chart with manual data
         const colors = generateColors(labels.length);
         const canvas = document.getElementById('myPieChartLogType');
         drawPieChart(canvas, piedata, labels, colors);
 
          }


        // pie chart logTypeChart