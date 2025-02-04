import express from 'express';
import bodyParser from 'body-parser';
import User from './userModel.js';  // Import the model
import sequelize from './database.js';  // Import the sequelize instance

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Test route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Sign-up route
app.post('/sign-up', async (req, res) => {
  const { phone, name, email, password, dob } = req.body;

  if (!phone || !name || !email || !password || !dob) {
    return res.status(400).json({
      success: false,
      message: "Missing Fields in the request!!"
    });
  }

  try {
    const newUser = await User.create({ phone, name, email, password, dob });

    res.status(200).json({
      success: true,
      message: "Successfully Signed Up!!",
      data: {
        name: newUser.name,
        phone: newUser.phone,
        dob: newUser.dob,
        email: newUser.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while creating user"
    });
  }
});

// Sign-in route
app.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing Fields in the request!!"
    });
  }

  try {
    const user = await User.findOne({ where: { email, password } });

    if (user) {
      return res.status(200).json({
        success: true,
        message: "Successfully Signed In!!"
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error during sign-in"
    });
  }
});

// Get user route
app.get('/get-user', async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Missing Fields in the request!!"
    });
  }

  try {
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(200).json({
        success: true,
        message: "User Found!!",
        data: {
          name: user.name,
          phone: user.phone,
          dob: user.dob,
          email: user.email
        }
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "User Not Found!!"
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error fetching user"
    });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
