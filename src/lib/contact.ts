export const WHATSAPP_NUMBER = "5571999999999"; // Substituir pelo número real
export const WHATSAPP_MESSAGE = "Olá Jádson, gostaria de uma análise técnica do meu imóvel.";

export const whatsappLink = (msg = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;