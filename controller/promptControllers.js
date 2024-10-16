const { client } = require("../database/db");// Import your db connection

const savePromptAndResponse = async (req, res) => {
    const { user_id, prompt, response } = req.body;
  
    if (!user_id || !prompt || !response) {
      return res.status(400).json({ error: 'user_id, prompt, and response are required.' });
    }
  
    try {
      const result = await client.query(
        `INSERT INTO prompts (user_id, prompt, response) 
         VALUES ($1, $2, $3) RETURNING *`,
        [user_id, prompt, response]
      );
  
      res.status(201).json({ message: 'Prompt and response saved successfully', data: result.rows[0] });
    } catch (err) {
      console.error('Error saving prompt and response:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    savePromptAndResponse,
  };
  