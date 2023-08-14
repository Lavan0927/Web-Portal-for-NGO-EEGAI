const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysql = require('mysql2');
// const nodemailer = require('nodemailer');
const router = express.Router();
const { google } = require('googleapis');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const app = express();
const cloudinary = require('cloudinary').v2;
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const axios = require('axios'); 
const cheerio = require('cheerio');


// Create a custom Axios instance wth default headers
const instance = axios.create({
  headers: {
    // Set the User-Agent header to match that of a regular browser
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
  }
});

//use express static folder
app.use(cors());
app.use(express.static("./public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3002;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Create Connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Theiva@0927',
  database: 'eegai'
});

// Checking whether connected to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});
//------------local directory ---------------
// //! Use of Multer
// var storage = multer.diskStorage({
//   destination: (req, file, callBack) => {
//       callBack(null, '/Users/lavanya/Desktop/eegai copy/public/uploads/')     // './public/images/' directory name where save the file
//   },
//   filename: (req, file, callBack) => {
//     const fieldName = file.fieldname || 'defaultFieldName'; // Use a default value if fieldname is undefined
//     callBack(null, fieldName + '-' + Date.now() + path.extname(file.originalname))
//   }
  
// })





// const upload = multer({
//   dest: '/Users/lavanya/Desktop/eegai copy/src/backend/ProjectCoverPhoto/',
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'image/jpeg') {
//       // Allow only JPEG images
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only JPEG images are allowed.'));
//     }
//   },
// });



cloudinary.config({ 
  cloud_name: 'dhzvwxfod', 
  api_key: '714345845228464', 
  api_secret: 'kKXCW-4W3zlqWa8Hlib1yHZnbHk' 
});

// const upload = multer({ dest: '/Users/lavanya/Desktop/eegai copy/public/uploads/' }); 

// cloudinary.v2.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" }, 
//   function(error, result) {console.log(result); });

// // Configure multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Assets',
    // public_id: req.body.fileName,
    allowed_formats: ['jpg', 'png', 'gif', 'pdf'], 
  },
});

// Set up multer storage using Cloudinary for PDFs
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Assets',
    allowed_formats: ['pdf'],
  },
});


// // Create multer instance
const upload = multer({ storage: storage });
// Create multer instance for PDF upload
const uploadPDF = multer({ storage: pdfStorage });

const SCOPES = ['https://www.googleapis.com/auth/gmail.send'];
const CLIENT_ID = '957831926331-e548rm44h7evg4a93tut24af0v3gqvde.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3001/auth/google/callback';

// Create a new instance of the OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

// Generate the authorization URL
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: SCOPES
});

// let refreshToken = '';

// Route for initiating the OAuth flow
app.get('/auth/google', (req, res) => {
  res.redirect(authUrl);
});

// Route for handling the OAuth callback
app.get('/auth/google/callback', async (req, res) => {
  const code = req.query.code;
  // console.log("google callback");

  try {
    // Exchange the authorization code for an access token
    const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);
     console.log(tokens);
     refreshToken = tokens.refresh_token;
    // console.log(tokens.refresh_token);

    // Use the access token to make requests to the Gmail API or perform other operations
    // const refreshToken = tokens.refresh_token;
    // Redirect the user to a desired page or display a success message
    // res.redirect('/dashboard');
    console.log('Aunthentication Success');
  } catch (error) {
    console.error('Error retrieving access token:', error);
    res.status(500).send('Error retrieving access token');
  }
});

// Middleware
// Serve static files from a "public" directory
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  })
);


// // // Configure multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     // Set the destination folder where uploaded files will be stored
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     // Set the filename of the uploaded file
//     cb(null, file.originalname);
//   },
// });

// // Create the multer upload middleware
// const upload = multer({ storage: storage });

// // Example route for handling file uploads
// app.post('/upload', upload.single('projectPhoto'), (req, res) => {
//   // Access the uploaded file using req.file
//   const projectPhoto = req.file;
//   // Handle the file as needed (e.g., store in cloud storage, save reference in database, etc.)

//   res.json({ message: 'File uploaded successfully' });
// });

// Check if username is already taken
app.post('/api/checkUsername', (req, res) => {
  const { username } = req.body;

  // Check if username exists in the User table
  const usernameCheckSql = 'SELECT username FROM User WHERE username = ?';
  connection.query(usernameCheckSql, [username], (usernameErr, usernameResult) => {
    if (usernameErr) {
      console.error('Error checking username in MySQL:', usernameErr);
      return res.status(500).json({ error: 'An error occurred' });
    }

    if (usernameResult.length > 0) {
      // Username is already taken
      return res.json({ isTaken: true });
    }

    // Username is not taken
    return res.json({ isTaken: false });
  });
});

// Check if email is already registered
app.post('/api/checkEmail', (req, res) => {
  const { email } = req.body;

  // Check if email exists in the User table
  const userCheckSql = 'SELECT email FROM User WHERE email = ?';
  connection.query(userCheckSql, [email], (userErr, userResult) => {
    if (userErr) {
      console.error('Error checking email in MySQL:', userErr);
      return res.status(500).json({ error: 'An error occurred' });
    }

    if (userResult.length > 0) {
      // Email is already registered
      return res.json({ isRegistered: true });
    }

    // Email is not registered
    return res.json({ isRegistered: false });
  });
});

const bcrypt = require('bcryptjs');

// Submit Volunteer Registration Form
app.post('/api/submitForm',upload.fields([
  { name: 'file', maxCount: 1 },
  { name: 'cvFile', maxCount: 1 }
]),
(req, res) => {
  const { username, email, password, dob, location, contactNo, skills, interests } = req.body;
  console.log(req);
  console.log('Req Files:', req.files);
  console.log('Req Body:', req.body);

  let role = 'volunteer';


  // Hash the password
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      return res.status(500).json({ error: 'An error occurred' });
    }

    // Insert data into the User table
    const userInsertSql = 'INSERT INTO User (username, email, password, contactNo, role) VALUES (?, ?, ?, ?, ?)';
    connection.query(userInsertSql, [username, email, hashedPassword, contactNo, role], (userErr, userResult) => {
      if (userErr) {
        console.error('Error storing form data in MySQL:', userErr);
        return res.status(500).json({ error: 'An error occurred' });
      }

      console.log('Form data stored in MySQL:', userResult);

      // Retrieve the userId of the inserted user
      const userId = userResult.insertId;
      
  //        // Handle PDF upload
  //  uploadPDF(req, res, async (pdfErr) => {
  //   if (pdfErr) {
  //     console.error('Error uploading PDF:', pdfErr);
  //     return res.status(500).json({ error: 'An error occurred while uploading the PDF' });
  //   }


      // // // Upload the image to Cloudinary
      // // const result = cloudinary.uploader.upload(req.file.path);
      // upload(req, res, async (imageErr) => {
      //   if (imageErr) {
      //     console.error('Error uploading image:', imageErr);
      //     return res.status(500).json({ error: 'An error occurred while uploading the image' });
      //   }

      //   // Get the image URL from Cloudinary
      //   const imageUrl = req.file.path;
      //   console.log('Image URL:', imageUrl);

      //   // Handle PDF upload
      //   uploadPDF(req, res, async (pdfErr) => {
      //     if (pdfErr) {
      //       console.error('Error uploading PDF:', pdfErr);
      //       return res.status(500).json({ error: 'An error occurred while uploading the PDF' });
      //     }
          
      // Upload the image to Cloudinary
      // const imageResult = cloudinary.uploader.upload(req.files['file'][0].path);

      // Upload the PDF to Cloudinary (using the 'cvFile' field)
      // const pdfResult = cloudinary.uploader.upload(req.files['cvFile'][0].path);

      // Save the image URL and PDF URL to the database
      // const imageUrl = imageResult.secure_url;
      // console.log(imageUrl);
      // const pdfUrl = pdfResult.secure_url;
      // console.log(pdfUrl);
      // Respond with the URL of the uploaded image from Cloudinary
      // res.json({ pdfUrl });

  //       // Upload the image to Cloudinary
  // const imageResult = cloudinary.uploader.upload(req.files['file'][0].path);

  // // Upload the PDF to Cloudinary (using the 'cvFile' field)
  // const pdfResult = cloudinary.uploader.upload(req.files['cvFile'][0].path);

  // // Save the image URL and PDF URL to the database
  // const imageUrl = imageResult.secure_url;
  // const pdfUrl = pdfResult.secure_url;

  const imageUrl = cloudinary.url(req.files['file'][0].filename, { secure: true });
  const pdfUrl = cloudinary.url(req.files['cvFile'][0].filename, { secure: true });

      
      

      // Insert data into the Volunteer table
      const volunteerInsertSql = 'INSERT INTO Volunteer (userId, dob, profile_ref, cv_ref, homeTown) VALUES (?, ?, ?, ?, ?)';
      connection.query(volunteerInsertSql, [userId, dob, imageUrl, pdfUrl, location], (volunteerErr, volunteerResult) => {
        if (volunteerErr) {
          console.error('Error storing form data in MySQL:', volunteerErr);
          return res.status(500).json({ error: 'An error occurred' });
        }

        console.log('Form data stored in MySQL:', volunteerResult);

        // Retrieve the volunteerId of the inserted volunteer
        const volunteerId = volunteerResult.insertId;

        const parsedSkills = JSON.parse(skills);
        const parsedInterests = JSON.parse(interests);

          // Insert skills into the Project_Required_Skills table if skills exist
    if (parsedSkills && parsedSkills.length > 0) {
      const requiredSkillsInsertSql = 'INSERT INTO Volunteer_Skills (volunteerId, skill) VALUES ?';
      const skillsValues = parsedSkills.map(skill => [volunteerId, skill]);
      connection.query(requiredSkillsInsertSql, [skillsValues], (skillsErr, skillsResult) => {
        if (skillsErr) {
          console.error('Error storing form data in MySQL:', skillsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', skillsResult);
      });
    }

          // Insert interests into the Project_Required_Interests table if interests exist
    if (parsedInterests && parsedInterests.length > 0) {
      const interestsInsertSql = 'INSERT INTO Volunteer_Interests (volunteerId, interest) VALUES ?';
      const interestsValues = parsedInterests.map(interest => [volunteerId, interest]);
      connection.query(interestsInsertSql, [interestsValues], (interestsErr, interestsResult) => {
        if (interestsErr) {
          console.error('Error storing form data in MySQL:', interestsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', interestsResult);
      });
    }


        // Successful insertion into both tables
        return res.send('Volunteer registration successful');
        return res.json({ redirectUrl: '/Login' });

    //   });
    // });
      });
    });
  });
});


// Submit Donor Registration Form
app.post('/submit-donorform', upload.single('file'), (req, res) => {
  const { fullname, nicNo, address, contactNo, role, donationPreferance, username, email, password, organizationname, registrationno, typeoforganization} = req.body;

  console.log('req.file:', req.file); 
  // Perform any necessary data validation
  let userRole = 'donor';

  // Hash the password
  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      return res.status(500).json({ error: 'An error occurred' });
    }

    // Insert data into the User table
    const userInsertSql = 'INSERT INTO User (username, email, password, contactNo, role) VALUES (?, ?, ?, ?, ?)';
    connection.query(userInsertSql, [username, email, hashedPassword, contactNo, userRole], (userErr, userResult) => {
      if (userErr) {
        console.error('Error storing form data in MySQL:', userErr);
        return res.status(500).json({ error: 'An error occurred' });
      }

      console.log('Form data stored in MySQL:', userResult);

      // Retrieve the userId of the inserted user
      const userId = userResult.insertId;

      // let imgsrc = '';
      // if (req.files && req.files.file && req.files.file.length > 0) {
      //   imgsrc = '/Users/lavanya/Desktop/eegai copy/public/uploads/' + req.files.file[0].filename;
      //   console.log(imgsrc);
      // } else {
      //   console.error('No image file uploaded');
      //   return res.status(400).json({ error: 'No image file uploaded' });
      // }
    
      // console.log(imgsrc);

        // Upload the image to Cloudinary
        const result = cloudinary.uploader.upload(req.file.path);
    
        // Save the image URL to the database
        const imageUrl = req.file.path;
        console.log(imageUrl)
    
        // Respond with the URL of the uploaded image from Cloudinary
        // res.json({ imageUrl });

      // Insert data into the RegisteredDonor table
      const donorInsertSql = 'INSERT INTO RegisteredDonor (userId, fullname, nicNo, donorAddress, DonorType, organizationname, registrationno, typeoforganization, profile_ref) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(donorInsertSql, [userId, fullname, nicNo, address, role, organizationname, registrationno, typeoforganization, imageUrl], (donorErr, donorResult) => {
        if (donorErr) {
          console.error('Error storing form data in MySQL:', donorErr);
          return res.status(500).json({ error: 'An error occurred' });
        }

        console.log('Form data stored in MySQL:', donorResult);

        // Retrieve the donorId of the inserted donor
        const donorId = donorResult.insertId;



        // Insert donation preferences into the RegisteredDonor_donationPreferences table
        // const preferencesInsertSql = 'INSERT INTO RegisteredDonor_donationPreferences (donorId, donationPreferences) VALUES ?';
        // const preferencesValues = donationPreferance.map(preference => [donorId, preference]);
        // connection.query(preferencesInsertSql, [preferencesValues], (preferencesErr, preferencesResult) => {
        //   if (preferencesErr) {
        //     console.error('Error storing form data in MySQL:', preferencesErr);
        //     return res.status(500).json({ error: 'An error occurred' });
        //   }
        
          const parsedPreferances = JSON.parse(donationPreferance);

          // Insert skills into the Project_Required_Skills table if skills exist
        if (parsedPreferances && parsedPreferances.length > 0) {
          const preferencesInsertSql = 'INSERT INTO RegisteredDonor_donationPreferences (donorId, donationPreferences) VALUES ?';
          const preferencesValues = parsedPreferances.map(preference => [donorId, preference]);
          connection.query(preferencesInsertSql, [preferencesValues], (preferencesErr, preferencesResult) => {
            if (preferencesErr) {
              console.error('Error storing form data in MySQL:', preferencesErr);
              return res.status(500).json({ error: 'An error occurred' });
            }
            console.log('Form data stored in MySQL:', preferencesResult);

          // Successful insertion into all tables
          return res.send('Donor registration successful');
          });
        }

        });
      });
    });
  });

