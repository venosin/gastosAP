import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedNumber = ({ value, fontSize = '1.5rem', fontWeight = 'bold', prefix = '$', decimals = 2, color }) => {
  const spring = useSpring(0, {
    mass: 0.8,
    stiffness: 75,
    damping: 15
  });

  const display = useTransform(spring, (current) =>
    `${prefix}${current.toFixed(decimals)}`
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span
      style={{
        fontSize,
        fontWeight,
        color,
        display: 'inline-block',
      }}
    >
      <motion.span>{display}</motion.span>
    </motion.span>
  );
};

export default AnimatedNumber;
