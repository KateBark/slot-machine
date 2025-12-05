"use client";

import { useState, useEffect } from "react";
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

  const [reels, setReels] = useState([null, null, null]);
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState("");
  const [coins, setCoins] = useState(20);
  const [reelOffsets, setReelOffsets] = useState([0, 0, 0]);

  const REEL_SPEED = 25; // lower = faster spin

  const spin = () => {
    if (spinning || coins <= 0) return;

    setCoins(coins - 1); // cost to spin
    setMessage("");
    setSpinning(true);

    // Random final results
    const final1 = animals[Math.floor(Math.random() * animals.length)];
    const final2 = animals[Math.floor(Math.random() * animals.length)];
    const final3 = animals[Math.floor(Math.random() * animals.length)];

    // Reset reels to spinning motion
    const interval = setInterval(() => {
      setReelOffsets((prev) => [
        prev[0] + REEL_SPEED,
        prev[1] + REEL_SPEED,
        prev[2] + REEL_SPEED,
      ]);
    }, 50);

    // Stop reels one at a time
    setTimeout(() => {
      stopReel(0, final1);
    }, 1000);

    setTimeout(() => {
      stopReel(1, final2);
    }, 1600);

    setTimeout(() => {
      stopReel(2, final3);
      clearInterval(interval);
    }, 2200);
  };

  const stopReel = (index, finalAnimal) => {
    setReels((prev) => {
      const newReels = [...prev];
      newReels[index] = finalAnimal;
      return newReels;
    });
  };

  // After all reels stop, check win
  useEffect(() => {
    if (reels.every((r) => r !== null)) {
      setSpinning(false);

      const [a, b, c] = reels;
      if (a === b && b === c) {
        setMessage("🎉 You won! +10 coins 🎉");
        setCoins((coins) => coins + 10);
      } else {
        setMessage("Try again!");
      }
    }
  }, [reels]);

  // Reset reels visually when spinning starts
  useEffect(() => {
    if (spinning) {
      setReels([null, null, null]);
    }
  }, [spinning]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff8e5",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "20px",
          width: "340px",
          textAlign: "center",
          boxShadow: "0 10px 35px rgba(0,0,0,0.15)",
        }}
      >
        <h1 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
          🐾 Snuggly Spins 🐾
        </h1>

        <p style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>
          Coins: <strong>{coins}</strong>
        </p>

        {/* Reel Container */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "1.5rem",
            position: "relative",
          }}
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: "80px",
                height: "80px",
                overflow: "hidden",
                borderRadius: "12px",
                border: "3px solid #ffd9a5",
                background: "#fff3da",
                position: "relative",
              }}
            >
              {/* Reel strip */}
              <div
                style={{
                  position: "absolute",
                  top: spinning ? -(reelOffsets[i] % (animals.length * 75)) : 0,
                  transition: spinning ? "none" : "transform 0.3s ease",
                }}
              >
                {spinning
                  ? [...Array(10)].map((_, idx) => (
                      <Image
                        key={idx}
                        src={animals[idx % animals.length]}
                        width={70}
                        height={70}
                        alt="spin"
                        style={{ marginBottom: "5px" }}
                      />
                    ))
                  : reels[i] && (
                      <Image
                        src={reels[i]}
                        width={70}
                        height={70}
                        alt="animal"
                      />
                    )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={spin}
          disabled={spinning || coins <= 0}
          style={{
            width: "100%",
            padding: "0.8rem 1.2rem",
            background: spinning || coins <= 0 ? "#ccc" : "#ffad4a",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "bold",
            cursor: spinning || coins <= 0 ? "not-allowed" : "pointer",
            transition: "0.2s",
          }}
        >
          {coins <= 0
            ? "Out of Coins!"
            : spinning
            ? "Spinning..."
            : "Spin (1 coin)"}
        </button>

        {message && (
          <p style={{ marginTop: "1rem", fontSize: "1.1rem" }}>{message}</p>
        )}
      </div>
    </div>
  );
}
