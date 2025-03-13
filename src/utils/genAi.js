// genAi.js

// Import the environment variable
const { GEMINI_API_KEY } = process.env;

// Create the client for interacting with Gemini API
const client = {
    chat: {
        completions: {
            create: async ({ messages, model }) => {
                const response = await fetch('https://generativelanguage.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${GEMINI_API_KEY}`,
                    },
                    body: JSON.stringify({
                        prompt: {
                            text: messages.join("\n"),
                        },
                        model: model,
                    }),
                });

                // Return the JSON response
                return response.json();
            },
        },
    },
};

// Export the client to use in other files
export default client;

// Import the Google Generative AI SDK
// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Fetch the API Key from environment variables
// const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;

// // Create a client instance of Google Generative AI
// const client = new GoogleGenerativeAI(API_KEY);

// // Export the client to use in your other components
// export default client;