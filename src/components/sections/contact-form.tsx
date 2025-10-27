import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { X, Send, Loader2 } from "lucide-react";

export default function ContactForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      /*
      await base44.integrations.Core.SendEmail({
        to: 'jordi@example.com',
        subject: `Nuevo mensaje de ${formData.firstName} ${formData.lastName}`,
        body: `
          Nombre: ${formData.firstName} ${formData.lastName}
          Email: ${formData.email}
          
          Mensaje:
          ${formData.message}
        `
      });
*/

      setSent(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    } finally {
      setSending(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", damping: 25, stiffness: 300 }}
      className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl overflow-hidden"
    >
      {/* Botón cerrar */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      <div className="p-8 md:p-12">
        {!sent ? (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-light text-gray-800 mb-2">
                Envíame un mensaje
              </h2>
              <p className="text-gray-500">
                Me encantaría saber de ti. Completa el formulario y te
                responderé pronto.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-gray-700">
                    Nombre
                  </Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    placeholder="Tu nombre"
                    required
                    className="border-gray-300 focus:border-[#2D4A6B] focus:ring-[#2D4A6B]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-gray-700">
                    Apellido
                  </Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    placeholder="Tu apellido"
                    required
                    className="border-gray-300 focus:border-[#2D4A6B] focus:ring-[#2D4A6B]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">
                  Correo electrónico
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="tu@email.com"
                  required
                  className="border-gray-300 focus:border-[#2D4A6B] focus:ring-[#2D4A6B]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-gray-700">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="Escribe tu mensaje aquí..."
                  rows={6}
                  required
                  className="border-gray-300 focus:border-[#2D4A6B] focus:ring-[#2D4A6B] resize-none"
                />
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  className="px-6"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={sending}
                  className="bg-[#2D4A6B] hover:bg-[#1F3447] text-white px-8"
                >
                  {sending ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar mensaje
                    </>
                  )}
                </Button>
              </div>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-light text-gray-800 mb-2">
              ¡Mensaje enviado!
            </h3>
            <p className="text-gray-500">Te responderé lo antes posible.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
