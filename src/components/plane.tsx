import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PlaneController() {
  const [position, setPosition] = useState({ x: 100, y: 10 });
  const [showNotification, setShowNotification] = useState(true);
  const velocityYRef = useRef(0);
  const positionRef = useRef({ x: 100, y: 10 });

  const keyRef = useRef(null);
  const allowedKeys = ["ArrowUp", "ArrowDown"];
  const acceleration = 0.05;

  useEffect(() => {
    // Hide notification after 6 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 6000);

    // Keyboard controls
    const handleKeyDown = (e) => {
      if (allowedKeys.includes(e.key)) keyRef.current = e.key;
    };

    const handleKeyUp = (e) => {
      if (allowedKeys.includes(e.key)) keyRef.current = null;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Animation loop
    const animate = () => {
      if (keyRef.current === "ArrowUp")
        velocityYRef.current = Math.max(
          velocityYRef.current - acceleration,
          -2
        );
      else if (keyRef.current === "ArrowDown")
        velocityYRef.current = Math.min(velocityYRef.current + acceleration, 2);

      // Move horizontally (always moving right)
      positionRef.current.x += 0.3;

      // Reset position when off screen
      if (positionRef.current.x > 115) {
        positionRef.current.x = -15;
      }

      // Move vertically based on controls
      positionRef.current.y += velocityYRef.current;

      // Vertical boundaries (keep within viewport)
      if (positionRef.current.y < 0) positionRef.current.y = 0;
      if (positionRef.current.y > 83) positionRef.current.y = 83;

      setPosition({ x: positionRef.current.x, y: positionRef.current.y });

      // Damping for vertical movement
      velocityYRef.current *= 0.95;

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(animationId);
    };
  }, []);

  /*
  
   <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              from="0 85 40"
              to="360 85 40"
              dur="0.2s"
              repeatCount="indefinite"
            />
  */

  return (
    <>
      {/* Plane SVG */}
      <motion.div
        className="fixed z-10 pointer-events-none"
        style={{
          top: `${position.y}%`,
          left: `${position.x}%`,
          transform: "translate(-50%, -50%)",
        }}
        animate={{
          rotate: velocityYRef.current * 30,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1024"
          height="1024"
          style={{ width: 300, height: 300 }}
          viewBox="0 0 1024 1024"
        >
          <path
            fill="#D1D0D0"
            d="M130 394c6-6 40-3 49-5 10-1 16 14 20 21l14 24c6 11 19 36 30 42 11 5 24 6 36 10l16 4c13 5 14 5 28 3l23-3 27-3 15-2 6-4c-10-7-22-2-31-4-16-2-42-4-56-13-4-3-4-5-4-9 4-5 42-12 51-14 20-2 41 1 61 3l51 4 134 9 87 5c3 0 15 1 16 5l-2 2-8 3c-4 2-9 6-13 6-17 3-35 2-52 5l-3 2c1 3 4 10 7 11 33 5 66 7 100 16v5c-5 1-11 4-13 10-1 4-1 7 1 11v-1c5 6 7 8 14 11l-4 5 2-1c2 1 1 24 1 27h-1v1h-1v-17c-8 12-29 27-43 30-11 2-19 1-29 9-7 5-28 11-36 7v-1c-3-3-3-9-3-12l-27-1c-3-1-7-1-8 1h-1l-3-9-5 1c0 3 2 8 1 10-6-3-11 2-16-4l-38-2-15-2-14 2c-2-2 0-5 1-6l-8-1 4-7c-4-2-8-2-12-1l-2 6c-2-1-20-5-23-4-12 0-20 0-32-2a14469 14469 0 0 0-207-32c-6-1-19-4-23-1l-7 5-1-1-1 1-1-3-4-2v-1c-1-1 0-2 1-3l3-2 4-2c1-1 6-3 7 0h6l-3-1c4-2 3-5 2-9l-2-1-4-5-12-1-2-2v-1l2-1-4-1c-5 0-7 3-12 3l-33 2c-14 0-8-2-12-10l4-2 13-4-2-14-7-76c0-7-1-13 3-19Z"
          />
          <path
            fill="#ECECEB"
            d="M130 394c6-6 40-3 49-5 10-1 16 14 20 21l14 24c6 11 19 36 30 42 11 5 24 6 36 10l16 4c13 5 14 5 28 3l23-3 27-3 15-2 16-1 18 5c-2 12-3 20-3 33l64 2 7 9-70-2c0 12 4 28 12 37l8 3v1l-1 1c7 1 34 5 40 4l-2 6c-2-1-20-5-23-4-12 0-20 0-32-2a14469 14469 0 0 0-207-32c-6-1-19-4-23-1l-7 5-1-1-1 1-1-3-4-2v-1c-1-1 0-2 1-3l3-2 4-2c1-1 6-3 7 0h6l-3-1c4-2 3-5 2-9l-2-1-4-5-12-1-2-2v-1l2-1-4-1c-5 0-7 3-12 3l-33 2c-14 0-8-2-12-10l4-2 13-4-2-14-7-76c0-7-1-13 3-19Z"
          />
          <path
            fill="#ECECEB"
            d="M198 526h43a11195 11195 0 0 0 157 4l22 1c0 12 4 28 12 37l8 3v1l-1 1c7 1 34 5 40 4l-2 6c-2-1-20-5-23-4-12 0-20 0-32-2a14469 14469 0 0 0-207-32c-6-1-19-4-23-1l-7 5-1-1-1 1-1-3-4-2v-1c-1-1 0-2 1-3l3-2 4-2c1-1 6-3 7 0h6l-3-1c4-2 3-5 2-9Z"
          />
          <path
            fill="#AFB2AD"
            d="m182 538 4-2c1-1 6-3 7 0h6l41 6 55 8 144 23c7 1 34 5 40 4l-2 6c-2-1-20-5-23-4-12 0-20 0-32-2a14469 14469 0 0 0-207-32c-6-1-19-4-23-1l-7 5-1-1-1 1-1-3-4-2v-1c-1-1 0-2 1-3l3-2Z"
          />
          <path
            fill="#ECECEB"
            d="M184 548c-1-3-2-4 1-7 1-1 4-2 5 0v2l2 1-7 5-1-1Zm-2-10 4-2c1-1 6-3 7 0l-4 2-1-2-10 7c-1-1 0-2 1-3l3-2Z"
          />
          <path
            fill="#86ADC6"
            d="M204 513c10 0 37 0 46-3v9l109 2 60 1 64 2 7 9-70-2-22-1h-31l-126-4h-43l-2-1-4-5-12-1-2-2v-1l2-1-4-1 28-1Z"
          />
          <defs>
            <linearGradient
              id="a"
              x1="212.1"
              x2="215.7"
              y1="508"
              y2="525"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#AAA9AA" />
              <stop offset="1" stop-color="#CCC7C4" />
            </linearGradient>
          </defs>
          <path
            fill="url(#a)"
            d="M204 513c10 0 37 0 46-3v9h-35l-23 1-12-1-2-2v-1l2-1-4-1 28-1Z"
          />
          <path
            fill="#D1D0D0"
            d="M170 506c8 6 15 1 24 1 3 0 2 1 3 2 2 1 9 0 10 3l-3 1-28 1c-5 0-7 3-12 3l-33 2c-14 0-8-2-12-10l4-2-1 3 47-2 1-2Z"
          />
          <path
            fill="#FAFAFA"
            d="M142 503c7-1 15 0 22-3 1-1 9 1 11 1l31-1c16-1 28-3 43 2-19 1-38 3-57 1l-22 1v2l-1 2-47 2 1-3 13-4h6Z"
          />
          <path
            fill="#AFB2AD"
            d="m130 394 1 9 1 7c1 6 1 24 3 29l2 15 2 26 3 23h-6l-2-14-7-76c0-7-1-13 3-19Z"
          />
          <path
            fill="#FAFAFA"
            d="M131 403c8 1 18 1 26 3h-1c-9 1-14-2-21 4h-3l-1-7Zm4 36v-2h2c-1 2-2 2-1 4 4 2 7 0 9 4v1l-6 1h4l-6 1v6l-2-15Zm4 41c2-2 5-2 8-1l-8 1Zm45 9h2c-2 2-21 4-26 4l-14-1c-2 0-3 1-4-1h8c12 1 22 0 34-2Zm41-3h5-1l1 1c-3 2-16 1-20 1h-4c3-2 15-1 19-2Zm-67-61h2l1 1v1l-6 1 4 1h-5l-1-3c-4 1-6 2-10 1l15-2Zm67 64h3v1c-3 2-9 1-13 1l-4-1 14-1Zm-55-68c4-1 5 2 9 2v1c-6 2-3 0-6-2h-3v-1Zm-18-8 7 1-1-1v1h-12l6-1Zm4 50h6v1h-6v-1Zm-23-46h8c-3 1-7 2-8 0Zm170 38c4-5 42-12 51-14 20-2 41 1 61 3l51 4 134 9 87 5c3 0 15 1 16 5l-2 2-8 3c-4 2-9 6-13 6-17 3-35 2-52 5l-3 2c1 3 4 10 7 11 33 5 66 7 100 16v5c-5 1-11 4-13 10l-53-1-98-1-9-1 5-11h2l23-3 7-4-19-45-8-1-37 1-71-4-34-2-17-1c-2 0-4-3-4-5h4c-6-4-14-4-22-4-7 4-18 4-26 5l-46 5-11 1-2-1Z"
          />
          <path
            fill="#86ADC6"
            d="m577 461 31 1 20 33a274 274 0 0 0-32 11l-19-45Z"
          />
          <path
            fill="#D1D0D0"
            d="M690 469h11l-8 3c-4 2-9 6-13 6-17 3-35 2-52 5l-3 2-3-6-5-10h25c9 0 42 3 48 0Z"
          />
          <path
            fill="#AFB2AD"
            d="M622 479c6-3 39-4 48-5l23-2c-4 2-9 6-13 6-17 3-35 2-52 5l-3 2-3-6Z"
          />
          <path
            fill="#ECECEB"
            d="M641 468c9-1 41-2 49 1-6 3-39 0-48 0l5-1h-6Zm-83 57h10l98 1 53 1c-1 4-1 7 1 11h-12 4c-1 2-27 12-31 14a244 244 0 0 1-150 18l22-36 5-9Z"
          />
          <defs>
            <linearGradient
              id="b"
              x1="632.2"
              x2="641.6"
              y1="550.5"
              y2="510"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#85B5D5" />
              <stop offset="1" stop-color="#B9D1E1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#b)"
            d="M558 525h10l98 1 53 1c-1 4-1 7 1 11h-12l-155-4 5-9Z"
          />
          <path
            fill="#AFB2AD"
            d="m730 553 2-1c2 1 1 24 1 27h-1v1h-1v-17c-8 12-29 27-43 30-11 2-19 1-29 9-7 5-28 11-36 7v-1c4-10 23-9 32-12l3-11c25 1 45-4 62-23 3-3 6-7 10-9Z"
          />
          <path
            fill="#D1D0D0"
            d="M652 602c18-18 29-6 49-18 10-5 18-16 26-22l4 1c-8 12-29 27-43 30-11 2-19 1-29 9-7 5-28 11-36 7 7-4 18-1 24-4l5-3Z"
          />
          <path
            fill="#AFB2AD"
            d="M394 481c-10-7-22-2-31-4-16-2-42-4-56-13-4-3-4-5-4-9l2 1 10 3 113 22 11 1-4 1v4c-8 0-25-5-31-3l-16 1 6-4Z"
          />
          <path
            fill="#7D888B"
            d="m539 475 26-2c1 11 2 29 1 40h-2l-24-1-1-37Z"
          />
          <defs>
            <linearGradient
              id="c"
              x1="533.3"
              x2="532.5"
              y1="582.2"
              y2="593.4"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#A0A59D" />
              <stop offset="1" stop-color="#CBCFC7" />
            </linearGradient>
          </defs>
          <path
            fill="url(#c)"
            d="M491 578c12 5 49 4 64 6l18 2c2 0 2 1 3 2 0 3 2 8 1 10-6-3-11 2-16-4l-38-2-15-2-14 2c-2-2 0-5 1-6l-8-1 4-7Z"
          />
          <path fill="#7D888B" d="M439 482h11l24 30-40-1 1-24v-4l4-1Z" />
          <path fill="#86ADC6" d="m499 523 59 2-5 9-46-1-8-10Z" />
          <path
            fill="#7D888B"
            d="m569 460 8 1 19 45-7 4c-6-12-12-31-18-44l-2-6Z"
          />
          <path
            fill="#AFB2AD"
            d="m581 587 24-1 21 1-2 5-2-1c-1 0-2 1-2 3l1 1-1 1-27-1c-3-1-7-1-8 1h-1l-3-9Z"
          />
          <path
            fill="#ECECEB"
            d="M584 596c0-7 4-6 10-6l-5 2 4 3c-3-1-7-1-8 1h-1Zm-52-135 37-1 2 6-7-1-32-4Z"
          />
          <path fill="#7D888B" d="M524 476h8l1 36h-44l-6-8-19-24 22-1 38-3Z" />
          <path fill="#AFB2AD" d="M635 581h24v1l-5 1-11-1-14-1h6Z" />
          <path
            fill="#7D888B"
            d="M719 527c2-6 8-9 13-10 3 2 10 3 14 4 6 2 16 6 21 10l1 4c1 3 3 6 1 9-4 7-14 6-19 14-4 6 0 16-2 20l-1-1c-2 3-1 13-1 17l2 2c2 13 2 23-13 21-8-4-7-12-4-18v-19h1v-1h1c0-3 1-26-1-27l-2 1 4-5c-7-3-9-5-14-11v1c-2-4-2-7-1-11Z"
          />
          <path
            fill="#706E76"
            d="M719 527c2-6 8-9 13-10 3 2 10 3 14 4 6 2 16 6 21 10l1 4-3 4c-7 4-12 4-20 7l-11 2c-7-3-9-5-14-11v1c-2-4-2-7-1-11Z"
          />
          <path
            fill="#49484A"
            d="M720 537h15c5 1 27 0 30 2-7 4-12 4-20 7l-11 2c-7-3-9-5-14-11Z"
          />
          <defs>
            <linearGradient
              id="d"
              x1="748.1"
              x2="763.1"
              y1="544.8"
              y2="564.6"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0" stop-color="#ADB0A8" />
              <stop offset="1" stop-color="#C7C5C8" />
            </linearGradient>
          </defs>
          <path
            fill="url(#d)"
            d="m765 539 3-4c1 3 3 6 1 9-4 7-14 6-19 14-4 6 0 16-2 20l-1-1h-1l-1-31c8-3 13-3 20-7Z"
          />
          <path
            fill="#AFB2AD"
            d="M746 605v-11l2 2c2 13 2 23-13 21-8-4-7-12-4-18h1v6c3-2 9-2 12-1l1 1h1Z"
          />
          <path
            fill="#D1D0D0"
            d="M746 605v-11l2 2c2 13 2 23-13 21 4-3 13-2 11-12Z"
          />
          <path fill="#706E76" d="M732 605c3-2 9-2 12-1l1 1c-3 4-10 4-13 0Z" />
          <path
            fill="#AFB2AD"
            d="M731 580h1v-1h1l-1 20h-1v-19Zm-569-44c-14-6-36-3-47-14-4-4 0-10 4-13 4 8-2 10 12 10l33-2c5 0 7-3 12-3l4 1-2 1v1l2 2 12 1 4 5 2 1c1 4 2 7-2 9l3 1h-6c-1-3-6-1-7 0l-4 2-3 2c-1 1-2 2-1 3v1l4 2 1 3 1-1 1 1v10c-3 10-18 7-21-2-2-5 0-9 2-15l-4-6Z"
          />
          <path
            fill="#D1D0D0"
            d="m178 517 2 2 12 1 4 5 2 1c1 4 2 7-2 9l3 1h-6c-1-3-6-1-7 0l-4 2-3 2c-8-2-1-6-4-12l2-1c1-2-1-5 1-10Z"
          />
          <path
            fill="#AFB2AD"
            d="M182 538v-13h14l2 1c1 4 2 7-2 9l3 1h-6c-1-3-6-1-7 0l-4 2Z"
          />
          <path fill="#AFB2AD" d="M195 525h1l2 1c1 4 2 7-2 9 0-4 3-5-1-10Z" />
          <path
            fill="#2C2B2C"
            d="m178 544 4 2 1 3v6l-4 4c-2 1-5 0-7-1-5-3-3-8 0-12 2-2 3-2 6-2Z"
          />
          <path
            fill="#49484A"
            d="m178 544 4 2c-3 4 1 7-2 10l-4 1c-3 0-4-2-4-5l2-2 1 2c1 2 0 1 2 1v-4l1-2-6-1c2-2 3-2 6-2Z"
          />
          <path
            fill="#2C2B2C"
            d="M451 619c3-6 6-9 12-11 5 0 7 0 12 2l1-1c14 6 15 18 12 31l-3 3c-2 0-2-1-3-2l-4 4c-12 10-19 9-28-5l2 10c-8-10-9-20-1-31Z"
          />
          <path
            fill="#AFB2AD"
            d="M451 619c-2 6-2 12 0 18 3 4 7 8 12 10 9 3 11-2 15-2-12 10-19 9-28-5l2 10c-8-10-9-20-1-31Z"
          />
          <path
            fill="#D1D0D0"
            d="m475 610 1-1c14 6 15 18 12 31l-3 3c-2 0-2-1-3-2l2-4c5-11 2-22-9-27Z"
          />
          <path
            fill="#7D888B"
            d="M463 617a11 11 0 1 1 5 21c-11 4-13-6-14-14 3-4 4-6 9-7Z"
          />
          <path
            fill="#49484A"
            d="M454 624c3-4 4-6 9-7a11 11 0 0 0 5 21c-11 4-13-6-14-14Z"
          />
          <path
            fill="#FAFAFA"
            d="M464 621c4 0 5 0 8 2 2 2 2 6 0 8-7 8-16-2-8-10Z"
          />
          <path fill="#ECECEB" d="M464 621c4 0 5 0 8 2l-5 3h-2l1 1h-1l-1-6Z" />
          <path fill="#49484A" d="M469 613c5-1 7-1 9 4-3 0-7-3-9-4Z" />
          <path
            fill="#2C2B2C"
            d="m576 588 5-1 3 9h1l3 20 7 2c16 8 6 34-11 29-9-2-15-12-11-21 1-4 4-7 8-9l-4-19c1-2-1-7-1-10Z"
          />
          <path
            fill="#ECECEB"
            d="m576 588 5-1 3 9h1l3 20 1 5 4 8h-2l-1-1c-2-2-3-2-7-2v-3l-2-6-4-19c1-2-1-7-1-10Z"
          />
          <path
            fill="#706E76"
            d="M589 621c23 11-12 35-10 6l4-4v3c4 0 5 0 7 2l1 1h2l-4-8Z"
          />
          <path
            fill="#FAFAFA"
            d="M583 626c4 0 5 0 7 2l1 1c-3 5-3 5-9 5-1-3-1-5 1-8Z"
          />
          <path fill="#D1D0D0" d="M593 629c0 8-4 12-11 5 6 0 6 0 9-5h2Z" />
          <path fill="#7D888B" d="M732 466h14v55c-4-1-11-2-14-4v-51Z" />
          <path
            fill="#FAFAFA"
            d="M479 577c4-1 8-1 12 1l-4 7c-3 4-8 18-11 24l-1 1c-5-2-7-2-12-2l3-1c3-2 9-19 11-24l2-6Z"
          />
        </svg>
      </motion.div>

      {/* Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-[#2D4A6B] text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">✈️</span>
              </div>
              <div>
                <p className="font-semibold">¡Avión activado!</p>
                <p className="text-sm text-white/80">
                  Usa ↑ ↓ para controlarlo
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
