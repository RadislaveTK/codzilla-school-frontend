"use client";

import { motion } from "framer-motion";
import styles from "./SectionCTA.module.css";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

export default function SectionCTA({ color, title, description, button }) {
  return (
    <motion.section
      className={styles.sectionCTA}
      style={{ backgroundColor: color }}
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <motion.h2 className={styles.title} variants={itemVariants}>
        {title}
      </motion.h2>
      <motion.p className={styles.description} variants={itemVariants}>
        {description}
      </motion.p>
      {button ? (
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          {button}
        </motion.div>
      ) : null}
    </motion.section>
  );
}
