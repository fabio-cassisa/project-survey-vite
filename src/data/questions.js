const questions = [
  {
    type: "range",
    text: "On a scale from 1 to 10, how would you rate your knowledge of JavaScript?",
  },
  {
    type: "radio",
    text: "Have you researched the freelance market for JavaScript programmers?",
    options: ["Yes", "No", "Somewhat"],
  },
  {
    type: "dropdown",
    text: "Do you have a consultant CV tailored for JavaScript projects?",
    options: ["Yes", "No", "In progress"],
  },
  {
    type: "radio",
    text: "Have you sent your CV to brokers to gauge the market?",
    options: ["Yes", "No", "Somewhat"],
  },
  {
    type: "radio",
    text: "Do you have a plan for managing bookkeeping?",
    options: ["Yes", "No", "Somewhat"],
  },
  {
    type: "radio",
    text: "Have you chosen a business name?",
    options: ["Yes", "No"],
  },
  {
    type: "checkbox",
    text: "Which of these tasks have you completed?",
    options: [
      "Registered business",
      "Aware of tax obligations",
      "Resignation ready",
      "Strategy for projects",
      "Setup a business account",
    ],
  },
  {
    type: "radio",
    text: "Are you prepared for client interviews and contract negotiations?",
    options: ["Yes", "No", "Somewhat"],
  },
  {
    type: "radio",
    text: "Do you have a portfolio demonstrating your JavaScript skills and completed projects?",
    options: ["Yes", "No", "In progress"],
  },
  {
    type: "newsletter",
    text: "Would you like to receive the latest tips, trends, and opportunities in the world of freelancing? Subscribe to our newsletter and stay ahead in your freelancing journey. Your success is our mission! 🚀",
  },
];

export default questions;
