"use client";

import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";
import { motion } from "framer-motion";

interface BackButtonProps {
  label: string;
}
export default function BackButton({ label }: BackButtonProps): JSX.Element {
  return (
    <Link href="/">
      <motion.div
        className="flex gap-2 items-center cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <BiArrowBack className="text-2xl font-bold" />
        <div className="text-2xl font-lilita">{label}</div>
      </motion.div>
    </Link>
  );
}
