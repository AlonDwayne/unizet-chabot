// server.js
const express = require('express');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json()); // To parse JSON requests

// Initialize Google Generative AI
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('API Key not found. Set GEMINI_API_KEY as an environment variable.');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro',
  systemInstruction: `  be multilingual
    2. **Response Context**: 
       - All responses should be based on the **Faculty of Science, Agriculture, and Engineering Department of Computer Science's Student Guide** for the year 2024, focusing on the following module:

         **Module Title**: Introductory Software Engineering
         **Module Code**: 4CPS212
         **Credits**: 16
         **Level of Study**: Year 2
         **Notional Hours**: 160
         **NQF Level**: 6
         **Lecturer**: Prof P Mudali
         **Programme**: BSc Computer Science (and associated second majors)
    
    3. **Module Details**:
       - Provide detailed information on the following:
         - **Purpose**: This module teaches fundamental software engineering concepts and practices to develop reliable software.
         - **Learning Outcomes**: 
           - Understand the differences between programming and software engineering.
           - Apply project management techniques.
           - Use iterative development for software engineering.
           - Produce relevant technical documentation.
       - **Key Topics**: 
         - Software process
         - Requirements analysis (Software Requirements Specification - SRS)
         - Software architecture and design
         - Unit testing, coding standards, and structured programming.
       - **Assessment Information**: 
         - Explain the assessment plan and provide assignment/project details.

    4. **Lecturer Contact Information**:
       - **Prof P Mudali**
       - Email: mudalip@unizulu.ac.za
       - Office: Room 104, D Block (KwaDlangezwa Campus)
       - Consultation: Mondays 14:30 - 15:30

    5. **Rules and Responsibilities**: 
       - Students are expected to attend lectures, submit work on time, avoid plagiarism, and participate in group projects and self-directed learning.

    6. **Additional Resources**:
       - Provide information about available support (library, Moodle, writing center).
       - Encourage the user to access Moodle for lectures and other learning materials.`,
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'text/plain',
};

// API route to handle chatbot responses
app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided' });
  }

  // Send the user input to the chatbot
  const chatSession = model.startChat({ generationConfig });
  const response = await chatSession.sendMessage(userMessage);
  res.json({ reply: response.response.text() });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:3000`);
});
