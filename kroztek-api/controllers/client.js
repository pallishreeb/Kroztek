//import client from models
const ClientModel = require("../models/client");

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

//exports
module.exports = {
    createClient,
    getClients,
    editClient,
    getSingleClient
    }