//Submit Staff Registration Form
app.post('/submit-staffform', (req, res) =>  {
  const { username, fullname,email,  password, contactNo, designation, role} = req.body;

    // Hash the password
    bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
      if (hashErr) {
        console.error('Error hashing password:', hashErr);
        return res.status(500).json({ error: 'An error occurred' });
      }
  
  
  // Perform any necessary data validation
  //let role = 'staff';
    // Insert data into the User table
const userInsertSql = 'INSERT INTO User (username, email, password, contactNo, role) VALUES (?, ?, ?, ?, ?)';
connection.query(userInsertSql, [username, email, hashedPassword, contactNo, role], (userErr, userResult) => {
  if (userErr) {
      console.error('Error storing form data in MySQL:', userErr);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log('Form data stored in MySQL:', userResult);
      //res.status(200).json({ message: 'Form submitted successfully' });
    }

  // Retrieve the userId of the inserted user
  const userId = userResult.insertId;
  console.log(role);

  if(role==='staff'){
      // Insert data into the Staff table
      const staffInsertSql = 'INSERT INTO Staff (userId, fullname, designation) VALUES (?, ?, ?)';
      connection.query(staffInsertSql, [userId, fullname, designation], (staffErr, staffResult) => {
      if (staffErr) {
          console.error('Error storing form data in MySQL:', staffErr);
          res.status(500).json({ error: 'An error occurred' });
          } else {
          console.log('Form data stored in MySQL:', staffResult);
          //res.status(200).json({ message: 'Form submitted successfully' });
          }

          // Successful insertion into both tables
      //res.status(200).json({ message: 'Form submitted successfully' });
      return res.send('Staff registration successful');
       });    
  }else{
      // Insert data into the Admin table
      const adminInsertSql = 'INSERT INTO Admin (userId) VALUES (?)';
      connection.query(adminInsertSql, [userId], (adminfErr, adminResult) => {
      if (adminfErr) {
          console.error('Error storing form data in MySQL:', adminfErr);
          res.status(500).json({ error: 'An error occurred' });
          } else {
          console.log('Form data stored in MySQL:', adminResult);
          //res.status(200).json({ message: 'Form submitted successfully' });
          }
          // Successful insertion into both tables
      //res.status(200).json({ message: 'Form submitted successfully' });
      res.status(200).json({ message: 'Admin registration successful', role });
       });     
  }
});
});
});

// Submit Login Form
app.post('/submit-loginform', (req, res) => {
  const { username, password } = req.body;

  // Perform any necessary data validation

  // Get the user's hashed password from the database
  const sql = 'SELECT * FROM User WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).send('Internal Server Error');
    }

    if (results.length === 0) {
      // User not found
      return res.status(401).send('Invalid username or password');
    }

    const userId = results[0].userId; // Access the relevant user ID from the results
    const userRole = results[0].role; // Access the role from the results
    const userName = results[0].username; // Access the username from the results
    const storedPassword = results[0].password; // Access the stored hashed password

    // Compare the entered password with the stored hashed password
    bcrypt.compare(password, storedPassword, (compareErr, passwordMatch) => {
      if (compareErr) {
        console.error('Error comparing passwords:', compareErr);
        return res.status(500).send('Internal Server Error');
      }

      if (passwordMatch) {
        // Passwords match, authentication successful
        // You can generate a token or create a session for the user here
        const token = jwt.sign({ userId }, 'eegai@2016'); 
        return res.status(200).json({ message: 'Login successful', token, userRole, userId, userName});
      } else {
        // Passwords do not match, return an error message
        return res.status(401).json({ error: 'Invalid username or password' });
      }
    });
  });
});

  // Define an API endpoint to fetch user data
app.get('/api/users', (req, res) => {
  // console.log(req);
  // Query the database
  connection.query('SELECT * FROM User', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      console.log("success");
    }
  });
});

  // Define an API endpoint to fetch user data
// Define an API endpoint to fetch project data
app.get('/api/manageprojects', (req, res) => {
  // Query the database
  const query = `
  SELECT 
  P.projectId,
  P.projectName,
  P.projectDescription,
  P.startDate,
  P.endDate,
  P.activeYear,
  P.coverPhotoReference,
  P.contactNo,
  P.goalAmount,
  P.raisedAmount,
  P.extraRaisedAmount,
  PL.location,
  PS.SDG,
  PRS.requiredSkill,
  PRI.requiredInterest,
  (P.raisedAmount/P.goalAmount*100) + '%' AS donationPercentage
FROM Project P
LEFT JOIN Project_Location PL ON P.projectId = PL.projectId
LEFT JOIN Project_SDG PS ON P.projectId = PS.projectId
LEFT JOIN Project_Required_Skills PRS ON P.projectId = PRS.projectId
LEFT JOIN Project_Required_Interests PRI ON P.projectId = PRI.projectId;

  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

  // Define an API endpoint to fetch user data
// Define an API endpoint to fetch project data
app.get('/api/manageactivity', (req, res) => {
  // Query the database
  const query = `
  SELECT 
  A.activityId,
  A.activityName,
  A.activityDescription,
  A.coverPhotoReference,
  A.contactNo,
  A.activeYear,
  A.goalAmount,
  A.raisedAmount,
  A.extraRaisedAmount,
  P.projectId,
  AL.location,
  ASG.SDG,
  ARS.requiredSkill,
  ARI.requiredInterest,
  S.staffId,
  (A.raisedAmount/A.goalAmount*100) + '%' AS donationPercentage
FROM Activity A
LEFT JOIN Project P ON A.projectId = P.projectId
LEFT JOIN Activity_Location AL ON A.activityId = AL.activityId
LEFT JOIN Activity_SDG ASG ON A.activityId = ASG.activityId
LEFT JOIN Activity_Required_Skills ARS ON A.activityId = ARS.activityId
LEFT JOIN Activity_Required_Interests ARI ON A.activityId = ARI.activityId
LEFT JOIN Staff_Activity SA ON A.activityId = SA.activityId
LEFT JOIN Staff S ON SA.staffId = S.staffId;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

app.get('/api/manageevent', (req, res) => {
  // Query the database
  const query = `
  SELECT *
  FROM Event;  
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

app.get('/api/volunteerDetails', (req, res) => {
  // Query to retrieve volunteer details
  const query = `
    SELECT Volunteer.volunteerId, User.username, Volunteer_Skills.skill, Volunteer_Interests.interest
    FROM User
    JOIN Volunteer ON User.userId = Volunteer.userId
    LEFT JOIN Volunteer_Skills ON Volunteer.volunteerId = Volunteer_Skills.volunteerId
    LEFT JOIN Volunteer_Interests ON Volunteer.volunteerId = Volunteer_Interests.volunteerId;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("success volunteer fetching");
      res.json(results);
    }
  });
});

