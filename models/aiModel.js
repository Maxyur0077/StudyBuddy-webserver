const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI("AIzaSyCoDmYcJM0jE-BvnCINEy9jwjTY27vIhLQ");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Simulated formatting function
const formatResponse = (responseText) => {
  // Example of applying formatting (using bullet points or numbered lists)
  const formattedText = responseText
    .replace(/\*\*(.*?)\*\*/g, '• $1')  // Convert bold text to bullet points
    .replace(/(\*\s.*)/g, '$1')          // Keep existing bullet points
    .replace(/(I am a|Here are some)/g, '\n$1') // Add paragraph spacing before key sentences

    .replace(/\*(.*?)\*/g, '\n1. $1') // Number other important points
    .replace(/(:\s+)/g, ': \n'); // Add spacing after colons for clearer formatting

  return formattedText;
};

const generate = async (prompt) => {
  try {
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Apply formatting to the response text
    const formattedText = formatResponse(responseText);

    // Output formatted response
    console.log(formattedText);
    return formattedText;
  } catch (error) {
    console.error(error);
  }
};

module.exports = generate;
