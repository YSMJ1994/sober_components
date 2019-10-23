import React, {
  useState,
  useEffect,
  useRef,
  CSSProperties,
  FC,
  PropsWithChildren
} from "react";
import cs from "classnames";
import { prefixCls } from "../common/variables";
import { listenAndCallback } from "../utils";

interface Props {
  show?: boolean;
  className?: string;
  style?: CSSProperties;
}

const CollapseBox: FC<PropsWithChildren<Props>> = ({
  className,
  style,
  children,
  show = false
}) => {
  const listRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | "auto">(show ? "auto" : 0);

  useEffect(() => {
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
  
  const calcStyle = {
    ...style,
    height: height,
    opacity: show ? 1 : 0
  };
  return (
    <div
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
