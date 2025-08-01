"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
 const ImageSwiper = ({
  cards,
  cardWidth = 321,
  cardHeight = 571,
  className = "",
  onAction, 
}) => {
  const cardStackRef = useRef(null);
  const isSwiping = useRef(false);
  const startX = useRef(0);
  const currentX = useRef(0);
  const animationFrameId = useRef(null);
  const [cardOrder, setCardOrder] = useState(() =>
    Array.from(
      {
        length: cards.length,
      },
      (_, i) => i
    )
  );

  const getCards = useCallback(() => {
    if (!cardStackRef.current) return [];
    return Array.from(cardStackRef.current.querySelectorAll(".image-card"));
  }, []);

  const getActiveCard = useCallback(() => {
    return getCards()[0] || null;
  }, [getCards]);

  const updateCardPositions = useCallback(() => {
    getCards().forEach((card, i) => {
      card.style.setProperty("--i", i.toString());
      card.style.setProperty("--swipe-x", "0px");
      card.style.setProperty("--swipe-rotate", "0deg");
      card.style.opacity = "1";
      card.style.transition = "transform 0.5s ease, opacity 0.5s ease";
    });
  }, [getCards]);

  const applySwipeStyles = useCallback(
    (deltaX) => {
      const card = getActiveCard();
      if (!card) return;
      const rotation = deltaX * 0.1;
      const opacity = 1 - Math.abs(deltaX) / (cardWidth * 1.5);
      card.style.setProperty("--swipe-x", `${deltaX}px`);
      card.style.setProperty("--swipe-rotate", `${rotation}deg`);
      card.style.opacity = opacity.toString();
    },
    [getActiveCard, cardWidth]
  );

  // Function to handle swipe/button actions
  const handleAction = useCallback(
    (direction) => {
      if (!onAction || cardOrder.length === 0) return;
      
      const currentCardIndex = cardOrder[0];
      const currentCard = cards[currentCardIndex];
      
      if (!currentCard) return;
      
      // Determine status based on direction
      const status = direction === "left" ? "ignored" : "interested";
      
      // Call the API
      onAction(status, currentCard._id, direction);
    },
    [onAction, cardOrder, cards]
  );

  const handleStart = useCallback(
    (clientX) => {
      if (isSwiping.current) return;
      isSwiping.current = true;
      startX.current = clientX;
      currentX.current = clientX;
      const card = getActiveCard();
      if (card) {
        card.style.transition = "none";
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    },
    [getActiveCard]
  );

  const handleMove = useCallback(
    (clientX) => {
      if (!isSwiping.current) return;
      currentX.current = clientX;
      animationFrameId.current = requestAnimationFrame(() => {
        const deltaX = currentX.current - startX.current;
        applySwipeStyles(deltaX);
      });
    },
    [applySwipeStyles]
  );

  const handleEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
    }
    const deltaX = currentX.current - startX.current;
    const threshold = cardWidth / 3;
    const card = getActiveCard();
    if (!card) return;

    card.style.transition = "transform 0.3s ease, opacity 0.3s ease";

    if (Math.abs(deltaX) > threshold) {
      const direction = Math.sign(deltaX);
      const swipeOutX = direction * (cardWidth * 1.5);
      card.style.setProperty("--swipe-x", `${swipeOutX}px`);
      card.style.setProperty("--swipe-rotate", `${direction * 15}deg`);
      card.style.opacity = "0";

      // Determine swipe direction and call API
      const swipeDirection = direction > 0 ? "right" : "left";
      handleAction(swipeDirection);

      setTimeout(() => {
        setCardOrder((prev) => [...prev.slice(1), prev[0]]);
      }, 300);
    } else {
      applySwipeStyles(0);
    }
  }, [getActiveCard, applySwipeStyles, cardWidth, handleAction]);

  // Button click handlers
  const handleIgnoreClick = useCallback(() => {
    const card = getActiveCard();
    if (!card) return;

    card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    const swipeOutX = -(cardWidth * 1.5);
    card.style.setProperty("--swipe-x", `${swipeOutX}px`);
    card.style.setProperty("--swipe-rotate", "-15deg");
    card.style.opacity = "0";

    handleAction("left");

    setTimeout(() => {
      setCardOrder((prev) => [...prev.slice(1), prev[0]]);
    }, 300);
  }, [getActiveCard, cardWidth, handleAction]);

  const handleInterestedClick = useCallback(() => {
    const card = getActiveCard();
    if (!card) return;

    card.style.transition = "transform 0.3s ease, opacity 0.3s ease";
    const swipeOutX = cardWidth * 1.5;
    card.style.setProperty("--swipe-x", `${swipeOutX}px`);
    card.style.setProperty("--swipe-rotate", "15deg");
    card.style.opacity = "0";

    handleAction("right");

    setTimeout(() => {
      setCardOrder((prev) => [...prev.slice(1), prev[0]]);
    }, 300);
  }, [getActiveCard, cardWidth, handleAction]);

  useEffect(() => {
    const element = cardStackRef.current;
    if (!element) return;
    const onPointerDown = (e) => handleStart(e.clientX);
    const onPointerMove = (e) => handleMove(e.clientX);
    const onPointerUp = () => handleEnd();
    const onPointerLeave = () => handleEnd();
    element.addEventListener("pointerdown", onPointerDown);
    element.addEventListener("pointermove", onPointerMove);
    element.addEventListener("pointerup", onPointerUp);
    element.addEventListener("pointerleave", onPointerLeave);
    return () => {
      element.removeEventListener("pointerdown", onPointerDown);
      element.removeEventListener("pointermove", onPointerMove);
      element.removeEventListener("pointerup", onPointerUp);
      element.removeEventListener("pointerleave", onPointerLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [handleStart, handleMove, handleEnd]);

  useEffect(() => {
    updateCardPositions();
  }, [cardOrder, updateCardPositions]);

  return (
    <section
      ref={cardStackRef}
      className={`relative grid place-content-center select-none ${className}`}
      style={{
        width: cardWidth + 32,
        height: cardHeight + 32,
        perspective: "1000px",
        touchAction: "none",
      }}
    >
      {cardOrder.map((originalIndex, displayIndex) => {
        const card = cards[originalIndex];
        return (
          <article
            key={card._id}
            className="image-card absolute cursor-grab active:cursor-grabbing
                         place-self-center border-2 border-slate-700 rounded-2xl
                         shadow-lg overflow-hidden will-change-transform bg-slate-800"
            style={{
              "--i": displayIndex.toString(),
              "--swipe-x": "0px",
              "--swipe-rotate": "0deg",
              width: cardWidth,
              height: cardHeight,
              zIndex: cards.length - displayIndex,
              transform: `
                translateY(calc(var(--i) * 10px))
                translateZ(calc(var(--i) * -45px))
                translateX(var(--swipe-x))
                rotate(var(--swipe-rotate))
              `,
            }}
          >
            <img
              src={card.photoUrl}
              alt={card.firstName}
              className="w-full h-full object-cover pointer-events-none"
              draggable={false}
              onError={(e) => {
                const target = e.target;
                target.onerror = null;
                target.src = `https://placehold.co/${cardWidth}x${cardHeight}/2d3748/e2e8f0?text=Image+Not+Found`;
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-20 bg-gradient-to-t from-black/80 to-transparent text-white drop-shadow-[0_1px_2px_black]">
              <h3 className="font-bold text-xl text-white drop-shadow-[0_1px_3px_black]">
                {card.firstName + " " + card.lastName}
              </h3>
              <div className="text-white drop-shadow-[0_1px_2px_black]">
                <span className="font-light">{card.age + ","}</span>{" "}
                <span className="font-light capitalize">{card.gender}</span>
              </div>
              <p className="text-sm mt-1 text-gray-100 drop-shadow-[0_1px_2px_black] line-clamp-2">
                {card.about}
              </p>

              <div className="mt-2 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 w-max">
                  {card.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-xs px-3 py-1 rounded-full text-gray-800 whitespace-nowrap"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* BUTTONS – absolutely positioned at the bottom */}
            {displayIndex === 0 && ( // Only show buttons on the top card
              <div className="absolute bottom-3 left-0 right-0 px-5 flex justify-between items-center">
                <button
                  onClick={handleIgnoreClick}
                  className="bg-red-100 text-red-500 font-medium px-4 py-2 rounded-full shadow hover:bg-red-200 transition"
                >
                  Ignore
                </button>
                <button
                  onClick={handleInterestedClick}
                  className="bg-green-100 text-green-600 font-medium px-4 py-2 rounded-full shadow hover:bg-green-200 transition"
                >
                  Interested
                </button>
              </div>
            )}
          </article>
        );
      })}
    </section>
  );
};


export default ImageSwiper;