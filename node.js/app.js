const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;


  

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb+srv://connectstuti:AkhileshMahajan26@cluster0.cs5albf.mongodb.net/DiggajMotorsDB
', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connection successful');
        app.listen(PORT, () => {
            console.log('Server is running on http://localhost:${PORT}');
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
    });

const customerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    MobileNumber: {
        type: Number, 
        required: true,
        unique: true
    },
    City: {
        type: String,
        required: true,
        enum: ['Ahmedabad', 'Amravati', 'Anand', 'Aurangabad', 'Bengaluru', 'Bharuch', 'Bhavnagar', 'Chennai', 'Delhi', 'Gandhinagar', 'Hyderabad', 'Jaipur', 'Jamnagar', 'Junagadh', 'Kolhapur', 'Kolkata', 'Lucknow', 'Mumbai', 'Nagpur', 'Nashik', 'Noida', 'Pune', 'Rajkot', 'Solapur', 'Surat', 'Thane', 'Vadodra']
    },
    Interest: {
        type: String,
        required: true,
        enum: ['Product Enquiry', 'Investment', 'EV Reporter', 'Career']
    }
}, {
    timestamps: true
});

const Customers = mongoose.model('customer', customerSchema);



app.post('/submit-form', async (req, res) => {
    const formData = req.body;
    console.log(req)
    try {
        console.log('Received form data:', formData);

        const savedForm = await Customers.create(formData);
        console.log('Saved form:', savedForm);

        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error during form submission:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

module.exports = Customers;
