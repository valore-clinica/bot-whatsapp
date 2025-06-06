const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
  authStrategy: new LocalAuth({ dataPath: './session' }),
  puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

// QR Code Simples
client.on('qr', qr => qrcode.generate(qr, { small: true }));

// Quando estiver pronto
client.on('ready', () => console.log('✅ Bot pronto para atendimento!'));

// Respostas Humanizadas
client.on('message', async msg => {
  const texto = msg.body.toLowerCase();
  const nome = msg._data.notifyName || '';

  // Menu Principal
  if (texto.includes('oi') || texto.includes('olá')) {
    msg.reply(`*Olá ${nome}!* 😊 Eu sou o assistente virtual da *Clínica Valore*.\n
Escolha uma opção:\n
1️⃣ *CLAREAMENTO* - Valores e informações\n
2️⃣ *FACETAS* - Sobre lentes de resina\n
3️⃣ *BOTOX* - Para bruxismo e harmonização\n
4️⃣ *BIOESTIMULADORES* - Tratamentos com colágeno\n
5️⃣ *AGENDAR* - Marcar consulta\n
6️⃣ *DÚVIDAS* - Falar com a Cristina`);
  }

  // Respostas Específicas
  else if (texto.includes('1') || texto.includes('clareamento')) {
    msg.reply(`💎 *Clareamento Dental* 💎\n
- *Valor:* R$ 499,90 (à vista) ou 3x R$ 166,63\n
- *Duração:* 3 sessões de 1h\n
- *Resultado:* Perceptível na primeira sessão\n
\nGostaria de agendar? Digite *AGENDAR*`);
  }

  else if (texto.includes('2') || texto.includes('facetas')) {
    msg.reply(`✨ *Facetas em Resina* ✨\n
- *Valor:* R$ 189,90 por dente (combo para 10+ dentes)\n
- *Duração:* 2 consultas\n
\nGostaria de agendar? Digite *AGENDAR*`);
  }

  else if (texto.includes('3') || texto.includes('botox')) {
    msg.reply(`*Aplicação de BOTOX*\n
- *Valor:* R$ 699,90 (4 regiões)\n
- *Duração:* 40 min\n
- *Resultado:* início com 7 dias pós aplicação\n
\nGostaria de agendar? Digite *AGENDAR*`);
  }

  else if (texto.includes('4') || texto.includes('colágeno')) {
    msg.reply(`*BIOESTIMULADORES DE COLÁGENO*\n
- *Valor:* R$ 1.899,90 (por sessão)\n
- *Duração:* 1 hora\n
- *Resultado:* início com 90 dias pós aplicação\n
\nGostaria de agendar? Digite *AGENDAR*`);
  }

else if (texto.includes('5') || texto.includes('agendar')) {
  msg.reply(`📅 *AGENDAMENTO* 📅\n
Por segurança, nossa *assistente Cristina* vai finalizar seu agendamento:\n
📲 *Chame no WhatsApp:* 81 98558-0067\n
⏳ Horários disponíveis:\n
- Segunda a sexta: 8h às 18h`);
}

  else if (texto.includes('6') || texto.includes('cristina') || texto.includes('dúvida')) {
    msg.reply(`👩‍💼 *CRISTINA* - Assistente pessoal\n
*WhatsApp:* 81 98558-0067\n
Ela vai te ajudar com:\n
- Agendamentos\n
- Formas de pagamento\n
- Dúvidas pessoais\n
\n*Horário de atendimento:* 
- Segunda a sexta: 8h às 18h`);
  }

  else {
    msg.reply(`🤔 *Opção não entendida*, ${nome}! Digite:\n
*MENU* - Para ver opções novamente\n
*ATENDENTE* - Para falar com a Cristina`);
  }
});

client.initialize();