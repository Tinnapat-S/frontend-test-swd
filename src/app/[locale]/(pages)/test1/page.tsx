"use client"
import { Button, Card, Col, ConfigProvider, Flex, Row, Typography } from "antd"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { Badge } from "./components/Badge"

type ArrowsAction = "left" | "right" | "upDown"

type ShapeStyle = {
  [key: string]: string | number // Add this index signature
}
export default function Test1() {
  const { t } = useTranslation()
  const [isSwap, setIsSwap] = useState(false)

  const [shapeStylesList, setShapeStylesList] = useState([
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
    "square",
  ])

  const cardStyle = {
    height: "120px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }

  const shapeStyles: { [key: string]: ShapeStyle } = {
    triangle: {
      width: 0,
      height: 0,
      borderTop: "40px solid transparent",
      borderBottom: "40px solid transparent",
      borderLeft: "80px solid #8c8c8c",
    },
    triangleDown: {
      width: 0,
      height: 0,
      borderLeft: "40px solid transparent",
      borderRight: "40px solid transparent",
      borderTop: "80px solid #8c8c8c",
    },
    triangleUp: {
      width: 0,
      height: 0,
      borderLeft: "40px solid transparent",
      borderRight: "40px solid transparent",
      borderBottom: "80px solid #8c8c8c",
    },
    circle: {
      width: "60px",
      height: "60px",
      backgroundColor: "#8c8c8c",
      borderRadius: "50%",
    },
    oval: {
      width: "120px",
      height: "60px",
      backgroundColor: "#8c8c8c",
      borderRadius: "50%",
    },
    trapezoid: {
      width: "120px",
      height: "60px",
      backgroundColor: "#8c8c8c",
      clipPath: "polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)",
    },
    rectangle: {
      width: "120px",
      height: "60px",
      backgroundColor: "#8c8c8c",
    },
    parallelogram: {
      width: "120px",
      height: "60px",
      backgroundColor: "#8c8c8c",
      transform: "skew(-20deg)",
    },
    square: {
      width: "60px",
      height: "60px",
      backgroundColor: "#8c8c8c",
    },
  }

  const handleArrowClick = (action: ArrowsAction) => {
    switch (action) {
      case "left":
        setShapeStylesList(shapeStylesList.slice(1).concat(shapeStylesList[0]))
        break
      case "right":
        const temp = shapeStylesList[shapeStylesList.length - 1]
        const cutArr = shapeStylesList.slice(0, shapeStylesList.length - 1)
        setShapeStylesList([temp, ...cutArr])
        break
      case "upDown":
        setIsSwap(!isSwap)
        break
      default:
        break
    }
  }

  const handleShapeClick = () => {
    const newSorted = [...shapeStylesList]
    newSorted.sort((a, b) => {
      return Math.random() - 0.5
    })
    setShapeStylesList(newSorted)
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultActiveBg: "lime",
            defaultHoverBg: "orange",
            defaultHoverBorderColor: "orange",
            defaultActiveBorderColor: "lime",
          },
        },
      }}
    >
      <Row style={{ width: "100%", padding: "0px 20px" }} justify={"start"}>
        <Col>
          <Typography.Title>{t(`header`)}</Typography.Title>
        </Col>
      </Row>
      <Flex vertical style={{ width: "80%" }} gap={48}>
        {/* Top Row - Triangles */}
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Button style={cardStyle} onClick={() => handleArrowClick("left")}>
              <div style={{ transform: "rotate(180deg)" }}>
                <div style={shapeStyles.triangle} />
              </div>
              <Badge>{t("arrow.move_shape")}</Badge>
            </Button>
          </Col>

          <Col span={12}>
            <Row style={{ width: "100%" }}>
              <Col flex={2}>
                <Button
                  style={cardStyle}
                  onClick={() => handleArrowClick("upDown")}
                >
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-around",
                    }}
                  >
                    <div style={shapeStyles.triangleUp} />
                    <div style={shapeStyles.triangleDown} />
                  </div>
                  <Badge>{t("arrow.move_position")}</Badge>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <Button style={cardStyle} onClick={() => handleArrowClick("right")}>
              <div style={shapeStyles.triangle} />
              <Badge>{t("arrow.move_shape")}</Badge>
            </Button>
          </Col>
        </Row>
        <Flex vertical gap={16}>
          <Row gutter={[16, 16]} style={{ order: isSwap ? 2 : 1 }}>
            {/* Middle Row - Circle, Oval, Trapezoid */}
            <Col span={2}></Col>
            {shapeStylesList.slice(0, 3).map((shape, index) => (
              <Col flex={1} key={index}>
                <Button style={cardStyle} onClick={handleShapeClick}>
                  <div style={shapeStyles[`${shape}`]} />
                </Button>
              </Col>
            ))}
          </Row>
          <Row gutter={[16, 16]} style={{ order: isSwap ? 1 : 2 }}>
            {shapeStylesList.slice(3, 6).map((shape, index) => (
              <Col flex={1} key={index}>
                <Button style={cardStyle} onClick={handleShapeClick}>
                  <div style={shapeStyles[`${shape}`]} />
                </Button>
              </Col>
            ))}
            <Col span={2}></Col>
          </Row>
        </Flex>
      </Flex>
    </ConfigProvider>
  )
}
