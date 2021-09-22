
import { main } from "@/modules/textAni";
import { useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";


const Canvas = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      return main(canvas, ctx)
    }
  }, [])

  return (
    <div className={styles.root}>
      <canvas ref={ref} />
    </div>
  )
}

export default Canvas;