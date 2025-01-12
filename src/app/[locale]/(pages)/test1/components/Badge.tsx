interface BadgeProps {
  children: React.ReactNode
}
export const Badge = ({ children = "text" }: BadgeProps) => {
  console.log(children)
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: "-10px",
        transform: "translateX(-50%)",
        background: "#72DA9F",
        color: "white",
        zIndex: 20,
        padding: "0px 8px",
        borderRadius: "999px",
      }}
    >
      {children}
    </div>
  )
}
