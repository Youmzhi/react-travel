import React, { useState } from "react";
import { Tag } from "antd";
const { CheckableTag } = Tag;

interface PropsType {
  onSelect?: () => void;
  children: React.ReactNode;
  // ...props 使用了children （发生代码 return <FilterTag key={`filter${index}`}>{t}</FilterTag>;）
}

export const FilterTag: React.FC<PropsType> = (props) => {
  const [checked, setChecked] = useState(false);

  const handleChange = (checked) => {
    setChecked(checked);
  };

  return <CheckableTag {...props} checked={checked} onChange={handleChange} />;
};
