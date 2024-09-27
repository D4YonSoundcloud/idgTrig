export function drawTriangle(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineTo(x3, y3)
    ctx.closePath()
    ctx.stroke()
}

export function drawCircle(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.stroke()
}

export function drawPoint(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number = 5) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, Math.PI * 2)
    ctx.fill()
}

export function drawLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()
}

export function setupCanvas(width: number, height: number) {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (ctx) {
        ctx.strokeStyle = '#00ffff'
        ctx.fillStyle = '#00ffff'
        ctx.lineWidth = 2
        ctx.font = '16px Arial'
    }
    return { canvas, ctx }
}

export function drawText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, fontSize: number = 16) {
    ctx.font = `${fontSize}px Arial`
    ctx.fillText(text, x, y)
}

export function drawArc(ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise: boolean = false) {
    ctx.beginPath()
    ctx.arc(x, y, radius, startAngle, endAngle, counterclockwise)
    ctx.stroke()
}

export function drawArrow(ctx: CanvasRenderingContext2D, fromX: number, fromY: number, toX: number, toY: number, color: string) {
    const headLength = 10
    const dx = toX - fromX
    const dy = toY - fromY
    const angle = Math.atan2(dy, dx)

    // Save the current context state
    ctx.save()

    // Set the color
    ctx.strokeStyle = color
    ctx.fillStyle = color

    // Draw the line
    ctx.beginPath()
    ctx.moveTo(fromX, fromY)
    ctx.lineTo(toX, toY)
    ctx.stroke()

    // Draw the arrow head
    ctx.beginPath()
    ctx.moveTo(toX, toY)
    ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6))
    ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6))
    ctx.closePath()
    ctx.fill()

    // Restore the context state
    ctx.restore()
}