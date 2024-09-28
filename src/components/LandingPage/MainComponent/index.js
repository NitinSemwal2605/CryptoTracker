import { motion } from "framer-motion";
import React from "react";
import { toast } from "react-toastify";
import { RWebShare } from "react-web-share";
import gradient from "../../../assets/gradient.png";
import iphone from "../../../assets/iphone.png";
import Button from "../../Common/Button";
import "./styles.css";

function MainComponent() {
  return (
    <div className="main-flex">
      <div className="info-landing">
        <motion.h1
          className="heading1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          className="heading2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 1 }}
        >
          Stay Ahead.
        </motion.h1>
        <motion.p
          className="info-text"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Track your favourite Cryptocurrency in real time. Visit the dashboard to
          do so!
        </motion.p>
        
        <motion.div
          className="btn-flex"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.75 }}
        >
          <a href="/dashboard">
            <Button text={"Dashboard"} />
          </a>
          <RWebShare
            data={{
              text: "CryptoDashboard made by Nitin Semwal using React JS.",
              url: "https://nitinsemwal.vercel.app",
              title: "CryptoTracker.",
            }}
            onClick={() => toast.info("App Shared!")}
          >
            <Button text={"Share App"} outlined={true} />
          </RWebShare>
        </motion.div>
      </div>

      <div className="gradient-div">
        <img src={gradient} className="gradient" alt="gradient" />
        <motion.img
          src={iphone}
          className="iphone"
          alt="iphone"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
      </div>

    </div>
  );
}

export default MainComponent;
