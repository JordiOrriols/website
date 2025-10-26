import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { motion, AnimatePresence } from 'framer-motion';

import MorningSunny from '../components/weather/MorningSunny';
import AfternoonSunny from '../components/weather/AfternoonSunny';
import NightClear from '../components/weather/NightClear';
import RainyScene from '../components/weather/RainyScene';
import ThunderstormScene from '../components/weather/ThunderstormScene';
import Avatar from '../components/Avatar';
import ContactForm from '../components/ContactForm';

export default function Portfolio() {
    const [weather, setWeather] = useState(null);
    const [timeOfDay, setTimeOfDay] = useState('night');
    const [loading, setLoading] = useState(true);
    const [weatherMode, setWeatherMode] = useState('auto');
    const [showContactForm, setShowContactForm] = useState(false);

    useEffect(() => {
        if (weatherMode === 'auto') {
            fetchWeather();
            determineTimeOfDay();
        } else {
            setLoading(false);
        }
    }, [weatherMode]);

    const determineTimeOfDay = () => {
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 12) {
            setTimeOfDay('morning');
        } else if (hour >= 12 && hour < 20) {
            setTimeOfDay('afternoon');
        } else {
            setTimeOfDay('night');
        }
    };

    const fetchWeather = async () => {
        setLoading(true);
        try {
            const response = await base44.integrations.Core.InvokeLLM({
                prompt: 'What is the current weather in Barcelona, Spain? Return only the main weather condition.',
                add_context_from_internet: true,
                response_json_schema: {
                    type: 'object',
                    properties: {
                        condition: {
                            type: 'string',
                            enum: ['clear', 'rain', 'thunderstorm', 'clouds'],
                            description: 'Main weather condition',
                        },
                        temperature: {
                            type: 'number',
                            description: 'Temperature in Celsius',
                        },
                    },
                },
            });
            setWeather(response);
        } catch (error) {
            console.error('Error fetching weather:', error);
            setWeather({ condition: 'clear', temperature: 20 });
        } finally {
            setLoading(false);
        }
    };

    const handleWeatherModeChange = (value) => {
        setWeatherMode(value);

        if (value === 'morning-sunny') {
            setTimeOfDay('morning');
            setWeather({ condition: 'clear' });
        } else if (value === 'afternoon-sunny') {
            setTimeOfDay('afternoon');
            setWeather({ condition: 'clear' });
        } else if (value === 'night-clear') {
            setTimeOfDay('night');
            setWeather({ condition: 'clear' });
        } else if (value === 'rain') {
            setWeather({ condition: 'rain' });
            determineTimeOfDay();
        } else if (value === 'thunderstorm') {
            setWeather({ condition: 'thunderstorm' });
            determineTimeOfDay();
        }
    };

    const getBackgroundComponent = () => {
        const condition = weather?.condition;

        if (!condition) return <NightClear />;

        if (condition === 'thunderstorm') {
            return <ThunderstormScene timeOfDay={timeOfDay} />;
        }

        if (condition === 'rain') {
            return <RainyScene timeOfDay={timeOfDay} />;
        }

        if (timeOfDay === 'morning') {
            return <MorningSunny />;
        } else if (timeOfDay === 'afternoon') {
            return <AfternoonSunny />;
        } else {
            return <NightClear />;
        }
    };

    if (loading && weatherMode === 'auto') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#4A6FA5] to-[#2D4A6B]">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-white animate-spin mx-auto mb-4" />
                    <p className="text-white text-lg">
                        Cargando clima de Barcelona...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Dynamic Background */}
            {getBackgroundComponent()}

            {/* Weather Mode Selector */}
            <div className="absolute top-4 right-4 z-30">
                <Select
                    value={weatherMode}
                    onValueChange={handleWeatherModeChange}
                >
                    <SelectTrigger className="w-56 bg-white/90 backdrop-blur-sm border-white/50 shadow-lg">
                        <SelectValue placeholder="Seleccionar clima" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="auto">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                Auto (Barcelona)
                            </div>
                        </SelectItem>
                        <SelectItem value="morning-sunny">
                            🌅 Mañana Soleada
                        </SelectItem>
                        <SelectItem value="afternoon-sunny">
                            ☀️ Tarde Soleada
                        </SelectItem>
                        <SelectItem value="night-clear">
                            🌙 Noche Despejada
                        </SelectItem>
                        <SelectItem value="rain">🌧️ Lluvia</SelectItem>
                        <SelectItem value="thunderstorm">
                            ⚡ Tormenta
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Cards Container */}
            <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-12">
                <div
                    className="relative w-full max-w-3xl"
                    style={{ perspective: '1000px' }}
                >
                    {/* Profile Card - Con efecto Time Capsule */}
                    <motion.div
                        animate={
                            showContactForm
                                ? {
                                      scale: 0.95,
                                      opacity: 0.3,
                                      z: -100,
                                      rotateX: 5,
                                  }
                                : {
                                      scale: 1,
                                      opacity: 1,
                                      z: 0,
                                      rotateX: 0,
                                  }
                        }
                        transition={{
                            type: 'spring',
                            damping: 25,
                            stiffness: 200,
                        }}
                        className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl w-full overflow-visible"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <div className="relative pt-20 pb-12 px-8">
                            {/* Avatar */}
                            <div className="absolute -top-20 left-8">
                                <div className="w-40 h-40 rounded-full bg-white p-2 shadow-xl">
                                    <Avatar />
                                </div>
                            </div>

                            {/* Name and Title */}
                            <div className="ml-48 mr-4 flex justify-between items-start flex-wrap gap-4">
                                <div>
                                    <h1 className="text-4xl font-light text-gray-800 mb-1 tracking-wide">
                                        Jordi Orriols
                                    </h1>
                                    <p className="text-gray-400 text-sm tracking-wider">
                                        Multimedia Engineer
                                    </p>
                                </div>
                                <Button
                                    onClick={() => setShowContactForm(true)}
                                    className="bg-[#2D4A6B] hover:bg-[#1F3447] text-white px-6 py-2 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
                                >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Enviar mensaje
                                </Button>
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 px-8 pb-12">
                            <div className="text-center">
                                <div className="text-5xl font-extralight text-gray-800 mb-2">
                                    15
                                </div>
                                <div className="text-gray-400 text-sm tracking-wider">
                                    proyectos
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-extralight text-gray-800 mb-2">
                                    27
                                </div>
                                <div className="text-gray-400 text-sm tracking-wider">
                                    diseños
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-extralight text-gray-800 mb-2">
                                    80
                                </div>
                                <div className="text-gray-400 text-sm tracking-wider">
                                    sitios web
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-5xl font-extralight text-gray-800 mb-2">
                                    23
                                </div>
                                <div className="text-gray-400 text-sm tracking-wider">
                                    fotografía
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form - Aparece encima */}
                    <AnimatePresence>
                        {showContactForm && (
                            <div
                                className="absolute inset-0 flex items-center justify-center"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                <ContactForm
                                    onClose={() => setShowContactForm(false)}
                                />
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
