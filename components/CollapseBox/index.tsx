import React, { useState, useEffect, useRef, CSSProperties, FC } from "react";
import cs from "classnames";
import { prefixCls } from "../common/variables";

interface CollapseProps {
  show?: boolean;
  className?: string;
  style?: CSSProperties;
  animated?: boolean;
}

const CollapseBox: FC<CollapseProps> = ({
  className,
  style,
  children,
  show = false,
  animated = true
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(show ? "auto" : 0);

  useEffect(() => {
    if (!animated) {
      setHeight(show ? "auto" : 0);
      return;
    }
    if (!listRef.current) {
      return;
    }
    // 计算高度
    const fullHeight = listRef.current.scrollHeight;
    if (show) {
      // 展开
      setHeight(fullHeight);
      const timeout = setTimeout(() => {
        setHeight("auto");
      }, 220);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      // 折叠
      if (height === "auto") {
        setHeight(fullHeight);
        setTimeout(() => {
          setHeight(0);
        }, 20);
      } else {
        setHeight(0);
      }
    }
  }, [listRef.current, show]);

  const animateStyle = {
    opacity: show ? 1 : 0
  };
  const calcStyle = {
    ...style,
    height: height,
    ...(animated ? animateStyle : {})
  };
  return (
    <div
      data-animated={animated}
      className={cs(
        `${prefixCls}-collapse-box`,
        `${prefixCls}-collapse-box--${show ? "show" : "hide"}`,
        className
      )}
      style={calcStyle}
      ref={listRef}
    >
      {children}
    </div>
  );
};

export default CollapseBox;
