"use client";

import { Tooltip } from "@mui/material";
import { motion } from "framer-motion";

import "./index.css";

interface ButtonProps {
  className?: string;
  disabled?: boolean;
  tooltip?: {
    title: string;
    placement?: "top" | "bottom" | "left" | "right" | undefined;
  };
  onClick?: () => void;
  children?: JSX.Element;
}

export default function Button({
  className,
  tooltip,
  disabled = false,
  onClick,
  children,
}: ButtonProps): JSX.Element {
  return (
    <Tooltip
      title={tooltip ? tooltip.title : undefined}
      arrow
      placement={tooltip ? tooltip.placement : undefined}
    >
      <motion.button
        className={`${disabled ? "disabled-button" : "button"} ${className}`}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </motion.button>
    </Tooltip>
  );
}
