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
  const [fullHeight, setFullHeight] = useState<number | "auto">("auto");
  useEffect(() => {
    if (!listRef.current) {
      return;
    }
    const dom = listRef.current;
    setFullHeight(dom.scrollHeight || "auto");
  }, [children, listRef.current]);
  const calcStyle = {
    ...style,
    height: show ? fullHeight : 0,
    opacity: show ? 1 : 0
  };
  return (
    <div
      className={cs(`${prefixCls}-collapse-box`, className)}
      style={calcStyle}
      ref={listRef}
    >
      {children}
    </div>
  );
};

export default CollapseBox;
