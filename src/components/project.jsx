import React from "react";
import { motion } from "framer-motion";

const MiniProjectHeader = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="text-center max-w-2xl">

        {/* Animated Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.3,
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Customer Segmentation & Review Sentiment Analytics
          </motion.span>

          <motion.span
            className="block text-lg md:text-xl text-gray-500 dark:text-gray-400 font-medium mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.6,
              duration: 1.2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            Mini Project
          </motion.span>
        </motion.h1>

        {/* Download Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.08, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 
                       text-white font-medium rounded-lg shadow-lg 
                       hover:from-blue-700 hover:to-indigo-700 
                       transition-all text-sm md:text-base"
            onClick={() =>
              window.open(
                "https://appdistribution.firebase.google.com/testerapps/1:195095990413:android:ab80021ee87e6ea70a92c4/releases/3ju5r5sfigrbg?utm_source=firebase-console",
                "_blank"
              )
            }
          >
            Download Latest Build
          </motion.button>
        </motion.div>

        {/* Mobile-only Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-4 text-sm text-gray-600 dark:text-gray-400"
        >
          <strong>Note:</strong> This link will only open on <u>mobile devices</u> and not on desktop.
        </motion.p>

      </div>
    </section>
  );
};

export default MiniProjectHeader;
