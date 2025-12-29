import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorFollower = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const ringConfig = { damping: 20, stiffness: 150 };
  const ringXSpring = useSpring(cursorX, ringConfig);
  const ringYSpring = useSpring(cursorY, ringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('button, a, [data-cursor]');
      
      if (interactiveEl) {
        setIsHovering(true);
        const cursorData = interactiveEl.getAttribute('data-cursor');
        setCursorText(cursorData || '');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <motion.div
          className="absolute rounded-full bg-primary"
          animate={{
            width: isHovering ? 60 : isClicking ? 8 : 12,
            height: isHovering ? 60 : isClicking ? 8 : 12,
            x: isHovering ? -30 : isClicking ? -4 : -6,
            y: isHovering ? -30 : isClicking ? -4 : -6,
            opacity: isHovering ? 0.15 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        />
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute text-xs font-display font-bold uppercase tracking-wider text-primary whitespace-nowrap"
            style={{ x: -30, y: -30 }}
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Outer ring with trail effect */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border-2 border-primary/40 rounded-full pointer-events-none z-[9998] hidden md:block mix-blend-difference"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          translateX: -20,
          translateY: -20,
        }}
        animate={{
          scale: isHovering ? 2 : isClicking ? 0.8 : 1,
          opacity: isHovering ? 0.6 : 0.3,
          borderWidth: isHovering ? 1 : 2,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />

      {/* Particle trail */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed top-0 left-0 w-2 h-2 bg-primary/30 rounded-full pointer-events-none z-[9997] hidden md:block"
          style={{
            x: useSpring(cursorX, { damping: 30 + i * 10, stiffness: 100 }),
            y: useSpring(cursorY, { damping: 30 + i * 10, stiffness: 100 }),
            translateX: -4,
            translateY: -4,
            scale: 1 - i * 0.2,
            opacity: 0.3 - i * 0.1,
          }}
        />
      ))}
    </>
  );
};

export default CursorFollower;
