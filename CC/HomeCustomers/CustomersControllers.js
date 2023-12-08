const { firestore } = require('../Firebase');

// Get All Customers
const getCustomers = async (req, res) => {
  try {
    const customers = await firestore.collection('customers').get();
    const customerData = customers.docs.map((doc) => doc.data()); 

    res.status(200).json({ success: true, customers: customerData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// get by Id
const getCustomerById = async (req, res) => {
  const customerId = req.params.id;

  try {
    const customer = await firestore.collection('customers').doc(customerId).get();

    if (!customer.exists) {
      return res.status(404).json({ success: false, message: 'Customer not found' }); //ganti jg bole
    }

    const customerData = customer.data();

    res.status(200).json({ success: true, customer: customerData });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = {
  getCustomers,
  getCustomerById,
};
