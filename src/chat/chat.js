import { appendMessage } from './message-handler.js';
import { getAIResponse } from './ai-service.js';

export function initChat(editor) {
    const chatPanel = document.getElementById('chat-panel');
    const toggleButton = document.getElementById('toggle-chat');
    const sendButton = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');

    toggleButton.addEventListener('click', () => {
        chatPanel.classList.toggle('hidden');
    });

    sendButton.addEventListener('click', async () => {
        const message = chatInput.value.trim();
        if (!message) return;

        appendMessage('user', message);
        chatInput.value = '';

        try {
            const response = await getAIResponse(message);
            if (response.error) {
                appendMessage('system', `Error: ${response.error}`);
            } else {
                appendMessage('assistant', response.content);
            }
        } catch (error) {
            appendMessage('system', `Unexpected error ${error.message}`);
        }
    });
}
