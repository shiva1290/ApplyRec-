import React, { useEffect, useState } from 'react';
import styles from './CelebrationModal.module.css';
import Button from './Button';

function CelebrationModal({ companyName, onClose }) {
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    const colors = ['#a3e635', '#fbbf24', '#f472b6', '#60a5fa', '#34d399', '#f87171'];
    const pieces = [];
    
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 2 + Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 8 + Math.random() * 8,
      });
    }
    
    setConfetti(pieces);
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.confettiContainer}>
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className={styles.confetti}
            style={{
              left: `${piece.left}%`,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              backgroundColor: piece.color,
              width: `${piece.size}px`,
              height: `${piece.size}px`,
            }}
          />
        ))}
      </div>
      
      <div className={styles.modal}>
        <div className={styles.emojiContainer}>
          <span className={styles.emoji}>🎉</span>
          <span className={styles.emoji}>🎊</span>
          <span className={styles.emoji}>🥳</span>
        </div>
        
        <h1 className={styles.title}>CONGRATULATIONS!</h1>
        
        <div className={styles.companyBadge}>
          <span className={styles.companyLabel}>You got an offer from</span>
          <span className={styles.companyName}>{companyName}</span>
        </div>
        
        <p className={styles.message}>
          All your hard work paid off! This is a huge achievement.
          Take a moment to celebrate - you earned it!
        </p>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statEmoji}>🌟</span>
            <span className={styles.statText}>You're amazing!</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statEmoji}>🚀</span>
            <span className={styles.statText}>New journey begins!</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.statEmoji}>💪</span>
            <span className={styles.statText}>Hard work pays off!</span>
          </div>
        </div>
        
        <Button onClick={onClose}>
          Thanks! Let's go!
        </Button>
      </div>
    </div>
  );
}

export default CelebrationModal;
