const axios = require('axios');

axios.get('http://localhost:3000/api/DND')
  .then(response => {
    console.log('Server Response:', response.data);
  })
  .catch(error => {
    console.error('Error:', error.message);
  });

