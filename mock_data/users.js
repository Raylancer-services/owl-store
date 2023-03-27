const bcrypt = require("bcryptjs");

const users = [
  {
    username: "Floki",
    email_id: "floki@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "ROLE_SELLER",
  },
  {
    username: "Bjorn Ironside",
    email_id: "bjorn@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "ROLE_SELLER",
  },
  {
    username: "Admin User",
    email_id: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "ROLE_ADMIN",
  },
  {
    username: "John Doe",
    email_id: "john@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "ROLE_USER",
  },
  {
    username: "Rollo",
    email_id: "rollo@example.com",
    password: bcrypt.hashSync("123456", 10),
    role: "ROLE_USER",
  },
];

module.exports = users;