// Define an API endpoint to fetch project data
app.get('/api/project-staff', (req, res) => {
  // Query the database
  const query = `
  SELECT 
  P.projectId,
  P.projectName,
  P.projectDescription,
  P.startDate,
  P.endDate,
  P.activeYear,
  P.coverPhotoReference,
  P.contactNo,
  P.goalAmount,
  P.raisedAmount,
  P.extraRaisedAmount,
  S.staffId,
  S.userId,
  S.fullname,
  S.designation
FROM Project P
LEFT JOIN Staff_Projects SP ON P.projectId = SP.projectId
LEFT JOIN Staff S ON SP.staffId = S.staffId;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

// Define an API endpoint to fetch project data
app.get('/api/activity-staff', (req, res) => {
  // Query the database
  const query = `
  SELECT 
  A.activityId,
  A.activityName,
  A.activityDescription,
  A.coverPhotoReference,
  A.contactNo,
  A.activeYear,
  A.goalAmount,
  A.raisedAmount,
  A.extraRaisedAmount,
  A.projectId,
  S.staffId,
  S.userId,
  S.fullname,
  S.designation
FROM 
  Activity A
LEFT JOIN 
  Staff_Activity SA ON A.activityId = SA.activityId
LEFT JOIN 
  Staff S ON SA.staffId = S.staffId;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

// Define an API endpoint to fetch project data
app.get('/api/event-staff', (req, res) => {
  // Query the database
  const query = `
  SELECT
  e.eventId,
  e.eventName,
  s.staffId,
  s.fullname AS StaffName,
  s.designation AS Designation
FROM
  Event e
JOIN
  Staff_Event se ON e.eventId = se.eventId
JOIN
  Staff s ON se.staffId = s.staffId;

  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

// Define an API endpoint to fetch project data
app.get('/api/project-volunteer', (req, res) => {
  // Query the database
  const query = `
  SELECT
  pv.projectId,
  p.projectName,
  pv.volunteerId,
  u.username
FROM
  Project_Volunteer pv
JOIN
  Project p ON pv.projectId = p.projectId
JOIN
  Volunteer v ON pv.volunteerId = v.volunteerId
JOIN
  User u ON v.userId = u.userId;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

// Define an API endpoint to fetch project data
app.get('/api/activity-volunteer', (req, res) => {
  // Query the database
  const query = `
  SELECT
  av.activityId,
  a.activityName,
  av.volunteerId,
  u.username
FROM
  Activity_Volunteer av
JOIN
  Activity a ON av.activityId = a.activityId
JOIN
  Volunteer v ON av.volunteerId = v.volunteerId
JOIN
  User u ON v.userId = u.userId;

  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

// Define an API endpoint to fetch project data
app.get('/api/event-volunteer', (req, res) => {
  // Query the database
  const query = `
  SELECT
  e.eventId,
  e.eventName,
  ev.volunteerId,
  u.username
FROM
  Event e
JOIN
  Event_Volunteer ev ON e.eventId = ev.eventId
JOIN
  Volunteer v ON ev.volunteerId = v.volunteerId
JOIN
  User u ON v.userId = u.userId;

  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});



app.get('/api/activity-donation', (req, res) => {
  // Query the database
  const query = `
  SELECT activityId, activityName, raisedAmount, goalAmount,(raisedAmount/goalAmount*100) AS donationPercentage
  FROM Activity;

  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      // console.log(res);
      console.log('Success');
    }
  });
});

// Submit Volunteer Registration Form
app.post('/submit-visitingAppointment', (req, res) => {
  const { fullname, email, contactNo, doa, toa, purpose } = req.body;
    // Perform any necessary data validation

      // Convert doa to YYYY-MM-DD format
  const dateObject = new Date(doa);
  const formattedDOA = dateObject.toISOString().split('T')[0];

    let appointmentStatus = 'pending';

    // Insert data into the User table
    const visitingInsertSql = 'INSERT INTO Visiting_Appointment (fullname, email, contactNo,  dateofAppointment, timeofAppointment, purpose, appointmentStatus) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(visitingInsertSql, [fullname, email, contactNo, formattedDOA, toa, purpose, appointmentStatus], (visitingErr, visitingResult) => {
      if (visitingErr) {
        console.error('Error storing form data in MySQL:', visitingErr);
        return res.status(500).json({ error: 'An error occurred' });
      }

      console.log('Form data stored in MySQL:', visitingResult);

        // Successful insertion into table
        return res.send('Visiting Appointment Registration successful');
        // return res.json({ redirectUrl: '/Login' });
      });
    });

      // Define an API endpoint to fetch visiting Appointment data
app.get('/api/visiting-appointments', (req, res) => {
  // Query the database
  connection.query('SELECT * FROM Visiting_Appointment', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
      console.log("success");
    }
  });
});

// Update appointment status as accepted
app.put('/api/visiting-appointments/:id/accept', (req, res) => {
  const { id } = req.params;
  
  // Update the appointment status in the database
  connection.query(
    'UPDATE Visiting_Appointment SET appointmentStatus = "accepted" WHERE appointmentId = ?',
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Appointment not found' });
      } else {
        res.status(200).json({ message: 'Appointment status updated to accepted' });
      }
    }
  );
});

// Update appointment status as declined
app.put('/api/visiting-appointments/:id/decline', (req, res) => {
  const { id } = req.params;
  
  // Update the appointment status in the database
  connection.query(
    'UPDATE Visiting_Appointment SET appointmentStatus = "declined" WHERE appointmentId = ?',
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Appointment not found' });
      } else {
        res.status(200).json({ message: 'Appointment status updated to declined' });
      }
    }
  );
});

// // Configure Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   host: 'smtp.gmail.com',
//   port: 587,
//   secure: true,
//   auth: {
//     type: 'OAuth2',
//     user: 'rlavan0927@gmail.com',
//     pass: 'zjvcubkkywneifqp',
//     clientId: CLIENT_ID,
//     clientSecret: CLIENT_SECRET,
//     accessToken: 'ya29.a0AWY7CklXZcrF9N_0ASXX5QS2fRmBXP-IeobRyiprDOWb82Zl0n2Q5dW-6zzpBfXmO2ukk3ebJ5WG_U38we3Q8lNypvgj66ShjRMxOHciWeKy7rfiYPpO6kE-wbTsrT0MzWvEKAByYDbFW1Z2NSKvOyVT8MczaCgYKAXwSARASFQG1tDrp27TBEKT8MuMwgdSdcwCOzQ0163',
//     refreshToken: '1//0gTUGH4V45MC-CgYIARAAGBASNwF-L9IrmW9YMngAv6YznxRSgobkInrkiz6EU1x9JE4gqDgv6exPCn1NOyA1Cm221BrUULTyq60'

//     //pass: 'Theiva@0927'
//   }
// });

// transporter.verify((error, success) => {
//   if (error) {
//     console.error('Error connecting to email server:', error);
//   } else {
//     console.log('Email server connection successful',success);
//   }
// });

// // Define the API endpoint to send an email
// app.post('/api/send-email', (req, res) => {
//   const { to, subject, text } = req.body;

//   // Compose the email message
//   const mailOptions = {
//     from: 'rlavan0927@gmail.com',
//     to: to,
//     subject: subject,
//     text: text
//   };

//   // Send the email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Failed to send email' });
//     } else {
//       console.log('Email sent:', info.response);
//       res.sendStatus(200);
//     }
//   });
// });

app.get('/api/staffs', (req, res) => {
// Retrieve the staff options from the database
connection.query('SELECT staffId,fullname FROM Staff', (error, results) => {
  if (error) {
    console.error('Error retrieving staff options:', error);
    // Handle the error appropriately
  } else {
    const staffOptions = results.map(result => ({
      value: result.staffId,
      label: result.fullname
    }));
    res.json(staffOptions);
    console.log(staffOptions);
    console.log("success staff fetching");

    // Pass the  staffOptions to the component or store it in a state variable
    // and use it in your component as needed
  }
});
});

app.get('/api/projects', (req, res) => {
  // console.log("Hi projects");
  //  console.log(req);
  // Retrieve the staff options from the database
  connection.query('SELECT projectId,projectName FROM Project', (error, results) => {
    if (error) {
      console.error('Error retrieving project options:', error);
      // Handle the error appropriately
    } else {
      const projectOptions = results.map(result => ({
        value: result.projectId,
        label: result.projectName
      }));
      res.json(projectOptions);
      console.log(projectOptions);
      console.log("success project fetching");
  
      // Pass the  staffOptions to the component or store it in a state variable
      // and use it in your component as needed
    }
  });
  });

app.get('/api/events', (req, res) => {
  // console.log("Hi event");
  //  console.log(req);
  // Retrieve the staff options from the database
  connection.query('SELECT eventId, eventName FROM Event', (error, results) => {
    if (error) {
      console.error('Error retrieving project options:', error);
      // Handle the error appropriately
    } else {
      const eventOptions = results.map(result => ({
        value: result.eventId,
        label: result.eventName
      }));
      res.json(eventOptions);
      console.log(eventOptions);
      console.log("success event fetching");
  
      // Pass the  staffOptions to the component or store it in a state variable
      // and use it in your component as needed
    }
  });
  });

  app.get('/api/activities', (req, res) => {
    // console.log("Hi event");
    //  console.log(req);
    // Retrieve the staff options from the database
    connection.query('SELECT activityId, activityName FROM Activity', (error, results) => {
      if (error) {
        console.error('Error retrieving project options:', error);
        // Handle the error appropriately
      } else {
        const activityOptions = results.map(result => ({
          value: result.activityId,
          label: result.activityName
        }));
        res.json(activityOptions);
        console.log(activityOptions);
        console.log("success activity fetching");
    
        // Pass the  staffOptions to the component or store it in a state variable
        // and use it in your component as needed
      }
    });
    });

//-------------------------------------------------------------------
//@type   POST
//route for post data
// app.post("/upload", upload.single('file'), (req, res) => {
//   // console.log(req); 
//   if (!req.file) {
//       console.log("No file upload");
//   } else {
//       console.log(req.file.filename)
//       var imgsrc = '/Users/lavanya/Desktop/eegai copy/src/backend/uploads/' + req.file.filename;
//       console.log("imgsrc : " + imgsrc);
//       var insertData = "INSERT INTO users_file(file_src)VALUES(?)";
//       connection.query(insertData, [imgsrc], (err, result) => {
//           if (err) throw err
//           console.log("file uploaded")
//       })
//   }
// });

//-------------------------------------------------------------------

/// Submit Donor Registration Form
app.post('/submit-createProject', upload.single('file'), (req, res) => {
  const { projectname, projectdescription, sdg, location, contactNo, startDate, endDate, fundgoalamount, selectedStaffs, skills, interests } = req.body;
  // console.log(req);
  

    // Upload the image to Cloudinary
    const result = cloudinary.uploader.upload(req.file.path);

    // Save the image URL to the database
    const imgsrc = req.file.path;
    console.log(imgsrc)

    // Respond with the URL of the uploaded image from Cloudinary
    // res.json({ imgsrc });


  let activeYear = 2023;
  
  // Insert data into the Project table
  const projectInsertSql = 'INSERT INTO Project (projectName, projectDescription, startDate, endDate, activeYear, coverPhotoReference, contactNo, goalAmount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(projectInsertSql, [projectname, projectdescription,startDate, endDate, activeYear, imgsrc, contactNo, fundgoalamount], (projectErr, projectResult) => {
    if (projectErr) {
      console.error('Error storing form data in MySQL:', projectErr);
      return res.status(500).json({ error: 'An error occurred' });
    }

    console.log('Form data stored in MySQL:', projectResult);

    // Retrieve the projectId of the inserted project
    const projectId = projectResult.insertId;

    // Parse skills and interests from JSON string to an array
    const parsedSkills = JSON.parse(skills);
    const parsedInterests = JSON.parse(interests);
    const parsedLocations = JSON.parse(location);
    const parsedSDGs = JSON.parse(sdg);

    // Insert skills into the Project_Required_Skills table if skills exist
    if (parsedSkills && parsedSkills.length > 0) {
      const requiredSkillsInsertSql = 'INSERT INTO Project_Required_Skills (projectId, requiredSkill) VALUES ?';
      const skillsValues = parsedSkills.map(skill => [projectId, skill]);
      connection.query(requiredSkillsInsertSql, [skillsValues], (skillsErr, skillsResult) => {
        if (skillsErr) {
          console.error('Error storing form data in MySQL:', skillsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', skillsResult);
      });
    }

    // Insert interests into the Project_Required_Interests table if interests exist
    if (parsedInterests && parsedInterests.length > 0) {
      const interestsInsertSql = 'INSERT INTO Project_Required_Interests (projectId, requiredInterest) VALUES ?';
      const interestsValues = parsedInterests.map(interest => [projectId, interest]);
      connection.query(interestsInsertSql, [interestsValues], (interestsErr, interestsResult) => {
        if (interestsErr) {
          console.error('Error storing form data in MySQL:', interestsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', interestsResult);
      });
    }

     // Insert interests into the Project_Required_Interests table if interests exist
     if (parsedLocations && parsedLocations.length > 0) {
      const locationsInsertSql = 'INSERT INTO Project_Location (projectId, location) VALUES ?';
      const locationsValues = parsedLocations.map(location => [projectId, location]);
      connection.query(locationsInsertSql, [locationsValues], (interestsErr, interestsResult) => {
        if (interestsErr) {
          console.error('Error storing form data in MySQL:', interestsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', interestsResult);
      });
    }

    // Insert interests into the Project_Required_Interests table if interests exist
    if (parsedSDGs && parsedSDGs.length > 0) {
      const sdgsInsertSql = 'INSERT INTO Project_SDG (projectId, SDG) VALUES ?';
      const sdgsValues = parsedSDGs.map(sdg => [projectId, sdg]);
      connection.query(sdgsInsertSql, [sdgsValues], (interestsErr, interestsResult) => {
        if (interestsErr) {
          console.error('Error storing form data in MySQL:', interestsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', interestsResult);
      });
    }

// Insert staffs into the Staff_Projects table if selectedStaffs exist
if (selectedStaffs && selectedStaffs.length > 0) {
  const parsedStaffs = JSON.parse(selectedStaffs);
  const staffInsertSql = 'INSERT INTO Staff_Projects (staffId, projectId) VALUES ?';
  const staffsValues = parsedStaffs.map(staff => [staff.value, projectId]);
  connection.query(staffInsertSql, [staffsValues], (staffsErr, staffsResult) => {
    if (staffsErr) {
      console.error('Error storing form data in MySQL:', staffsErr);
      return res.status(500).json({ error: 'An error occurred' });
    }
    console.log('Form data stored in MySQL:', staffsResult);
  });
}


  // Successful insertion into all tables
  return res.send('Project created successfully');
});
// }
});

app.post('/submit-createActivity', upload.single('file'), (req, res) => {
  const { activityname, activitydescription, sdg, location, selectedProjects,contactNo, fundgoalamount, selectedStaffs, skills, interests } = req.body;
   console.log(req);


  // console.log(imgsrc);

      // Upload the image to Cloudinary
      const result = cloudinary.uploader.upload(req.file.path);

      // Save the image URL to the database
      const imgsrc = req.file.path;
      console.log(imgsrc)
  
      // Respond with the URL of the uploaded image from Cloudinary
      // res.json({ imgsrc });

  let activeYear = 2023;
 // Assuming selectedProjects is received as a JSON-formatted string
const selectedProjectsObj = JSON.parse(selectedProjects);
const projectId = selectedProjectsObj.value;
console.log(projectId);

  
  // Insert data into the Project table
  const projectInsertSql = 'INSERT INTO Activity (activityName, activityDescription, activeYear, coverPhotoReference, contactNo, goalAmount, projectId) VALUES (?, ?, ?, ?, ?, ?,?)';
  connection.query(projectInsertSql, [activityname, activitydescription, activeYear, imgsrc, contactNo, fundgoalamount,projectId ], (projectErr, projectResult) => {
    if (projectErr) {
      console.error('Error storing form data in MySQL:', projectErr);
      return res.status(500).json({ error: 'An error occurred' });
    }

    console.log('Form data stored in MySQL:', projectResult);

    // Retrieve the projectId of the inserted project
    const activityId = projectResult.insertId;

    // Parse skills and interests from JSON string to an array
    const parsedSkills = JSON.parse(skills);
    const parsedInterests = JSON.parse(interests);
    const parsedLocations = JSON.parse(location);
    const parsedSDGs = JSON.parse(sdg);

    // Insert skills into the Project_Required_Skills table if skills exist
    if (parsedSkills && parsedSkills.length > 0) {
      const requiredSkillsInsertSql = 'INSERT INTO Activity_Required_Skills (activityId, requiredSkill) VALUES ?';
      const skillsValues = parsedSkills.map(skill => [activityId, skill]);
      connection.query(requiredSkillsInsertSql, [skillsValues], (skillsErr, skillsResult) => {
        if (skillsErr) {
          console.error('Error storing form data in MySQL:', skillsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', skillsResult);
      });
    }

    // Insert interests into the Project_Required_Interests table if interests exist
    if (parsedInterests && parsedInterests.length > 0) {
      const interestsInsertSql = 'INSERT INTO Activity_Required_Interests (activityId, requiredInterest) VALUES ?';
      const interestsValues = parsedInterests.map(interest => [activityId, interest]);
      connection.query(interestsInsertSql, [interestsValues], (interestsErr, interestsResult) => {
        if (interestsErr) {
          console.error('Error storing form data in MySQL:', interestsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', interestsResult);
      });
    }

     // Insert interests into the Project_Required_Interests table if interests exist
     if (parsedLocations && parsedLocations.length > 0) {
      const locationsInsertSql = 'INSERT INTO Activity_Location (activityId, location) VALUES ?';
      const locationsValues = parsedLocations.map(location => [activityId, location]);
      connection.query(locationsInsertSql, [locationsValues], (interestsErr, interestsResult) => {
        if (interestsErr) {
          console.error('Error storing form data in MySQL:', interestsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', interestsResult);
      });
    }

    // Insert interests into the Project_Required_Interests table if interests exist
    if (parsedSDGs && parsedSDGs.length > 0) {
      const sdgsInsertSql = 'INSERT INTO Activity_SDG (activityId, SDG) VALUES ?';
      const sdgsValues = parsedSDGs.map(sdg => [activityId, sdg]);
      connection.query(sdgsInsertSql, [sdgsValues], (interestsErr, interestsResult) => {
        if (interestsErr) {
          console.error('Error storing form data in MySQL:', interestsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', interestsResult);
      });
    }

// Insert staffs into the Staff_Projects table if selectedStaffs exist
if (selectedStaffs && selectedStaffs.length > 0) {
  const parsedStaffs = JSON.parse(selectedStaffs);
  const staffInsertSql = 'INSERT INTO Staff_Activity (staffId, activityId) VALUES ?';
  const staffsValues = parsedStaffs.map(staff => [staff.value, activityId]);
  connection.query(staffInsertSql, [staffsValues], (staffsErr, staffsResult) => {
    if (staffsErr) {
      console.error('Error storing form data in MySQL:', staffsErr);
      return res.status(500).json({ error: 'An error occurred' });
    }
    console.log('Form data stored in MySQL:', staffsResult);
    // Successful insertion into all tables

  return res.send('Activity created successfully');
  });
}
});
// }
});

/// Submit Donor Registration Form
app.post('/submit-createEvent', upload.single('file'), (req, res) => {
  const { eventname, eventdescription, location, selectedActivities, contactNo, eventDate, startTime, endTime, selectedStaffs, skills, interests } = req.body;
  // console.log(req);
  

  // let imgsrc = '';

  // if (req.file && req.file.filename) {
  //   imgsrc = '/Users/lavanya/Desktop/eegai copy/public/uploads/' + req.file.filename;
  //   console.log(imgsrc);
  // } else {
  //   console.error('No file uploaded');
  //   return res.status(400).json({ error: 'No file uploaded' });
  // }

        // Upload the image to Cloudinary
        const result = cloudinary.uploader.upload(req.file.path);

        // Save the image URL to the database
        const imgsrc = req.file.path;
        console.log(imgsrc)

        const selectedActivityObj = JSON.parse(selectedActivities);
        const activityId = selectedActivityObj.value;
        console.log(activityId);

  
  // Insert data into the Project table
  const eventInsertSql = 'INSERT INTO Event (eventName, eventDescription, eventDate, startTime, endTime, location, coverPhotoReference, contactNo, activityId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  connection.query(eventInsertSql, [eventname, eventdescription,  eventDate, startTime, endTime, location, imgsrc, contactNo, activityId], (eventErr, eventResult) => {
    if (eventErr) {
      console.error('Error storing form data in MySQL:', eventErr);
      return res.status(500).json({ error: 'An error occurred' });
    }

    console.log('Form data stored in MySQL:', eventResult);

    // Retrieve the projectId of the inserted project
    const eventId = eventResult.insertId;

    // Parse skills and interests from JSON string to an array
    const parsedSkills = JSON.parse(skills);
    const parsedInterests = JSON.parse(interests);

    // Insert skills into the Project_Required_Skills table if skills exist
    if (parsedSkills && parsedSkills.length > 0) {
      const requiredSkillsInsertSql = 'INSERT INTO Event_Required_Skills (eventId, requiredSkill) VALUES ?';
      const skillsValues = parsedSkills.map(skill => [eventId, skill]);
      connection.query(requiredSkillsInsertSql, [skillsValues], (skillsErr, skillsResult) => {
        if (skillsErr) {
          console.error('Error storing form data in MySQL:', skillsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', skillsResult);
      });
    }

    // Insert interests into the Project_Required_Interests table if interests exist
    if (parsedInterests && parsedInterests.length > 0) {
      const interestsInsertSql = 'INSERT INTO Event_Required_Interests (eventId, requiredInterest) VALUES ?';
      const interestsValues = parsedInterests.map(interest => [eventId, interest]);
      connection.query(interestsInsertSql, [interestsValues], (interestsErr, interestsResult) => {
        if (interestsErr) {
          console.error('Error storing form data in MySQL:', interestsErr);
          return res.status(500).json({ error: 'An error occurred' });
        }
        console.log('Form data stored in MySQL:', interestsResult);
      });
    }

// Insert staffs into the Staff_Projects table if selectedStaffs exist
if (selectedStaffs && selectedStaffs.length > 0) {
  const parsedStaffs = JSON.parse(selectedStaffs);
  const staffInsertSql = 'INSERT INTO Staff_Event (staffId, eventId) VALUES ?';
  const staffsValues = parsedStaffs.map(staff => [staff.value, eventId]);
  connection.query(staffInsertSql, [staffsValues], (staffsErr, staffsResult) => {
    if (staffsErr) {
      console.error('Error storing form data in MySQL:', staffsErr);
      return res.status(500).json({ error: 'An error occurred' });
    }
    console.log('Form data stored in MySQL:', staffsResult);
  });
}


  // Successful insertion into all tables
  return res.send('Event created successfully');
});
// }
});

app.get('/projects', (req, res) => {
  // Retrieve project data from the database
  connection.query('SELECT * FROM Project', (error, results) => {
    if (error) {
      console.error('Error fetching project data:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }

    // Return the fetched project data as the response
    res.json(results);
  });
});

app.get('/activities', (req, res) => {
  // Retrieve project data from the database
  connection.query('SELECT * FROM Activity', (error, results) => {
    if (error) {
      console.error('Error fetching activity data:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }

    // Return the fetched project data as the response
    res.json(results);
  });
});

app.get('/events', (req, res) => {
  // Retrieve project data from the database
  connection.query('SELECT * FROM Event', (error, results) => {
    if (error) {
      console.error('Error fetching event data:', error);
      return res.status(500).json({ error: 'An error occurred' });
    }

    // Return the fetched project data as the response
    res.json(results);
  });
});


// Submit Volunteer Registration Form
app.post('/submit-donationform', (req, res) => {
  const { fullname, nicNo, donorAddress,  email, contactNo, donationFor, donationMethod,selectedProjects, selectedActivities, donationAmount} = req.body;
   console.log(req);
  console.log(selectedProjects);
  console.log(selectedActivities);
  const currentDate = new Date().toISOString().split('T')[0];
  const currentTime = new Date().toISOString().split('T')[1].slice(0, 8);
  console.log(currentDate);
  console.log(currentTime);
  // const projectId = selectedProjects[0].value;
  // console.log(projectId);

    // Insert data into the User table
    const userInsertSql = 'INSERT INTO UnRegisteredDonor (fullname, nicNo, donorAddress,  email, contactNo) VALUES (?, ?, ?, ?, ?)';
    connection.query(userInsertSql, [fullname, nicNo, donorAddress,  email, contactNo], (userErr, userResult) => {
      if (userErr) {
        console.error('Error storing form data in MySQL:', userErr);
        return res.status(500).json({ error: 'An error occurred' });
      }

      console.log('Form data stored in MySQL:', userResult);

      // Retrieve the userId of the inserted user
      const tempDonorId = userResult.insertId;
      console.log(selectedProjects);
      console.log(selectedActivities);
      // const projectId = selectedProjects[0].value;
      let projectId = null;
      if (selectedProjects && selectedProjects.value) {
        projectId = selectedProjects.value;
      }
      

      let activityId = null;
      if (selectedActivities && selectedActivities.value) {
        activityId = selectedActivities.value;
      }


      // Insert data into the Volunteer table
      const volunteerInsertSql = 'INSERT INTO Donation (donationFor, donationAmount, donationMethod,tempDonorId, projectId, activityId, donationDate, donationTime) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      connection.query(volunteerInsertSql, [donationFor, donationAmount, donationMethod,tempDonorId,projectId, activityId,currentDate,currentTime ], (volunteerErr, volunteerResult) => {
        if (volunteerErr) {
          console.error('Error storing form data in MySQL:', volunteerErr);
          return res.status(500).json({ error: 'An error occurred' });
        }

        console.log('Form data stored in MySQL:', volunteerResult);

        if (donationFor === 'NGO') {
          // If the donationFor is 'NGO', update the raised_amount in the NGO table
          const donationAmountDecimal = parseFloat(donationAmount);
          const ngoId = 1; // Replace with the appropriate NGO id from the database
          const ngoDonationInsertSql =
            'UPDATE NGO SET raised_amount = COALESCE(raised_amount, 0) + ? WHERE id = ?';
          const ngoValues = [donationAmountDecimal, ngoId];
          connection.query(ngoDonationInsertSql, ngoValues, (error, results) => {
            if (error) {
              console.error('Error updating raised_amount for NGO:', error);
              return res.status(500).json({ error: 'An error occurred' });
            }
            console.log('Raised amount updated for NGO:', ngoId);
          });
        }
      

        if (projectId) {
        // const projectId = selectedProjects.value;
        const donationAmount = parseFloat(req.body.donationAmount); // Convert string to decimal
      
        const ProjectDonationInsertSql = `UPDATE Project SET raisedAmount = COALESCE(raisedAmount, 0) + ? WHERE projectId = ?`;
        const projectValues = [donationAmount, projectId];
      
        connection.query(ProjectDonationInsertSql, projectValues, (error, results) => {
          if (error) {
            console.error('Error updating raisedAmount:', error);
            return res.status(500).json({ error: 'An error occurred' });
          }
          console.log('Raised amount updated:', results);
          console.log('Raised amount updated for project:', projectId);
        });
      }
      

      if (activityId) {
        // const activityId = selectedActivities.value;
        const donationAmount = parseFloat(req.body.donationAmount); // Convert string to decimal

        const EventDonationInsertSql = 'UPDATE Activity SET raisedAmount = COALESCE(raisedAmount, 0) + ? WHERE activityId = ?';
        const projectValues = [donationAmount, activityId];
        connection.query(EventDonationInsertSql, projectValues, (error, results) => {
          if (error) {
            console.error('Error updating raisedAmount:', error);
            return res.status(500).json({ error: 'An error occurred' });
          }
          console.log('Raised amount updated:', results);
          console.log('Raised amount updated for project:', activityId);
        });
      }

        // Successful insertion into both tables
        return res.send('Donation done successfully');
        // return res.json({ redirectUrl: '/Login' });
      });
    });
  
});

// Submit Volunteer Registration Form
app.post('/submit-donationforRegisterDonor', (req, res) => {
  const { donorId, donationFor, donationMethod,selectedProjects, selectedActivities, donationAmount} = req.body;
  //  console.log(req);
  // console.log(selectedProjects);
  // console.log(selectedActivities);
  // const projectId = selectedProjects[0].value;
  // console.log(projectId);

      // const projectId = selectedProjects[0].value;
      let projectId = null;
      if (selectedProjects && selectedProjects.value) {
        projectId = selectedProjects.value;
      }
      

      let activityId = null;
      if (selectedActivities && selectedActivities.value) {
        activityId = selectedActivities.value;
      }


      // Insert data into the Volunteer table
      const volunteerInsertSql = 'INSERT INTO Donation (donationFor, donationAmount, donationMethod,donorId, projectId, activityId ) VALUES (?, ?, ?, ?, ?, ?)';
      connection.query(volunteerInsertSql, [donationFor, donationAmount, donationMethod, donorId,projectId, activityId], (volunteerErr, volunteerResult) => {
        if (volunteerErr) {
          console.error('Error storing form data in MySQL:', volunteerErr);
          return res.status(500).json({ error: 'An error occurred' });
        }

        console.log('Form data stored in MySQL:', volunteerResult);

        if (donationFor === 'NGO') {
          // If the donationFor is 'NGO', update the raised_amount in the NGO table
          const donationAmountDecimal = parseFloat(donationAmount);
          const ngoId = 1; // Replace with the appropriate NGO id from the database
          const ngoDonationInsertSql =
            'UPDATE NGO SET raised_amount = COALESCE(raised_amount, 0) + ? WHERE id = ?';
          const ngoValues = [donationAmountDecimal, ngoId];
          connection.query(ngoDonationInsertSql, ngoValues, (error, results) => {
            if (error) {
              console.error('Error updating raised_amount for NGO:', error);
              return res.status(500).json({ error: 'An error occurred' });
            }
            console.log('Raised amount updated for NGO:', ngoId);
          });
        }
      

        if (projectId) {
        // const projectId = selectedProjects.value;
        const donationAmount = parseFloat(req.body.donationAmount); // Convert string to decimal
      
        const ProjectDonationInsertSql = `UPDATE Project SET raisedAmount = COALESCE(raisedAmount, 0) + ? WHERE projectId = ?`;
        const projectValues = [donationAmount, projectId];
      
        connection.query(ProjectDonationInsertSql, projectValues, (error, results) => {
          if (error) {
            console.error('Error updating raisedAmount:', error);
            return res.status(500).json({ error: 'An error occurred' });
          }
          console.log('Raised amount updated:', results);
          console.log('Raised amount updated for project:', projectId);
        });
      }
      

      if (activityId) {
        // const activityId = selectedActivities.value;
        const donationAmount = parseFloat(req.body.donationAmount); // Convert string to decimal

        const EventDonationInsertSql = 'UPDATE Activity SET raisedAmount = COALESCE(raisedAmount, 0) + ? WHERE activityId = ?';
        const projectValues = [donationAmount, activityId];
        connection.query(EventDonationInsertSql, projectValues, (error, results) => {
          if (error) {
            console.error('Error updating raisedAmount:', error);
            return res.status(500).json({ error: 'An error occurred' });
          }
          console.log('Raised amount updated:', results);
          console.log('Raised amount updated for project:', activityId);
        });
      }

        // Successful insertion into both tables
        return res.send('Donation done successfully');
        // return res.json({ redirectUrl: '/Login' });
      });
    });
  


app.delete('/api/projects/:projectId', (req, res) => {
  const projectId = req.params.projectId;

  // Perform the necessary database query or action to delete the project and related data
  connection.query('DELETE FROM Project_Required_Skills WHERE projectId = ?', [projectId], (error) => {
    if (error) {
      console.error('Error deleting project required skills:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      connection.query('DELETE FROM Project_Required_Interests WHERE projectId = ?', [projectId], (error) => {
        if (error) {
          console.error('Error deleting project required interests:', error);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          connection.query('DELETE FROM Staff_Projects WHERE projectId = ?', [projectId], (error) => {
            if (error) {
              console.error('Error deleting staff projects:', error);
              res.status(500).json({ error: 'Internal Server Error' });
            } else {
              connection.query('DELETE FROM Project WHERE projectId = ?', [projectId], (error) => {
                if (error) {
                  console.error('Error deleting project:', error);
                  res.status(500).json({ error: 'Internal Server Error' });
                } else {
                  res.json({ message: `Project with ID ${projectId} deleted successfully` });
                }
              });
            }
          });
        }
      });
    }
  });
});

app.get('/api/projects/:projectId', (req, res) => {
  const projectId = req.params.projectId;

  // Query the database to fetch the project data by the project ID
  connection.query('SELECT * FROM Project WHERE projectId = ?', [projectId], (error, results) => {
    if (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const project = results[0]; // Assuming you expect a single project based on the ID

      // Return the project data in the response
      res.json(project);
    }
  });
});

app.put('/api/projects/:projectId', (req, res) => {
  const projectId = req.params.projectId;
  const updatedProjectData = req.body; // Assuming you send the updated project data in the request body

  // Perform the necessary database query or action to update the project with the given ID
  connection.query('UPDATE Project SET ? WHERE projectId = ?', [updatedProjectData, projectId], (error, results) => {
    if (error) {
      console.error('Error updating project:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ message: `Project with ID ${projectId} updated successfully` });
    }
  });
});

// Route to handle inserting data into Project_Volunteer table
// Route to handle inserting data into Project_Volunteer table
app.post('/api/projectVolunteer', (req, res) => {
  const { volunteerId, projectId } = req.body; // Use projectId directly instead of selectedProjects
  // console.log(req);

  const Assigment_Status = 'Suggested';

  // Perform the insertion query
  const query = `INSERT INTO Project_Volunteer (volunteerId, projectId, Assigment_Status) 
                 VALUES (?, ?, ?)`;

  connection.query(query, [volunteerId, projectId, Assigment_Status], (error, results) => {
    if (error) {
      console.error('Error inserting data into Project_Volunteer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Successfully inserted into Project_Volunteer' });
    }
  });
});


// Route to handle inserting data into Activity_Volunteer table
app.post('/api/activityVolunteer', (req, res) => {
  const { volunteerId, activityId} = req.body;
  // console.log(req);

  const Assigment_Status = 'Suggested';

  // Perform the insertion query
  const query = `INSERT INTO Activity_Volunteer (volunteerId, activityId, Assigment_Status) 
                 VALUES (?, ?, ?)`;

  connection.query(query, [volunteerId, activityId, Assigment_Status], (error, results) => {
    if (error) {
      console.error('Error inserting data into Activity_Volunteer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Successfully inserted into Activity_Volunteer' });
    }
  });
});

// Route to handle inserting data into Event_Volunteer table
app.post('/api/eventVolunteer', (req, res) => {
  const { volunteerId, eventId} = req.body;
  // console.log(req);

  const Assigment_Status = 'Suggested';

  // Perform the insertion query
  const query = `INSERT INTO Event_Volunteer (volunteerId, eventId, Assigment_Status) 
                 VALUES (?, ?, ?)`;

  connection.query(query, [volunteerId, eventId, Assigment_Status], (error, results) => {
    if (error) {
      console.error('Error inserting data into Event_Volunteer:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Successfully inserted into Event_Volunteer' });
    }
  });
});

// API endpoint to handle form submission
app.post('/api/contact', (req, res) => {
  const { firstname, lastname, email, purpose } = req.body;

  // Save the data to the database
  const query = 'INSERT INTO Contact (firstname, lastname, email, purpose) VALUES (?, ?, ?, ?)';
  connection.query(query, [firstname, lastname, email, purpose], (error, results) => {
    if (error) {
      console.error('Error saving data to the database:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Data successfully saved to the database:', results);
      res.status(200).json({ message: 'Data saved successfully' });
    }
  });
});

// PUT request to update the user's account_status
app.put("/api/freezeUser/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Update the user's account_status to "Suspended" in the database
    const query = "UPDATE User SET account_status = 'Suspended' WHERE userId = ?";
    connection.query(query, [userId]);

    res.status(200).json({ message: "User account status updated successfully" });
  } catch (error) {
    console.error("Error updating user account_status:", error);
    res.status(500).json({ error: "An error occurred while updating the user account_status" });
  }
});

app.get('/api/getDonorIdByUserId/:userId', (req, res) => {
  const userId = req.params.userId;

  // Perform a database query to get the donorId based on the userId
  connection.query('SELECT donorId FROM RegisteredDonor WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve donorId' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Donor not found for the given userId' });
    }

    const donorId = result[0].donorId;
    return res.json({ donorId });
  });
});

// API endpoint to fetch donation details with projectName and activityName
app.get('/api/getDonationDetailsByDonorId/:donorId', (req, res) => {
  const donorId = req.params.donorId;
  console.log(req);

  const sqlQuery = `
    SELECT
      Donation.donationId,
      Donation.donationFor,
      Donation.donationAmount,
      Donation.donationMethod,
      Donation.projectId,
      Donation.activityId,
      Project.projectName,
      Activity.activityName
    FROM Donation
    LEFT JOIN Project ON Donation.projectId = Project.projectId
    LEFT JOIN Activity ON Donation.activityId = Activity.activityId
    WHERE Donation.donorId = ?
  `;

  connection.query(sqlQuery, [donorId], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch donation details' });
    }

    return res.json(result);
  });
});

app.get('/api/getStaffIdByUserId/:userId', (req, res) => {
  const userId = req.params.userId;

  // Perform a database query to get the donorId based on the userId
  connection.query('SELECT staffId FROM Staff WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve donorId' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Donor not found for the given userId' });
    }

    const staffId = result[0].staffId;
    return res.json({ staffId });
  });
});

app.get('/api/getProjectDetailsByStaffId/:staffId', (req, res) => {
  const staffId = req.params.staffId;

  const sqlQuery = `
    SELECT p.projectId, p.projectName, p.projectDescription, p.startDate, p.endDate, p.activeYear,
      p.coverPhotoReference, p.contactNo, p.goalAmount, p.raisedAmount, p.extraRaisedAmount,
      pl.location,
      GROUP_CONCAT(ps.SDG) AS SDGs,
      GROUP_CONCAT(prs.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(pri.requiredInterest) AS requiredInterests
    FROM Staff_Projects sp
    JOIN Project p ON sp.projectId = p.projectId
    LEFT JOIN Project_Location pl ON p.projectId = pl.projectId
    LEFT JOIN Project_SDG ps ON p.projectId = ps.projectId
    LEFT JOIN Project_Required_Skills prs ON p.projectId = prs.projectId
    LEFT JOIN Project_Required_Interests pri ON p.projectId = pri.projectId
    WHERE sp.staffId = ?
    GROUP BY p.projectId, p.projectName, p.projectDescription, p.startDate, p.endDate,
      p.activeYear, p.coverPhotoReference, p.contactNo, p.goalAmount, p.raisedAmount,
      p.extraRaisedAmount, pl.location;
  `;

  connection.query(sqlQuery, [parseInt(staffId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch project details' });
    }

    return res.json(result);
  });
});

app.get('/api/getActivityDetailsByStaffId/:staffId', (req, res) => {
  const staffId = req.params.staffId;

  const sqlQuery = `
    SELECT a.activityId, a.activityName, a.activityDescription, a.activeYear,
      a.coverPhotoReference, a.contactNo, a.goalAmount, a.raisedAmount, a.extraRaisedAmount,
      al.location,
      GROUP_CONCAT(asdg.SDG) AS SDGs,
      GROUP_CONCAT(ars.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(ari.requiredInterest) AS requiredInterests
    FROM Staff_Activity sa
    JOIN Activity a ON sa.activityId = a.activityId
    LEFT JOIN Activity_Location al ON a.activityId = al.activityId
    LEFT JOIN Activity_SDG asdg ON a.activityId = asdg.activityId
    LEFT JOIN Activity_Required_Skills ars ON a.activityId = ars.activityId
    LEFT JOIN Activity_Required_Interests ari ON a.activityId = ari.activityId
    WHERE sa.staffId = ?
    GROUP BY a.activityId, a.activityName, a.activityDescription,
      a.activeYear, a.coverPhotoReference, a.contactNo, a.goalAmount, a.raisedAmount,
      a.extraRaisedAmount, al.location;
  `;

  connection.query(sqlQuery, [parseInt(staffId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch activity details' });
    }

    return res.json(result);
  });
});

app.get('/api/getEventDetailsByStaffId/:staffId', (req, res) => {
  const staffId = req.params.staffId;

  const sqlQuery = `
    SELECT e.eventId, e.eventName, e.eventDescription, e.eventDate, e.startTime, e.endTime,
      e.location, e.coverPhotoReference, e.contactNo,
      GROUP_CONCAT(ers.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(eri.requiredInterest) AS requiredInterests
    FROM Staff_Event se
    JOIN Event e ON se.eventId = e.eventId
    LEFT JOIN Event_Required_Skills ers ON e.eventId = ers.eventId
    LEFT JOIN Event_Required_Interests eri ON e.eventId = eri.eventId
    WHERE se.staffId = ?
    GROUP BY e.eventId, e.eventName, e.eventDescription, e.eventDate, e.startTime, e.endTime,
      e.location, e.coverPhotoReference, e.contactNo;
  `;

  connection.query(sqlQuery, [parseInt(staffId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch event details' });
    }

    return res.json(result);
  });
});

app.get('/api/getVolunteerIdByUserId/:userId', (req, res) => {
  const userId = req.params.userId;

  // Perform a database query to get the donorId based on the userId
  connection.query('SELECT volunteerId FROM Volunteer WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve donorId' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Donor not found for the given userId' });
    }

    const volunteerId = result[0].volunteerId;
    return res.json({ volunteerId });
  });
});

// Assuming you have set up your 'connection' variable for the database connection properly.

app.get('/api/getStaffNameBystaffId/:staffId', (req, res) => {
  const staffId = req.params.staffId;

  // Perform a database query to get the fullname based on the staffId
  connection.query(
    'SELECT fullname FROM Staff WHERE staffId = ?',
    [staffId],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to retrieve fullname' });
      }

      if (result.length === 0) {
        return res.status(404).json({ error: 'Staff not found for the given staffId' });
      }

      const staffName = result[0].fullname;
      console.log(staffName);
      return res.json({ staffName });
    }
  );
});


app.get('/api/getProjectDetailsByVolunteerId/:volunteerId', (req, res) => {
  const volunteerId = req.params.volunteerId;

  const sqlQuery = `
    SELECT p.projectId, p.projectName, p.projectDescription, p.startDate, p.endDate, p.activeYear,
      p.coverPhotoReference, p.contactNo, p.goalAmount, p.raisedAmount, p.extraRaisedAmount,
      pl.location,
      GROUP_CONCAT(ps.SDG) AS SDGs,
      GROUP_CONCAT(prs.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(pri.requiredInterest) AS requiredInterests
    FROM Project_Volunteer pv
    JOIN Project p ON pv.projectId = p.projectId
    LEFT JOIN Project_Location pl ON p.projectId = pl.projectId
    LEFT JOIN Project_SDG ps ON p.projectId = ps.projectId
    LEFT JOIN Project_Required_Skills prs ON p.projectId = prs.projectId
    LEFT JOIN Project_Required_Interests pri ON p.projectId = pri.projectId
    WHERE pv.volunteerId = ? AND pv.Assigment_Status = 'Suggested'
    GROUP BY p.projectId, p.projectName, p.projectDescription, p.startDate, p.endDate,
      p.activeYear, p.coverPhotoReference, p.contactNo, p.goalAmount, p.raisedAmount,
      p.extraRaisedAmount, pl.location;
  `;

  connection.query(sqlQuery, [parseInt(volunteerId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch project details' });
    }

    return res.json(result);
  });
});

app.get('/api/getAssignedProjectDetailsByVolunteerId/:volunteerId', (req, res) => {
  const volunteerId = req.params.volunteerId;

  const sqlQuery = `
    SELECT p.projectId, p.projectName, p.projectDescription, p.startDate, p.endDate, p.activeYear,
      p.coverPhotoReference, p.contactNo, p.goalAmount, p.raisedAmount, p.extraRaisedAmount,
      pl.location,
      GROUP_CONCAT(ps.SDG) AS SDGs,
      GROUP_CONCAT(prs.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(pri.requiredInterest) AS requiredInterests
    FROM Project_Volunteer pv
    JOIN Project p ON pv.projectId = p.projectId
    LEFT JOIN Project_Location pl ON p.projectId = pl.projectId
    LEFT JOIN Project_SDG ps ON p.projectId = ps.projectId
    LEFT JOIN Project_Required_Skills prs ON p.projectId = prs.projectId
    LEFT JOIN Project_Required_Interests pri ON p.projectId = pri.projectId
    WHERE pv.volunteerId = ? AND pv.Assigment_Status = 'Assigned'
    GROUP BY p.projectId, p.projectName, p.projectDescription, p.startDate, p.endDate,
      p.activeYear, p.coverPhotoReference, p.contactNo, p.goalAmount, p.raisedAmount,
      p.extraRaisedAmount, pl.location;
  `;

  connection.query(sqlQuery, [parseInt(volunteerId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch project details' });
    }

    return res.json(result);
  });
});


app.get('/api/getActivityDetailsByVolunteerId/:volunteerId', (req, res) => {
  const volunteerId = req.params.volunteerId;

  const sqlQuery = `
    SELECT a.activityId, a.activityName, a.activityDescription, a.activeYear,
      a.coverPhotoReference, a.contactNo, a.goalAmount, a.raisedAmount, a.extraRaisedAmount,
      al.location,
      GROUP_CONCAT(asdg.SDG) AS SDGs,
      GROUP_CONCAT(ars.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(ari.requiredInterest) AS requiredInterests
    FROM Activity_Volunteer av
    JOIN Activity a ON av.activityId = a.activityId
    LEFT JOIN Activity_Location al ON a.activityId = al.activityId
    LEFT JOIN Activity_SDG asdg ON a.activityId = asdg.activityId
    LEFT JOIN Activity_Required_Skills ars ON a.activityId = ars.activityId
    LEFT JOIN Activity_Required_Interests ari ON a.activityId = ari.activityId
    WHERE av.volunteerId = ? AND av.Assigment_Status = 'Suggested'
    GROUP BY a.activityId, a.activityName, a.activityDescription,
      a.activeYear, a.coverPhotoReference, a.contactNo, a.goalAmount, a.raisedAmount,
      a.extraRaisedAmount, al.location;
  `;

  connection.query(sqlQuery, [parseInt(volunteerId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch activity details' });
    }

    return res.json(result);
  });
});

app.get('/api/getAssignedActivityDetailsByVolunteerId/:volunteerId', (req, res) => {
  const volunteerId = req.params.volunteerId;

  const sqlQuery = `
    SELECT a.activityId, a.activityName, a.activityDescription, a.activeYear,
      a.coverPhotoReference, a.contactNo, a.goalAmount, a.raisedAmount, a.extraRaisedAmount,
      al.location,
      GROUP_CONCAT(asdg.SDG) AS SDGs,
      GROUP_CONCAT(ars.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(ari.requiredInterest) AS requiredInterests
    FROM Activity_Volunteer av
    JOIN Activity a ON av.activityId = a.activityId
    LEFT JOIN Activity_Location al ON a.activityId = al.activityId
    LEFT JOIN Activity_SDG asdg ON a.activityId = asdg.activityId
    LEFT JOIN Activity_Required_Skills ars ON a.activityId = ars.activityId
    LEFT JOIN Activity_Required_Interests ari ON a.activityId = ari.activityId
    WHERE av.volunteerId = ? AND av.Assigment_Status = 'Assigned'
    GROUP BY a.activityId, a.activityName, a.activityDescription,
      a.activeYear, a.coverPhotoReference, a.contactNo, a.goalAmount, a.raisedAmount,
      a.extraRaisedAmount, al.location;
  `;

  connection.query(sqlQuery, [parseInt(volunteerId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch activity details' });
    }

    return res.json(result);
  });
});

app.get('/api/getEventDetailsByVolunteerId/:volunteerId', (req, res) => {
  const volunteerId = req.params.volunteerId;

  const sqlQuery = `
    SELECT e.eventId, e.eventName, e.eventDescription, e.eventDate, e.startTime, e.endTime,
      e.location, e.coverPhotoReference, e.contactNo,
      GROUP_CONCAT(ers.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(eri.requiredInterest) AS requiredInterests
    FROM Event_Volunteer ev
    JOIN Event e ON ev.eventId = e.eventId
    LEFT JOIN Event_Required_Skills ers ON e.eventId = ers.eventId
    LEFT JOIN Event_Required_Interests eri ON e.eventId = eri.eventId
    WHERE ev.volunteerId = ? AND ev.Assigment_Status = 'Suggested'
    GROUP BY e.eventId, e.eventName, e.eventDescription, e.eventDate, e.startTime, e.endTime,
      e.location, e.coverPhotoReference, e.contactNo;
  `;

  connection.query(sqlQuery, [parseInt(volunteerId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch event details' });
    }

    return res.json(result);
  });
});

app.get('/api/getAssignedEventDetailsByVolunteerId/:volunteerId', (req, res) => {
  const volunteerId = req.params.volunteerId;

  const sqlQuery = `
    SELECT e.eventId, e.eventName, e.eventDescription, e.eventDate, e.startTime, e.endTime,
      e.location, e.coverPhotoReference, e.contactNo,
      GROUP_CONCAT(ers.requiredSkill) AS requiredSkills,
      GROUP_CONCAT(eri.requiredInterest) AS requiredInterests
    FROM Event_Volunteer ev
    JOIN Event e ON ev.eventId = e.eventId
    LEFT JOIN Event_Required_Skills ers ON e.eventId = ers.eventId
    LEFT JOIN Event_Required_Interests eri ON e.eventId = eri.eventId
    WHERE ev.volunteerId = ? AND ev.Assigment_Status = 'Assigned'
    GROUP BY e.eventId, e.eventName, e.eventDescription, e.eventDate, e.startTime, e.endTime,
      e.location, e.coverPhotoReference, e.contactNo;
  `;

  connection.query(sqlQuery, [parseInt(volunteerId)], (err, result) => {
    if (err) {
      console.error('Error executing SQL query:', err);
      return res.status(500).json({ error: 'Failed to fetch event details' });
    }

    return res.json(result);
  });
});

// Define a route to handle the GET request to the /Assignment endpoint
app.get('/Assignment', (req, res) => {
  // Send a simple response
  res.send('Volunteer Assignment Successful!');
});

// Route to handle the "Accept" action
app.post('/api/assignProject', (req, res) => {
  const { projectId, volunteerId} = req.body;
  console.log(req);

  // Update the appointment status in the database
  connection.query(
    'UPDATE Project_Volunteer SET Assigment_Status = "Assigned" WHERE projectId = ? AND volunteerId = ?',
    [projectId, volunteerId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Not found' });
      } else {
        res.status(200).json({ message: 'Assigment_Status updated to Accepted' });
      }
    }
  );
});

// Route to handle the "Cancel" action
app.post('/api/cancelProject', (req, res) => {
  const { projectId, volunteerId} = req.body;
  console.log(req);

  connection.query(
    'UPDATE Project_Volunteer SET Assigment_Status = "Cancelled" WHERE projectId = ? AND volunteerId = ?',
    [projectId, volunteerId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Not found' });
      } else {
        res.status(200).json({ message: 'Assigment_Status updated to Cancelled' });
      }
    }
  );
});

// Route to handle the "Accept" action
app.post('/api/assignActivity', (req, res) => {
  const { activityId, volunteerId } = req.body;
  console.log(req);

  // Check if the assignment already exists in the database
  connection.query(
    'SELECT * FROM Activity_Volunteer WHERE activityId = ? AND volunteerId = ?',
    [activityId, volunteerId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.length > 0) {
        // If the assignment already exists, inform the admin
        res.status(409).json({ error: 'Activity already assigned to the volunteer' });
      } else {
        // The assignment doesn't exist, proceed with the update
        connection.query(
          'UPDATE Activity_Volunteer SET Assigment_Status = "Assigned" WHERE activityId = ? AND volunteerId = ?',
          [activityId, volunteerId],
          (error, updateResults) => {
            if (error) {
              console.error(error);
              res.status(500).json({ error: 'Internal Server Error' });
            } else if (updateResults.affectedRows === 0) {
              res.status(404).json({ error: 'Assignment not found' });
            } else {
              res.status(200).json({ message: 'Assignment status updated to Assigned' });
            }
          }
        );
      }
    }
  );
});


// Route to handle the "Cancel" action
app.post('/api/cancelActivity', (req, res) => {
  const { activityId, volunteerId} = req.body;
  console.log(req);

  connection.query(
    'UPDATE Activity_Volunteer SET Assigment_Status = "Cancelled" WHERE activityId = ? AND volunteerId = ?',
    [activityId, volunteerId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Not found' });
      } else {
        res.status(200).json({ message: 'Assigment_Status updated to Cancelled' });
      }
    }
  );
});


// Route to handle the "Accept" action
app.post('/api/assignEvent', (req, res) => {
  const { eventId, volunteerId} = req.body;
  console.log(req);

  // Update the appointment status in the database
  connection.query(
    'UPDATE Event_Volunteer SET Assigment_Status = "Assigned" WHERE eventId = ? AND volunteerId = ?',
    [eventId, volunteerId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Not found' });
      } else {
        res.status(200).json({ message: 'Assigment_Status updated to Accepted' });
      }
    }
  );
});

// Route to handle the "Cancel" action
app.post('/api/cancelEvent', (req, res) => {
  const { eventId, volunteerId} = req.body;
  console.log(req);

  connection.query(
    'UPDATE Event_Volunteer SET Assigment_Status = "Cancelled" WHERE eventId = ? AND volunteerId = ?',
    [eventId, volunteerId],
    (error, results) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ error: 'Not found' });
      } else {
        res.status(200).json({ message: 'Assigment_Status updated to Cancelled' });
      }
    }
  );
});

// Assuming you have set up the MySQL database connection and stored it in the 'connection' variable.

app.get('/api/getDonorDetailsByUserId/:userId', (req, res) => {
  const userId = req.params.userId;

  // Perform a database query to get all details of the donor based on the userId
  connection.query('SELECT * FROM RegisteredDonor WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve donor details' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Donor not found for the given userId' });
    }

    const donor = result[0];
    // console.log(donor);
    return res.json({ donor });
  });
});

app.get('/api/getUserDetailByUserId/:userId', (req, res) => {
  const userId = req.params.userId;

  // Perform a database query to get all details of the donor based on the userId
  connection.query('SELECT * FROM User WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve user details' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found for the given userId' });
    }

    const user = result[0];
    // console.log(user);
    return res.json({ user });
  });
});

app.get('/api/getDonorIdByUserId/:userId', (req, res) => {
  const userId = req.params.userId;

  // Perform a database query to get the donorId based on the userId
  connection.query('SELECT donorId FROM RegisteredDonor WHERE userId = ?', [userId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to retrieve donorId' });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: 'Donor not found for the given userId' });
    }

    const donorId = result[0].donorId;
    return res.json({ donorId });
  });
});

// API endpoint to retrieve project details by projectId
app.get("/api/fetchProjectDetails/:projectId", (req, res) => {
  const projectId = req.params.projectId;
  console.log(projectId);

  // Query to get project details along with related data using JOINs
  const getProjectDetailsQuery = `
    SELECT 
      P.*,
      GROUP_CONCAT(PL.location) AS projectLocations,
      GROUP_CONCAT(PSD.SDG) AS projectSDGs,
      GROUP_CONCAT(PRS.requiredSkill) AS projectSkills,
      GROUP_CONCAT(PRI.requiredInterest) AS projectInterests,
      GROUP_CONCAT(SP.staffId) AS assignedStaff
    FROM 
      Project AS P
    LEFT JOIN 
      Project_Location AS PL ON P.projectId = PL.projectId
    LEFT JOIN 
      Project_SDG AS PSD ON P.projectId = PSD.projectId
    LEFT JOIN 
      Project_Required_Skills AS PRS ON P.projectId = PRS.projectId
    LEFT JOIN 
      Project_Required_Interests AS PRI ON P.projectId = PRI.projectId
    LEFT JOIN 
      Staff_Projects AS SP ON P.projectId = SP.projectId
    WHERE 
      P.projectId = ?;
  `;

    // Fetch project details with related data
    connection.query(getProjectDetailsQuery, projectId, (err, results) => {
      if (err) {
        console.error("Error fetching project details:", err);
        connection.release();
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        // Project with the given projectId not found
        connection.release();
        return res.status(404).json({ error: "Project not found" });
      }

      const projectDetails = {
        projectData: results[0],
        projectLocations: results[0].projectLocations ? results[0].projectLocations.split(",") : [],
        projectSDGs: results[0].projectSDGs ? results[0].projectSDGs.split(",") : [],
        projectSkills: results[0].projectSkills ? results[0].projectSkills.split(",") : [],
        projectInterests: results[0].projectInterests ? results[0].projectInterests.split(",") : [],
        assignedStaff: results[0].assignedStaff ? results[0].assignedStaff.split(",") : [],
      };

      // Send the project details in the response
      console.log(projectDetails);
      return res.status(200).json(projectDetails);
    });
  });


//----Analytics--------

// Define the API endpoint for fetching user data
app.get('/api/userType', (req, res) => {
  const query = 'SELECT role, COUNT(*) as count FROM User GROUP BY role';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/donations', (req, res) => {
  const query = 'SELECT donorId, tempDonorId FROM Donation';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching donation data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      const registeredDonorsCount = results.filter((item) => item.donorId !== null).length;
      const unregisteredDonorsCount = results.filter((item) => item.tempDonorId !== null).length;

      res.json({
        registeredDonorsCount,
        unregisteredDonorsCount,
      });
    }
  });
});

// Endpoint to fetch total volunteers count
app.get('/api/totalDonations', (req, res) => {
  const query = 'SELECT SUM(donationAmount) AS totalDonation FROM Donation;;';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total volunteers:', err);
      res.status(500).json({ error: 'Error fetching total volunteers' });
      return;
    }

    const totalDonations = results[0].totalDonation || 0;
    res.json({ totalDonations });
  });
});

// Endpoint to fetch total donations
app.get('/api/averageDonation', (req, res) => {
  const query = 'SELECT AVG(donationAmount) AS averageDonation FROM Donation;';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching average donation:', err);
      res.status(500).json({ error: 'Error fetching total donations' });
      return;
    }

    const averageDonation = results[0].averageDonation;

    // Convert the string to a floating-point number and then format it with two decimal places.
    const formattedAverageDonation = parseFloat(averageDonation).toFixed(2);

    res.json({ averageDonation: formattedAverageDonation });
  });
});





// Endpoint to fetch total volunteers count
app.get('/api/totalVolunteers', (req, res) => {
  const query = 'SELECT COUNT(*) AS totalVolunteers FROM Volunteer;';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total volunteers:', err);
      res.status(500).json({ error: 'Error fetching total volunteers' });
      return;
    }

    const totalVolunteers = results[0].totalVolunteers || 0;
    res.json({ totalVolunteers });
  });
});

// Endpoint to fetch total donors count
app.get('/api/totalDonorsCount', (req, res) => {
  const query = 'SELECT COUNT(*) AS totalDonorsCount FROM RegisteredDonor;';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total donors count:', err);
      res.status(500).json({ error: 'Error fetching total donors count' });
      return;
    }

    const totalDonorsCount = results[0].totalDonorsCount || 0;
    res.json({ totalDonorsCount });
  });
});

// Endpoint to fetch total staff count
app.get('/api/totalStaffs', (req, res) => {
  const query = 'SELECT COUNT(*) AS totalStaffsCount FROM Staff;';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total staff count:', err);
      res.status(500).json({ error: 'Error fetching total staff count' });
      return;
    }

    const totalStaffsCount = results[0].totalStaffsCount || 0;
    res.json({ totalStaffsCount });
  });
});

// Endpoint to fetch total donors count
app.get('/api/totalDonors', (req, res) => {
  const query = 'SELECT COUNT(*) AS totalDonors FROM Donation;';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total donors count:', err);
      res.status(500).json({ error: 'Error fetching total donors count' });
      return;
    }

    const totalDonors = results[0].totalDonors|| 0;
    res.json({ totalDonors });
  });
});

// Endpoint to fetch total suggested count
app.get('/api/totalSuggested', (req, res) => {
  // SQL query to fetch the summation total count of "Assigned" status from all three tables
  const query = `
  SELECT SUM(total_count) AS total_suggested_count FROM (
    SELECT COUNT(*) AS total_count
    FROM Project_Volunteer
    WHERE Assigment_Status = 'Suggested'
    
    UNION ALL
    
    SELECT COUNT(*) AS total_count
    FROM Activity_Volunteer
    WHERE Assigment_Status = 'Suggested'
    
    UNION ALL
    
    SELECT COUNT(*) AS total_count
    FROM Event_Volunteer
    WHERE Assigment_Status = 'Suggested'
  ) AS suggested_counts;  
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total Suggested count:', err);
      res.status(500).json({ error: 'Error fetching total Suggested count' });
      return;
    }

    const totalSuggested = results[0].total_suggested_count || 0;
    console.log(totalSuggested);
    res.json({ totalSuggested });
  });
});

// Endpoint to fetch total suggested count
app.get('/api/totalAssigned', (req, res) => {
  // SQL query to fetch the summation total count of "Assigned" status from all three tables
  const query = `
  SELECT SUM(total_count) AS total_assigned_count FROM (
    SELECT COUNT(*) AS total_count
    FROM Project_Volunteer
    WHERE Assigment_Status = 'Assigned'
    
    UNION ALL
    
    SELECT COUNT(*) AS total_count
    FROM Activity_Volunteer
    WHERE Assigment_Status = 'Assigned'
    
    UNION ALL
    
    SELECT COUNT(*) AS total_count
    FROM Event_Volunteer
    WHERE Assigment_Status = 'Assigned'
  ) AS assigned_counts;
  
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total assigned count:', err);
      res.status(500).json({ error: 'Error fetching total assigned count' });
      return;
    }

    const totalAssigned = results[0].total_assigned_count || 0;
    console.log(totalAssigned);
    res.json({ totalAssigned });
  });
});

// Endpoint to fetch total suggested count
app.get('/api/totalCancelled', (req, res) => {
  // SQL query to fetch the summation total count of "Assigned" status from all three tables
  const query = `
  SELECT SUM(total_count) AS total_cancelled_count FROM (
    SELECT COUNT(*) AS total_count
    FROM Project_Volunteer
    WHERE Assigment_Status = 'Cancelled'
    
    UNION ALL
    
    SELECT COUNT(*) AS total_count
    FROM Activity_Volunteer
    WHERE Assigment_Status = 'Cancelled'
    
    UNION ALL
    
    SELECT COUNT(*) AS total_count
    FROM Event_Volunteer
    WHERE Assigment_Status = 'Cancelled'
  ) AS cancelled_counts;
  
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total Cancelled count:', err);
      res.status(500).json({ error: 'Error fetching total Cancelled count' });
      return;
    }

    const totalCancelled = results[0].total_cancelled_count || 0;
    console.log(totalCancelled);
    res.json({ totalCancelled });
  });
});

// Inside your existing backend code...

app.get('/api/donation-chart-data', (req, res) => {
  const query = 'SELECT donationAmount, donationDate FROM Donation';
  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching donation data:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Define the route to retrieve monthly donation data
app.get('/monthly-donations', (req, res) => {
  const query = `
  SELECT 
  monthYear,
  SUM(donationAmount) AS totalDonation
FROM 
  (
    SELECT 
      CONCAT(MONTH(donationDate), '-', YEAR(donationDate)) AS monthYear,
      donationAmount
    FROM 
      Donation
  ) AS subquery
GROUP BY 
  monthYear
ORDER BY 
  STR_TO_DATE(monthYear, '%m-%Y'); 

  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving monthly donation data:', error);
      res.status(500).json({ error: 'An error occurred while retrieving data.' });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/getTopDonors", (req, res) => {
  const query = `
  SELECT 
  RD.donorId,
  RD.fullname AS donorName,
  SUM(D.donationAmount) AS totalDonationAmount
  FROM
    RegisteredDonor AS RD
  LEFT JOIN
    Donation AS D ON RD.donorId = D.donorId
  GROUP BY
    RD.fullname, RD.donorId
  ORDER BY
    totalDonationAmount DESC
  LIMIT 5;
  `;

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing the query: ", err);
      res.status(500).json({ error: "Error fetching top donors." });
      return;
    }

    res.json(result);
  });
});

app.get("/api/getTopUnRegisteredDonors", (req, res) => {
  const query = `
  SELECT
  u.fullname,
  u.nicNo,
  SUM(d.donationAmount) AS totalDonationAmount
FROM
  UnRegisteredDonor u
LEFT JOIN
  Donation d ON u.tempDonorId = d.tempDonorId
GROUP BY
  u.fullname,
  u.nicNo
  ORDER BY
    totalDonationAmount DESC
  LIMIT 5;
  `;

  connection.query(query, (err, result) => {
    if (err) {
      console.error("Error executing the query: ", err);
      res.status(500).json({ error: "Error fetching top donors." });
      return;
    }

    res.json(result);
  });
});

// API endpoint to retrieve the count of donationFor categories
app.get('/donationForCounts', (req, res) => {
  const sql = `SELECT donationFor, COUNT(*) AS count FROM Donation GROUP BY donationFor`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      // Process the query results and create an object with donationFor counts
      const donationCounts = {};
      for (const result of results) {
        donationCounts[result.donationFor] = result.count;
      }

      res.json(donationCounts);
    }
  });
});

// API endpoint to get the top assigned volunteers
app.get('/api/topAssignedVolunteers', (req, res) => {
  const query = `
    SELECT V.volunteerId, U.username, COUNT(*) AS CountOFAssignment
    FROM Volunteer V
    JOIN User U ON V.userId = U.userId
    JOIN (
      SELECT projectId, volunteerId
      FROM Project_Volunteer
      WHERE Assigment_Status = 'Assigned'
      UNION ALL
      SELECT activityId, volunteerId
      FROM Activity_Volunteer
      WHERE Assigment_Status = 'Assigned'
      UNION ALL
      SELECT eventId, volunteerId
      FROM Event_Volunteer
      WHERE Assigment_Status = 'Assigned'
    ) AS AV ON V.volunteerId = AV.volunteerId
    GROUP BY V.volunteerId, U.username
    ORDER BY CountOFAssignment DESC
    LIMIT 5;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the SQL query: ', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Define the API route to fetch the top assigned staff details
app.get('/api/topAssignedStaff', (req, res) => {
  const query = `
    SELECT S.staffId, S.fullname, 
      (SELECT COUNT(*) FROM Staff_Projects SP WHERE SP.staffId = S.staffId) +
      (SELECT COUNT(*) FROM Staff_Activity SA WHERE SA.staffId = S.staffId) +
      (SELECT COUNT(*) FROM Staff_Event SE WHERE SE.staffId = S.staffId) AS CountOfAssignments
    FROM Staff S
    ORDER BY CountOfAssignments DESC
    LIMIT 5;
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing the query: ', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    res.json(results.map((staff) => ({ ...staff, CountOfAssignments: staff.CountOfAssignments })));
  });
});

// Route to get skills distribution
app.get('/skillsDistribution', (req, res) => {
  const sql = `SELECT skill, COUNT(*) AS count FROM Volunteer_Skills GROUP BY skill`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch skills distribution data from the database' });
    } else {
      const skillsDistribution = results.map((result) => ({
        skill: result.skill,
        count: result.count,
      }));
      res.json(skillsDistribution);
    }
  });
});

// Route to get interests distribution
app.get('/interestsDistribution', (req, res) => {
  const sql = `SELECT interest, COUNT(*) AS count FROM Volunteer_Interests GROUP BY interest`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch interests distribution data from the database' });
    } else {
      const interestsDistribution = results.map((result) => ({
        interest: result.interest,
        count: result.count,
      }));
      res.json(interestsDistribution);
    }
  });
});

// Route to get hometown distribution
app.get('/homeTownDistribution', (req, res) => {
  const sql = `SELECT homeTown, COUNT(*) AS count FROM Volunteer GROUP BY homeTown`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch hometown distribution data from the database' });
    } else {
      const hometownDistribution = results.map((result) => ({
        homeTown: result.homeTown,
        count: result.count,
      }));
      res.json(hometownDistribution);
    }
  });
});

// Route to get assignments per project
app.get('/assignmentsPerProject', (req, res) => {
  const sql = `
    SELECT projectId, COUNT(volunteerId) AS assignmentsCount 
    FROM Project_Volunteer 
    GROUP BY projectId
  `;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch assignments per project data from the database' });
    } else {
      const assignmentsPerProject = results.map((result) => ({
        projectId: result.projectId,
        assignmentsCount: result.assignmentsCount,
      }));
      res.json(assignmentsPerProject);
    }
  });
});

// Route to get project assignments data
app.get('/projectAssignments', (req, res) => {
  const sql = `SELECT projectId, COUNT(*) AS count FROM Project_Volunteer GROUP BY projectId`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch project assignments data from the database' });
    } else {
      const projectAssignments = results.map((result) => ({
        projectId: result.projectId,
        count: result.count,
      }));
      res.json(projectAssignments);
    }
  });
});

// Route to get activity assignments data
app.get('/activityAssignments', (req, res) => {
  const sql = `SELECT activityId, COUNT(*) AS count FROM Activity_Volunteer GROUP BY activityId`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch activity assignments data from the database' });
    } else {
      const activityAssignments = results.map((result) => ({
        activityId: result.activityId,
        count: result.count,
      }));
      res.json(activityAssignments);
    }
  });
});

// Route to get event assignments data
app.get('/eventAssignments', (req, res) => {
  const sql = `SELECT eventId, COUNT(*) AS count FROM Event_Volunteer GROUP BY eventId`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch event assignments data from the database' });
    } else {
      const eventAssignments = results.map((result) => ({
        eventId: result.eventId,
        count: result.count,
      }));
      res.json(eventAssignments);
    }
  });
});

// Route to get combined assignments data
app.get('/combinedAssignments', (req, res) => {
  const projectSql = `SELECT 'project' AS assignmentType, projectId AS id, COUNT(*) AS count FROM Project_Volunteer GROUP BY projectId`;
  const activitySql = `SELECT 'activity' AS assignmentType, activityId AS id, COUNT(*) AS count FROM Activity_Volunteer GROUP BY activityId`;
  const eventSql = `SELECT 'event' AS assignmentType, eventId AS id, COUNT(*) AS count FROM Event_Volunteer GROUP BY eventId`;

  const combinedSql = `${projectSql} UNION ALL ${activitySql} UNION ALL ${eventSql}`;

  connection.query(combinedSql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch combined assignments data from the database' });
    } else {
      const combinedAssignments = results.map((result) => ({
        assignmentType: result.assignmentType,
        id: result.id,
        count: result.count,
      }));
      res.json(combinedAssignments);
    }
  });
});

// Route to get total number of volunteers for projects, activities, and events
app.get('/volunteersPerCategory', (req, res) => {
  const projectSql = `SELECT 'project' AS category, COUNT(DISTINCT volunteerId) AS count FROM Project_Volunteer`;
  const activitySql = `SELECT 'activity' AS category, COUNT(DISTINCT volunteerId) AS count FROM Activity_Volunteer`;
  const eventSql = `SELECT 'event' AS category, COUNT(DISTINCT volunteerId) AS count FROM Event_Volunteer`;

  const combinedSql = `${projectSql} UNION ALL ${activitySql} UNION ALL ${eventSql}`;

  connection.query(combinedSql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      const data = {};
      results.forEach((result) => {
        data[result.category] = result.count;
      });
      res.json(data);
    }
  });
});

app.get('/api/totalAssignments', (req, res) => {
  const query = 'SELECT SUM(assignments) AS totalAssignments FROM (SELECT COUNT(*) AS assignments FROM Staff_Projects UNION ALL SELECT COUNT(*) AS assignments FROM Staff_Activity UNION ALL SELECT COUNT(*) AS assignments FROM Staff_Event) AS totalAssignmentsTable;';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total assignments count:', err);
      res.status(500).json({ error: 'Error fetching total assignments count' });
      return;
    }

    const totalAssignments = results[0].totalAssignments || 0;
    res.json({ totalAssignments });
  });
});

app.get('/staffsPerCategory', (req, res) => {
  const projectSql = `SELECT 'project' AS category, COUNT(DISTINCT staffId) AS count FROM Staff_Projects`;
  const activitySql = `SELECT 'activity' AS category, COUNT(DISTINCT staffId) AS count FROM Staff_Activity`;
  const eventSql = `SELECT 'event' AS category, COUNT(DISTINCT staffId) AS count FROM Staff_Event`;

  const combinedSql = `${projectSql} UNION ALL ${activitySql} UNION ALL ${eventSql}`;

  connection.query(combinedSql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      const data = {};
      results.forEach((result) => {
        data[result.category] = result.count;
      });
      res.json(data);
    }
  });
});

// Route to get total number of staff members per project
app.get('/staffProjectAssignments', (req, res) => {
  const sql = `SELECT projectId, COUNT(DISTINCT staffId) AS count FROM Staff_Projects GROUP BY projectId`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      res.json(results);
    }
  });
});

// Route to get total number of staff members per activity
app.get('/staffActivityAssignments', (req, res) => {
  const sql = `SELECT activityId, COUNT(DISTINCT staffId) AS count FROM Staff_Activity GROUP BY activityId`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      res.json(results);
    }
  });
});

// Route to get total number of staff members per event
app.get('/staffEventAssignments', (req, res) => {
  const sql = `SELECT eventId, COUNT(DISTINCT staffId) AS count FROM Staff_Event GROUP BY eventId`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Failed to fetch data from the database' });
    } else {
      res.json(results);
    }
  });
});

app.get('/api/currency-conversion', async (req, res) => {
  try {
    const response = await axios.get(
      'https://www.paypal.com/smarthelp/currency-conversion?fromCountry=US&toCountry=LK&fromPaymentCurrency=USD&toTransCurrency=LKR&tType=FX_ON_BALANCE_TRANSFER&transAmount=1&component=helpcenternodeweb'
    );

    if (response.data && response.data.result) {
      console.log(response.data.result);
      res.json(response.data.result);
    } else {
      console.error('Error fetching currency conversion rate: Invalid API response');
      res.status(500).json({ error: 'Invalid API response' });
    }
  } catch (error) {
    console.error('Error fetching currency conversion rate:', error.message);
    res.status(500).json({ error: 'Failed to fetch currency conversion rate' });
  }
});

// Route to fetch projects from the database
app.get('/api/projectTree', (req, res) => {
  // Execute a SQL query to fetch projects
  const query = 'SELECT * FROM Project';

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ error: 'Error fetching projects' });
    } else {
      res.status(200).json(results);
    }
  });
});

// Sample endpoint to retrieve donations by project
app.get('/api/donationsByProject', (req, res) => {
  const query = `
    SELECT Project.projectId, Project.projectName, 
           COUNT(Donation.donationId) AS donationCount, 
           SUM(Donation.donationAmount) AS totalDonationAmount, 
           Project.goalAmount
    FROM Project
    LEFT JOIN Donation ON Project.projectId = Donation.projectId
    GROUP BY Project.projectId, Project.projectName, Project.goalAmount;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching donations by project:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Sample endpoint to retrieve donations by activity
app.get('/api/donationsByActivity', (req, res) => {
  const query = `
    SELECT Activity.activityId, Activity.activityName, 
           COUNT(Donation.donationId) AS donationCount, 
           SUM(Donation.donationAmount) AS totalDonationAmount, 
           Activity.goalAmount
    FROM Activity
    LEFT JOIN Donation ON Activity.activityId = Donation.activityId
    GROUP BY Activity.activityId, Activity.activityName, Activity.goalAmount;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error fetching donations by activity:', error);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(results);
    }
  });
});

// Route to get donation details
app.get("/api/donationsDetails", (req, res) => {
  const query = `
    SELECT * FROM Donation;
  `;

  connection.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching donation details:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json(results);
    }
  });
});



























