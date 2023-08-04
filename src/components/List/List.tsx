import React, { CSSProperties } from "react"

type ListPropsType<T> = {
  items: Array<T>
  renderItem: (item: T) => React.ReactNode
  style?: CSSProperties
}

export const List = <T extends {}>({
  items,
  renderItem,
  style,
}: ListPropsType<T>) => {
  return <div style={style}>{items && items.map(renderItem)}</div>
}
