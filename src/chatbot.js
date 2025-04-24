document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('chatbot-container');
    if (!container) {
        console.error('Chatbot container not found. Please add <div id="chatbot-container"></div> to your HTML.');
        return;
    }

    // Inject Google Fonts
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;900&family=Orbitron:wght@700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    // Inject Styles
    const style = document.createElement('style');
    style.textContent = `
        .glassmorphism { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(12px); border: 1px solid rgba(255, 255, 255, 0.2); }
        .neon-glow { box-shadow: 0 0 10px rgba(219, 39, 119, 0.8), 0 0 20px rgba(219, 39, 119, 0.4); }
        .hover-scale { transition: transform 0.3s ease; }
        .hover-scale:hover { transform: scale(1.05); }
        .chatbot-message { max-width: 80%; word-break: break-word; }
        .chatbot-message.bot { background: #4b5563; }
        .chatbot-message.user { background: #db2777; margin-left: auto; }
        .chatbot-typing { max-width: 80%; background: #4b5563; color: #ffffff; padding: 8px 12px; border-radius: 12px; font-size: 0.875rem; display: flex; align-items: center; }
        .chatbot-typing::before { content: ''; display: inline-block; width: 6px; height: 6px; background: #ffffff; border-radius: 50%; margin-right: 4px; animation: typing-dot 1.5s infinite; }
        .chatbot-typing::after { content: ''; display: inline-block; width: 6px; height: 6px; background: #ffffff; border-radius: 50%; margin-left: 4px; animation: typing-dot 1.5s infinite 0.3s; }
        #chatbot-messages::-webkit-scrollbar { width: 6px; }
        #chatbot-messages::-webkit-scrollbar-track { background: #1f2937; }
        #chatbot-messages::-webkit-scrollbar-thumb { background: #db2777; border-radius: 3px; }
        body { font-family: 'Poppins', sans-serif; }
        h3 { font-family: 'Orbitron', sans-serif; }
        .powered-by { font-size: 0.75rem; color: #d1d5db; }
        .powered-by a { color: #db2777; text-decoration: underline; }
        .powered-by a:hover { color: #f472b6; }
        @media (max-width: 320px) {
            #chatbot { bottom: 1rem; right: 1rem; }
            #chatbot-toggle { padding: 0.75rem; }
            #chatbot-window { width: 80vw; height: 350px; }
            #chatbot-messages { padding: 0.5rem; }
            .chatbot-message, .chatbot-typing { padding: 0.5rem; font-size: 0.75rem; }
            #chatbot-form input, #chatbot-form button { padding: 0.5rem; }
            #chatbot-form svg { width: 0.875rem; height: 0.875rem; }
            .powered-by { font-size: 0.625rem; }
        }
        @keyframes typing-dot {
            0%, 20% { opacity: 1; }
            40%, 100% { opacity: 0.3; }
        }
        @keyframes ripple {
            0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
            100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Inject HTML
    container.innerHTML = `
        <div id="chatbot" class="fixed bottom-4 right-4 z-50">
            <button id="chatbot-toggle" class="bg-pink-500 text-white p-3 rounded-full neon-glow hover-scale" aria-label="Abrir chat">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-2a2 2 0 012-2h10a2 2 0 012 2v2h-4m-6 0h.01M12 16h.01" />
                </svg>
            </button>
            <div id="chatbot-window" class="hidden glassmorphism w-[90vw] max-w-[360px] h-[400px] sm:h-[500px] rounded-3xl shadow-2xl flex flex-col transform translate-x-full transition-transform duration-300">
                <div class="bg-gray-900 p-3 sm:p-4 rounded-t-3xl flex flex-col">
                    <div class="flex justify-between items-center">
                        <h3 class="text-base sm:text-lg font-bold text-white">ChatBot AI</h3>
                        <button id="chatbot-close" class="text-gray-300 hover:text-pink-500" aria-label="Fechar chat">
                            <svg class="w-5 h-5 sm:w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <p class="powered-by mt-1">Powered by: <a href="https://tecnideia.ao" target="_blank">Tecnideia</a></p>
                </div>
                <div id="chatbot-messages" class="flex-1 p-3 sm:p-4 overflow-y-auto bg-gray-800/50"></div>
                <div class="p-3 sm:p-4 border-t border-gray-700">
                    <form id="chatbot-form" class="flex items-center space-x-2">
                        <label for="chatbot-file" class="cursor-pointer">
                            <svg class="w-5 h-5 text-pink-500 hover:text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 002.828 2.828L18 9.828V15m0 0H9m6-8V3H3v18h18V7h-6z" />
                            </svg>
                            <input type="file" id="chatbot-file" class="hidden" accept=".pdf,.png,.jpg,.jpeg" />
                        </label>
                        <input type="text" id="chatbot-input" class="flex-1 p-2 bg-gray-800 rounded-full text-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Digite sua mensagem..." />
                        <button type="submit" class="bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600" aria-label="Enviar mensagem">
                            <svg class="w-4 h-4 sm:w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-18" />
                            </svg>
                        </button>
                    </form>
                    <p id="file-error" class="text-red-400 text-xs sm:text-sm mt-1 hidden"></p>
                </div>
            </div>
        </div>
    `;

    // Initialize elements
    const toggleBtn = document.getElementById('chatbot-toggle');
    const closeBtn = document.getElementById('chatbot-close');
    const chatWindow = document.getElementById('chatbot-window');
    const form = document.getElementById('chatbot-form');
    const input = document.getElementById('chatbot-input');
    const fileInput = document.getElementById('chatbot-file');
    const messages = document.getElementById('chatbot-messages');
    const fileError = document.getElementById('file-error');

    // Welcome message logic
    let hasWelcomed = sessionStorage.getItem('chatbotWelcomed');
    toggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        chatWindow.classList.toggle('translate-x-full');
        if (!hasWelcomed && !chatWindow.classList.contains('hidden')) {
            setTimeout(() => {
                const welcomeMessage = document.createElement('div');
                welcomeMessage.className = 'chatbot-message bot mb-2 p-2 sm:p-3 rounded-lg text-white text-sm sm:text-base';
                welcomeMessage.textContent = 'Bem-vindo(a)! Estou aqui para ajudar com suas dúvidas. Como posso começar?';
                messages.appendChild(welcomeMessage);
                messages.scrollTop = messages.scrollHeight;
                sessionStorage.setItem('chatbotWelcomed', 'true');
                hasWelcomed = true;
            }, 1000);
        }
    });

    closeBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
        chatWindow.classList.add('translate-x-full');
    });

    // Form submission with typing indicator
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!input.value.trim()) return;

        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message user mb-2 p-2 sm:p-3 rounded-lg text-white text-sm sm:text-base';
        userMessage.textContent = input.value;
        messages.appendChild(userMessage);

        // Add typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-typing mb-2';
        typingIndicator.textContent = 'Digitando...';
        messages.appendChild(typingIndicator);
        messages.scrollTop = messages.scrollHeight;

        // Mock bot response
        setTimeout(() => {
            messages.removeChild(typingIndicator);
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot mb-2 p-2 sm:p-3 rounded-lg text-white text-sm sm:text-base';
            botMessage.textContent = 'Entendido! Como posso ajudar mais?';
            messages.appendChild(botMessage);
            messages.scrollTop = messages.scrollHeight;
        }, 1500);

        input.value = '';
        messages.scrollTop = messages.scrollHeight;
    });

    // File upload handling
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        const maxSize = 5 * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            fileError.textContent = 'Apenas PDF, PNG ou JPG são permitidos.';
            fileError.classList.remove('hidden');
            return;
        }
        if (file.size > maxSize) {
            fileError.textContent = 'O arquivo deve ter no máximo 5MB.';
            fileError.classList.remove('hidden');
            return;
        }
        fileError.classList.add('hidden');

        const fileMessage = document.createElement('div');
        fileMessage.className = 'chatbot-message user mb-2 p-2 sm:p-3 rounded-lg text-white text-sm sm:text-base';
        fileMessage.innerHTML = `
            <a href="#" class="underline">${file.name}</a>
            ${file.type.startsWith('image/') ? `<img src="${URL.createObjectURL(file)}" class="mt-2 max-w-full rounded-lg" alt="Uploaded image" />` : ''}
        `;
        messages.appendChild(fileMessage);

        // Add typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-typing mb-2';
        typingIndicator.textContent = 'Digitando...';
        messages.appendChild(typingIndicator);
        messages.scrollTop = messages.scrollHeight;

        // Mock bot response
        setTimeout(() => {
            messages.removeChild(typingIndicator);
            const botMessage = document.createElement('div');
            botMessage.className = 'chatbot-message bot mb-2 p-2 sm:p-3 rounded-lg text-white text-sm sm:text-base';
            botMessage.textContent = `Recebi o arquivo ${file.name}. Como posso ajudá-lo com isso?`;
            messages.appendChild(botMessage);
            messages.scrollTop = messages.scrollHeight;
        }, 1500);

        fileInput.value = '';
        messages.scrollTop = messages.scrollHeight;
    });

    // Button ripple effect
    document.querySelectorAll('button').forEach((el) => {
        el.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.background = 'rgba(219, 39, 119, 0.3)';
            ripple.style.borderRadius = '50%';
            ripple.style.transform = 'translate(-50%, -50%)';
            ripple.style.animation = 'ripple 0.6s linear';
            const rect = el.getBoundingClientRect();
            ripple.style.width = ripple.style.height = `${Math.max(rect.width, rect.height)}px`;
            ripple.style.left = `${e.clientX - rect.left}px`;
            ripple.style.top = `${e.clientY - rect.top}px`;
            el.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
});