//import client from models
const ClientModel = require("../models/client");
const sendMail = require("../utils/sendMail");
//create client record with all data from request body
const createClient = (req, res) => {
  const newClient = req.body;
  ClientModel.findOne({ gstNumber: newClient.gstNumber }, (err, client) => {
    if (!client) {
      let newRecord = new ClientModel(newClient);
      newRecord.save((error, data) => {
        if (error) {
          res.send("Error");
        } else {
          res.json(data);
        }
      });
    } else {
      return res.status(409).json({ message: "GST Number already exists" });
    }
  });
};

//Get all clients
const getClients = async (req, res) => {
  try {
    const clients = await ClientModel.find();
    res.json(clients);
  } catch (e) {
    console.log("An error occurred", e);
    res.status(500).end();
  }
};
//edit a client
const editClient = async (req, res) => {
  try {
    const updatedClient = await ClientModel.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
        },
      }
    );
    res.json(updatedClient);
  } catch (e) {
    console.log("An error occurred", e);
    res.status(500).end();
  }
};

//get a single client based on gstNumber
const getSingleClient = async (req, res) => {
  try {
    const client = await ClientModel.findById(req.params.gstNumber);
    if (!client) throw Error("No such client");
    res.json(client);
  } catch (e) {
    console.log("An error occurred", e);
    res.status(500).end();
  }
};

//send form requirements to mail
const sendRequirementForm = async(req,res) =>{
  try {
    const formType = req.body.formType;
    const formData = req.body.formData;
    const userData = req.body.userData;
    
    // Form HTML body
    const userTable = `
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>User Details</th>
          <th>Value</th>
        </tr>
        <tr>
          <td>Name</td>
          <td>${userData.firstName} ${userData.lastName}</td>
        </tr>
        <tr>
          <td>Email</td>
          <td>${userData.email}</td>
        </tr>
        <tr>
          <td>Phone Number</td>
          <td>${userData.phoneNumber}</td>
        </tr>
      </table>
    
    `;
    
    const requirementsTable = `
      <table border="1" cellpadding="5" cellspacing="0">
        <tr>
          <th>Field</th>
          <th>Value</th>
        </tr>
        ${Object.entries(formData)
          .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></tr>`)
          .join("")}
      </table>
    `;
    
    const htmlBody = `
      <p>You have received a new Requirement for ${formType}. Here are the details:</p>
      ${userTable}
      <br/>
      <br/>
      ${requirementsTable}
    `;
    

    // Send email
    sendMail("kroztekintegratedsolution@gmail.com", "New Requirement From Kroztek", htmlBody);

    res.status(200).json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}


//exports
module.exports = {
    createClient,
    getClients,
    editClient,
    getSingleClient,
    sendRequirementForm
    }
