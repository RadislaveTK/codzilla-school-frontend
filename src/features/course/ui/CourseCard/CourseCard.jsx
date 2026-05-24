import { motion } from "framer-motion";
import Image from "next/image";
import styles from "./CourseCard.module.css";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
};

const footerVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

function CourseCard({ course }) {
  return (
    <motion.div
      className={styles.card}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      variants={cardVariants}
    >
      <div className={styles.imageWrapper}>
        <Image
          src={course.icon_url}
          alt={course.icon}
          width={85}
          height={85}
          className={styles.image}
        />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.content}>
          <h3>{course.name}</h3>
          <p>{course.description}</p>
        </div>
        <motion.div
          className={styles.footer}
          initial="hidden"
          animate="visible"
          variants={footerVariants}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.span
            className={styles.price}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            {course.formatted_price}/мес
          </motion.span>
          <Link href={`/courses/${course.slug}`}>
            <motion.p
              className={styles.detailsLink}
              whileHover="hover"
              transition={{ duration: 0.2, ease: "easeOut" }}
              variants={{
                hover: { x: 4 },
              }}
            >
              Подробнее
              <motion.span
                className={styles.arrow}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <Image
                  src="/icons/arrow-right.svg"
                  alt="Стрелка вправо"
                  width={16}
                  height={16}
                />
              </motion.span>
            </motion.p>
          </Link>
        </motion.div>
      </div>
      <span className={styles.ageRange}>{course.age_range}</span>
    </motion.div>
  );
}

export default CourseCard;
