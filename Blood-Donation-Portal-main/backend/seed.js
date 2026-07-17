const Donation = require("./models/Donation");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder("ipv4first");
}

require("dotenv").config();

console.log("Loaded Mongo URI:", process.env.MONGODB_URI);

const mongoose = require("mongoose");
const connectDB = require("./config/db");

const Match = require("./models/Match");

const User = require("./models/User");
const Donor = require("./models/Donor");
const Request = require("./models/Request");

const seedDatabase = async () => {
  try {
    console.log("🗑 Removing old data...");

    await User.deleteMany({});
    await Donor.deleteMany({});
    await Request.deleteMany({});
    await Donation.deleteMany({});

    console.log("✅ Old data removed.");

    // ==========================
    // ADMIN USER
    // ==========================

    await User.create({
      name: "System Administrator",
      email: "admin@bloodportal.com",
      phoneNo: "9999999999",
      password: "Admin@123",
      role: "admin",
      isVerified: true,
    });

    console.log("✅ Admin Created");

    // ==========================
    // RECIPIENT USERS
    // ==========================

    const recipientData = [
      {
        name: "Sonu Kumar",
        email: "sonu@gmail.com",
        phoneNo: "9876500001",
      },
      {
        name: "Rahul Singh",
        email: "rahul@gmail.com",
        phoneNo: "9876500002",
      },
      {
        name: "Priya Reddy",
        email: "priya@gmail.com",
        phoneNo: "9876500003",
      },
      {
        name: "Kavya Sharma",
        email: "kavya@gmail.com",
        phoneNo: "9876500004",
      },
      {
        name: "Mahesh Kumar",
        email: "mahesh@gmail.com",
        phoneNo: "9876500005",
      },
      {
        name: "Sneha Patel",
        email: "sneha@gmail.com",
        phoneNo: "9876500006",
      },
      {
        name: "Ramesh Naidu",
        email: "ramesh@gmail.com",
        phoneNo: "9876500007",
      },
      {
        name: "Aarav Verma",
        email: "aarav@gmail.com",
        phoneNo: "9876500008",
      },
      {
        name: "Anjali Devi",
        email: "anjali@gmail.com",
        phoneNo: "9876500009",
      },
    ];

    const recipients = [];

    for (const user of recipientData) {
      const createdUser = await User.create({
        ...user,
        password: "Password123",
        role: "recipient",
        isVerified: true,
      });

      recipients.push(createdUser);
    }

    console.log("✅ 9 Recipient Users Created");

    // ==========================
// DONOR USERS
// ==========================


const donorData = [
  { name: "Arjun Rao", email: "arjun@gmail.com", phoneNo: "9000000001" },
  { name: "Vikram Sharma", email: "vikram@gmail.com", phoneNo: "9000000002" },
  { name: "Deepak Kumar", email: "deepak@gmail.com", phoneNo: "9000000003" },
  { name: "Harsha Reddy", email: "harsha@gmail.com", phoneNo: "9000000004" },
  { name: "Rohit Patel", email: "rohit@gmail.com", phoneNo: "9000000005" },
  { name: "Akash Singh", email: "akash@gmail.com", phoneNo: "9000000006" },
  { name: "Naveen Kumar", email: "naveen@gmail.com", phoneNo: "9000000007" },
  { name: "Sai Teja", email: "saiteja@gmail.com", phoneNo: "9000000008" },
  { name: "Kiran Kumar", email: "kiran@gmail.com", phoneNo: "9000000009" },
  { name: "Manoj Reddy", email: "manoj@gmail.com", phoneNo: "9000000010" },

  { name: "Ravi Kumar", email: "ravi@gmail.com", phoneNo: "9000000011" },
  { name: "Ajay Sharma", email: "ajay@gmail.com", phoneNo: "9000000012" },
  { name: "Nikhil Verma", email: "nikhil@gmail.com", phoneNo: "9000000013" },
  { name: "Suresh Reddy", email: "suresh@gmail.com", phoneNo: "9000000014" },
  { name: "Karthik Rao", email: "karthik@gmail.com", phoneNo: "9000000015" },
  { name: "Praveen Kumar", email: "praveen@gmail.com", phoneNo: "9000000016" },
  { name: "Vamsi Krishna", email: "vamsi@gmail.com", phoneNo: "9000000017" },
  { name: "Tarun Patel", email: "tarun@gmail.com", phoneNo: "9000000018" },
  { name: "Gopal Naidu", email: "gopal@gmail.com", phoneNo: "9000000019" },
  { name: "Yash Mehta", email: "yash@gmail.com", phoneNo: "9000000020" }
];

const donorUsers = [];

for (const donor of donorData) {
  const createdDonor = await User.create({
    ...donor,
    password: "Password123",
    role: "donor",
    isVerified: true,
  });

  donorUsers.push(createdDonor);
}

console.log("✅ 20 Donor Users Created");

// ============================
// DONATION RECORDS
// ============================

await Donation.insertMany([
  {
    donorId: donorUsers[0]._id,
    bloodGroup: "O+",
    location: "Madanapalle",
    donationDate: new Date(),
    recipientName: "Emergency Patient",
    status: "completed"
  },
  {
    donorId: donorUsers[1]._id,
    bloodGroup: "A+",
    location: "Bangalore",
    donationDate: new Date(),
    recipientName: "Cardiac Patient",
    status: "completed"
  }
]);

console.log("✅ Donation Records Created");


// ==========================
// DONOR PROFILES
// ==========================

const bloodGroups = [
  "O+","A+","B+","AB+",
  "O-","A-","B-","AB-",
  "O+","A+","B+","AB+",
  "O-","A-","B-","AB-",
  "O+","A+","B+","AB+"
];

const cities = [
  "Hyderabad",
  "Bangalore",
  "Chennai",
  "Mumbai",
  "Delhi",
  "Pune",
  "Visakhapatnam",
  "Vijayawada",
  "Warangal",
  "Mysore",
  "Coimbatore",
  "Nagpur",
  "Kochi",
  "Tirupati",
  "Nellore",
  "Guntur",
  "Rajahmundry",
  "Kurnool",
  "Hubli",
  "Goa"
];

const donorProfiles = [];

for (let i = 0; i < donorUsers.length; i++) {

  const donor = await Donor.create({
    userId: donorUsers[i]._id,
    bloodGroup: bloodGroups[i],
    age: 20 + (i % 20),
    city: cities[i],
    district: cities[i],
    state: "Telangana",
    country: "India",
    location: cities[i],
    availability: i % 4 === 0 ? "not-available" : "available",
    totalDonations: Math.floor(Math.random() * 20),
    lastDonationDate: new Date(
      2026,
      Math.floor(Math.random() * 12),
      Math.floor(Math.random() * 28) + 1
    )
  });

  donorProfiles.push(donor);
}

console.log("✅ 20 Donor Profiles Created");
// ==========================
// BLOOD REQUESTS
// ==========================

const hospitals = [
  {
    hospitalName: "Apollo Hospitals",
    city: "Hyderabad",
    address: "Jubilee Hills, Hyderabad"
  },
  {
    hospitalName: "Yashoda Hospitals",
    city: "Hyderabad",
    address: "Somajiguda, Hyderabad"
  },
  {
    hospitalName: "KIMS Hospital",
    city: "Secunderabad",
    address: "Minister Road, Secunderabad"
  },
  {
    hospitalName: "AIG Hospitals",
    city: "Hyderabad",
    address: "Gachibowli, Hyderabad"
  },
  {
    hospitalName: "Care Hospitals",
    city: "Banjara Hills",
    address: "Road No 10, Hyderabad"
  },
  {
    hospitalName: "Continental Hospital",
    city: "Hyderabad",
    address: "Financial District, Hyderabad"
  },
  {
    hospitalName: "Rainbow Children's Hospital",
    city: "Hyderabad",
    address: "Banjara Hills, Hyderabad"
  },
  {
    hospitalName: "Sunshine Hospital",
    city: "Secunderabad",
    address: "Paradise Circle, Secunderabad"
  },
  {
    hospitalName: "Gandhi Hospital",
    city: "Hyderabad",
    address: "Musheerabad, Hyderabad"
  }
];


const requestData = [
  {
    bloodGroup: "O+",
    status: "fulfilled",
    units: 2,
    urgency: "high",
    description:
      "Emergency blood requirement for accident surgery patient."
  },
  {
    bloodGroup: "A+",
    status: "fulfilled",
    units: 3,
    urgency: "medium",
    description:
      "Blood required for scheduled cardiac operation."
  },
  {
    bloodGroup: "B+",
    status: "fulfilled",
    units: 1,
    urgency: "high",
    description:
      "Critical patient requiring immediate transfusion."
  },
  {
    bloodGroup: "AB+",
    status: "fulfilled",
    units: 2,
    urgency: "medium",
    description:
      "Blood needed for cancer treatment procedure."
  },
  {
    bloodGroup: "O-",
    status: "fulfilled",
    units: 4,
    urgency: "critical",
    description:
      "Emergency trauma case requiring rare blood group."
  },
  {
    bloodGroup: "A-",
    status: "pending",
    units: 2,
    urgency: "high",
    description:
      "Patient admitted for major surgery."
  },
  {
    bloodGroup: "B-",
    status: "pending",
    units: 3,
    urgency: "medium",
    description:
      "Blood requirement for accident victim."
  },
  {
    bloodGroup: "AB-",
    status: "pending",
    units: 1,
    urgency: "high",
    description:
      "Rare blood group required urgently."
  },
  {
    bloodGroup: "O+",
    status: "cancelled",
    units: 2,
    urgency: "low",
    description:
      "Request cancelled as blood was arranged."
  }
];


const bloodRequests = [];


for(let i = 0; i < hospitals.length; i++){

  const request = await Request.create({

    userId: recipients[i]._id,

    hospitalName: hospitals[i].hospitalName,

    hospitalAddress: hospitals[i].address,

    location: hospitals[i].city,

    bloodGroupNeeded: requestData[i].bloodGroup,

    unitsRequired: requestData[i].units,

    urgency: requestData[i].urgency,

    status: requestData[i].status,

    description: requestData[i].description,

    contactNumber: "90000000" + (10+i),

    requiredDate: new Date(
      2026,
      6,
      20+i
    )

});


  bloodRequests.push(request);

}


console.log("✅ 9 Blood Requests Created");
// ============================
// MATCHES
// ============================

const matches = await Match.insertMany([
  {
    donorId: donorProfiles[0]._id,
    requestId: bloodRequests[0]._id,
    status: "pending"
  },
  {
    donorId: donorProfiles[1]._id,
    requestId: bloodRequests[1]._id,
    status: "accepted"
  }
]);

console.log("Matches created:", matches.length);

    console.log("🎉 PART 1 COMPLETED");

  } catch (err) {
    console.log(err);
  }
};

const start = async () => {
  await connectDB();
  await seedDatabase();
  await mongoose.connection.close();
  console.log("🎉 Database Seed Completed");
  process.exit(0);
};

start();