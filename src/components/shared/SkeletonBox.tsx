import React from "react";
import clsx from "clsx";

import styles from "../../styles/SkeletonBox.module.css";

type SkeletonBoxProps = {
  className?: string;
};

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ className }) => {
  return <div className={clsx(styles.skeletonBox, "rounded-md", className)} />;
};

export default SkeletonBox;
