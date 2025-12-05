"use client";

import { useState } from "react";
import Image from "next/image";

export default function SlotMachine() {
  const animals = [
    "/animals/birdie.png",
    "/animals/bunny.png",
    "/animals/fishie.png",
    "/animals/fox.png",
    "/animals/hamster.png",
    "/animals/hedgehog.png",
    "/animals/kitty.png",
    "/animals/koala.png",
    "/animals/panda.png",
    "/animals/puppy.png",
  ];

  const [slot1, setSlot1] = useState(null);
  const [slot2, setSlot2] = useState(null);
  const [slot3, setSlot3] = useState(null);

  const [isRolling, setIsRolling] = useState(false);
  const [message, setMessage] = useState("");

  const roll = () => {
    if (isRolling) return; // prevent spamming
    setIsRolling(true);
    setMessage("");

    // Clear slots before rolling
    setSlot1(null);
    setSlot2(null);
    setSlot3(null);

    // Randomizer helper
    const pick = () => animals[Math.floor(Math.random() * animals.length)];

    // Reveal slots one at a time
    setTimeout(() => setSlot1(pick()), 600);
    setTimeout(() => setSlot2(pick()), 1200);
    setTimeout(() => setSlot3(pick()), 1800);

    // After all finished
    setTimeout(() => {
      setIsRolling(false);

      // Win checker
      setTimeout(() => {
        if (slot1 && slot1 === slot2 && slot2 === slot3) {
          setMessage("🎉 You win! Three in a row! 🎉");
        } else {
          setMessage("Try again!");
        }
      }, 100);
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fef7ea",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "2rem",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          textAlign: "center",
          width: "320px",
        }}
      >
        <h1 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
          🐾 Cute Slot Machine 🐾
        </h1>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
          }}
        >
          {/* SLOT */}
          {[slot1, slot2, slot3].map((slot, i) => (
            <div
              key={i}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "12px",
                background: "#fff3da",
                border: "3px solid #ffd9a5",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                animation: slot ? "pop 0.3s ease" : "",
              }}
            >
              {slot && (
                <Image
                  src={slot}
                  alt="animal"
                  width={70}
                  height={70}
                  style={{ objectFit: "contain" }}
                />
              )}
            </div>
          ))}
        </div>

        <button
          onClick={roll}
          disabled={isRolling}
          style={{
            background: isRolling ? "#ccc" : "#ffb347",
            color: "white",
            fontWeight: "bold",
            padding: "0.8rem 1.2rem",
            border: "none",
            borderRadius: "12px",
            cursor: isRolling ? "not-allowed" : "pointer",
            width: "100%",
            fontSize: "1rem",
            transition: "0.2s",
          }}
        >
          {isRolling ? "Rolling..." : "Spin!"}
        </button>

        {message && (
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>{message}</p>
        )}
      </div>

      <style jsx>{`
        @keyframes pop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
