const axios = require('axios');
const Env = use('Env');

class ChatbotController {
    async sendMessage({ request, response }) {
        const userMessage = request.input('message');
        const openaiApiKey = Env.get('OPENAI_API_KEY');

        try {
            const openaiResponse = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
                prompt: userMessage,
                max_tokens: 150
            }, {
                headers: {
                    'Authorization': `Bearer ${openaiApiKey}`
                }
            });

            return response.json({ reply: openaiResponse.data.choices[0].text });
        } catch (error) {
            console.error(error);
            return response.status(500).send('Erro ao processar a solicitação');
        }
    }
}

module.exports = ChatbotController;
