export const WHATSAPP_NUMBER = "5573981365245";
export const WHATSAPP_MESSAGE = "Olá Jádson, gostaria de uma análise técnica do meu imóvel.";
export const CONSULT_MESSAGE = "Olá, quero minha consultoria gratuita sobre regularização de imóvel.";
export const consultLink = () =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(CONSULT_MESSAGE)}`;

export const whatsappLink = (msg = WHATSAPP_MESSAGE) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;