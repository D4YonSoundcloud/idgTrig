import { useLessonsStore } from '@/stores/lessons'
import type { Lesson, VisualizationProps } from '@/stores/lessons'
import { drawTriangle, drawCircle, drawPoint, drawLine, setupCanvas, drawText, drawArc, drawArrow } from '@/utils/canvasUtils'

export function setupLessons() {
    const lessonStore = useLessonsStore()

    const triangleLesson: Lesson = {
        id: 1,
        title: 'Introduction to Triangles and Right Angles',
        introduction: `
            <p>Welcome to our first lesson on triangles! In this lesson, we'll explore the fundamental concepts of triangles, with a special focus on right-angled triangles. We'll break this down into several sublessons to make it easier to understand and digest.</p>
            <p>By the end of this lesson, you'll have a solid understanding of what makes a triangle, the different types of triangles, and the special properties of right-angled triangles.</p>
        `,
        prerequisites: [],
        sublessons: [
            {
                id: '1.1',
                title: 'What is a Triangle?',
                content: `
                    <h2>Basic Triangle Properties</h2>
                    <p>A triangle is a geometric shape with three sides and three angles. Here are some key properties:</p>
                    <ul>
                        <li>The sum of the angles in any triangle is always 180 degrees.</li>
                        <li>The longest side is always opposite the largest angle.</li>
                        <li>The shortest side is always opposite the smallest angle.</li>
                    </ul>
                    <p>Use the sliders below to adjust the triangle and observe how changing one side affects the others.</p>
                `,
                sliders: [
                    {
                        id: 'side1',
                        label: 'Side 1 Length',
                        min: 50,
                        max: 300,
                        step: 1,
                        defaultValue: 100,
                        explanation: "Adjust the length of the first side of the triangle."
                    },
                    {
                        id: 'side2',
                        label: 'Side 2 Length',
                        min: 50,
                        max: 300,
                        step: 1,
                        defaultValue: 100,
                        explanation: "Adjust the length of the second side of the triangle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, side1 = 100, side2 = 100 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)

                                const startX = 100, startY = 500
                                const angle = Math.acos((side1**2 + side2**2 - side1**2) / (2 * side1 * side2))
                                const endX = startX + side1
                                const endY = startY - side2 * Math.sin(angle)

                                drawTriangle(ctx, startX, startY, endX, startY, endX, endY)

                                // Label sides
                                drawText(ctx, `Side 1: ${side1}`, (startX + endX) / 2, startY + 20, 18)
                                drawText(ctx, `Side 2: ${side2}`, endX + 10, (startY + endY) / 2, 18)
                                const side3 = Math.sqrt(side1**2 + side2**2 - 2*side1*side2*Math.cos(angle)).toFixed(2)
                                drawText(ctx, `Side 3: ${side3}`, (startX + endX) / 2 - 40, (startY + endY) / 2 - 20, 18)

                                // Calculate and display angles
                                const angleA = (Math.acos((side2**2 + side3**2 - side1**2) / (2 * side2 * side3)) * 180 / Math.PI).toFixed(1)
                                const angleB = (Math.acos((side1**2 + side3**2 - side2**2) / (2 * side1 * side3)) * 180 / Math.PI).toFixed(1)
                                const angleC = (180 - parseFloat(angleA) - parseFloat(angleB)).toFixed(1)
                                drawText(ctx, `A: ${angleA}°`, startX - 40, startY - 20, 18)
                                drawText(ctx, `B: ${angleB}°`, endX + 20, startY - 20, 18)
                                drawText(ctx, `C: ${angleC}°`, endX - 40, endY - 20, 18)
                            }
                        }
                    }
                ]
            },
            {
                id: '1.2',
                title: 'Right-Angled Triangles',
                content: `
                    <h2>What Makes a Right-Angled Triangle Special?</h2>
                    <p>A right-angled triangle is a special type of triangle that has one angle measuring exactly 90 degrees (a right angle). This type of triangle is fundamental to trigonometry and has some unique properties:</p>
                    <ul>
                        <li><strong>Hypotenuse:</strong> The longest side of the triangle, opposite the right angle.</li>
                        <li><strong>Pythagorean Theorem:</strong> In a right-angled triangle, a² + b² = c², where c is the length of the hypotenuse and a and b are the lengths of the other two sides.</li>
                    </ul>
                    <p>Use the sliders below to adjust the right-angled triangle. Observe how changing the length of one side affects the other sides while maintaining the 90-degree angle.</p>
                `,
                sliders: [
                    {
                        id: 'baseLength',
                        label: 'Base Length',
                        min: 50,
                        max: 400,
                        step: 1,
                        defaultValue: 200,
                        explanation: "This slider adjusts the length of the base (adjacent side) of the right-angled triangle. As you increase this value, watch how the hypotenuse changes while the height remains constant."
                    },
                    {
                        id: 'height',
                        label: 'Height',
                        min: 50,
                        max: 400,
                        step: 1,
                        defaultValue: 200,
                        explanation: "This slider controls the height (opposite side) of the right-angled triangle. Adjust this to see how it affects the hypotenuse and the angles of the triangle."
                    },
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, baseLength = 200, height = 200 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)

                                const startX = 100
                                const startY = 500

                                drawTriangle(ctx, startX, startY, startX + baseLength, startY, startX, startY - height)

                                // Draw right angle symbol
                                ctx.beginPath()
                                ctx.moveTo(startX + 40, startY)
                                ctx.lineTo(startX + 40, startY - 40)
                                ctx.lineTo(startX, startY - 40)
                                ctx.stroke()

                                // Label sides
                                drawText(ctx, `Base: ${baseLength}`, startX + baseLength/2 - 40, startY + 40, 18)
                                drawText(ctx, `Height: ${height}`, startX - 80, startY - height/2, 18)
                                const hypotenuse = Math.sqrt(baseLength**2 + height**2).toFixed(2)
                                drawText(ctx, `Hypotenuse: ${hypotenuse}`, startX + baseLength/2 + 40, startY - height/2, 18)

                                // Calculate and display angles
                                const angleA = Math.atan(height/baseLength) * (180/Math.PI)
                                const angleB = 90 - angleA
                                drawText(ctx, `α: ${angleA.toFixed(1)}°`, startX + 20, startY - 20, 18)
                                drawText(ctx, `β: ${angleB.toFixed(1)}°`, startX + baseLength - 60, startY - 40, 18)
                            }
                        }
                    }
                ]
            },
            {
                id: '1.3',
                title: 'Types of Triangles',
                content: `
                    <h2>Understanding Different Types of Triangles</h2>
                    <p>Triangles can be classified based on their angles and sides. Let's explore the main types:</p>
                    <ul>
                        <li><strong>Equilateral Triangle:</strong> All three sides are equal in length, and all angles are 60°.</li>
                        <li><strong>Isosceles Triangle:</strong> Two sides are equal in length, and two angles are equal.</li>
                        <li><strong>Scalene Triangle:</strong> All sides have different lengths, and all angles are different.</li>
                        <li><strong>Right Triangle:</strong> Has one 90° angle (which we covered in the previous lesson).</li>
                        <li><strong>Acute Triangle:</strong> All angles are less than 90°.</li>
                        <li><strong>Obtuse Triangle:</strong> Has one angle greater than 90°.</li>
                    </ul>
                    <p>Use the sliders below to explore different triangle types. Watch how the triangle changes as you adjust the side lengths.</p>
                `,
                sliders: [
                    {
                        id: 'side1',
                        label: 'Side 1 Length',
                        min: 50,
                        max: 300,
                        step: 1,
                        defaultValue: 100,
                        explanation: "Adjust the length of the first side of the triangle."
                    },
                    {
                        id: 'side2',
                        label: 'Side 2 Length',
                        min: 50,
                        max: 300,
                        step: 1,
                        defaultValue: 100,
                        explanation: "Adjust the length of the second side of the triangle."
                    },
                    {
                        id: 'side3',
                        label: 'Side 3 Length',
                        min: 50,
                        max: 300,
                        step: 1,
                        defaultValue: 100,
                        explanation: "Adjust the length of the third side of the triangle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, side1 = 100, side2 = 100, side3 = 100 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)

                                const startX = 100, startY = 500

                                // Check if triangle is possible
                                if (side1 + side2 > side3 && side2 + side3 > side1 && side1 + side3 > side2) {
                                    // Calculate angles
                                    const angleA = Math.acos((side2**2 + side3**2 - side1**2) / (2 * side2 * side3))
                                    const angleB = Math.acos((side1**2 + side3**2 - side2**2) / (2 * side1 * side3))
                                    const angleC = Math.PI - angleA - angleB

                                    // Calculate coordinates
                                    const x2 = startX + side3
                                    const y2 = startY
                                    const x3 = startX + side2 * Math.cos(angleA)
                                    const y3 = startY - side2 * Math.sin(angleA)

                                    drawTriangle(ctx, startX, startY, x2, y2, x3, y3)

                                    // Label sides
                                    drawText(ctx, `Side 1: ${side1}`, (startX + x3) / 2 - 40, (startY + y3) / 2 + 20, 18)
                                    drawText(ctx, `Side 2: ${side2}`, (x2 + x3) / 2 + 20, (y2 + y3) / 2, 18)
                                    drawText(ctx, `Side 3: ${side3}`, (startX + x2) / 2, startY + 40, 18)

                                    // Label angles
                                    drawText(ctx, `A: ${(angleA * 180 / Math.PI).toFixed(1)}°`, startX - 40, startY - 20, 18)
                                    drawText(ctx, `B: ${(angleB * 180 / Math.PI).toFixed(1)}°`, x2 + 20, y2 - 20, 18)
                                    drawText(ctx, `C: ${(angleC * 180 / Math.PI).toFixed(1)}°`, x3 - 20, y3 - 20, 18)

                                    // Determine triangle type
                                    let typeText = ""
                                    if (side1 === side2 && side2 === side3) {
                                        typeText = "Equilateral Triangle"
                                    } else if (side1 === side2 || side2 === side3 || side1 === side3) {
                                        typeText = "Isosceles Triangle"
                                    } else {
                                        typeText = "Scalene Triangle"
                                    }

                                    if (Math.max(angleA, angleB, angleC) > Math.PI / 2) {
                                        typeText += ", Obtuse Triangle"
                                    } else if (Math.max(angleA, angleB, angleC) === Math.PI / 2) {
                                        typeText += ", Right Triangle"
                                    } else {
                                        typeText += ", Acute Triangle"
                                    }

                                    drawText(ctx, typeText, 300, 50, 24)
                                } else {
                                    drawText(ctx, "Invalid triangle: sum of any two sides must be greater than the third side", 300, 300, 18)
                                }
                            }
                        }
                    }
                ]
            },
            {
                id: '1.4',
                title: 'The Pythagorean Theorem',
                content: `
                    <h2>Understanding the Pythagorean Theorem</h2>
                    <p>The Pythagorean theorem is a fundamental principle in geometry that relates the lengths of the sides in a right-angled triangle. It states that:</p>
                    <p><strong>In a right-angled triangle, the square of the length of the hypotenuse (the side opposite the right angle) is equal to the sum of squares of the other two sides.</strong></p>
                    <p>Mathematically, it's expressed as: a² + b² = c², where c is the length of the hypotenuse, and a and b are the lengths of the other two sides.</p>
                    <p>This theorem is incredibly useful for:</p>
                    <ul>
                        <li>Finding the length of an unknown side in a right-angled triangle</li>
                        <li>Determining if a triangle is a right triangle</li>
                        <li>Calculating distances in two-dimensional space</li>
                    </ul>
                    <p>Use the sliders below to adjust the lengths of the two shorter sides of a right-angled triangle. Observe how the length of the hypotenuse changes according to the Pythagorean theorem.</p>
                `,
                sliders: [
                    {
                        id: 'sideA',
                        label: 'Side a Length',
                        min: 1,
                        max: 10,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Adjust the length of side a of the right triangle."
                    },
                    {
                        id: 'sideB',
                        label: 'Side b Length',
                        min: 1,
                        max: 10,
                        step: 0.1,
                        defaultValue: 4,
                        explanation: "Adjust the length of side b of the right triangle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, sideA = 3, sideB = 4 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)

                                const scale = 40  // Scale factor to make the triangle larger on canvas
                                const startX = 100
                                const startY = 500

                                const sideC = Math.sqrt(sideA * sideA + sideB * sideB)

                                // Draw the triangle
                                drawTriangle(ctx, startX, startY, startX + sideA * scale, startY, startX, startY - sideB * scale)

                                // Draw right angle symbol
                                ctx.beginPath()
                                ctx.moveTo(startX + 20, startY)
                                ctx.lineTo(startX + 20, startY - 20)
                                ctx.lineTo(startX, startY - 20)
                                ctx.stroke()

                                // Label sides
                                drawText(ctx, `a = ${sideA.toFixed(1)}`, startX + (sideA * scale) / 2 - 20, startY + 30, 18)
                                drawText(ctx, `b = ${sideB.toFixed(1)}`, startX - 50, startY - (sideB * scale) / 2, 18)
                                drawText(ctx, `c = √(a² + b²) = ${sideC.toFixed(2)}`, startX + (sideA * scale) / 2 + 20, startY - (sideB * scale) / 2 - 20, 18)

                                // Display the Pythagorean theorem
                                drawText(ctx, `a² + b² = c²`, 100, 50, 24)
                                drawText(ctx, `${(sideA * sideA).toFixed(2)} + ${(sideB * sideB).toFixed(2)} = ${(sideC * sideC).toFixed(2)}`, 100, 90, 20)
                            }
                        }
                    }
                ]
            },
            {
                id: '1.5',
                title: 'Special Right Triangles (30-60-90 and 45-45-90)',
                content: `
                    <h2>Understanding Special Right Triangles</h2>
                    <p>There are two types of right triangles that have special properties and occur frequently in geometry and trigonometry problems: the 30-60-90 triangle and the 45-45-90 triangle.</p>
                    <h3>30-60-90 Triangle</h3>
                    <ul>
                        <li>Angles: 30°, 60°, and 90°</li>
                        <li>If the shortest side (opposite to 30°) has length x:</li>
                        <li>The hypotenuse (opposite to 90°) has length 2x</li>
                        <li>The remaining side (opposite to 60°) has length x√3</li>
                    </ul>
                    <h3>45-45-90 Triangle</h3>
                    <ul>
                        <li>Also known as an isosceles right triangle</li>
                        <li>Angles: 45°, 45°, and 90°</li>
                        <li>If the two equal sides (opposite to 45°) have length x:</li>
                        <li>The hypotenuse (opposite to 90°) has length x√2</li>
                    </ul>
                    <p>Use the slider below to switch between these special right triangles and observe their unique properties.</p>
                `,
                sliders: [
                    {
                        id: 'triangleType',
                        label: 'Triangle Type',
                        min: 0,
                        max: 1,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Switch between 30-60-90 (0) and 45-45-90 (1) triangles."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, triangleType = 0 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)

                                const scale = 200  // Scale factor to make the triangle larger on canvas
                                const startX = 100
                                const startY = 500

                                if (triangleType === 0) {  // 30-60-90 triangle
                                    const x = 1
                                    const y = Math.sqrt(3)
                                    const z = 2

                                    // Draw the triangle
                                    drawTriangle(ctx, startX, startY, startX + z * scale, startY, startX + x * scale / 2, startY - y * scale / 2)

                                    // Draw right angle symbol
                                    ctx.beginPath()
                                    ctx.moveTo(startX + 20, startY)
                                    ctx.lineTo(startX + 20, startY - 20)
                                    ctx.lineTo(startX, startY - 20)
                                    ctx.stroke()

                                    // Label sides and angles
                                    drawText(ctx, `x`, startX + (z * scale) / 2 - 20, startY + 30, 18)
                                    drawText(ctx, `x√3`, startX - 50, startY - (y * scale) / 4, 18)
                                    drawText(ctx, `2x`, startX + (x * scale) / 4 + 20, startY - (y * scale) / 4 - 20, 18)
                                    drawText(ctx, `30°`, startX + 30, startY - 30, 18)
                                    drawText(ctx, `60°`, startX + z * scale - 50, startY - 30, 18)

                                    // Display triangle type
                                    drawText(ctx, `30-60-90 Triangle`, 100, 50, 24)
                                } else {  // 45-45-90 triangle
                                    const x = 1
                                    const z = Math.sqrt(2)

                                    // Draw the triangle
                                    drawTriangle(ctx, startX, startY, startX + z * scale, startY, startX, startY - z * scale)

                                    // Draw right angle symbol
                                    ctx.beginPath()
                                    ctx.moveTo(startX + 20, startY)
                                    ctx.lineTo(startX + 20, startY - 20)
                                    ctx.lineTo(startX, startY - 20)
                                    ctx.stroke()

                                    // Label sides and angles
                                    drawText(ctx, `x`, startX + (z * scale) / 2 - 20, startY + 30, 18)
                                    drawText(ctx, `x`, startX - 40, startY - (z * scale) / 2, 18)
                                    drawText(ctx, `x√2`, startX + (z * scale) / 2 + 20, startY - (z * scale) / 2 - 20, 18)
                                    drawText(ctx, `45°`, startX + 30, startY - 30, 18)
                                    drawText(ctx, `45°`, startX + z * scale - 50, startY - 30, 18)

                                    // Display triangle type
                                    drawText(ctx, `45-45-90 Triangle`, 100, 50, 24)
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }

    const unitCircleLesson: Lesson = {
        id: 2,
        title: 'The Unit Circle and Basic Trigonometric Functions',
        introduction: `
        <p>Welcome to our exploration of the unit circle and basic trigonometric functions! This lesson is crucial for understanding the foundations of trigonometry and how it relates to circles and periodic functions.</p>
        <p>We'll start by introducing the unit circle, then move on to understand radians, and finally explore the fundamental trigonometric functions: sine and cosine.</p>
    `,
        prerequisites: [1],
        sublessons: [
            {
                id: '2.1',
                title: 'Understanding the Unit Circle',
                content: `
                <h2>What is the Unit Circle?</h2>
                <p>The unit circle is a circle with a radius of 1 centered at the origin (0, 0) in a coordinate plane. It's a powerful tool for understanding trigonometric functions and their relationships.</p>
                <ul>
                    <li>The circumference of the unit circle is exactly 2π (approximately 6.28).</li>
                    <li>Any point (x, y) on the unit circle corresponds to (cos θ, sin θ) for some angle θ.</li>
                    <li>Key points on the unit circle:
                        <ul>
                            <li>(1, 0) at 0°</li>
                            <li>(0, 1) at 90°</li>
                            <li>(-1, 0) at 180°</li>
                            <li>(0, -1) at 270°</li>
                        </ul>
                    </li>
                </ul>
                <p>Use the slider below to rotate a point around the unit circle and observe how its coordinates change.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Adjust the angle to move the point around the unit circle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, angle = 0 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Draw coordinate axes
                                drawLine(ctx, 100, 300, 500, 300)
                                drawLine(ctx, 300, 100, 300, 500)
                                drawText(ctx, 'x', 510, 300, 20)
                                drawText(ctx, 'y', 300, 90, 20)

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Calculate point on circle
                                const radians = angle * Math.PI / 180
                                const x = Math.cos(radians)
                                const y = Math.sin(radians)

                                // Draw point on circle
                                drawPoint(ctx, centerX + x * radius, centerY - y * radius, 5)

                                // Draw lines to axes
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX + x * radius, centerY - y * radius, centerX + x * radius, centerY)
                                drawLine(ctx, centerX + x * radius, centerY - y * radius, centerX, centerY - y * radius)
                                ctx.setLineDash([])

                                // Label point
                                drawText(ctx, `(${x.toFixed(2)}, ${y.toFixed(2)})`, centerX + x * radius + 10, centerY - y * radius - 10, 16)

                                // Label angle
                                drawText(ctx, `${angle}°`, centerX + 20, centerY - 20, 16)
                            }
                        }
                    }
                ]
            },
            {
                id: '2.2',
                title: 'Radians and Degrees',
                content: `
                <h2>Understanding Radians</h2>
                <p>Radians are another way to measure angles, often preferred in advanced mathematics due to their natural relationship with the radius of a circle.</p>
                <ul>
                    <li>One radian is the angle subtended at the center of a circle by an arc equal in length to the radius.</li>
                    <li>2π radians = 360°</li>
                    <li>π radians = 180°</li>
                    <li>Common angles:
                        <ul>
                            <li>π/6 radians = 30°</li>
                            <li>π/4 radians = 45°</li>
                            <li>π/3 radians = 60°</li>
                            <li>π/2 radians = 90°</li>
                        </ul>
                    </li>
                </ul>
                <p>Use the slider to convert between degrees and radians.</p>
            `,
                sliders: [
                    {
                        id: 'degrees',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Adjust the angle in degrees and see the equivalent in radians."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, degrees = 0 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Draw circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Calculate radians
                                const radians = degrees * Math.PI / 180

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, radius, -Math.PI/2, -Math.PI/2 + radians)
                                ctx.lineTo(centerX, centerY)
                                ctx.fillStyle = 'rgba(0, 255, 255, 0.2)'
                                ctx.fill()

                                // Label angle in degrees and radians
                                drawText(ctx, `${degrees}°`, centerX + 20, centerY - 20, 20)
                                drawText(ctx, `${radians.toFixed(2)} radians`, centerX + 20, centerY + 20, 20)

                                // Show conversion formula
                                drawText(ctx, `Conversion Formula:`, 50, 50, 20)
                                drawText(ctx, `radians = degrees * (π / 180)`, 50, 80, 18)
                                drawText(ctx, `degrees = radians * (180 / π)`, 50, 110, 18)
                            }
                        }
                    }
                ]
            },
            {
                id: '2.3',
                title: 'Introduction to Sine and Cosine',
                content: `
                <h2>Sine and Cosine on the Unit Circle</h2>
                <p>Sine and cosine are the two most fundamental trigonometric functions. On the unit circle, they correspond directly to the y and x coordinates of a point.</p>
                <ul>
                    <li>For any angle θ on the unit circle:
                        <ul>
                            <li>cos(θ) is the x-coordinate of the point</li>
                            <li>sin(θ) is the y-coordinate of the point</li>
                        </ul>
                    </li>
                    <li>This relationship is true for any angle, positive or negative.</li>
                    <li>The values of sine and cosine are always between -1 and 1.</li>
                </ul>
                <p>Use the slider to see how sine and cosine change as you move around the unit circle.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Adjust the angle to see how sine and cosine values change."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, angle = 0 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Draw coordinate axes
                                drawLine(ctx, 100, 300, 500, 300)
                                drawLine(ctx, 300, 100, 300, 500)
                                drawText(ctx, 'x (cos θ)', 510, 300, 16)
                                drawText(ctx, 'y (sin θ)', 300, 90, 16)

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Calculate point on circle
                                const radians = angle * Math.PI / 180
                                const x = Math.cos(radians)
                                const y = Math.sin(radians)

                                // Draw point on circle
                                drawPoint(ctx, centerX + x * radius, centerY - y * radius, 5)

                                // Draw lines to axes
                                ctx.strokeStyle = 'red'
                                drawLine(ctx, centerX + x * radius, centerY - y * radius, centerX + x * radius, centerY)
                                ctx.strokeStyle = 'blue'
                                drawLine(ctx, centerX + x * radius, centerY - y * radius, centerX, centerY - y * radius)
                                ctx.strokeStyle = '#00ffff'

                                // Label sine and cosine
                                drawText(ctx, `cos(${angle}°) = ${x.toFixed(2)}`, 50, 550, 18)
                                drawText(ctx, `sin(${angle}°) = ${y.toFixed(2)}`, 350, 550, 18)

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, 40, -Math.PI/2, -Math.PI/2 + radians)
                                ctx.lineTo(centerX, centerY)
                                ctx.fillStyle = 'rgba(0, 255, 255, 0.2)'
                                ctx.fill()
                                drawText(ctx, `${angle}°`, centerX + 45, centerY - 10, 16)
                            }
                        }
                    }
                ]
            },
            {
                id: '2.4',
                title: 'The Tangent Function',
                content: `
                <h2>Understanding the Tangent Function</h2>
                <p>The tangent function, often abbreviated as tan, is another fundamental trigonometric function. It has a special relationship with sine and cosine.</p>
                <ul>
                    <li><strong>Definition:</strong> For any angle θ, tan(θ) = sin(θ) / cos(θ)</li>
                    <li>On the unit circle, tan(θ) represents the length of the line segment from the point (1, 0) to the y-axis, drawn tangent to the circle at (1, 0).</li>
                    <li>Unlike sine and cosine, tangent can take any real value, including infinity.</li>
                    <li>Tangent is undefined when cos(θ) = 0, which occurs at 90° and 270° (π/2 and 3π/2 radians).</li>
                </ul>
                <p>Use the slider to see how tangent changes as you move around the unit circle. Notice how it approaches infinity as you near 90° and 270°.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Adjust the angle to see how the tangent value changes."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, angle = 0 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Draw coordinate axes
                                drawLine(ctx, 100, 300, 500, 300)
                                drawLine(ctx, 300, 100, 300, 500)
                                drawText(ctx, 'x', 510, 300, 16)
                                drawText(ctx, 'y', 300, 90, 16)

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Calculate point on circle
                                const radians = angle * Math.PI / 180
                                const x = Math.cos(radians)
                                const y = Math.sin(radians)
                                const tan = Math.tan(radians)

                                // Draw point on circle
                                drawPoint(ctx, centerX + x * radius, centerY - y * radius, 5)

                                // Draw tangent line
                                if (Math.abs(tan) < 10) {  // Limit drawing for very large tangent values
                                    ctx.strokeStyle = 'green'
                                    drawLine(ctx, centerX + radius, centerY, centerX + radius, centerY - tan * radius)
                                    ctx.strokeStyle = '#00ffff'
                                }

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, 40, -Math.PI/2, -Math.PI/2 + radians)
                                ctx.lineTo(centerX, centerY)
                                ctx.fillStyle = 'rgba(0, 255, 255, 0.2)'
                                ctx.fill()
                                drawText(ctx, `${angle}°`, centerX + 45, centerY - 10, 16)

                                // Label tangent
                                if (Math.abs(tan) < 1000) {
                                    drawText(ctx, `tan(${angle}°) = ${tan.toFixed(2)}`, 50, 550, 18)
                                } else {
                                    drawText(ctx, `tan(${angle}°) = undefined`, 50, 550, 18)
                                }

                                // Show relationship to sine and cosine
                                drawText(ctx, `tan(θ) = sin(θ) / cos(θ)`, 50, 50, 18)
                                drawText(ctx, `tan(${angle}°) = ${y.toFixed(2)} / ${x.toFixed(2)}`, 50, 80, 18)
                            }
                        }
                    }
                ]
            },
            {
                id: '2.5',
                title: 'Relationship Between Unit Circle and Right-Angled Triangles',
                content: `
                <h2>Connecting the Unit Circle to Right Triangles</h2>
                <p>The unit circle and right-angled triangles are closely related. Understanding this connection helps bridge the gap between trigonometric functions and triangle geometry.</p>
                <ul>
                    <li>Any point (x, y) on the unit circle forms a right triangle with the x-axis and a line from the origin.</li>
                    <li>In this triangle:
                        <ul>
                            <li>The hypotenuse is always 1 (the radius of the unit circle)</li>
                            <li>The adjacent side to the angle is cos(θ)</li>
                            <li>The opposite side to the angle is sin(θ)</li>
                        </ul>
                    </li>
                    <li>This relationship gives us the fundamental trigonometric ratios:
                        <ul>
                            <li>sin(θ) = opposite / hypotenuse</li>
                            <li>cos(θ) = adjacent / hypotenuse</li>
                            <li>tan(θ) = opposite / adjacent = sin(θ) / cos(θ)</li>
                        </ul>
                    </li>
                </ul>
                <p>Use the slider to see how the right triangle changes as you move around the unit circle, and how this relates to the trigonometric functions.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Adjust the angle to see how the right triangle changes on the unit circle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, angle = 0 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Draw coordinate axes
                                drawLine(ctx, 100, 300, 500, 300)
                                drawLine(ctx, 300, 100, 300, 500)
                                drawText(ctx, 'x', 510, 300, 16)
                                drawText(ctx, 'y', 300, 90, 16)

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Calculate point on circle
                                const radians = angle * Math.PI / 180
                                const x = Math.cos(radians)
                                const y = Math.sin(radians)

                                // Draw right triangle
                                ctx.strokeStyle = 'red'
                                drawTriangle(ctx, centerX, centerY, centerX + x * radius, centerY, centerX + x * radius, centerY - y * radius)
                                ctx.strokeStyle = '#00ffff'

                                // Draw point on circle
                                drawPoint(ctx, centerX + x * radius, centerY - y * radius, 5)

                                // Label sides
                                drawText(ctx, 'cos θ', centerX + x * radius / 2, centerY + 20, 16)
                                drawText(ctx, 'sin θ', centerX + x * radius + 10, centerY - y * radius / 2, 16)
                                drawText(ctx, '1', centerX + x * radius / 2 - 20, centerY - y * radius / 2 - 10, 16)

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, 40, -Math.PI/2, -Math.PI/2 + radians)
                                ctx.lineTo(centerX, centerY)
                                ctx.fillStyle = 'rgba(0, 255, 255, 0.2)'
                                ctx.fill()
                                drawText(ctx, `θ = ${angle}°`, centerX + 45, centerY - 10, 16)

                                // Show trigonometric ratios
                                drawText(ctx, `sin(θ) = opposite / hypotenuse = ${y.toFixed(2)}`, 50, 500, 16)
                                drawText(ctx, `cos(θ) = adjacent / hypotenuse = ${x.toFixed(2)}`, 50, 530, 16)
                                drawText(ctx, `tan(θ) = opposite / adjacent = ${(y/x).toFixed(2)}`, 50, 560, 16)
                            }
                        }
                    }
                ]
            }
        ]
    }

    const trigRatiosLesson: Lesson = {
        id: 3,
        title: 'Trigonometric Ratios in Right-Angled Triangles',
        introduction: `
        <p>Welcome to our lesson on Trigonometric Ratios in Right-Angled Triangles! This lesson will build on your understanding of the unit circle and apply it to right-angled triangles.</p>
        <p>We'll explore how sine, cosine, and tangent relate to the sides of right triangles, learn how to use these ratios to solve problems, understand inverse trigonometric functions, and see how these concepts apply to real-world situations.</p>
    `,
        prerequisites: [1, 2],
        sublessons: [
            {
                id: '3.1',
                title: 'Sine, Cosine, and Tangent Ratios',
                content: `
                <h2>Defining Trigonometric Ratios</h2>
                <p>In a right-angled triangle, the trigonometric ratios are defined in terms of the lengths of the sides of the triangle:</p>
                <ul>
                    <li><strong>Sine (sin):</strong> Opposite / Hypotenuse</li>
                    <li><strong>Cosine (cos):</strong> Adjacent / Hypotenuse</li>
                    <li><strong>Tangent (tan):</strong> Opposite / Adjacent</li>
                </ul>
                <h3>SOHCAHTOA Mnemonic</h3>
                <p>To remember these ratios, you can use the mnemonic SOHCAHTOA:</p>
                <ul>
                    <li><strong>SOH</strong>: Sine = Opposite / Hypotenuse</li>
                    <li><strong>CAH</strong>: Cosine = Adjacent / Hypotenuse</li>
                    <li><strong>TOA</strong>: Tangent = Opposite / Adjacent</li>
                </ul>
                <p>Use the slider to adjust the angle of the right triangle and see how the ratios change.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle θ (degrees)',
                        min: 1,
                        max: 89,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust the angle θ of the right triangle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, angle = 45 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 100, centerY = 500, size = 400
                                const radians = angle * Math.PI / 180
                                const opposite = Math.sin(radians) * size
                                const adjacent = Math.cos(radians) * size

                                // Draw right triangle
                                drawTriangle(ctx, centerX, centerY, centerX + adjacent, centerY, centerX, centerY - opposite)

                                // Label sides
                                drawText(ctx, 'Opposite', centerX - 80, centerY - opposite / 2, 16)
                                drawText(ctx, 'Adjacent', centerX + adjacent / 2, centerY + 30, 16)
                                drawText(ctx, 'Hypotenuse', centerX + adjacent / 2 - 40, centerY - opposite / 2 - 20, 16)

                                // Label angle
                                drawText(ctx, `θ = ${angle}°`, centerX + 30, centerY - 20, 16)

                                // Display ratios
                                const sin = Math.sin(radians)
                                const cos = Math.cos(radians)
                                const tan = Math.tan(radians)
                                drawText(ctx, `sin(θ) = Opposite / Hypotenuse = ${sin.toFixed(3)}`, 50, 50, 16)
                                drawText(ctx, `cos(θ) = Adjacent / Hypotenuse = ${cos.toFixed(3)}`, 50, 80, 16)
                                drawText(ctx, `tan(θ) = Opposite / Adjacent = ${tan.toFixed(3)}`, 50, 110, 16)
                            }
                        }
                    }
                ]
            },
            {
                id: '3.2',
                title: 'Using Trigonometric Ratios to Solve Problems',
                content: `
                <h2>Finding Missing Sides and Angles</h2>
                <p>Trigonometric ratios are powerful tools for solving problems involving right-angled triangles. They allow us to find missing sides or angles when we have partial information about a triangle.</p>
                <h3>Steps to Solve:</h3>
                <ol>
                    <li>Identify the known and unknown parts of the triangle.</li>
                    <li>Determine which trigonometric ratio (sin, cos, or tan) relates the known and unknown parts.</li>
                    <li>Set up an equation using the appropriate ratio.</li>
                    <li>Solve the equation for the unknown value.</li>
                </ol>
                <p>Use the sliders to adjust the known values of a right triangle. The visualization will show you how to find the missing parts.</p>
            `,
                sliders: [
                    {
                        id: 'knownAngle',
                        label: 'Known Angle (degrees)',
                        min: 1,
                        max: 89,
                        step: 1,
                        defaultValue: 30,
                        explanation: "Set the known angle of the right triangle."
                    },
                    {
                        id: 'knownSide',
                        label: 'Known Side Length',
                        min: 50,
                        max: 300,
                        step: 10,
                        defaultValue: 100,
                        explanation: "Set the length of the known side."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, knownAngle = 30, knownSide = 100 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 100, centerY = 500, scale = 1.5
                                const radians = knownAngle * Math.PI / 180
                                const opposite = Math.sin(radians) * knownSide
                                const adjacent = Math.cos(radians) * knownSide
                                const hypotenuse = knownSide

                                // Draw right triangle
                                drawTriangle(ctx, centerX, centerY, centerX + adjacent * scale, centerY, centerX, centerY - opposite * scale)

                                // Label sides
                                drawText(ctx, `${opposite.toFixed(1)}`, centerX - 40, centerY - opposite * scale / 2, 16)
                                drawText(ctx, `${adjacent.toFixed(1)}`, centerX + adjacent * scale / 2, centerY + 20, 16)
                                drawText(ctx, `${hypotenuse.toFixed(1)}`, centerX + adjacent * scale / 2 - 40, centerY - opposite * scale / 2 - 20, 16)

                                // Label angles
                                drawText(ctx, `${knownAngle}°`, centerX + 30, centerY - 20, 16)
                                drawText(ctx, `${(90 - knownAngle)}°`, centerX + adjacent * scale - 40, centerY - 20, 16)

                                // Display calculations
                                drawText(ctx, "Calculations:", 50, 50, 20)
                                drawText(ctx, `Given: Angle = ${knownAngle}°, Hypotenuse = ${knownSide}`, 50, 80, 16)
                                drawText(ctx, `Opposite = Hypotenuse × sin(${knownAngle}°) = ${knownSide} × ${Math.sin(radians).toFixed(3)} = ${opposite.toFixed(1)}`, 50, 110, 16)
                                drawText(ctx, `Adjacent = Hypotenuse × cos(${knownAngle}°) = ${knownSide} × ${Math.cos(radians).toFixed(3)} = ${adjacent.toFixed(1)}`, 50, 140, 16)
                            }
                        }
                    }
                ]
            },
            {
                id: '3.3',
                title: 'Inverse Trigonometric Functions',
                content: `
                <h2>Understanding Arcsin, Arccos, and Arctan</h2>
                <p>Inverse trigonometric functions, also known as arcfunctions, allow us to find an angle when we know the value of its trigonometric ratio.</p>
                <ul>
                    <li><strong>Arcsin (sin⁻¹):</strong> Returns the angle whose sine is the input value.</li>
                    <li><strong>Arccos (cos⁻¹):</strong> Returns the angle whose cosine is the input value.</li>
                    <li><strong>Arctan (tan⁻¹):</strong> Returns the angle whose tangent is the input value.</li>
                </ul>
                <p>These functions are particularly useful when we need to find an unknown angle in a right-angled triangle.</p>
                <p>Use the slider to input a ratio value and see the corresponding angle for each inverse trigonometric function.</p>
            `,
                sliders: [
                    {
                        id: 'ratio',
                        label: 'Ratio Value',
                        min: -1,
                        max: 1,
                        step: 0.01,
                        defaultValue: 0,
                        explanation: "Input a ratio value between -1 and 1 to see the corresponding angles."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, ratio = 0 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)

                                // Calculate inverse trig functions
                                const arcsin = Math.asin(ratio) * 180 / Math.PI
                                const arccos = Math.acos(ratio) * 180 / Math.PI
                                const arctan = Math.atan(ratio) * 180 / Math.PI

                                // Display results
                                drawText(ctx, `Input ratio: ${ratio.toFixed(2)}`, 50, 50, 20)
                                drawText(ctx, `Arcsin(${ratio.toFixed(2)}) = ${arcsin.toFixed(2)}°`, 50, 100, 18)
                                drawText(ctx, `Arccos(${ratio.toFixed(2)}) = ${arccos.toFixed(2)}°`, 50, 130, 18)
                                drawText(ctx, `Arctan(${ratio.toFixed(2)}) = ${arctan.toFixed(2)}°`, 50, 160, 18)

                                // Visualize angles on a unit circle
                                const centerX = 300, centerY = 300, radius = 200
                                drawCircle(ctx, centerX, centerY, radius)
                                drawLine(ctx, centerX - radius, centerY, centerX + radius, centerY)
                                drawLine(ctx, centerX, centerY - radius, centerX, centerY + radius)

                                // Draw angles
                                const colors = ['red', 'green', 'blue']
                                const angles = [arcsin, arccos, arctan]
                                const labels = ['sin⁻¹', 'cos⁻¹', 'tan⁻¹']
                                angles.forEach((angle, index) => {
                                    const radians = angle * Math.PI / 180
                                    ctx.beginPath()
                                    ctx.moveTo(centerX, centerY)
                                    ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + radians)
                                    ctx.lineTo(centerX, centerY)
                                    ctx.strokeStyle = colors[index]
                                    ctx.stroke()
                                    drawText(ctx, `${labels[index]}: ${angle.toFixed(2)}°`, centerX + 10, centerY + 20 + index * 30, 16, colors[index])
                                })
                            }
                        }
                    }
                ]
            },
            {
                id: '3.4',
                title: 'Solving Right Triangles',
                content: `
                <h2>Techniques for Solving All Parts of a Right Triangle</h2>
                <p>Solving a right triangle means finding the lengths of all sides and the measures of all angles. Here are the key techniques:</p>
                <ol>
                    <li><strong>Pythagorean Theorem:</strong> a² + b² = c², where c is the hypotenuse.</li>
                    <li><strong>Trigonometric Ratios:</strong> Use sin, cos, and tan to find sides or angles.</li>
                    <li><strong>Inverse Trigonometric Functions:</strong> Use arcsin, arccos, and arctan to find angles.</li>
                    <li><strong>Angle Sum Property:</strong> The sum of angles in a triangle is always 180°.</li>
                </ol>
                <p>Use the sliders to input known values of a right triangle. The visualization will show you how to solve for all parts of the triangle.</p>
            `,
                sliders: [
                    {
                        id: 'knownSide',
                        label: 'Known Side Length',
                        min: 50,
                        max: 300,
                        step: 10,
                        defaultValue: 100,
                        explanation: "Set the length of the known side."
                    },
                    {
                        id: 'knownAngle',
                        label: 'Known Angle (degrees)',
                        min: 1,
                        max: 89,
                        step: 1,
                        defaultValue: 30,
                        explanation: "Set the known angle of the right triangle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, knownSide = 100, knownAngle = 30 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 100, centerY = 500, scale = 1.5
                                const radians = knownAngle * Math.PI / 180

                                // Calculate all sides and angles
                                const hypotenuse = knownSide
                                const opposite = Math.sin(radians) * hypotenuse
                                const adjacent = Math.cos(radians) * hypotenuse
                                const otherAngle = 90 - knownAngle

                                // Draw right triangle
                                drawTriangle(ctx, centerX, centerY, centerX + adjacent * scale, centerY, centerX, centerY - opposite * scale)

                                // Label sides
                                drawText(ctx, `${opposite.toFixed(1)}`, centerX - 40, centerY - opposite * scale / 2, 16)
                                drawText(ctx, `${adjacent.toFixed(1)}`, centerX + adjacent * scale / 2, centerY + 20, 16)
                                drawText(ctx, `${hypotenuse.toFixed(1)}`, centerX + adjacent * scale / 2 - 40, centerY - opposite * scale / 2 - 20, 16)

                                // Label angles
                                drawText(ctx, `${knownAngle}°`, centerX + 30, centerY - 20, 16)
                                drawText(ctx, `${otherAngle.toFixed(1)}°`, centerX + adjacent * scale - 40, centerY - 20, 16)
                                drawText(ctx, "90°", centerX + 10, centerY - opposite * scale + 20, 16)

                                // Display calculations
                                drawText(ctx, "Solving the Triangle:", 50, 50, 20)
                                drawText(ctx, `Given: One side = ${knownSide}, One angle = ${knownAngle}°`, 50, 80, 16)
                                drawText(ctx, `1. Other angle = 90° - ${knownAngle}° = ${otherAngle.toFixed(1)}°`, 50, 110, 16)
                                drawText(ctx, `2. Hypotenuse = Given side = ${hypotenuse}`, 50, 140, 16)
                                drawText(ctx, `3. Opposite = Hypotenuse × sin(${knownAngle}°) = ${hypotenuse} × ${Math.sin(radians).toFixed(3)} = ${opposite.toFixed(1)}`, 50, 170, 16)
                                drawText(ctx, `4. Adjacent = Hypotenuse × cos(${knownAngle}°) = ${hypotenuse} × ${Math.cos(radians).toFixed(3)} = ${adjacent.toFixed(1)}`, 50, 200, 16)
                            }
                        }
                    }
                ]
            },
            {
                id: '3.5',
                title: 'Applications in Real-World Problems',
                content: `
                <h2>Practical Examples Using Trigonometric Ratios</h2>
                <p>Trigonometric ratios have numerous real-world applications. Here are some common scenarios where these concepts are used:</p>
                <ul>
                    <li><strong>Architecture and Construction:</strong> Calculating heights of buildings, slopes of roofs, etc.</li>
                    <li><strong>Navigation:</strong> Determining distances and directions in maritime and aviation.</li>
                    <li><strong>Astronomy:</strong> Measuring distances to celestial bodies.</li>
                    <li><strong>Surveying:</strong> Mapping terrains and measuring land.</li>
                    <li><strong>Physics:</strong> Analyzing forces, motion, and waves.</li>
                </ul>
                <p>Let's explore a practical example: finding the height of a tall object using its shadow.</p>
                <p>Use the sliders to adjust the angle of the sun and the length of the shadow. The visualization will show how to calculate the height of the object.</p>
            `,
                sliders: [
                    {
                        id: 'sunAngle',
                        label: 'Sun Angle (degrees)',
                        min: 1,
                        max: 89,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust the angle of the sun above the horizon."
                    },
                    {
                        id: 'shadowLength',
                        label: 'Shadow Length (meters)',
                        min: 1,
                        max: 50,
                        step: 1,
                        defaultValue: 10,
                        explanation: "Set the length of the shadow cast by the object."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, sunAngle = 45, shadowLength = 10 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const groundY = 500, scale = 10, originX = 50

                                // Calculate object height
                                const radians = sunAngle * Math.PI / 180
                                const objectHeight = shadowLength * Math.tan(radians)

                                // Draw ground
                                drawLine(ctx, 0, groundY, 600, groundY)

                                // Draw object and shadow
                                drawLine(ctx, originX, groundY, originX, groundY - objectHeight * scale)
                                drawLine(ctx, originX, groundY, originX + shadowLength * scale, groundY)

                                // Draw sun angle
                                ctx.beginPath()
                                ctx.moveTo(originX, groundY)
                                ctx.arc(originX, groundY, 50, -Math.PI / 2, -Math.PI / 2 - radians, true)
                                ctx.stroke()

                                // Label parts
                                drawText(ctx, `${shadowLength}m`, originX + shadowLength * scale / 2, groundY + 20, 16)
                                drawText(ctx, `${objectHeight.toFixed(2)}m`, originX - 40, groundY - objectHeight * scale / 2, 16)
                                drawText(ctx, `${sunAngle}°`, originX + 60, groundY - 30, 16)

                                // Display calculations
                                drawText(ctx, "Calculating Object Height:", 50, 50, 20)
                                drawText(ctx, `Given: Sun angle = ${sunAngle}°, Shadow length = ${shadowLength}m`, 50, 80, 16)
                                drawText(ctx, `tan(${sunAngle}°) = Height / Shadow Length`, 50, 110, 16)
                                drawText(ctx, `Height = Shadow Length × tan(${sunAngle}°)`, 50, 140, 16)
                                drawText(ctx, `Height = ${shadowLength} × ${Math.tan(radians).toFixed(3)} = ${objectHeight.toFixed(2)}m`, 50, 170, 16)
                            }
                        }
                    }
                ]
            }
        ]
    }

    const anglesMeasureLesson: Lesson = {
        id: 4,
        title: 'Angles and Angle Measure',
        introduction: `
        <p>Welcome to our lesson on Angles and Angle Measure! This lesson will deepen your understanding of angles, how we measure them, and why different measurement systems are important in mathematics.</p>
        <p>We'll explore various types of angles, learn about different ways to measure angles (including degrees and radians), and understand why these concepts are crucial in advanced mathematics and real-world applications.</p>
    `,
        prerequisites: [1, 2, 3],
        sublessons: [
            {
                id: '4.1',
                title: 'Angle Terminology and Notation',
                content: `
                <h2>Types of Angles</h2>
                <p>Angles are classified based on their measure:</p>
                <ul>
                    <li><strong>Acute angle:</strong> Measures less than 90°</li>
                    <li><strong>Right angle:</strong> Measures exactly 90°</li>
                    <li><strong>Obtuse angle:</strong> Measures more than 90° but less than 180°</li>
                    <li><strong>Straight angle:</strong> Measures exactly 180°</li>
                    <li><strong>Reflex angle:</strong> Measures more than 180° but less than 360°</li>
                </ul>
                <h3>Standard Position of Angles</h3>
                <p>An angle is in standard position when:</p>
                <ul>
                    <li>Its vertex is at the origin (0, 0) of a coordinate plane</li>
                    <li>Its initial side lies along the positive x-axis</li>
                    <li>Its terminal side extends from the origin at the specified angle</li>
                </ul>
                <p>Use the slider to explore different types of angles in standard position.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust the angle to see different angle types in standard position."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, angle = 45 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Draw coordinate axes
                                drawLine(ctx, 100, 300, 500, 300)
                                drawLine(ctx, 300, 100, 300, 500)
                                drawText(ctx, 'x', 510, 300, 16)
                                drawText(ctx, 'y', 300, 90, 16)

                                // Draw circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Draw angle
                                const radians = angle * Math.PI / 180
                                const endX = centerX + Math.cos(radians) * radius
                                const endY = centerY - Math.sin(radians) * radius
                                drawLine(ctx, centerX, centerY, endX, endY)
                                drawArc(ctx, centerX, centerY, 50, 0, -radians, true)

                                // Label angle
                                drawText(ctx, `${angle}°`, centerX + 60, centerY - 20, 16)

                                // Determine and display angle type
                                let angleType = ""
                                if (angle === 0 || angle === 360) angleType = "Zero angle"
                                else if (angle < 90) angleType = "Acute angle"
                                else if (angle === 90) angleType = "Right angle"
                                else if (angle < 180) angleType = "Obtuse angle"
                                else if (angle === 180) angleType = "Straight angle"
                                else angleType = "Reflex angle"

                                drawText(ctx, angleType, 50, 50, 24)
                            }
                        }
                    }
                ]
            },
            {
                id: '4.2',
                title: 'Degrees, Minutes, and Seconds',
                content: `
                <h2>Understanding Subdivisions of Degrees</h2>
                <p>While we commonly express angles in decimal degrees, there's another system that subdivides degrees into smaller units:</p>
                <ul>
                    <li><strong>Degrees (°):</strong> The primary unit of angular measure</li>
                    <li><strong>Minutes ('):</strong> 1 degree = 60 minutes</li>
                    <li><strong>Seconds (''):</strong> 1 minute = 60 seconds</li>
                </ul>
                <p>This system is known as Degrees, Minutes, Seconds (DMS) notation.</p>
                <h3>Converting between Decimal Degrees and DMS</h3>
                <p>To convert from decimal degrees to DMS:</p>
                <ol>
                    <li>The whole number part becomes degrees</li>
                    <li>Multiply the fractional part by 60 to get minutes</li>
                    <li>Multiply the new fractional part by 60 to get seconds</li>
                </ol>
                <p>Use the slider to see conversions between decimal degrees and DMS notation.</p>
            `,
                sliders: [
                    {
                        id: 'decimalDegrees',
                        label: 'Decimal Degrees',
                        min: 0,
                        max: 360,
                        step: 0.1,
                        defaultValue: 45.5,
                        explanation: "Adjust the angle in decimal degrees to see its DMS equivalent."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, decimalDegrees = 45.5 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Convert decimal degrees to DMS
                                const degrees = Math.floor(decimalDegrees)
                                const minutesDecimal = (decimalDegrees - degrees) * 60
                                const minutes = Math.floor(minutesDecimal)
                                const seconds = Math.round((minutesDecimal - minutes) * 60)

                                // Draw circle and angle
                                drawCircle(ctx, centerX, centerY, radius)
                                const radians = decimalDegrees * Math.PI / 180
                                const endX = centerX + Math.cos(radians) * radius
                                const endY = centerY - Math.sin(radians) * radius
                                drawLine(ctx, centerX, centerY, endX, endY)
                                drawArc(ctx, centerX, centerY, 50, 0, -radians, true)

                                // Label angle
                                drawText(ctx, `${decimalDegrees.toFixed(1)}°`, centerX + 60, centerY - 20, 16)

                                // Display conversions
                                drawText(ctx, "Decimal Degrees to DMS Conversion:", 50, 50, 24)
                                drawText(ctx, `${decimalDegrees.toFixed(1)}° = ${degrees}° ${minutes}' ${seconds}''`, 50, 90, 20)

                                drawText(ctx, "Conversion Process:", 50, 150, 20)
                                drawText(ctx, `1. Degrees: ${degrees}°`, 70, 180, 16)
                                drawText(ctx, `2. Minutes: (${decimalDegrees.toFixed(1)} - ${degrees}) × 60 = ${minutesDecimal.toFixed(2)}`, 70, 210, 16)
                                drawText(ctx, `   ${minutes}'`, 70, 240, 16)
                                drawText(ctx, `3. Seconds: (${minutesDecimal.toFixed(2)} - ${minutes}) × 60 = ${seconds}''`, 70, 270, 16)
                            }
                        }
                    }
                ]
            },
            {
                id: '4.3',
                title: 'Radians in Depth',
                content: `
                <h2>Why Radians are Important in Advanced Math</h2>
                <p>Radians are an alternative way to measure angles, and they become increasingly important in advanced mathematics for several reasons:</p>
                <ul>
                    <li>They provide a more natural way to describe rotations and periodic functions</li>
                    <li>Many calculus formulas become simpler when expressed in radians</li>
                    <li>They eliminate the need for conversion factors in many physics equations</li>
                </ul>
                <h3>Relationship between Radians and Circle Radius</h3>
                <p>One radian is defined as the angle subtended at the center of a circle by an arc whose length is equal to the radius of the circle.</p>
                <ul>
                    <li>A full circle is 2π radians (approximately 6.28 radians)</li>
                    <li>π radians = 180°</li>
                    <li>1 radian ≈ 57.3°</li>
                </ul>
                <p>Use the slider to explore the relationship between radians and the circle's radius.</p>
            `,
                sliders: [
                    {
                        id: 'radians',
                        label: 'Angle (radians)',
                        min: 0,
                        max: 2 * Math.PI,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the angle in radians to see its relationship with the circle's radius."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, radians = 1 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Draw circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Draw radial line
                                const endX = centerX + Math.cos(-radians) * radius
                                const endY = centerY + Math.sin(-radians) * radius
                                drawLine(ctx, centerX, centerY, endX, endY)

                                // Draw arc
                                drawArc(ctx, centerX, centerY, radius, 0, radians, false)

                                // Label angle
                                drawText(ctx, `${radians.toFixed(2)} radians`, centerX + 60, centerY - 20, 16)
                                drawText(ctx, `${(radians * 180 / Math.PI).toFixed(2)}°`, centerX + 60, centerY + 10, 16)

                                // Draw and label radius
                                drawLine(ctx, centerX, centerY, centerX + radius, centerY)
                                drawText(ctx, 'r', centerX + radius / 2, centerY - 20, 16)

                                // Draw and label arc length
                                const arcX = centerX + Math.cos(-radians/2) * (radius + 30)
                                const arcY = centerY + Math.sin(-radians/2) * (radius + 30)
                                drawText(ctx, 's = r × θ', arcX, arcY, 16)

                                // Display relationship
                                drawText(ctx, "Radian Measure:", 50, 50, 24)
                                drawText(ctx, "1 radian is the angle subtended by", 50, 90, 18)
                                drawText(ctx, "an arc length equal to the radius", 50, 120, 18)
                                drawText(ctx, `Arc length (s) = radius (r) × angle (θ)`, 50, 160, 18)
                                drawText(ctx, `s = ${radius} × ${radians.toFixed(2)} = ${(radius * radians).toFixed(2)}`, 50, 190, 18)
                            }
                        }
                    }
                ]
            },
            {
                id: '4.4',
                title: 'Converting Between Degrees and Radians',
                content: `
                <h2>Conversion Formulas and Techniques</h2>
                <p>Being able to convert between degrees and radians is an essential skill in trigonometry and calculus. Here are the key conversion formulas:</p>
                <ul>
                    <li><strong>Degrees to Radians:</strong> radians = degrees × (π / 180°)</li>
                    <li><strong>Radians to Degrees:</strong> degrees = radians × (180° / π)</li>
                </ul>
                <p>Some common angles to remember:</p>
                <ul>
                    <li>180° = π radians</li>
                    <li>90° = π/2 radians</li>
                    <li>60° = π/3 radians</li>
                    <li>45° = π/4 radians</li>
                    <li>30° = π/6 radians</li>
                </ul>
                <p>Use the slider to practice converting between degrees and radians.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust the angle to see its value in both degrees and radians."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, angle = 45 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300, radius = 200

                                // Draw circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Convert degrees to radians
                                const radians = angle * (Math.PI / 180)

                                // Draw angle
                                const endX = centerX + Math.cos(-radians) * radius
                                const endY = centerY + Math.sin(-radians) * radius
                                drawLine(ctx, centerX, centerY, endX, endY)
                                drawArc(ctx, centerX, centerY, 50, 0, -radians, true)

                                // Label angle
                                drawText(ctx, `${angle}°`, centerX + 60, centerY - 20, 16)
                                drawText(ctx, `${radians.toFixed(4)} rad`, centerX + 60, centerY + 10, 16)

                                // Display conversions
                                drawText(ctx, "Degree to Radian Conversion:", 50, 50, 24)
                                drawText(ctx, `${angle}° × (π / 180°) = ${radians.toFixed(4)} rad`, 50, 90, 18)

                                drawText(ctx, "Radian to Degree Conversion:", 50, 140, 24)
                                drawText(ctx, `${radians.toFixed(4)} rad × (180° / π) = ${angle}°`, 50, 180, 18)

                                // Display common angles
                                drawText(ctx, "Common Angle Conversions:", 50, 230, 24)
                                const commonAngles = [
                                    { deg: 180, rad: "π" },
                                    { deg: 90, rad: "π/2" },
                                    { deg: 60, rad: "π/3" },
                                    { deg: 45, rad: "π/4" },
                                    { deg: 30, rad: "π/6" }
                                ]
                                commonAngles.forEach((item, index) => {
                                    drawText(ctx, `${item.deg}° = ${item.rad} rad`, 70, 270 + index * 30, 16)
                                })
                            }
                        }
                    }
                ]
            },
            {
                id: '4.5',
                title: 'Arc Length and Sector Area',
                content: `
                <h2>Calculating Arc Length and Sector Area Using Radians</h2>
                <p>Radians are particularly useful when calculating arc lengths and sector areas of circles. Here are the formulas:</p>
                <ul>
                    <li><strong>Arc Length:</strong> L = r × θ
                        <ul>
                            <li>L is the arc length</li>
                            <li>r is the radius of the circle</li>
                            <li>θ is the central angle in radians</li>
                        </ul>
                    </li>
                    <li><strong>Sector Area:</strong> A = (1/2) × r² × θ
                        <ul>
                            <li>A is the area of the sector</li>
                            <li>r is the radius of the circle</li>
                            <li>θ is the central angle in radians</li>
                        </ul>
                    </li>
                </ul>
                <p>Use the sliders to explore how changing the radius and central angle affects the arc length and sector area.</p>
            `,
                sliders: [
                    {
                        id: 'radius',
                        label: 'Radius',
                        min: 50,
                        max: 200,
                        step: 10,
                        defaultValue: 100,
                        explanation: "Adjust the radius of the circle."
                    },
                    {
                        id: 'angle',
                        label: 'Central Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 90,
                        explanation: "Adjust the central angle of the sector."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            return setupCanvas(600, 600)
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { ctx, radius = 100, angle = 90 } = props
                            if (ctx) {
                                ctx.clearRect(0, 0, 600, 600)
                                const centerX = 300, centerY = 300
                                const radians = angle * (Math.PI / 180)

                                // Draw circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Draw sector
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, radius, 0, -radians, true)
                                ctx.lineTo(centerX, centerY)
                                ctx.fillStyle = 'rgba(0, 255, 255, 0.2)'
                                ctx.fill()
                                ctx.strokeStyle = '#00ffff'
                                ctx.stroke()

                                // Label radius and angle
                                drawLine(ctx, centerX, centerY, centerX + radius, centerY)
                                drawText(ctx, `r = ${radius}`, centerX + radius / 2, centerY - 20, 16)
                                drawText(ctx, `${angle}° = ${radians.toFixed(2)} rad`, centerX + 60, centerY - 60, 16)

                                // Calculate and display arc length and sector area
                                const arcLength = radius * radians
                                const sectorArea = 0.5 * radius * radius * radians

                                drawText(ctx, "Arc Length and Sector Area:", 50, 50, 24)
                                drawText(ctx, `Arc Length (L) = r × θ`, 50, 90, 18)
                                drawText(ctx, `L = ${radius} × ${radians.toFixed(2)} = ${arcLength.toFixed(2)}`, 70, 120, 16)
                                drawText(ctx, `Sector Area (A) = (1/2) × r² × θ`, 50, 160, 18)
                                drawText(ctx, `A = 0.5 × ${radius}² × ${radians.toFixed(2)} = ${sectorArea.toFixed(2)}`, 70, 190, 16)
                            }
                        }
                    }
                ]
            }
        ]
    }

    const trigGraphsLesson: Lesson = {
        id: 5,
        title: 'Graphs of Trigonometric Functions',
        introduction: `
        <p>Welcome to our lesson on Graphs of Trigonometric Functions! In this lesson, we'll explore the visual representations of sine, cosine, and tangent functions.</p>
        <p>Understanding these graphs is crucial for recognizing patterns in periodic phenomena and solving trigonometric equations. We'll examine the key features of each graph and how they relate to one another.</p>
    `,
        prerequisites: [2, 3, 4],
        sublessons: [
            {
                id: '5.1',
                title: 'The Sine Graph',
                content: `
                <h2>Plotting the Sine Function</h2>
                <p>The sine function is one of the most fundamental trigonometric functions. Its graph is a smooth, periodic wave that repeats every 2π radians (360°).</p>
                <h3>Key Features of the Sine Graph:</h3>
                <ul>
                    <li><strong>Amplitude:</strong> The maximum distance between the midline and the curve. For y = sin(x), the amplitude is 1.</li>
                    <li><strong>Period:</strong> The distance after which the function starts repeating. For y = sin(x), the period is 2π.</li>
                    <li><strong>Phase:</strong> The horizontal shift of the graph. The basic sine function is not shifted.</li>
                    <li><strong>Midline:</strong> The horizontal line halfway between the maximum and minimum values. For y = sin(x), the midline is y = 0.</li>
                </ul>
                <p>Use the sliders to adjust the amplitude, period, and phase of the sine function and observe how the graph changes.</p>
            `,
                sliders: [
                    {
                        id: 'amplitude',
                        label: 'Amplitude',
                        min: 0.1,
                        max: 2,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the amplitude of the sine wave."
                    },
                    {
                        id: 'period',
                        label: 'Period',
                        min: 0.5,
                        max: 4,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the period of the sine wave. Note: This actually adjusts the frequency (1/period)."
                    },
                    {
                        id: 'phase',
                        label: 'Phase Shift',
                        min: -Math.PI,
                        max: Math.PI,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the phase shift of the sine wave."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, amplitude = 1, period = 1, phase = 0 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerY = height / 2
                                const centerX = width / 2
                                const scaleX = width / 12
                                const scaleY = height / 8

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw x and y axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Label axes
                                drawText(ctx, 'y', centerX + 10, 20, Math.max(12, height / 30))
                                drawText(ctx, 'x', width - 20, centerY + 20, Math.max(12, height / 30))

                                // Plot sine wave
                                ctx.beginPath()
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = amplitude * Math.sin((x - phase) * (2 * Math.PI / period))
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()

                                // Label key points
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `Amplitude: ${amplitude.toFixed(2)}`, 20, fontSize + 10, fontSize)
                                drawText(ctx, `Period: ${(period * 2 * Math.PI).toFixed(2)}`, 20, fontSize * 2 + 20, fontSize)
                                drawText(ctx, `Phase Shift: ${phase.toFixed(2)}`, 20, fontSize * 3 + 30, fontSize)

                                // Draw period
                                const periodPixels = period * scaleX
                                drawLine(ctx, centerX, height - 30, centerX + periodPixels, height - 30)
                                drawText(ctx, 'Period', centerX + periodPixels / 2 - 30, height - 40, fontSize)

                                // Draw amplitude
                                drawLine(ctx, width - 30, centerY, width - 30, centerY - amplitude * scaleY)
                                drawText(ctx, 'Amplitude', width - 100, centerY - amplitude * scaleY / 2, fontSize)
                            }
                        }
                    }
                ]
            },
            {
                id: '5.2',
                title: 'The Cosine Graph',
                content: `
                <h2>Plotting the Cosine Function</h2>
                <p>The cosine function is closely related to the sine function. Its graph is also a smooth, periodic wave that repeats every 2π radians (360°).</p>
                <h3>Key Features of the Cosine Graph:</h3>
                <ul>
                    <li><strong>Amplitude:</strong> Like sine, the amplitude of y = cos(x) is 1.</li>
                    <li><strong>Period:</strong> The period of y = cos(x) is also 2π.</li>
                    <li><strong>Phase:</strong> The cosine function is shifted π/2 radians (90°) to the left compared to sine.</li>
                    <li><strong>Midline:</strong> The midline for y = cos(x) is also y = 0.</li>
                </ul>
                <h3>Relationship to Sine Graph:</h3>
                <p>The cosine graph is identical to the sine graph, but shifted π/2 radians (90°) to the left. In other words, cos(x) = sin(x + π/2).</p>
                <p>Use the slider to compare the sine and cosine functions.</p>
            `,
                sliders: [
                    {
                        id: 'phase',
                        label: 'Phase Shift',
                        min: -Math.PI,
                        max: Math.PI,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the phase shift to see how sine and cosine relate."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, phase = 0 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerY = height / 2
                                const centerX = width / 2
                                const scaleX = width / 12
                                const scaleY = height / 8

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw x and y axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Label axes
                                drawText(ctx, 'y', centerX + 10, 20, Math.max(12, height / 30))
                                drawText(ctx, 'x', width - 20, centerY + 20, Math.max(12, height / 30))

                                // Plot sine wave
                                ctx.beginPath()
                                ctx.strokeStyle = 'blue'
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = Math.sin((x - phase) * 2 * Math.PI)
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()

                                // Plot cosine wave
                                ctx.beginPath()
                                ctx.strokeStyle = 'red'
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = Math.cos((x - phase) * 2 * Math.PI)
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()

                                // Label functions
                                const fontSize = Math.max(12, height / 30)
                                ctx.fillStyle = 'blue'
                                drawText(ctx, 'sin(x)', 20, fontSize + 10, fontSize)
                                ctx.fillStyle = 'red'
                                drawText(ctx, 'cos(x)', 20, fontSize * 2 + 20, fontSize)
                                ctx.fillStyle = '#00ffff'
                                drawText(ctx, `Phase Shift: ${phase.toFixed(2)}`, 20, fontSize * 3 + 30, fontSize)

                                // Show relationship
                                drawText(ctx, 'cos(x) = sin(x + π/2)', width - 200, 30, fontSize)
                            }
                        }
                    }
                ]
            },
            {
                id: '5.3',
                title: 'The Tangent Graph',
                content: `
                <h2>Plotting the Tangent Function</h2>
                <p>The tangent function, defined as tan(x) = sin(x) / cos(x), has a graph that is quite different from sine and cosine. It's not a smooth wave, but instead has vertical asymptotes.</p>
                <h3>Key Features of the Tangent Graph:</h3>
                <ul>
                    <li><strong>Period:</strong> The tangent function repeats every π radians (180°), half the period of sine and cosine.</li>
                    <li><strong>Asymptotes:</strong> The graph has vertical asymptotes at x = π/2 + nπ, where n is any integer. These occur where cos(x) = 0.</li>
                    <li><strong>Range:</strong> The tangent function can take any real value, so its range is all real numbers.</li>
                    <li><strong>x-intercepts:</strong> The graph crosses the x-axis at x = nπ, where n is any integer.</li>
                </ul>
                <h3>Understanding Asymptotes:</h3>
                <p>Asymptotes occur because the tangent is undefined when cos(x) = 0. As x approaches these points, tan(x) grows arbitrarily large in the positive or negative direction.</p>
                <p>Use the slider to zoom in and out of the tangent graph and observe its behavior near the asymptotes.</p>
            `,
                sliders: [
                    {
                        id: 'zoom',
                        label: 'Zoom Level',
                        min: 0.5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the zoom level to see different parts of the tangent graph."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, zoom = 1 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerY = height / 2
                                const centerX = width / 2
                                const scaleX = width / (12 / zoom)
                                const scaleY = height / 8

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw x and y axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Label axes
                                drawText(ctx, 'y', centerX + 10, 20, Math.max(12, height / 30))
                                drawText(ctx, 'x', width - 20, centerY + 20, Math.max(12, height / 30))

                                // Plot tangent function
                                ctx.beginPath()
                                let previousY: number | null = null
                                for (let x = -6 / zoom; x <= 6 / zoom; x += 0.01) {
                                    const y = Math.tan(x * Math.PI)
                                    const scaledY = y * scaleY
                                    if (Math.abs(scaledY) < height / 2) {
                                        if (previousY !== null && Math.abs(scaledY - previousY) < height / 2) {
                                            ctx.lineTo(centerX + x * scaleX, centerY - scaledY)
                                        } else {
                                            ctx.moveTo(centerX + x * scaleX, centerY - scaledY)
                                        }
                                        previousY = scaledY
                                    } else {
                                        previousY = null
                                    }
                                }
                                ctx.stroke()

                                // Draw and label asymptotes
                                for (let n = -2; n <= 2; n++) {
                                    const asymptoteX = centerX + (n + 0.5) * Math.PI * scaleX / 2
                                    if (asymptoteX >= 0 && asymptoteX <= width) {
                                        ctx.setLineDash([5, 5])
                                        drawLine(ctx, asymptoteX, 0, asymptoteX, height)
                                        ctx.setLineDash([])
                                        drawText(ctx, `x = ${n}π/2`, asymptoteX - 30, height - 20, Math.max(12, height / 30))
                                    }
                                }

                                // Label function and zoom level
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, 'y = tan(x)', 20, fontSize + 10, fontSize)
                                drawText(ctx, `Zoom: ${zoom.toFixed(1)}x`, 20, fontSize * 2 + 20, fontSize)
                            }
                        }
                    }
                ]
            },
            {
                id: '5.4',
                title: 'Amplitude and Period',
                content: `
                <h2>Effects of A and B in y = A * sin(Bx)</h2>
                <p>The general form y = A * sin(Bx) allows us to modify the amplitude and period of the sine function:</p>
                <ul>
                    <li><strong>A: Amplitude</strong> - The absolute value of A determines the amplitude of the function.
                        <ul>
                            <li>If |A| > 1, the graph is stretched vertically.</li>
                            <li>If 0 < |A| < 1, the graph is compressed vertically.</li>
                            <li>If A < 0, the graph is reflected over the x-axis.</li>
                        </ul>
                    </li>
                    <li><strong>B: Period</strong> - B affects the period of the function.
                        <ul>
                            <li>The period is given by (2π / |B|).</li>
                            <li>If |B| > 1, the graph is compressed horizontally.</li>
                            <li>If 0 < |B| < 1, the graph is stretched horizontally.</li>
                            <li>If B < 0, the graph is reflected over the y-axis.</li>
                        </ul>
                    </li>
                </ul>
                <p>Use the sliders to adjust A and B and observe how they affect the sine graph.</p>
            `,
                sliders: [
                    {
                        id: 'A',
                        label: 'A (Amplitude)',
                        min: -3,
                        max: 3,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the amplitude of the sine function."
                    },
                    {
                        id: 'B',
                        label: 'B (Period)',
                        min: 0.1,
                        max: 3,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the period of the sine function."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, A = 1, B = 1 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerY = height / 2
                                const centerX = width / 2
                                const scaleX = width / 12
                                const scaleY = height / 8

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw x and y axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Label axes
                                drawText(ctx, 'y', centerX + 10, 20, Math.max(12, height / 30))
                                drawText(ctx, 'x', width - 20, centerY + 20, Math.max(12, height / 30))

                                // Plot modified sine wave
                                ctx.beginPath()
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = A * Math.sin(B * x * 2 * Math.PI)
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()

                                // Plot original sine wave (dashed)
                                ctx.beginPath()
                                ctx.setLineDash([5, 5])
                                ctx.strokeStyle = 'gray'
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = Math.sin(x * 2 * Math.PI)
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()
                                ctx.setLineDash([])
                                ctx.strokeStyle = '#00ffff'

                                // Label function and parameters
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `y = ${A.toFixed(1)} * sin(${B.toFixed(1)}x)`, 20, fontSize + 10, fontSize)
                                drawText(ctx, `Amplitude: ${Math.abs(A).toFixed(1)}`, 20, fontSize * 2 + 20, fontSize)
                                drawText(ctx, `Period: ${(2 * Math.PI / Math.abs(B)).toFixed(2)}`, 20, fontSize * 3 + 30, fontSize)

                                // Draw amplitude
                                drawLine(ctx, width - 30, centerY, width - 30, centerY - A * scaleY)
                                drawText(ctx, 'Amplitude', width - 100, centerY - Math.abs(A) * scaleY / 2, fontSize)

                                // Draw period
                                const periodPixels = (2 * Math.PI / Math.abs(B)) * scaleX
                                drawLine(ctx, centerX, height - 30, centerX + periodPixels, height - 30)
                                drawText(ctx, 'Period', centerX + periodPixels / 2 - 30, height - 40, fontSize)

                                // Draw grid lines
                                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
                                for (let i = -6; i <= 6; i++) {
                                    drawLine(ctx, centerX + i * scaleX, 0, centerX + i * scaleX, height)
                                    drawLine(ctx, 0, centerY + i * scaleY, width, centerY + i * scaleY)
                                }
                                ctx.strokeStyle = '#00ffff'
                            }
                        }
                    }
                ]

            },
            {
                id: '5.5',
                title: 'Phase Shift and Vertical Shift',
                content: `
                <h2>Effects of C and D in y = sin(x - C) + D</h2>
                <p>The general form y = sin(x - C) + D allows us to shift the sine function horizontally and vertically:</p>
                <ul>
                    <li><strong>C: Phase Shift</strong> - C determines the horizontal shift of the function.
                        <ul>
                            <li>The graph is shifted C units to the right.</li>
                            <li>If C is negative, the shift is to the left.</li>
                        </ul>
                    </li>
                    <li><strong>D: Vertical Shift</strong> - D determines the vertical shift of the function.
                        <ul>
                            <li>The graph is shifted D units up.</li>
                            <li>If D is negative, the shift is down.</li>
                        </ul>
                    </li>
                </ul>
                <p>Use the sliders to adjust C and D and observe how they affect the sine graph.</p>
            `,
                sliders: [
                    {
                        id: 'C',
                        label: 'C (Phase Shift)',
                        min: -Math.PI,
                        max: Math.PI,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the phase shift of the sine function."
                    },
                    {
                        id: 'D',
                        label: 'D (Vertical Shift)',
                        min: -2,
                        max: 2,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the vertical shift of the sine function."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, C = 0, D = 0 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerY = height / 2
                                const centerX = width / 2
                                const scaleX = width / 12
                                const scaleY = height / 8

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw x and y axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Label axes
                                drawText(ctx, 'y', centerX + 10, 20, Math.max(12, height / 30))
                                drawText(ctx, 'x', width - 20, centerY + 20, Math.max(12, height / 30))

                                // Plot shifted sine wave
                                ctx.beginPath()
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = Math.sin(x * 2 * Math.PI - C) + D
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()

                                // Plot original sine wave (dashed)
                                ctx.beginPath()
                                ctx.setLineDash([5, 5])
                                ctx.strokeStyle = 'gray'
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = Math.sin(x * 2 * Math.PI)
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()
                                ctx.setLineDash([])
                                ctx.strokeStyle = '#00ffff'

                                // Label function and parameters
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `y = sin(x - ${C.toFixed(2)}) + ${D.toFixed(2)}`, 20, fontSize + 10, fontSize)
                                drawText(ctx, `Phase Shift: ${C.toFixed(2)}`, 20, fontSize * 2 + 20, fontSize)
                                drawText(ctx, `Vertical Shift: ${D.toFixed(2)}`, 20, fontSize * 3 + 30, fontSize)

                                // Show phase shift
                                const shiftPixels = C * scaleX / (2 * Math.PI)
                                drawLine(ctx, centerX, height - 30, centerX + shiftPixels, height - 30)
                                drawText(ctx, 'Phase Shift', centerX + shiftPixels / 2 - 40, height - 40, fontSize)

                                // Show vertical shift
                                drawLine(ctx, width - 30, centerY, width - 30, centerY - D * scaleY)
                                drawText(ctx, 'Vertical Shift', width - 120, centerY - D * scaleY / 2, fontSize)
                            }
                        }
                    }
                ]
            },
            {
                id: '5.6',
                title: 'Graphing Composite Trigonometric Functions',
                content: `
                <h2>Combining Multiple Transformations</h2>
                <p>We can combine all the transformations we've learned to create complex trigonometric functions. The general form is:</p>
                <p><strong>y = A * sin(B(x - C)) + D</strong></p>
                <p>Where:</p>
                <ul>
                    <li>A affects the amplitude</li>
                    <li>B affects the period</li>
                    <li>C affects the phase shift</li>
                    <li>D affects the vertical shift</li>
                </ul>
                <p>The order of operations is important when graphing these functions:</p>
                <ol>
                    <li>Start with the basic sine function</li>
                    <li>Apply the period change (B)</li>
                    <li>Apply the phase shift (C)</li>
                    <li>Apply the amplitude change (A)</li>
                    <li>Apply the vertical shift (D)</li>
                </ol>
                <p>Use the sliders to adjust all parameters and see how they combine to transform the sine graph.</p>
            `,
                sliders: [
                    {
                        id: 'A',
                        label: 'A (Amplitude)',
                        min: -3,
                        max: 3,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the amplitude of the function."
                    },
                    {
                        id: 'B',
                        label: 'B (Period)',
                        min: 0.1,
                        max: 3,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the period of the function."
                    },
                    {
                        id: 'C',
                        label: 'C (Phase Shift)',
                        min: -Math.PI,
                        max: Math.PI,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the phase shift of the function."
                    },
                    {
                        id: 'D',
                        label: 'D (Vertical Shift)',
                        min: -2,
                        max: 2,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the vertical shift of the function."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, A = 1, B = 1, C = 0, D = 0 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerY = height / 2
                                const centerX = width / 2
                                const scaleX = width / 12  // Show 6 units on each side
                                const scaleY = height / 8  // Show 4 units vertically

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`  // Responsive font size

                                // Draw x and y axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Label axes
                                drawText(ctx, 'y', centerX + 10, 20, Math.max(12, height / 30))
                                drawText(ctx, 'x', width - 20, centerY + 20, Math.max(12, height / 30))

                                // Plot transformed sine wave
                                ctx.beginPath()
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = A * Math.sin(B * (x - C)) + D
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()

                                // Plot original sine wave (dashed)
                                ctx.beginPath()
                                ctx.setLineDash([5, 5])
                                ctx.strokeStyle = 'gray'
                                for (let x = -6; x <= 6; x += 0.01) {
                                    const y = Math.sin(x)
                                    ctx.lineTo(centerX + x * scaleX, centerY - y * scaleY)
                                }
                                ctx.stroke()
                                ctx.setLineDash([])
                                ctx.strokeStyle = '#00ffff'

                                // Label function and parameters
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `y = ${A.toFixed(1)} * sin(${B.toFixed(1)}(x - ${C.toFixed(2)})) + ${D.toFixed(2)}`, 20, fontSize + 10, fontSize)
                                drawText(ctx, `Amplitude: ${Math.abs(A).toFixed(1)}`, 20, fontSize * 2 + 20, fontSize)
                                drawText(ctx, `Period: ${(2 * Math.PI / Math.abs(B)).toFixed(2)}`, 20, fontSize * 3 + 30, fontSize)
                                drawText(ctx, `Phase Shift: ${C.toFixed(2)}`, 20, fontSize * 4 + 40, fontSize)
                                drawText(ctx, `Vertical Shift: ${D.toFixed(2)}`, 20, fontSize * 5 + 50, fontSize)

                                // Draw grid lines
                                ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
                                for (let i = -6; i <= 6; i++) {
                                    drawLine(ctx, centerX + i * scaleX, 0, centerX + i * scaleX, height)
                                    drawLine(ctx, 0, centerY + i * scaleY, width, centerY + i * scaleY)
                                }
                                ctx.strokeStyle = '#00ffff'
                            }
                        }
                    }
                ]
            }
        ]
    }

    const trigIdentitiesLesson: Lesson = {
        id: 6,
        title: 'Trigonometric Identities',
        introduction: `
        <p>Welcome to our lesson on Trigonometric Identities! In this lesson, we'll explore fundamental relationships between trigonometric functions that are true for all angles.</p>
        <p>Understanding these identities is crucial for simplifying trigonometric expressions, solving equations, and proving other trigonometric relationships. They form the backbone of more advanced trigonometric manipulations and are essential in many areas of mathematics and physics.</p>
    `,
        prerequisites: [2, 3, 5],
        sublessons: [
            {
                id: '6.1',
                title: 'Pythagorean Identity',
                content: `
                <h2>The Pythagorean Identity: sin²θ + cos²θ = 1</h2>
                <p>The Pythagorean identity is one of the most fundamental trigonometric identities. It states that for any angle θ:</p>
                <p style="text-align: center; font-size: 1.2em;"><strong>sin²θ + cos²θ = 1</strong></p>
                <p>This identity is derived from the Pythagorean theorem and the definitions of sine and cosine in the unit circle.</p>
                <h3>Proof using the Unit Circle:</h3>
                <ol>
                    <li>Consider a point (x, y) on the unit circle.</li>
                    <li>By definition of the unit circle, x² + y² = 1.</li>
                    <li>In the unit circle, x = cos θ and y = sin θ.</li>
                    <li>Substituting these into the unit circle equation: cos²θ + sin²θ = 1.</li>
                    <li>Rearranging: sin²θ + cos²θ = 1.</li>
                </ol>
                <p>This identity is incredibly useful for simplifying trigonometric expressions and solving equations.</p>
                <p>Use the slider below to see how sin²θ and cos²θ always sum to 1 for any angle.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle θ (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Adjust the angle to see how sin²θ and cos²θ change while their sum remains 1."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 0 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerX = width / 2
                                const centerY = height / 2
                                const radius = Math.min(width, height) * 0.4

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Convert angle to radians
                                const radians = angle * Math.PI / 180

                                // Calculate sin and cos
                                const sinTheta = Math.sin(radians)
                                const cosTheta = Math.cos(radians)

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, radius / 4, 0, -radians, true)
                                ctx.stroke()

                                // Draw point on circle
                                drawPoint(ctx, centerX + cosTheta * radius, centerY - sinTheta * radius, 5)

                                // Draw lines to axes
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX + cosTheta * radius, centerY - sinTheta * radius, centerX + cosTheta * radius, centerY)
                                drawLine(ctx, centerX + cosTheta * radius, centerY - sinTheta * radius, centerX, centerY - sinTheta * radius)
                                ctx.setLineDash([])

                                // Label sin and cos
                                drawText(ctx, `sin θ = ${sinTheta.toFixed(3)}`, centerX + 10, centerY - sinTheta * radius / 2, Math.max(12, height / 30))
                                drawText(ctx, `cos θ = ${cosTheta.toFixed(3)}`, centerX + cosTheta * radius / 2, centerY + 20, Math.max(12, height / 30))

                                // Display Pythagorean identity
                                const fontSize = Math.max(16, height / 20)
                                drawText(ctx, `sin²θ + cos²θ = ${sinTheta.toFixed(3)}² + ${cosTheta.toFixed(3)}² = ${(sinTheta * sinTheta + cosTheta * cosTheta).toFixed(3)}`, 20, height - 60, fontSize)
                                drawText(ctx, `θ = ${angle}°`, 20, height - 20, fontSize)
                            }
                        }
                    }
                ]
            },
            {
                id: '6.2',
                title: 'Reciprocal Identities',
                content: `
                <h2>Reciprocal Identities</h2>
                <p>Reciprocal identities relate the six trigonometric functions: sine (sin), cosine (cos), tangent (tan), cosecant (csc), secant (sec), and cotangent (cot).</p>
                <p>The main reciprocal identities are:</p>
                <ul>
                    <li>sin θ = 1 / csc θ  (and csc θ = 1 / sin θ)</li>
                    <li>cos θ = 1 / sec θ  (and sec θ = 1 / cos θ)</li>
                    <li>tan θ = 1 / cot θ  (and cot θ = 1 / tan θ)</li>
                </ul>
                <p>These identities are based on the definitions of csc, sec, and cot:</p>
                <ul>
                    <li>csc θ is defined as the reciprocal of sin θ</li>
                    <li>sec θ is defined as the reciprocal of cos θ</li>
                    <li>cot θ is defined as the reciprocal of tan θ</li>
                </ul>
                <p>Understanding these relationships helps in simplifying trigonometric expressions and solving equations involving these functions.</p>
                <p>Use the slider below to see how these reciprocal relationships hold for different angles.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle θ (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 30,
                        explanation: "Adjust the angle to see how the trigonometric functions and their reciprocals change."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 30 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.fillStyle = '#00ffff'
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Convert angle to radians
                                const radians = angle * Math.PI / 180

                                // Calculate trig functions
                                const sin = Math.sin(radians)
                                const cos = Math.cos(radians)
                                const tan = Math.tan(radians)
                                const csc = 1 / sin
                                const sec = 1 / cos
                                const cot = 1 / tan

                                // Display reciprocal identities
                                const fontSize = Math.max(14, height / 25)
                                drawText(ctx, `θ = ${angle}°`, 20, fontSize + 10, fontSize)
                                drawText(ctx, `sin θ = ${sin.toFixed(3)}  |  csc θ = ${csc.toFixed(3)}`, 20, fontSize * 2 + 20, fontSize)
                                drawText(ctx, `cos θ = ${cos.toFixed(3)}  |  sec θ = ${sec.toFixed(3)}`, 20, fontSize * 3 + 30, fontSize)
                                drawText(ctx, `tan θ = ${tan.toFixed(3)}  |  cot θ = ${cot.toFixed(3)}`, 20, fontSize * 4 + 40, fontSize)

                                // Display reciprocal relationships
                                drawText(ctx, `sin θ * csc θ = ${(sin * csc).toFixed(3)}`, 20, fontSize * 6 + 60, fontSize)
                                drawText(ctx, `cos θ * sec θ = ${(cos * sec).toFixed(3)}`, 20, fontSize * 7 + 70, fontSize)
                                drawText(ctx, `tan θ * cot θ = ${(tan * cot).toFixed(3)}`, 20, fontSize * 8 + 80, fontSize)
                            }
                        }
                    }
                ]
            },
            // ... (previous sublessons 6.1 and 6.2 remain unchanged)
            {
                id: '6.3',
                title: 'Quotient Identities',
                content: `
                <h2>Quotient Identities</h2>
                <p>Quotient identities relate tangent, sine, and cosine functions. The primary quotient identities are:</p>
                <ul>
                    <li><strong>tan θ = sin θ / cos θ</strong> (where cos θ ≠ 0)</li>
                    <li><strong>cot θ = cos θ / sin θ</strong> (where sin θ ≠ 0)</li>
                </ul>
                <p>These identities are derived from the definitions of trigonometric functions in the unit circle.</p>
                <h3>Proof of tan θ = sin θ / cos θ:</h3>
                <ol>
                    <li>In a unit circle, for any angle θ, we have a point (x, y) where:
                        <ul>
                            <li>x = cos θ</li>
                            <li>y = sin θ</li>
                        </ul>
                    </li>
                    <li>Tangent is defined as the ratio of y to x on the unit circle:
                        <p>tan θ = y / x</p>
                    </li>
                    <li>Substituting the definitions of sine and cosine:
                        <p>tan θ = sin θ / cos θ</p>
                    </li>
                </ol>
                <p>These identities are particularly useful when converting between trigonometric expressions or solving equations involving these functions.</p>
                <p>Use the slider below to see how these quotient identities hold for different angles.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle θ (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust the angle to see how the quotient identities hold."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 45 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerX = width / 2
                                const centerY = height / 2
                                const radius = Math.min(width, height) * 0.4

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Convert angle to radians
                                const radians = angle * Math.PI / 180

                                // Calculate sin, cos, and tan
                                const sinTheta = Math.sin(radians)
                                const cosTheta = Math.cos(radians)
                                const tanTheta = Math.tan(radians)

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, radius / 4, 0, -radians, true)
                                ctx.stroke()

                                // Draw point on circle
                                drawPoint(ctx, centerX + cosTheta * radius, centerY - sinTheta * radius, 5)

                                // Draw lines to axes
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX + cosTheta * radius, centerY - sinTheta * radius, centerX + cosTheta * radius, centerY)
                                drawLine(ctx, centerX + cosTheta * radius, centerY - sinTheta * radius, centerX, centerY - sinTheta * radius)
                                ctx.setLineDash([])

                                // Label sin, cos, and tan
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `sin θ = ${sinTheta.toFixed(3)}`, 10, fontSize + 10, fontSize)
                                drawText(ctx, `cos θ = ${cosTheta.toFixed(3)}`, 10, fontSize * 2 + 20, fontSize)
                                drawText(ctx, `tan θ = ${tanTheta.toFixed(3)}`, 10, fontSize * 3 + 30, fontSize)

                                // Display quotient identities
                                drawText(ctx, `tan θ = sin θ / cos θ`, 10, height - fontSize * 3 - 30, fontSize)
                                drawText(ctx, `${tanTheta.toFixed(3)} = ${sinTheta.toFixed(3)} / ${cosTheta.toFixed(3)} = ${(sinTheta / cosTheta).toFixed(3)}`, 10, height - fontSize * 2 - 20, fontSize)

                                if (sinTheta !== 0) {
                                    const cotTheta = 1 / tanTheta
                                    drawText(ctx, `cot θ = cos θ / sin θ`, 10, height - fontSize - 10, fontSize)
                                    drawText(ctx, `${cotTheta.toFixed(3)} = ${cosTheta.toFixed(3)} / ${sinTheta.toFixed(3)} = ${(cosTheta / sinTheta).toFixed(3)}`, 10, height - 10, fontSize)
                                }
                            }
                        }
                    }
                ]
            },
            {
                id: '6.4',
                title: 'Sum and Difference Formulas',
                content: `
                <h2>Sum and Difference Formulas</h2>
                <p>Sum and difference formulas allow us to express the sine, cosine, and tangent of the sum or difference of two angles in terms of the sines and cosines of the individual angles.</p>
                <h3>Key Formulas:</h3>
                <ul>
                    <li><strong>Sine Sum Formula:</strong> sin(A + B) = sin A cos B + cos A sin B</li>
                    <li><strong>Sine Difference Formula:</strong> sin(A - B) = sin A cos B - cos A sin B</li>
                    <li><strong>Cosine Sum Formula:</strong> cos(A + B) = cos A cos B - sin A sin B</li>
                    <li><strong>Cosine Difference Formula:</strong> cos(A - B) = cos A cos B + sin A sin B</li>
                    <li><strong>Tangent Sum Formula:</strong> tan(A + B) = (tan A + tan B) / (1 - tan A tan B)</li>
                    <li><strong>Tangent Difference Formula:</strong> tan(A - B) = (tan A - tan B) / (1 + tan A tan B)</li>
                </ul>
                <p>These formulas are particularly useful in simplifying trigonometric expressions and solving complex trigonometric equations.</p>
                <p>Use the sliders below to explore how these formulas work for different angle combinations.</p>
            `,
                sliders: [
                    {
                        id: 'angleA',
                        label: 'Angle A (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 30,
                        explanation: "Adjust angle A"
                    },
                    {
                        id: 'angleB',
                        label: 'Angle B (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust angle B"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angleA = 30, angleB = 45 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.fillStyle = '#00ffff'
                                ctx.font = `${Math.max(12, height / 40)}px Arial`

                                // Convert angles to radians
                                const radA = angleA * Math.PI / 180
                                const radB = angleB * Math.PI / 180

                                // Calculate trigonometric values
                                const sinA = Math.sin(radA)
                                const cosA = Math.cos(radA)
                                const sinB = Math.sin(radB)
                                const cosB = Math.cos(radB)
                                const sinSum = Math.sin(radA + radB)
                                const sinDiff = Math.sin(radA - radB)
                                const cosSum = Math.cos(radA + radB)
                                const cosDiff = Math.cos(radA - radB)

                                // Display results
                                const fontSize = Math.max(12, height / 40)
                                drawText(ctx, `A = ${angleA}°, B = ${angleB}°`, 20, fontSize + 10, fontSize)
                                drawText(ctx, `sin(A + B) = ${sinSum.toFixed(4)}`, 20, fontSize * 3 + 30, fontSize)
                                drawText(ctx, `sin A cos B + cos A sin B = ${(sinA * cosB + cosA * sinB).toFixed(4)}`, 20, fontSize * 4 + 40, fontSize)
                                drawText(ctx, `sin(A - B) = ${sinDiff.toFixed(4)}`, 20, fontSize * 6 + 60, fontSize)
                                drawText(ctx, `sin A cos B - cos A sin B = ${(sinA * cosB - cosA * sinB).toFixed(4)}`, 20, fontSize * 7 + 70, fontSize)
                                drawText(ctx, `cos(A + B) = ${cosSum.toFixed(4)}`, 20, fontSize * 9 + 90, fontSize)
                                drawText(ctx, `cos A cos B - sin A sin B = ${(cosA * cosB - sinA * sinB).toFixed(4)}`, 20, fontSize * 10 + 100, fontSize)
                                drawText(ctx, `cos(A - B) = ${cosDiff.toFixed(4)}`, 20, fontSize * 12 + 120, fontSize)
                                drawText(ctx, `cos A cos B + sin A sin B = ${(cosA * cosB + sinA * sinB).toFixed(4)}`, 20, fontSize * 13 + 130, fontSize)
                            }
                        }
                    }
                ]
            },
            {
                id: '6.5',
                title: 'Double Angle and Half Angle Formulas',
                content: `
                <h2>Double Angle and Half Angle Formulas</h2>
                <p>Double angle and half angle formulas are special cases of the sum and difference formulas. They allow us to express trigonometric functions of 2θ or θ/2 in terms of functions of θ.</p>
                <h3>Double Angle Formulas:</h3>
                <ul>
                    <li><strong>sin(2θ) = 2 sin θ cos θ</strong></li>
                    <li><strong>cos(2θ) = cos² θ - sin² θ = 2 cos² θ - 1 = 1 - 2 sin² θ</strong></li>
                    <li><strong>tan(2θ) = (2 tan θ) / (1 - tan² θ)</strong></li>
                </ul>
                <h3>Half Angle Formulas:</h3>
                <ul>
                    <li><strong>sin(θ/2) = ±√[(1 - cos θ) / 2]</strong></li>
                    <li><strong>cos(θ/2) = ±√[(1 + cos θ) / 2]</strong></li>
                    <li><strong>tan(θ/2) = ±√[(1 - cos θ) / (1 + cos θ)] = (1 - cos θ) / sin θ = sin θ / (1 + cos θ)</strong></li>
                </ul>
                <p>These formulas are particularly useful in integrating certain trigonometric functions and solving trigonometric equations.</p>
                <p>Use the slider below to see how these formulas work for different angles.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle θ (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 30,
                        explanation: "Adjust the angle θ to see how double and half angle formulas work."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 30 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.fillStyle = '#00ffff'
                                ctx.font = `${Math.max(12, height / 40)}px Arial`

                                // Convert angle to radians
                                const radians = angle * Math.PI / 180

                                // Calculate trigonometric values
                                const sin = Math.sin(radians)
                                const cos = Math.cos(radians)
                                const tan = Math.tan(radians)
                                const sin2 = Math.sin(2 * radians)
                                const cos2 = Math.cos(2 * radians)
                                const tan2 = Math.tan(2 * radians)
                                const sinHalf = Math.sin(radians / 2)
                                const cosHalf = Math.cos(radians / 2)
                                const tanHalf = Math.tan(radians / 2)

                                // Display results
                                const fontSize = Math.max(12, height / 40)
                                drawText(ctx, `θ = ${angle}°`, 20, fontSize + 10, fontSize)
                                drawText(ctx, `sin(2θ) = ${sin2.toFixed(4)}`, 20, fontSize * 3 + 30, fontSize)
                                drawText(ctx, `2 sin θ cos θ = ${(2 * sin * cos).toFixed(4)}`, 20, fontSize * 4 + 40, fontSize)
                                drawText(ctx, `cos(2θ) = ${cos2.toFixed(4)}`, 20, fontSize * 6 + 60, fontSize)
                                drawText(ctx, `cos² θ - sin² θ = ${(cos * cos - sin * sin).toFixed(4)}`, 20, fontSize * 7 + 70, fontSize)
                                drawText(ctx, `tan(2θ) = ${tan2.toFixed(4)}`, 20, fontSize * 9 + 90, fontSize)
                                drawText(ctx, `(2 tan θ) / (1 - tan² θ) = ${((2 * tan) / (1 - tan * tan)).toFixed(4)}`, 20, fontSize * 10 + 100, fontSize)
                                drawText(ctx, `sin(θ/2) = ${sinHalf.toFixed(4)}`, 20, fontSize * 12 + 120, fontSize)
                                drawText(ctx, `±√[(1 - cos θ) / 2] = ${(Math.sqrt((1 - cos) / 2)).toFixed(4)}`, 20, fontSize * 13 + 130, fontSize)
                            }
                        }
                    }
                ]
            },
            // ... (sublessons 6.4 and 6.5 remain unchanged)
            {
                id: '6.6',
                title: 'Product-to-Sum and Sum-to-Product Formulas',
                content: `
                <h2>Product-to-Sum and Sum-to-Product Formulas</h2>
                <p>These formulas allow us to convert between products of trigonometric functions and sums or differences of trigonometric functions. They are particularly useful in integration and simplification of trigonometric expressions.</p>
                <h3>Product-to-Sum Formulas:</h3>
                <ul>
                    <li><strong>sin A cos B = 1/2[sin(A+B) + sin(A-B)]</strong></li>
                    <li><strong>cos A sin B = 1/2[sin(A+B) - sin(A-B)]</strong></li>
                    <li><strong>cos A cos B = 1/2[cos(A+B) + cos(A-B)]</strong></li>
                    <li><strong>sin A sin B = 1/2[cos(A-B) - cos(A+B)]</strong></li>
                </ul>
                <h3>Sum-to-Product Formulas:</h3>
                <ul>
                    <li><strong>sin A + sin B = 2 sin((A+B)/2) cos((A-B)/2)</strong></li>
                    <li><strong>sin A - sin B = 2 cos((A+B)/2) sin((A-B)/2)</strong></li>
                    <li><strong>cos A + cos B = 2 cos((A+B)/2) cos((A-B)/2)</strong></li>
                    <li><strong>cos A - cos B = -2 sin((A+B)/2) sin((A-B)/2)</strong></li>
                </ul>
                <p>Use the sliders below to explore how these formulas work for different angle combinations.</p>
            `,
                sliders: [
                    {
                        id: 'angleA',
                        label: 'Angle A (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 30,
                        explanation: "Adjust angle A"
                    },
                    {
                        id: 'angleB',
                        label: 'Angle B (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust angle B"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angleA = 30, angleB = 45 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.fillStyle = '#00ffff'
                                ctx.font = `${Math.max(12, height / 40)}px Arial`

                                // Convert angles to radians
                                const radA = angleA * Math.PI / 180
                                const radB = angleB * Math.PI / 180

                                // Calculate trigonometric values
                                const sinA = Math.sin(radA)
                                const cosA = Math.cos(radA)
                                const sinB = Math.sin(radB)
                                const cosB = Math.cos(radB)

                                // Product-to-Sum calculations
                                const sinAcosB = sinA * cosB
                                const cosAsinB = cosA * sinB
                                const cosAcosB = cosA * cosB
                                const sinAsinB = sinA * sinB

                                // Sum-to-Product calculations
                                const sinSum = sinA + sinB
                                const sinDiff = sinA - sinB
                                const cosSum = cosA + cosB
                                const cosDiff = cosA - cosB

                                // Display results
                                const fontSize = Math.max(12, height / 40)
                                drawText(ctx, `A = ${angleA}°, B = ${angleB}°`, 10, fontSize + 10, fontSize)

                                // Product-to-Sum
                                drawText(ctx, 'Product-to-Sum:', 10, fontSize * 3 + 30, fontSize)
                                drawText(ctx, `sin A cos B = ${sinAcosB.toFixed(4)}`, 10, fontSize * 4 + 40, fontSize)
                                drawText(ctx, `1/2[sin(A+B) + sin(A-B)] = ${(0.5 * (Math.sin(radA + radB) + Math.sin(radA - radB))).toFixed(4)}`, 10, fontSize * 5 + 50, fontSize)

                                drawText(ctx, `cos A cos B = ${cosAcosB.toFixed(4)}`, 10, fontSize * 7 + 70, fontSize)
                                drawText(ctx, `1/2[cos(A+B) + cos(A-B)] = ${(0.5 * (Math.cos(radA + radB) + Math.cos(radA - radB))).toFixed(4)}`, 10, fontSize * 8 + 80, fontSize)

                                // Sum-to-Product
                                drawText(ctx, 'Sum-to-Product:', 10, fontSize * 10 + 100, fontSize)
                                drawText(ctx, `sin A + sin B = ${sinSum.toFixed(4)}`, 10, fontSize * 11 + 110, fontSize)
                                drawText(ctx, `2 sin((A+B)/2) cos((A-B)/2) = ${(2 * Math.sin((radA + radB) / 2) * Math.cos((radA - radB) / 2)).toFixed(4)}`, 10, fontSize * 12 + 120, fontSize)

                                drawText(ctx, `cos A + cos B = ${cosSum.toFixed(4)}`, 10, fontSize * 14 + 140, fontSize)
                                drawText(ctx, `2 cos((A+B)/2) cos((A-B)/2) = ${(2 * Math.cos((radA + radB) / 2) * Math.cos((radA - radB) / 2)).toFixed(4)}`, 10, fontSize * 15 + 150, fontSize)
                            }
                        }
                    }
                ]
            }
        ]
    }

    const trigEquationsLesson: Lesson = {
        id: 7,
        title: 'Solving Trigonometric Equations',
        introduction: `
        <p>Welcome to our lesson on Solving Trigonometric Equations! In this lesson, we'll explore various techniques for solving equations involving trigonometric functions.</p>
        <p>Trigonometric equations appear in many areas of mathematics, physics, and engineering. Understanding how to solve these equations is crucial for analyzing periodic phenomena, wave motion, and many other real-world applications.</p>
        <p>We'll start with basic solving techniques and then move on to more specific types of trigonometric equations.</p>
    `,
        prerequisites: [2, 3, 5, 6],
        sublessons: [
            {
                id: '7.1',
                title: 'Basic Equation Solving Techniques',
                content: `
                <h2>Using Algebraic Methods with Trigonometric Functions</h2>
                <p>When solving trigonometric equations, we often use algebraic techniques similar to those used for solving other types of equations. Here are some key strategies:</p>
                <ol>
                    <li><strong>Isolation:</strong> Isolate the trigonometric function on one side of the equation.</li>
                    <li><strong>Factoring:</strong> Factor the equation if possible to break it into simpler parts.</li>
                    <li><strong>Substitution:</strong> Sometimes it's helpful to substitute a variable for a trigonometric expression.</li>
                    <li><strong>Using Identities:</strong> Apply trigonometric identities to simplify the equation.</li>
                    <li><strong>Finding Reference Angles:</strong> Use the unit circle to find all solutions within a given interval.</li>
                </ol>
                <p>Remember, when solving trigonometric equations:</p>
                <ul>
                    <li>Solutions are often periodic, meaning there may be infinitely many solutions.</li>
                    <li>It's common to be asked to find solutions within a specific interval, like [0, 2π].</li>
                    <li>Always check your solutions by substituting them back into the original equation.</li>
                </ul>
                <p>Let's look at a simple example: solving cos x = 0</p>
                <ol>
                    <li>We know that cos x = 0 when x is at a 90° or 270° angle on the unit circle.</li>
                    <li>In radians, these angles are π/2 and 3π/2.</li>
                    <li>The general solution is: x = π/2 + πn or x = 3π/2 + πn, where n is any integer.</li>
                </ol>
                <p>Use the slider below to visualize this solution on the unit circle.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 90,
                        explanation: "Adjust the angle to see where cos x = 0 on the unit circle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 90 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerX = width / 2
                                const centerY = height / 2
                                const radius = Math.min(width, height) * 0.4

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Draw axes
                                drawLine(ctx, centerX - radius, centerY, centerX + radius, centerY)
                                drawLine(ctx, centerX, centerY - radius, centerX, centerY + radius)

                                // Convert angle to radians
                                const radians = angle * Math.PI / 180

                                // Calculate point on circle
                                const x = Math.cos(radians)
                                const y = Math.sin(radians)

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, radius, 0, -radians, true)
                                ctx.stroke()

                                // Draw point on circle
                                drawPoint(ctx, centerX + x * radius, centerY - y * radius, 5)

                                // Draw line to x-axis
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX + x * radius, centerY - y * radius, centerX + x * radius, centerY)
                                ctx.setLineDash([])

                                // Label angle and cos x
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `Angle: ${angle}°`, 10, fontSize + 10, fontSize)
                                drawText(ctx, `cos x = ${x.toFixed(3)}`, 10, fontSize * 2 + 20, fontSize)

                                // Highlight solutions
                                if (Math.abs(x) < 0.01) {
                                    ctx.strokeStyle = 'yellow'
                                    ctx.lineWidth = 3
                                    drawCircle(ctx, centerX + x * radius, centerY - y * radius, 10)
                                    drawText(ctx, 'Solution!', centerX + x * radius + 15, centerY - y * radius - 15, fontSize, 'yellow')
                                }
                            }
                        }
                    }
                ]
            },
            {
                id: '7.2',
                title: 'Equations Involving a Single Trigonometric Function',
                content: `
                <h2>Solving Equations like sin x = 0.5</h2>
                <p>When solving equations involving a single trigonometric function, we follow these general steps:</p>
                <ol>
                    <li>Isolate the trigonometric function on one side of the equation.</li>
                    <li>If the equation is not in the form function(x) = ±1, 0, or ±1/2, use the inverse trigonometric function to find the reference angle.</li>
                    <li>Find the reference angle using the inverse trigonometric function or recall standard angles.</li>
                    <li>Determine all angles that have the same trigonometric value within the desired interval.</li>
                </ol>
                <p>Let's solve the equation: sin x = 0.5</p>
                <ol>
                    <li>The equation is already isolated.</li>
                    <li>We can recall that this is a standard angle: sin(30°) = 0.5, or we can use arcsin(0.5) ≈ 30°.</li>
                    <li>In radians, this is π/6.</li>
                    <li>The general solution is: x = π/6 + 2πn or x = π - π/6 + 2πn = 5π/6 + 2πn, where n is any integer.</li>
                </ol>
                <p>Use the slider below to visualize the solutions to sin x = 0.5 on the unit circle.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 30,
                        explanation: "Adjust the angle to see where sin x = 0.5 on the unit circle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 30 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerX = width / 2
                                const centerY = height / 2
                                const radius = Math.min(width, height) * 0.4

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Draw axes
                                drawLine(ctx, centerX - radius, centerY, centerX + radius, centerY)
                                drawLine(ctx, centerX, centerY - radius, centerX, centerY + radius)

                                // Convert angle to radians
                                const radians = angle * Math.PI / 180

                                // Calculate point on circle
                                const x = Math.cos(radians)
                                const y = Math.sin(radians)

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, radius, 0, -radians, true)
                                ctx.stroke()

                                // Draw point on circle
                                drawPoint(ctx, centerX + x * radius, centerY - y * radius, 5)

                                // Draw line to y-axis
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX + x * radius, centerY - y * radius, centerX, centerY - y * radius)
                                ctx.setLineDash([])

                                // Label angle and sin x
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `Angle: ${angle}°`, 10, fontSize + 10, fontSize)
                                drawText(ctx, `sin x = ${y.toFixed(3)}`, 10, fontSize * 2 + 20, fontSize)

                                // Highlight solutions
                                if (Math.abs(y - 0.5) < 0.01) {
                                    ctx.strokeStyle = 'yellow'
                                    ctx.lineWidth = 3
                                    drawCircle(ctx, centerX + x * radius, centerY - y * radius, 10)
                                    drawText(ctx, 'Solution!', centerX + x * radius + 15, centerY - y * radius - 15, fontSize, 'yellow')
                                }

                                // Draw horizontal line at y = 0.5
                                ctx.strokeStyle = 'red'
                                drawLine(ctx, centerX - radius, centerY - 0.5 * radius, centerX + radius, centerY - 0.5 * radius)
                                drawText(ctx, 'y = 0.5', centerX + radius + 5, centerY - 0.5 * radius, fontSize, 'red')
                            }
                        }
                    }
                ]
            },
            {
                id: '7.3',
                title: 'Equations Involving Multiple Trigonometric Functions',
                content: `
                <h2>Solving Equations Like sin x + cos x = 1</h2>
                <p>When dealing with equations involving multiple trigonometric functions, we often need to combine various techniques and identities. Here's a general approach:</p>
                <ol>
                    <li>Look for opportunities to use trigonometric identities to simplify the equation.</li>
                    <li>If possible, try to express the equation in terms of a single trigonometric function.</li>
                    <li>Consider squaring both sides if it helps to eliminate radicals or simplify the equation.</li>
                    <li>Use algebraic techniques like substitution or factoring when appropriate.</li>
                    <li>Solve for the unknown angle, remembering to find all solutions within the desired interval.</li>
                </ol>
                <p>Let's solve the equation: sin x + cos x = 1</p>
                <ol>
                    <li>This equation doesn't immediately simplify with common identities, so let's approach it algebraically.</li>
                    <li>Subtract cos x from both sides: sin x = 1 - cos x</li>
                    <li>Square both sides: sin² x = (1 - cos x)²</li>
                    <li>Expand the right side: sin² x = 1 - 2cos x + cos² x</li>
                    <li>Use the Pythagorean identity (sin² x + cos² x = 1) to replace sin² x with 1 - cos² x:
                       1 - cos² x = 1 - 2cos x + cos² x</li>
                    <li>Simplify: -cos² x = -2cos x</li>
                    <li>Add cos² x to both sides: 0 = -2cos x + cos² x</li>
                    <li>Factor out cos x: 0 = cos x(-2 + cos x)</li>
                    <li>Solve the equation: cos x = 0 or cos x = 2</li>
                    <li>cos x = 0 when x = π/2 + πn, where n is any integer</li>
                    <li>cos x = 2 has no solution (cosine is always between -1 and 1)</li>
                    <li>Check the solution: When x = π/2, sin(π/2) + cos(π/2) = 1 + 0 = 1</li>
                </ol>
                <p>Use the slider below to visualize the solution to sin x + cos x = 1 on the unit circle.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 90,
                        explanation: "Adjust the angle to see where sin x + cos x = 1 on the unit circle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 90 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerX = width / 2
                                const centerY = height / 2
                                const radius = Math.min(width, height) * 0.4

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Draw axes
                                drawLine(ctx, centerX - radius, centerY, centerX + radius, centerY)
                                drawLine(ctx, centerX, centerY - radius, centerX, centerY + radius)

                                // Convert angle to radians
                                const radians = angle * Math.PI / 180

                                // Calculate sin and cos
                                const sinX = Math.sin(radians)
                                const cosX = Math.cos(radians)

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, radius, 0, -radians, true)
                                ctx.stroke()

                                // Draw point on circle
                                drawPoint(ctx, centerX + cosX * radius, centerY - sinX * radius, 5)

                                // Draw lines to axes
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX + cosX * radius, centerY - sinX * radius, centerX + cosX * radius, centerY)
                                drawLine(ctx, centerX + cosX * radius, centerY - sinX * radius, centerX, centerY - sinX * radius)
                                ctx.setLineDash([])

                                // Label angle, sin x, cos x, and sum
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `Angle: ${angle}°`, 10, fontSize + 10, fontSize)
                                drawText(ctx, `sin x = ${sinX.toFixed(3)}`, 10, fontSize * 2 + 20, fontSize)
                                drawText(ctx, `cos x = ${cosX.toFixed(3)}`, 10, fontSize * 3 + 30, fontSize)
                                drawText(ctx, `sin x + cos x = ${(sinX + cosX).toFixed(3)}`, 10, fontSize * 4 + 40, fontSize)

                                // Highlight solution
                                if (Math.abs(sinX + cosX - 1) < 0.01) {
                                    ctx.strokeStyle = 'yellow'
                                    ctx.lineWidth = 3
                                    drawCircle(ctx, centerX + cosX * radius, centerY - sinX * radius, 10)
                                    drawText(ctx, 'Solution!', centerX + cosX * radius + 15, centerY - sinX * radius - 15, fontSize, 'yellow')
                                }
                            }
                        }
                    }
                ]
            },
            {
                id: '7.4',
                title: 'Trigonometric Substitution',
                content: `
                <h2>Using Substitution to Simplify Complex Equations</h2>
                <p>Trigonometric substitution is a powerful technique for simplifying complex trigonometric equations. The basic idea is to replace a trigonometric expression with a single variable, solve the resulting equation, and then solve for the original variable.</p>
                <p>Common substitutions include:</p>
                <ul>
                    <li>Let u = sin x</li>
                    <li>Let u = cos x</li>
                    <li>Let u = tan x</li>
                </ul>
                <p>Steps for using trigonometric substitution:</p>
                <ol>
                    <li>Identify a trigonometric expression that appears multiple times in the equation.</li>
                    <li>Substitute this expression with a new variable (often 'u').</li>
                    <li>Rewrite the equation in terms of the new variable.</li>
                    <li>Solve the equation for the new variable.</li>
                    <li>Substitute back to find the solution in terms of the original variable.</li>
                    <li>Solve for the original variable and find all solutions within the desired interval.</li>
                </ol>
                <p>Let's solve the equation: sin² x - sin x - 1 = 0</p>
                <ol>
                    <li>Let u = sin x</li>
                    <li>The equation becomes: u² - u - 1 = 0</li>
                    <li>This is a quadratic equation. We can solve it using the quadratic formula:
                       u = [-(-1) ± √((-1)² - 4(1)(-1))] / (2(1)) = (1 ± √5) / 2</li>
                    <li>u = (1 + √5) / 2 or u = (1 - √5) / 2</li>
                    <li>Substituting back: sin x = (1 + √5) / 2 or sin x = (1 - √5) / 2</li>
                    <li>The second solution can be discarded as sin x is always between -1 and 1</li>
                    <li>Solve sin x = (1 + √5) / 2 ≈ 0.618</li>
                    <li>x = arcsin(0.618) ≈ 0.665 radians or 38.17°</li>
                    <li>The general solution is: x = 0.665 + 2πn or x = π - 0.665 + 2πn, where n is any integer</li>
                </ol>
                <p>Use the slider below to visualize the solution to sin² x - sin x - 1 = 0 on the unit circle.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 38,
                        explanation: "Adjust the angle to see where sin² x - sin x - 1 = 0 on the unit circle."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 38 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                const centerX = width / 2
                                const centerY = height / 2
                                const radius = Math.min(width, height) * 0.4

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Draw axes
                                drawLine(ctx, centerX - radius, centerY, centerX + radius, centerY)
                                drawLine(ctx, centerX, centerY - radius, centerX, centerY + radius)

                                // Convert angle to radians
                                const radians = angle * Math.PI / 180

                                // Calculate sin x
                                const sinX = Math.sin(radians)

                                // Draw angle
                                ctx.beginPath()
                                ctx.moveTo(centerX, centerY)
                                ctx.arc(centerX, centerY, radius, 0, -radians, true)
                                ctx.stroke()

                                // Draw point on circle
                                const x = Math.cos(radians)
                                const y = sinX
                                drawPoint(ctx, centerX + x * radius, centerY - y * radius, 5)

                                // Draw line to y-axis
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX + x * radius, centerY - y * radius, centerX, centerY - y * radius)
                                ctx.setLineDash([])

                                // Label angle and sin x
                                const fontSize = Math.max(12, height / 30)
                                drawText(ctx, `Angle: ${angle}°`, 10, fontSize + 10, fontSize)
                                drawText(ctx, `sin x = ${sinX.toFixed(3)}`, 10, fontSize * 2 + 20, fontSize)
                                drawText(ctx, `sin² x - sin x - 1 = ${(sinX * sinX - sinX - 1).toFixed(3)}`, 10, fontSize * 3 + 30, fontSize)

                                // Highlight solution
                                if (Math.abs(sinX * sinX - sinX - 1) < 0.01) {
                                    ctx.strokeStyle = 'yellow'
                                    ctx.lineWidth = 3
                                    drawCircle(ctx, centerX + x * radius, centerY - y * radius, 10)
                                    drawText(ctx, 'Solution!', centerX + x * radius + 15, centerY - y * radius - 15, fontSize, 'yellow')
                                }

                                // Draw line for sin x = (1 + √5) / 2
                                const solutionY = (1 + Math.sqrt(5)) / 2
                                ctx.strokeStyle = 'red'
                                drawLine(ctx, centerX - radius, centerY - solutionY * radius, centerX + radius, centerY - solutionY * radius)
                                drawText(ctx, 'y = (1 + √5) / 2', centerX + radius + 5, centerY - solutionY * radius, fontSize, 'red')
                            }
                        }
                    }
                ]
            }
        ]
    }

    const trigApplicationsLesson: Lesson = {
        id: 8,
        title: 'Applications of Trigonometry',
        introduction: `
        <p>Welcome to our lesson on Applications of Trigonometry! In this lesson, we'll explore how trigonometric concepts are used in various real-world situations.</p>
        <p>Trigonometry has a wide range of practical applications, from measuring heights of tall structures to navigating ships and planes, and even describing circular motion in physics. Understanding these applications helps us appreciate the power and versatility of trigonometry in solving real-world problems.</p>
    `,
        prerequisites: [2, 3, 5, 7],
        sublessons: [
            {
                id: '8.1',
                title: 'Finding Heights and Distances',
                content: `
                <h2>Using Trigonometry for Indirect Measurement</h2>
                <p>One of the most practical applications of trigonometry is in measuring heights and distances that are difficult or impossible to measure directly. This technique is often used in surveying, construction, and astronomy.</p>
                <h3>Key Concepts:</h3>
                <ul>
                    <li><strong>Angle of Elevation:</strong> The angle formed between the horizontal line of sight and the line of sight to an object above the horizontal.</li>
                    <li><strong>Angle of Depression:</strong> The angle formed between the horizontal line of sight and the line of sight to an object below the horizontal.</li>
                    <li><strong>Triangulation:</strong> A technique using the angles and sides of triangles to determine distances.</li>
                </ul>
                <h3>Example Problem:</h3>
                <p>A surveyor wants to measure the height of a tall building. Standing 50 meters away from the base of the building, she measures the angle of elevation to the top of the building as 32°. How tall is the building?</p>
                <h3>Solution:</h3>
                <ol>
                    <li>This forms a right triangle with:
                        <ul>
                            <li>The adjacent side (ground distance) = 50 meters</li>
                            <li>The opposite side (building height) = unknown</li>
                            <li>The angle of elevation = 32°</li>
                        </ul>
                    </li>
                    <li>We can use the tangent function: tan(θ) = opposite / adjacent</li>
                    <li>tan(32°) = height / 50</li>
                    <li>height = 50 * tan(32°)</li>
                    <li>height ≈ 31.1 meters</li>
                </ol>
                <p>Use the slider below to adjust the angle of elevation and see how it affects the calculated height of the building.</p>
            `,
                sliders: [
                    {
                        id: 'angle',
                        label: 'Angle of Elevation (degrees)',
                        min: 0,
                        max: 89,
                        step: 1,
                        defaultValue: 32,
                        explanation: "Adjust the angle of elevation to see how it affects the calculated height of the building."
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, angle = 32 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Calculate dimensions
                                const groundDistance = width * 0.6
                                const buildingHeight = groundDistance * Math.tan(angle * Math.PI / 180)
                                const scale = Math.min(1, height / (buildingHeight + 50))

                                // Draw ground
                                drawLine(ctx, 0, height - 20, width, height - 20)

                                // Draw building
                                drawLine(ctx, width - 50, height - 20, width - 50, height - 20 - buildingHeight * scale)

                                // Draw sight line
                                drawLine(ctx, 50, height - 50, width - 50, height - 20 - buildingHeight * scale)

                                // Draw angle arc
                                ctx.beginPath()
                                ctx.arc(50, height - 50, 40, -Math.PI / 2, -angle * Math.PI / 180 - Math.PI / 2, true)
                                ctx.stroke()

                                // Label angle
                                drawText(ctx, `${angle}°`, 100, height - 60, Math.max(12, height / 30))

                                // Label distances
                                drawText(ctx, '50 m', width / 2, height - 10, Math.max(12, height / 30))
                                drawText(ctx, `${(buildingHeight).toFixed(1)} m`, width - 40, height - 20 - buildingHeight * scale / 2, Math.max(12, height / 30))

                                // Display calculated height
                                drawText(ctx, `Calculated Height: ${buildingHeight.toFixed(1)} m`, 50, 50, Math.max(16, height / 20))
                            }
                        }
                    }
                ]
            },
            {
                id: '8.2',
                title: 'Navigation and Surveying',
                content: `
                <h2>Practical Applications in GPS and Mapping</h2>
                <p>Trigonometry plays a crucial role in navigation and surveying, from traditional methods to modern GPS technology. These applications rely on principles of triangulation and distance calculation using trigonometric functions.</p>
                <h3>Key Applications:</h3>
                <ul>
                    <li><strong>GPS (Global Positioning System):</strong> Uses trilateration, a process similar to triangulation, to determine position based on distances from satellites.</li>
                    <li><strong>Cartography:</strong> Map-making relies on trigonometry to accurately represent curved surfaces on flat maps.</li>
                    <li><strong>Land Surveying:</strong> Surveyors use trigonometry to measure property boundaries and determine land areas.</li>
                    <li><strong>Marine Navigation:</strong> Sailors use trigonometry to calculate distances and bearings between points.</li>
                </ul>
                <h3>Example: Triangulation in GPS</h3>
                <p>GPS receivers use signals from multiple satellites to determine position. The basic principle involves:</p>
                <ol>
                    <li>Receiving signals from at least four satellites</li>
                    <li>Calculating the distance to each satellite based on the time the signal took to arrive</li>
                    <li>Using these distances to determine the receiver's position through trilateration</li>
                </ol>
                <p>The visualization below demonstrates a simplified 2D version of GPS triangulation. Adjust the sliders to see how changing your distance from two "satellites" affects your position.</p>
            `,
                sliders: [
                    {
                        id: 'distanceA',
                        label: 'Distance from Satellite A (km)',
                        min: 10,
                        max: 200,
                        step: 1,
                        defaultValue: 100,
                        explanation: "Adjust the distance from Satellite A"
                    },
                    {
                        id: 'distanceB',
                        label: 'Distance from Satellite B (km)',
                        min: 10,
                        max: 200,
                        step: 1,
                        defaultValue: 150,
                        explanation: "Adjust the distance from Satellite B"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, distanceA = 100, distanceB = 150 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Scale factor
                                const scale = Math.min(width, height) / 400

                                // Draw satellites
                                drawPoint(ctx, width * 0.25, height * 0.5, 5)
                                drawText(ctx, 'Satellite A', width * 0.25 - 30, height * 0.5 - 20, Math.max(12, height / 30))
                                drawPoint(ctx, width * 0.75, height * 0.5, 5)
                                drawText(ctx, 'Satellite B', width * 0.75 - 30, height * 0.5 - 20, Math.max(12, height / 30))

                                // Draw circles representing distances
                                drawCircle(ctx, width * 0.25, height * 0.5, distanceA * scale)
                                drawCircle(ctx, width * 0.75, height * 0.5, distanceB * scale)

                                // Calculate intersection points
                                const d = width * 0.5  // Distance between satellites
                                const x = (d*d + distanceA*distanceA - distanceB*distanceB) / (2*d)
                                const y = Math.sqrt(distanceA*distanceA - x*x)

                                // Draw intersection points
                                drawPoint(ctx, width * 0.25 + x * scale, height * 0.5 + y * scale, 5)
                                drawPoint(ctx, width * 0.25 + x * scale, height * 0.5 - y * scale, 5)

                                // Label distances
                                drawText(ctx, `${distanceA} km`, width * 0.25, height * 0.5 + distanceA * scale + 20, Math.max(12, height / 30))
                                drawText(ctx, `${distanceB} km`, width * 0.75, height * 0.5 + distanceB * scale + 20, Math.max(12, height / 30))

                                // Display possible positions
                                drawText(ctx, 'Possible positions:', 20, 30, Math.max(16, height / 20))
                                drawText(ctx, `(${(x * scale).toFixed(1)}, ${(y * scale).toFixed(1)})`, 20, 60, Math.max(14, height / 25))
                                drawText(ctx, `(${(x * scale).toFixed(1)}, ${(-y * scale).toFixed(1)})`, 20, 90, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '8.3',
                title: 'Circular Motion',
                content: `
                <h2>Describing Rotational Movement with Trigonometric Functions</h2>
                <p>Circular motion is a fundamental concept in physics, and trigonometric functions are essential for describing this type of movement mathematically. This application of trigonometry is crucial in fields such as engineering, astronomy, and physics.</p>
                <h3>Key Concepts:</h3>
                <ul>
                    <li><strong>Angular Velocity (ω):</strong> The rate of change of angular position with respect to time.</li>
                    <li><strong>Period (T):</strong> The time taken for one complete revolution.</li>
                    <li><strong>Frequency (f):</strong> The number of revolutions per unit time (f = 1/T).</li>
                    <li><strong>Sine and Cosine Functions:</strong> Used to describe the position of an object in circular motion.</li>
                </ul>
                <h3>Mathematical Description:</h3>
                <p>For an object moving in a circle with radius r and angular velocity ω:</p>
                <ul>
                    <li>x-position: x = r * cos(ωt)</li>
                    <li>y-position: y = r * sin(ωt)</li>
                    <li>Where t is time and ω = 2π/T = 2πf</li>
                </ul>
                <h3>Applications:</h3>
                <ul>
                    <li>Planetary motion</li>
                    <li>Gears and rotary engines</li>
                    <li>AC electrical circuits</li>
                    <li>Sound and light waves</li>
                </ul>
                <p>Use the slider below to see how an object moves in circular motion and how its position is described using sine and cosine functions.</p>
            `,
                sliders: [
                    {
                        id: 'time',
                        label: 'Time (seconds)',
                        min: 0,
                        max: 10,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the time to see the object's position in circular motion"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, time = 0 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width * 0.3
                                const centerY = height * 0.5
                                const radius = Math.min(width, height) * 0.2
                                const angularVelocity = 2 * Math.PI / 5  // 5 seconds per revolution

                                // Calculate position
                                const angle = angularVelocity * time
                                const x = centerX + radius * Math.cos(angle)
                                const y = centerY - radius * Math.sin(angle)

                                // Draw circle
                                drawCircle(ctx, centerX, centerY, radius)

                                // Draw rotating object
                                drawPoint(ctx, x, y, 5)

                                // Draw radial line
                                drawLine(ctx, centerX, centerY, x, y)

                                // Label position
                                drawText(ctx, `(${(x - centerX).toFixed(1)}, ${(centerY - y).toFixed(1)})`, x + 10, y - 10, Math.max(12, height / 30))

                                // Draw sine wave
                                const graphWidth = width * 0.6
                                const graphHeight = height * 0.4
                                const graphX = width * 0.35
                                const graphY = height * 0.8

                                ctx.beginPath()
                                for (let t = 0; t <= 10; t += 0.1) {
                                    const waveX = graphX + (t / 10) * graphWidth
                                    const waveY = graphY - Math.sin(angularVelocity * t) * graphHeight / 2
                                    if (t === 0) {
                                        ctx.moveTo(waveX, waveY)
                                    } else {
                                        ctx.lineTo(waveX, waveY)
                                    }
                                }
                                ctx.stroke()

                                // Draw current point on sine wave
                                const waveX = graphX + (time / 10) * graphWidth
                                const waveY = graphY - Math.sin(angle) * graphHeight / 2
                                drawPoint(ctx, waveX, waveY, 5)

                                // Labels
                                drawText(ctx, 'Circular Motion', centerX - 50, centerY - radius - 20, Math.max(14, height / 25))
                                drawText(ctx, 'Sine Wave', graphX, graphY - graphHeight / 2 - 20, Math.max(14, height / 25))
                                drawText(ctx, `Time: ${time.toFixed(1)} s`, 20, 30, Math.max(16, height / 20))
                            }
                        }
                    }
                ]
            },
            {
                id: '8.4',
                title: 'Simple Harmonic Motion',
                content: `
                <h2>Modeling Oscillations Using Sine and Cosine</h2>
                <p>Simple Harmonic Motion (SHM) is a type of periodic motion where the restoring force is directly proportional to the displacement from the equilibrium position. This concept is fundamental in physics and engineering, and it's described mathematically using trigonometric functions.</p>
                <h3>Key Concepts:</h3>
                <ul>
                    <li><strong>Amplitude (A):</strong> The maximum displacement from the equilibrium position.</li>
                    <li><strong>Angular Frequency (ω):</strong> Related to the frequency f by ω = 2πf.</li>
                    <li><strong>Phase (φ):</strong> Determines the starting point of the oscillation.</li>
                </ul>
                <h3>Mathematical Description:</h3>
                <p>The displacement x of an object in SHM is given by:</p>
                <p>x(t) = A * cos(ωt + φ)</p>
                <p>where t is time.</p>
                <h3>Applications:</h3>
                <ul>
                    <li>Pendulums</li>
                    <li>Mass-spring systems</li>
                    <li>Sound waves</li>
                    <li>AC electrical circuits</li>
                    <li>Molecular vibrations</li>
                </ul>
                <p>Use the sliders below to adjust the parameters of simple harmonic motion and observe how they affect the oscillation.</p>
            `,
                sliders: [
                    {
                        id: 'amplitude',
                        label: 'Amplitude',
                        min: 10,
                        max: 100,
                        step: 5,
                        defaultValue: 50,
                        explanation: "Adjust the amplitude of the oscillation"
                    },
                    {
                        id: 'frequency',
                        label: 'Frequency (Hz)',
                        min: 0.1,
                        max: 2,
                        step: 0.1,
                        defaultValue: 0.5,
                        explanation: "Adjust the frequency of the oscillation"
                    },
                    {
                        id: 'phase',
                        label: 'Phase (degrees)',
                        min: 0,
                        max: 360,
                        step: 15,
                        defaultValue: 0,
                        explanation: "Adjust the phase of the oscillation"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, amplitude = 50, frequency = 0.5, phase = 0 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerY = height / 2
                                const scaleX = width / 10  // 10 seconds shown
                                const scaleY = height / (4 * amplitude)
                                const omega = 2 * Math.PI * frequency
                                const phaseRad = phase * Math.PI / 180

                                // Draw x and y axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, 50, 0, 50, height)

                                // Draw SHM wave
                                ctx.beginPath()
                                for (let x = 0; x <= width; x++) {
                                    const t = x / scaleX
                                    const y = centerY - amplitude * Math.cos(omega * t + phaseRad) * scaleY
                                    if (x === 0) {
                                        ctx.moveTo(x, y)
                                    } else {
                                        ctx.lineTo(x, y)
                                    }
                                }
                                ctx.stroke()

                                // Draw amplitude lines
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, 0, centerY - amplitude * scaleY, width, centerY - amplitude * scaleY)
                                drawLine(ctx, 0, centerY + amplitude * scaleY, width, centerY + amplitude * scaleY)
                                ctx.setLineDash([])

                                // Labels
                                drawText(ctx, 'Simple Harmonic Motion', 60, 30, Math.max(16, height / 20))
                                drawText(ctx, `Amplitude: ${amplitude}`, 60, 60, Math.max(14, height / 25))
                                drawText(ctx, `Frequency: ${frequency} Hz`, 60, 90, Math.max(14, height / 25))
                                drawText(ctx, `Phase: ${phase}°`, 60, 120, Math.max(14, height / 25))
                                drawText(ctx, 'Time (s)', width - 70, centerY + 30, Math.max(14, height / 25))
                                drawText(ctx, 'Displacement', 60, 20, Math.max(14, height / 25))

                                // Time markers
                                for (let t = 0; t <= 10; t += 2) {
                                    const x = t * scaleX
                                    drawLine(ctx, x, centerY - 5, x, centerY + 5)
                                    drawText(ctx, t.toString(), x - 5, centerY + 20, Math.max(12, height / 30))
                                }
                            }
                        }
                    }
                ]
            },
            {
                id: '8.6',
                title: 'Trigonometry in Engineering',
                content: `
                <h2>Uses in Electrical Engineering and Signal Processing</h2>
                <p>Trigonometry plays a crucial role in various branches of engineering, particularly in electrical engineering and signal processing. Its applications range from analyzing electrical circuits to processing complex signals.</p>
                <h3>Key Applications:</h3>
                <ul>
                    <li><strong>AC Circuit Analysis:</strong> Sine and cosine functions are used to describe alternating current and voltage.</li>
                    <li><strong>Fourier Analysis:</strong> Complex signals are broken down into sums of sinusoidal components.</li>
                    <li><strong>Signal Processing:</strong> Trigonometric functions are used in filters, modulation, and demodulation.</li>
                    <li><strong>Control Systems:</strong> Used in describing and analyzing system responses.</li>
                    <li><strong>Antenna Design:</strong> Radiation patterns often involve trigonometric functions.</li>
                </ul>
                <h3>Example: Sine Wave in AC Circuits</h3>
                <p>In AC circuits, voltage and current are typically described by sine waves:</p>
                <p>V(t) = V<sub>max</sub> * sin(ωt + φ)</p>
                <p>Where:</p>
                <ul>
                    <li>V(t) is the voltage at time t</li>
                    <li>V<sub>max</sub> is the peak voltage</li>
                    <li>ω is the angular frequency (2πf, where f is the frequency in Hz)</li>
                    <li>φ is the phase angle</li>
                </ul>
                <p>Use the sliders below to see how different parameters affect an AC voltage waveform.</p>
            `,
                sliders: [
                    {
                        id: 'amplitude',
                        label: 'Amplitude (V)',
                        min: 1,
                        max: 10,
                        step: 0.5,
                        defaultValue: 5,
                        explanation: "Adjust the peak voltage of the AC waveform"
                    },
                    {
                        id: 'frequency',
                        label: 'Frequency (Hz)',
                        min: 1,
                        max: 10,
                        step: 0.5,
                        defaultValue: 2,
                        explanation: "Adjust the frequency of the AC waveform"
                    },
                    {
                        id: 'phase',
                        label: 'Phase (degrees)',
                        min: 0,
                        max: 360,
                        step: 15,
                        defaultValue: 0,
                        explanation: "Adjust the phase angle of the AC waveform"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, amplitude = 5, frequency = 2, phase = 0 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerY = height / 2
                                const scaleX = width / 4  // 4 cycles shown
                                const scaleY = height / (4 * amplitude)
                                const omega = 2 * Math.PI * frequency
                                const phaseRad = phase * Math.PI / 180

                                // Draw x and y axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, 50, 0, 50, height)

                                // Draw AC waveform
                                ctx.beginPath()
                                for (let x = 0; x <= width; x++) {
                                    const t = x / scaleX
                                    const y = centerY - amplitude * Math.sin(omega * t + phaseRad) * scaleY
                                    if (x === 0) {
                                        ctx.moveTo(x, y)
                                    } else {
                                        ctx.lineTo(x, y)
                                    }
                                }
                                ctx.stroke()

                                // Draw amplitude lines
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, 0, centerY - amplitude * scaleY, width, centerY - amplitude * scaleY)
                                drawLine(ctx, 0, centerY + amplitude * scaleY, width, centerY + amplitude * scaleY)
                                ctx.setLineDash([])

                                // Labels
                                drawText(ctx, 'AC Voltage Waveform', 60, 30, Math.max(16, height / 20))
                                drawText(ctx, `Amplitude: ${amplitude} V`, 60, 60, Math.max(14, height / 25))
                                drawText(ctx, `Frequency: ${frequency} Hz`, 60, 90, Math.max(14, height / 25))
                                drawText(ctx, `Phase: ${phase}°`, 60, 120, Math.max(14, height / 25))
                                drawText(ctx, 'Time', width - 50, centerY + 30, Math.max(14, height / 25))
                                drawText(ctx, 'Voltage', 60, 20, Math.max(14, height / 25))

                                // Time markers
                                for (let t = 0; t <= 4; t++) {
                                    const x = t * scaleX
                                    drawLine(ctx, x, centerY - 5, x, centerY + 5)
                                    drawText(ctx, `${t/frequency}s`, x - 10, centerY + 20, Math.max(12, height / 30))
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }

    const polarComplexLesson: Lesson = {
        id: 9,
        title: 'Polar Coordinates and Complex Numbers',
        introduction: `
        <p>Welcome to our lesson on Polar Coordinates and Complex Numbers! In this lesson, we'll explore an alternative way of describing points in a plane and see how it relates to complex numbers.</p>
        <p>Polar coordinates provide a natural way to describe many physical systems and phenomena, especially those involving circular or rotational motion. Understanding polar coordinates is also crucial for working with complex numbers in their trigonometric form.</p>
    `,
        prerequisites: [2, 3, 5, 8],
        sublessons: [
            {
                id: '9.1',
                title: 'Introduction to Polar Coordinates',
                content: `
                <h2>Understanding r and θ</h2>
                <p>Polar coordinates describe a point in a plane using two numbers:</p>
                <ul>
                    <li><strong>r:</strong> The radial coordinate, which is the distance from the origin to the point.</li>
                    <li><strong>θ (theta):</strong> The angular coordinate, which is the angle from the positive x-axis to the line from the origin to the point.</li>
                </ul>
                <h3>Key Concepts:</h3>
                <ul>
                    <li>The origin in polar coordinates is called the pole.</li>
                    <li>The ray from which θ is measured is called the polar axis.</li>
                    <li>r is always non-negative, while θ can be positive or negative.</li>
                    <li>θ is typically measured in radians, but degrees can also be used.</li>
                </ul>
                <h3>Conversion between Polar and Cartesian Coordinates:</h3>
                <p>To convert from polar (r, θ) to Cartesian (x, y):</p>
                <ul>
                    <li>x = r * cos(θ)</li>
                    <li>y = r * sin(θ)</li>
                </ul>
                <p>To convert from Cartesian (x, y) to polar (r, θ):</p>
                <ul>
                    <li>r = √(x² + y²)</li>
                    <li>θ = atan2(y, x)</li>
                </ul>
                <p>Use the sliders below to see how changing r and θ affects the position of a point in polar coordinates.</p>
            `,
                sliders: [
                    {
                        id: 'r',
                        label: 'r (radius)',
                        min: 0,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Adjust the radial coordinate"
                    },
                    {
                        id: 'theta',
                        label: 'θ (angle in degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust the angular coordinate"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return {canvas, ctx}
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const {canvas, ctx, r = 3, theta = 45} = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 12

                                // Draw coordinate axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Draw concentric circles
                                for (let i = 1; i <= 5; i++) {
                                    drawCircle(ctx, centerX, centerY, i * scale)
                                    drawText(ctx, i.toString(), centerX + i * scale, centerY + 20, Math.max(12, height / 30))
                                }

                                // Draw angular guides
                                for (let angle = 0; angle < 360; angle += 30) {
                                    const radian = angle * Math.PI / 180
                                    drawLine(ctx, centerX, centerY,
                                        centerX + Math.cos(radian) * 5 * scale,
                                        centerY - Math.sin(radian) * 5 * scale)
                                    drawText(ctx, angle.toString() + '°',
                                        centerX + Math.cos(radian) * 5.2 * scale,
                                        centerY - Math.sin(radian) * 5.2 * scale,
                                        Math.max(12, height / 30))
                                }

                                // Calculate point position
                                const radian = theta * Math.PI / 180
                                const x = centerX + r * scale * Math.cos(radian)
                                const y = centerY - r * scale * Math.sin(radian)

                                // Draw point
                                drawPoint(ctx, x, y, 5)

                                // Draw r line
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX, centerY, x, y)
                                ctx.setLineDash([])

                                // Draw θ arc
                                ctx.beginPath()
                                ctx.arc(centerX, centerY, 30, 0, -radian, true)
                                ctx.stroke()

                                // Labels
                                drawText(ctx, `r = ${r}`, x + 10, y - 10, Math.max(14, height / 25))
                                drawText(ctx, `θ = ${theta}°`, centerX + 40, centerY - 10, Math.max(14, height / 25))
                                drawText(ctx, `(${(x - centerX).toFixed(2)}, ${(centerY - y).toFixed(2)})`, 10, 30, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '9.2',
                title: 'Plotting Points in Polar Form',
                content: `
                <h2>Techniques for Graphing in Polar Coordinates</h2>
                <p>Plotting points in polar coordinates requires a different approach compared to Cartesian coordinates. Here are some key techniques:</p>
                <ol>
                    <li><strong>Use a polar grid:</strong> This consists of concentric circles for r values and radial lines for θ values.</li>
                    <li><strong>Start at the pole:</strong> This is equivalent to the origin (0,0) in Cartesian coordinates.</li>
                    <li><strong>Measure the radial distance:</strong> Move outward from the pole by the distance r.</li>
                    <li><strong>Rotate to the angle:</strong> From the positive x-axis, rotate by θ (counterclockwise for positive θ, clockwise for negative θ).</li>
                    <li><strong>Plot the point:</strong> Mark the point where the r distance intersects with the θ angle.</li>
                </ol>
                <h3>Special Cases:</h3>
                <ul>
                    <li>When r = 0, the point is always at the pole, regardless of θ.</li>
                    <li>Points with the same r but θ differing by multiples of 2π are identical.</li>
                    <li>Negative r values can be interpreted by adding π to θ and using |r|.</li>
                </ul>
                <p>Use the interactive polar graph below to plot multiple points and see how they appear in polar coordinates.</p>
            `,
                sliders: [
                    {
                        id: 'r',
                        label: 'r (radius)',
                        min: 0,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Set the radial coordinate for the new point"
                    },
                    {
                        id: 'theta',
                        label: 'θ (angle in degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Set the angular coordinate for the new point"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx, points: [] }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, r = 3, theta = 45, points = [] } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 12

                                // Draw polar grid
                                for (let i = 1; i <= 5; i++) {
                                    drawCircle(ctx, centerX, centerY, i * scale)
                                    drawText(ctx, i.toString(), centerX + i * scale, centerY + 20, Math.max(12, height / 30))
                                }
                                for (let angle = 0; angle < 360; angle += 30) {
                                    const radian = angle * Math.PI / 180
                                    drawLine(ctx, centerX, centerY,
                                        centerX + Math.cos(radian) * 5 * scale,
                                        centerY - Math.sin(radian) * 5 * scale)
                                    drawText(ctx, angle.toString() + '°',
                                        centerX + Math.cos(radian) * 5.2 * scale,
                                        centerY - Math.sin(radian) * 5.2 * scale,
                                        Math.max(12, height / 30))
                                }

                                // Draw existing points
                                points.forEach((point, index) => {
                                    const x = centerX + point.r * scale * Math.cos(point.theta * Math.PI / 180)
                                    const y = centerY - point.r * scale * Math.sin(point.theta * Math.PI / 180)
                                    ctx.fillStyle = `hsl(${index * 137.5 % 360}, 100%, 50%)`
                                    drawPoint(ctx, x, y, 5)
                                    drawText(ctx, `(${point.r}, ${point.theta}°)`, x + 10, y - 10, Math.max(12, height / 30))
                                })

                                // Draw new point
                                const radian = theta * Math.PI / 180
                                const x = centerX + r * scale * Math.cos(radian)
                                const y = centerY - r * scale * Math.sin(radian)
                                ctx.fillStyle = '#00ffff'
                                drawPoint(ctx, x, y, 5)
                                drawText(ctx, `(${r}, ${theta}°)`, x + 10, y - 10, Math.max(12, height / 30))

                                // Instructions
                                drawText(ctx, "Click to add point. Right-click to clear.", 10, height - 20, Math.max(12, height / 30))
                            }
                        }
                    }
                ]
            },
            {
                id: '9.3',
                title: 'Converting Between Rectangular and Polar Forms',
                content: `
                <h2>Formulas and Methods for Conversion</h2>
                <p>Converting between rectangular (Cartesian) and polar coordinates is a fundamental skill when working with these coordinate systems. Here are the formulas and methods for conversion:</p>
                <h3>Rectangular to Polar Conversion:</h3>
                <p>Given (x, y) in rectangular coordinates:</p>
                <ul>
                    <li>r = √(x² + y²)</li>
                    <li>θ = atan2(y, x)</li>
                </ul>
                <p>Note: atan2(y, x) is a function that returns the angle in the correct quadrant, unlike the regular arctangent function.</p>
                <h3>Polar to Rectangular Conversion:</h3>
                <p>Given (r, θ) in polar coordinates:</p>
                <ul>
                    <li>x = r * cos(θ)</li>
                    <li>y = r * sin(θ)</li>
                </ul>
                <h3>Important Considerations:</h3>
                <ul>
                    <li>When converting to polar form, r is always non-negative.</li>
                    <li>The angle θ in polar form is not unique; adding any multiple of 2π gives an equivalent angle.</li>
                    <li>When x = y = 0, the polar angle θ is undefined.</li>
                </ul>
                <p>Use the interactive tool below to practice converting between rectangular and polar coordinates.</p>
            `,
                sliders: [
                    {
                        id: 'x',
                        label: 'x',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Set the x-coordinate"
                    },
                    {
                        id: 'y',
                        label: 'y',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 4,
                        explanation: "Set the y-coordinate"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, x = 3, y = 4 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 12

                                // Draw coordinate axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Draw grid
                                ctx.strokeStyle = 'rgba(0, 255, 255, 0.2)'
                                for (let i = -5; i <= 5; i++) {
                                    drawLine(ctx, centerX + i * scale, 0, centerX + i * scale, height)
                                    drawLine(ctx, 0, centerY + i * scale, width, centerY + i * scale)
                                }
                                ctx.strokeStyle = '#00ffff'

                                // Calculate polar coordinates
                                const r = Math.sqrt(x * x + y * y)
                                const theta = Math.atan2(y, x) * 180 / Math.PI

                                // Draw point
                                const pointX = centerX + x * scale
                                const pointY = centerY - y * scale
                                drawPoint(ctx, pointX, pointY, 5)

                                // Draw r line
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX, centerY, pointX, pointY)
                                ctx.setLineDash([])

                                // Draw θ arc
                                ctx.beginPath()
                                ctx.arc(centerX, centerY, 30, 0, -Math.atan2(y, x), true)
                                ctx.stroke()

                                // Labels
                                drawText(ctx, `Rectangular: (${x.toFixed(2)}, ${y.toFixed(2)})`, 10, 30, Math.max(14, height / 25))
                                drawText(ctx, `Polar: (${r.toFixed(2)}, ${theta.toFixed(2)}°)`, 10, 60, Math.max(14, height / 25))
                                drawText(ctx, `r = ${r.toFixed(2)}`, pointX + 10, pointY - 10, Math.max(14, height / 25))
                                drawText(ctx, `θ = ${theta.toFixed(2)}°`, centerX + 40, centerY - 10, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '9.4',
                title: 'Graphs of Polar Equations',
                content: `
                <h2>Plotting Common Polar Curves</h2>
                <p>Polar equations can produce a variety of interesting and beautiful curves. Some of the most common types include rose curves and limaçons.</p>
                <h3>Rose Curves</h3>
                <p>Rose curves are described by the equation r = a * cos(nθ) or r = a * sin(nθ), where:</p>
                <ul>
                    <li>a determines the size of the curve</li>
                    <li>n determines the number of petals</li>
                    <li>If n is odd, the curve has n petals</li>
                    <li>If n is even, the curve has 2n petals</li>
                </ul>
                <h3>Limaçons</h3>
                <p>Limaçons are described by the equation r = a + b * cos(θ) or r = a + b * sin(θ), where:</p>
                <ul>
                    <li>a and b determine the shape and size of the curve</li>
                    <li>If a > b > 0, the curve is a convex limaçon</li>
                    <li>If b > a > 0, the curve is a looped limaçon</li>
                    <li>If a = b, the curve is a cardioid</li>
                </ul>
                <p>Use the controls below to explore different polar curves and see how changing parameters affects their shape.</p>
            `,
                sliders: [
                    {
                        id: 'curveType',
                        label: 'Curve Type',
                        min: 0,
                        max: 1,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Switch between Rose Curve (0) and Limaçon (1)"
                    },
                    {
                        id: 'a',
                        label: 'a',
                        min: 0,
                        max: 5,
                        step: 0.1,
                        defaultValue: 2,
                        explanation: "Adjust the 'a' parameter of the equation"
                    },
                    {
                        id: 'b',
                        label: 'b or n',
                        min: 0,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the 'b' parameter for Limaçon or 'n' for Rose Curve"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, curveType = 0, a = 2, b = 1 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 10

                                // Draw polar grid
                                for (let i = 1; i <= 5; i++) {
                                    drawCircle(ctx, centerX, centerY, i * scale)
                                }
                                for (let angle = 0; angle < 360; angle += 30) {
                                    const radian = angle * Math.PI / 180
                                    drawLine(ctx, centerX, centerY,
                                        centerX + Math.cos(radian) * 5 * scale,
                                        centerY - Math.sin(radian) * 5 * scale)
                                }

                                // Draw curve
                                ctx.beginPath()
                                for (let theta = 0; theta <= 2 * Math.PI; theta += 0.01) {
                                    let r
                                    if (curveType === 0) {  // Rose curve
                                        r = a * Math.cos(b * theta)
                                    } else {  // Limaçon
                                        r = a + b * Math.cos(theta)
                                    }
                                    const x = centerX + r * Math.cos(theta) * scale
                                    const y = centerY - r * Math.sin(theta) * scale
                                    if (theta === 0) {
                                        ctx.moveTo(x, y)
                                    } else {
                                        ctx.lineTo(x, y)
                                    }
                                }
                                ctx.stroke()

                                // Labels
                                const curveTypeText = curveType === 0 ? "Rose Curve" : "Limaçon"
                                const equationText = curveType === 0
                                    ? `r = ${a.toFixed(1)} * cos(${b.toFixed(1)}θ)`
                                    : `r = ${a.toFixed(1)} + ${b.toFixed(1)} * cos(θ)`
                                drawText(ctx, curveTypeText, 10, 30, Math.max(16, height / 20))
                                drawText(ctx, equationText, 10, 60, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '9.5',
                title: 'Complex Numbers in Trigonometric Form',
                content: `
                <h2>Expressing Complex Numbers Using r(cos θ + i sin θ)</h2>
                <p>Complex numbers can be represented in trigonometric (or polar) form, which is especially useful for multiplication, division, and exponentiation of complex numbers.</p>
                <h3>Key Concepts:</h3>
                <ul>
                    <li>A complex number z = x + yi can be written as z = r(cos θ + i sin θ)</li>
                    <li>r is the modulus (absolute value) of z: r = √(x² + y²)</li>
                    <li>θ is the argument of z: θ = atan2(y, x)</li>
                    <li>This form is also known as Euler's formula when written as z = r * e^(iθ)</li>
                </ul>
                <h3>Conversions:</h3>
                <p>From rectangular to trigonometric form:</p>
                <ul>
                    <li>r = √(x² + y²)</li>
                    <li>θ = atan2(y, x)</li>
                </ul>
                <p>From trigonometric to rectangular form:</p>
                <ul>
                    <li>x = r * cos(θ)</li>
                    <li>y = r * sin(θ)</li>
                </ul>
                <p>Use the sliders below to see how complex numbers are represented in both rectangular and trigonometric forms.</p>
            `,
                sliders: [
                    {
                        id: 'x',
                        label: 'Real Part (x)',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Adjust the real part of the complex number"
                    },
                    {
                        id: 'y',
                        label: 'Imaginary Part (y)',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 4,
                        explanation: "Adjust the imaginary part of the complex number"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, x = 3, y = 4 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 12

                                // Draw coordinate axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)
                                drawText(ctx, 'Re', width - 20, centerY + 20, Math.max(12, height / 30))
                                drawText(ctx, 'Im', centerX - 20, 20, Math.max(12, height / 30))

                                // Draw complex number
                                const pointX = centerX + x * scale
                                const pointY = centerY - y * scale
                                drawPoint(ctx, pointX, pointY, 5)
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX, centerY, pointX, pointY)
                                drawLine(ctx, pointX, centerY, pointX, pointY)
                                drawLine(ctx, centerX, pointY, pointX, pointY)
                                ctx.setLineDash([])

                                // Calculate polar form
                                const r = Math.sqrt(x * x + y * y)
                                const theta = Math.atan2(y, x)

                                // Draw angle arc
                                ctx.beginPath()
                                ctx.arc(centerX, centerY, 30, 0, -theta, true)
                                ctx.stroke()

                                // Labels
                                drawText(ctx, `z = ${x.toFixed(2)} + ${y.toFixed(2)}i`, 10, 30, Math.max(14, height / 25))
                                drawText(ctx, `r = ${r.toFixed(2)}`, 10, 60, Math.max(14, height / 25))
                                drawText(ctx, `θ = ${(theta * 180 / Math.PI).toFixed(2)}°`, 10, 90, Math.max(14, height / 25))
                                drawText(ctx, `z = ${r.toFixed(2)}(cos(${(theta * 180 / Math.PI).toFixed(2)}°) + i sin(${(theta * 180 / Math.PI).toFixed(2)}°))`, 10, 120, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '9.6',
                title: "De Moivre's Theorem and Applications",
                content: `
                <h2>Using De Moivre's Theorem for Powers and Roots</h2>
                <p>De Moivre's Theorem is a powerful tool in complex number theory, particularly useful for calculating powers and roots of complex numbers in polar form.</p>
                <h3>De Moivre's Theorem:</h3>
                <p>For any real number x and integer n:</p>
                <p style="text-align: center;">[cos(x) + i sin(x)]<sup>n</sup> = cos(nx) + i sin(nx)</p>
                <h3>Applications:</h3>
                <ol>
                    <li><strong>Powers of Complex Numbers:</strong>
                        <ul>
                            <li>If z = r(cos θ + i sin θ), then z<sup>n</sup> = r<sup>n</sup>(cos(nθ) + i sin(nθ))</li>
                            <li>This simplifies the process of raising complex numbers to powers</li>
                        </ul>
                    </li>
                    <li><strong>Roots of Complex Numbers:</strong>
                        <ul>
                            <li>The nth roots of z = r(cos θ + i sin θ) are given by:</li>
                            <li>z<sub>k</sub> = r<sup>1/n</sup>(cos((θ + 2πk)/n) + i sin((θ + 2πk)/n))</li>
                            <li>Where k = 0, 1, 2, ..., n-1</li>
                        </ul>
                    </li>
                </ol>
                <h3>Key Points:</h3>
                <ul>
                    <li>The theorem simplifies multiplication and division of complex numbers to addition and subtraction of angles</li>
                    <li>It's particularly useful in fields like electrical engineering and signal processing</li>
                    <li>The theorem extends to fractional and negative powers as well</li>
                </ul>
                <p>Use the interactive visualization below to explore powers and roots of complex numbers using De Moivre's Theorem.</p>
            `,
                sliders: [
                    {
                        id: 'r',
                        label: 'Magnitude (r)',
                        min: 0.1,
                        max: 2,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the magnitude of the complex number"
                    },
                    {
                        id: 'theta',
                        label: 'Angle θ (degrees)',
                        min: 0,
                        max: 360,
                        step: 1,
                        defaultValue: 45,
                        explanation: "Adjust the angle of the complex number"
                    },
                    {
                        id: 'n',
                        label: 'Power/Root (n)',
                        min: -5,
                        max: 5,
                        step: 1,
                        defaultValue: 2,
                        explanation: "Adjust n for z^n (positive) or nth root (negative)"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, r = 1, theta = 45, n = 2 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 6

                                // Draw coordinate axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)

                                // Draw unit circle
                                drawCircle(ctx, centerX, centerY, scale)

                                // Convert theta to radians
                                const thetaRad = theta * Math.PI / 180

                                // Draw original complex number
                                const x = r * Math.cos(thetaRad)
                                const y = r * Math.sin(thetaRad)
                                drawPoint(ctx, centerX + x * scale, centerY - y * scale, 5)
                                ctx.strokeStyle = 'rgba(0, 255, 255, 0.5)'
                                drawLine(ctx, centerX, centerY, centerX + x * scale, centerY - y * scale)
                                ctx.strokeStyle = '#00ffff'

                                // Calculate and draw result
                                let resultPoints = []
                                if (n > 0) {
                                    // Power
                                    const resultR = Math.pow(r, n)
                                    const resultTheta = n * thetaRad
                                    const resultX = resultR * Math.cos(resultTheta)
                                    const resultY = resultR * Math.sin(resultTheta)
                                    resultPoints.push({ x: resultX, y: resultY })
                                } else if (n < 0) {
                                    // Root
                                    const rootN = -n
                                    for (let k = 0; k < rootN; k++) {
                                        const resultR = Math.pow(r, 1 / rootN)
                                        const resultTheta = (thetaRad + 2 * Math.PI * k) / rootN
                                        const resultX = resultR * Math.cos(resultTheta)
                                        const resultY = resultR * Math.sin(resultTheta)
                                        resultPoints.push({ x: resultX, y: resultY })
                                    }
                                }

                                // Draw result points
                                resultPoints.forEach((point, index) => {
                                    ctx.fillStyle = `hsl(${index * 137.5 % 360}, 100%, 50%)`
                                    drawPoint(ctx, centerX + point.x * scale, centerY - point.y * scale, 5)
                                    drawLine(ctx, centerX, centerY, centerX + point.x * scale, centerY - point.y * scale)
                                })

                                // Labels
                                ctx.fillStyle = '#00ffff'
                                drawText(ctx, `z = ${r.toFixed(2)}(cos(${theta.toFixed(2)}°) + i sin(${theta.toFixed(2)}°))`, 10, 30, Math.max(14, height / 25))
                                if (n > 0) {
                                    drawText(ctx, `z^${n} = ${Math.pow(r, n).toFixed(2)}(cos(${(n * theta).toFixed(2)}°) + i sin(${(n * theta).toFixed(2)}°))`, 10, 60, Math.max(14, height / 25))
                                } else if (n < 0) {
                                    drawText(ctx, `${-n}th roots of z:`, 10, 60, Math.max(14, height / 25))
                                    resultPoints.forEach((point, index) => {
                                        const rootR = Math.sqrt(point.x * point.x + point.y * point.y)
                                        const rootTheta = Math.atan2(point.y, point.x) * 180 / Math.PI
                                        drawText(ctx, `Root ${index + 1}: ${rootR.toFixed(2)}(cos(${rootTheta.toFixed(2)}°) + i sin(${rootTheta.toFixed(2)}°))`, 10, 90 + 30 * index, Math.max(14, height / 25))
                                    })
                                }
                            }
                        }
                    }
                ]
            }
        ]
    }

    const threeDTrigVectorsLesson: Lesson = {
        id: 10,
        title: '3D Trigonometry and Vectors',
        introduction: `
        <p>Welcome to our lesson on 3D Trigonometry and Vectors! In this lesson, we'll extend our understanding of trigonometry and vector concepts from 2D to 3D space.</p>
        <p>3D trigonometry and vectors are crucial in various fields, including computer graphics, robotics, physics, and engineering. Understanding these concepts allows us to describe and analyze complex three-dimensional systems and movements.</p>
    `,
        prerequisites: [1, 2, 3, 5, 9],
        sublessons: [
            {
                id: '10.1',
                title: '3D Coordinate Systems',
                content: `
                <h2>Extending 2D Concepts to 3D Space</h2>
                <p>The 3D coordinate system, also known as the Cartesian coordinate system, extends the familiar 2D xy-plane by adding a third axis, the z-axis, perpendicular to both x and y axes.</p>
                <h3>Key Concepts:</h3>
                <ul>
                    <li><strong>Origin:</strong> The point where all three axes intersect, denoted as (0, 0, 0).</li>
                    <li><strong>Axes:</strong> Three perpendicular lines intersecting at the origin:
                        <ul>
                            <li>x-axis: horizontal (left-right)</li>
                            <li>y-axis: vertical (up-down)</li>
                            <li>z-axis: depth (forward-backward)</li>
                        </ul>
                    </li>
                    <li><strong>Coordinates:</strong> Any point in 3D space is described by three numbers (x, y, z).</li>
                    <li><strong>Right-hand Rule:</strong> A convention for orienting the axes. Point your right-hand thumb along the positive z-axis, your index finger along the positive x-axis, and your middle finger will point along the positive y-axis.</li>
                </ul>
                <h3>Planes in 3D Space:</h3>
                <ul>
                    <li><strong>xy-plane:</strong> z = 0</li>
                    <li><strong>yz-plane:</strong> x = 0</li>
                    <li><strong>xz-plane:</strong> y = 0</li>
                </ul>
                <p>Use the interactive visualization below to explore the 3D coordinate system. You can adjust the coordinates to see how points are positioned in 3D space.</p>
            `,
                sliders: [
                    {
                        id: 'x',
                        label: 'x-coordinate',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 2,
                        explanation: "Adjust the x-coordinate of the point"
                    },
                    {
                        id: 'y',
                        label: 'y-coordinate',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Adjust the y-coordinate of the point"
                    },
                    {
                        id: 'z',
                        label: 'z-coordinate',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 4,
                        explanation: "Adjust the z-coordinate of the point"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, x = 2, y = 3, z = 4 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 12
                                const angle = Math.PI / 6  // 30 degrees for isometric view

                                // Function to convert 3D to 2D coordinates
                                const to2D = (x: number, y: number, z: number) => {
                                    return {
                                        x: centerX + (x - z) * Math.cos(angle) * scale,
                                        y: centerY + (x + z) * Math.sin(angle) * scale - y * scale
                                    }
                                }

                                // Draw axes
                                const origin = to2D(0, 0, 0)
                                const xAxis = to2D(6, 0, 0)
                                const yAxis = to2D(0, 6, 0)
                                const zAxis = to2D(0, 0, 6)
                                drawLine(ctx, origin.x, origin.y, xAxis.x, xAxis.y)
                                drawLine(ctx, origin.x, origin.y, yAxis.x, yAxis.y)
                                drawLine(ctx, origin.x, origin.y, zAxis.x, zAxis.y)

                                // Label axes
                                drawText(ctx, 'x', xAxis.x + 10, xAxis.y, Math.max(12, height / 30))
                                drawText(ctx, 'y', yAxis.x - 20, yAxis.y - 10, Math.max(12, height / 30))
                                drawText(ctx, 'z', zAxis.x - 20, zAxis.y, Math.max(12, height / 30))

                                // Draw coordinate planes (partially transparent)
                                ctx.globalAlpha = 0.2
                                ctx.fillStyle = '#FF0000'  // Red for yz-plane
                                ctx.beginPath()
                                ctx.moveTo(...Object.values(to2D(0, 0, 0)))
                                ctx.lineTo(...Object.values(to2D(0, 6, 0)))
                                ctx.lineTo(...Object.values(to2D(0, 6, 6)))
                                ctx.lineTo(...Object.values(to2D(0, 0, 6)))
                                ctx.fill()

                                ctx.fillStyle = '#00FF00'  // Green for xz-plane
                                ctx.beginPath()
                                ctx.moveTo(...Object.values(to2D(0, 0, 0)))
                                ctx.lineTo(...Object.values(to2D(6, 0, 0)))
                                ctx.lineTo(...Object.values(to2D(6, 0, 6)))
                                ctx.lineTo(...Object.values(to2D(0, 0, 6)))
                                ctx.fill()

                                ctx.fillStyle = '#0000FF'  // Blue for xy-plane
                                ctx.beginPath()
                                ctx.moveTo(...Object.values(to2D(0, 0, 0)))
                                ctx.lineTo(...Object.values(to2D(6, 0, 0)))
                                ctx.lineTo(...Object.values(to2D(6, 6, 0)))
                                ctx.lineTo(...Object.values(to2D(0, 6, 0)))
                                ctx.fill()

                                ctx.globalAlpha = 1.0

                                // Draw point
                                const point = to2D(x, y, z)
                                drawPoint(ctx, point.x, point.y, 5)

                                // Draw projection lines
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, point.x, point.y, ...Object.values(to2D(x, y, 0)))
                                drawLine(ctx, point.x, point.y, ...Object.values(to2D(x, 0, z)))
                                drawLine(ctx, point.x, point.y, ...Object.values(to2D(0, y, z)))
                                ctx.setLineDash([])

                                // Label point
                                drawText(ctx, `(${x}, ${y}, ${z})`, point.x + 10, point.y - 10, Math.max(12, height / 30))

                                // Label projections
                                drawText(ctx, `(${x}, ${y}, 0)`, ...Object.values(to2D(x, y, 0)), Math.max(12, height / 30))
                                drawText(ctx, `(${x}, 0, ${z})`, ...Object.values(to2D(x, 0, z)), Math.max(12, height / 30))
                                drawText(ctx, `(0, ${y}, ${z})`, ...Object.values(to2D(0, y, z)), Math.max(12, height / 30))
                            }
                        }
                    }
                ]
            },
            {
                id: '10.2',
                title: 'Distance in 3D Space',
                content: `
                <h2>Calculating Distances Between Points in 3D</h2>
                <p>In 3D space, we can calculate the distance between two points using an extension of the Pythagorean theorem. This concept is fundamental in many applications, including computer graphics, robotics, and physics simulations.</p>
                <h3>Distance Formula in 3D:</h3>
                <p>Given two points P1(x₁, y₁, z₁) and P2(x₂, y₂, z₂), the distance d between them is:</p>
                <p style="text-align: center;">d = √[(x₂ - x₁)² + (y₂ - y₁)² + (z₂ - z₁)²]</p>
                <h3>Key Concepts:</h3>
                <ul>
                    <li><strong>3D Pythagorean Theorem:</strong> The distance formula is a direct application of the Pythagorean theorem in three dimensions.</li>
                    <li><strong>Coordinate Differences:</strong> We calculate the differences in each coordinate (x, y, z) between the two points.</li>
                    <li><strong>Squared Differences:</strong> These differences are squared to ensure positive values and to apply the Pythagorean theorem.</li>
                    <li><strong>Square Root:</strong> Taking the square root of the sum gives us the actual distance.</li>
                </ul>
                <h3>Applications:</h3>
                <ul>
                    <li>Calculating distances between objects in 3D games or simulations</li>
                    <li>Determining the length of 3D vectors</li>
                    <li>Measuring distances in geographical information systems (GIS)</li>
                    <li>Computing trajectories in physics and engineering</li>
                </ul>
                <p>Use the interactive visualization below to explore distances between points in 3D space. You can adjust the coordinates of two points and see how the distance between them changes.</p>
            `,
                sliders: [
                    {
                        id: 'x1',
                        label: 'x₁',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the x-coordinate of the first point"
                    },
                    {
                        id: 'y1',
                        label: 'y₁',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 2,
                        explanation: "Adjust the y-coordinate of the first point"
                    },
                    {
                        id: 'z1',
                        label: 'z₁',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Adjust the z-coordinate of the first point"
                    },
                    {
                        id: 'x2',
                        label: 'x₂',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: -2,
                        explanation: "Adjust the x-coordinate of the second point"
                    },
                    {
                        id: 'y2',
                        label: 'y₂',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: -1,
                        explanation: "Adjust the y-coordinate of the second point"
                    },
                    {
                        id: 'z2',
                        label: 'z₂',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the z-coordinate of the second point"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, x1 = 1, y1 = 2, z1 = 3, x2 = -2, y2 = -1, z2 = 1 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 12
                                const angle = Math.PI / 6  // 30 degrees for isometric view

                                // Function to convert 3D to 2D coordinates
                                const to2D = (x: number, y: number, z: number) => {
                                    return {
                                        x: centerX + (x - z) * Math.cos(angle) * scale,
                                        y: centerY + (x + z) * Math.sin(angle) * scale - y * scale
                                    }
                                }

                                // Draw axes
                                const origin = to2D(0, 0, 0)
                                const xAxis = to2D(6, 0, 0)
                                const yAxis = to2D(0, 6, 0)
                                const zAxis = to2D(0, 0, 6)
                                drawLine(ctx, origin.x, origin.y, xAxis.x, xAxis.y)
                                drawLine(ctx, origin.x, origin.y, yAxis.x, yAxis.y)
                                drawLine(ctx, origin.x, origin.y, zAxis.x, zAxis.y)

                                // Label axes
                                drawText(ctx, 'x', xAxis.x + 10, xAxis.y, Math.max(12, height / 30))
                                drawText(ctx, 'y', yAxis.x - 20, yAxis.y - 10, Math.max(12, height / 30))
                                drawText(ctx, 'z', zAxis.x - 20, zAxis.y, Math.max(12, height / 30))

                                // Draw points
                                const point1 = to2D(x1, y1, z1)
                                const point2 = to2D(x2, y2, z2)
                                ctx.fillStyle = '#FF0000'
                                drawPoint(ctx, point1.x, point1.y, 5)
                                ctx.fillStyle = '#00FF00'
                                drawPoint(ctx, point2.x, point2.y, 5)

                                // Draw line between points
                                ctx.strokeStyle = '#FFFF00'
                                drawLine(ctx, point1.x, point1.y, point2.x, point2.y)
                                ctx.strokeStyle = '#00ffff'

                                // Label points
                                drawText(ctx, `P1(${x1}, ${y1}, ${z1})`, point1.x + 10, point1.y - 10, Math.max(12, height / 30))
                                drawText(ctx, `P2(${x2}, ${y2}, ${z2})`, point2.x + 10, point2.y - 10, Math.max(12, height / 30))

                                // Calculate and display distance
                                const distance = Math.sqrt(
                                    Math.pow(x2 - x1, 2) +
                                    Math.pow(y2 - y1, 2) +
                                    Math.pow(z2 - z1, 2)
                                )
                                drawText(ctx, `Distance: ${distance.toFixed(2)}`, 10, 30, Math.max(16, height / 20))

                                // Display formula
                                const dx = Math.abs(x2 - x1).toFixed(2)
                                const dy = Math.abs(y2 - y1).toFixed(2)
                                const dz = Math.abs(z2 - z1).toFixed(2)
                                drawText(ctx, `d = √(${dx}² + ${dy}² + ${dz}²)`, 10, 60, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '10.3',
                title: 'Introduction to Vectors',
                content: `
                <h2>Vector Notation and Basic Operations</h2>
                <p>Vectors are mathematical objects that have both magnitude and direction. They are fundamental in physics, engineering, and computer graphics for representing quantities like velocity, force, and displacement.</p>
                <h3>Vector Notation:</h3>
                <ul>
                    <li><strong>Arrow Notation:</strong> Vectors are often represented by arrows, where the length of the arrow indicates magnitude and the direction of the arrow indicates... direction.</li>
                    <li><strong>Bold Letter Notation:</strong> In text, vectors are often written in bold, like <strong>v</strong>.</li>
                    <li><strong>Component Form:</strong> A 3D vector can be written as <strong>v</strong> = (x, y, z) or <strong>v</strong> = xi + yj + zk, where i, j, and k are unit vectors in the x, y, and z directions respectively.</li>
                </ul>
                <h3>Basic Vector Operations:</h3>
                <ol>
                    <li><strong>Vector Addition:</strong> Add corresponding components.
                        <br><strong>a</strong> + <strong>b</strong> = (a₁ + b₁, a₂ + b₂, a₃ + b₃)</li>
                    <li><strong>Scalar Multiplication:</strong> Multiply each component by the scalar.
                        <br>k<strong>a</strong> = (ka₁, ka₂, ka₃)</li>
                    <li><strong>Magnitude:</strong> The length of the vector.
                        <br>|<strong>a</strong>| = √(a₁² + a₂² + a₃²)</li>
                    <li><strong>Direction:</strong> Often represented by angle with coordinate axes or as a unit vector (vector with magnitude 1).</li>
                </ol>
                <h3>Properties of Vector Operations:</h3>
                <ul>
                    <li>Commutative: <strong>a</strong> + <strong>b</strong> = <strong>b</strong> + <strong>a</strong></li>
                    <li>Associative: (<strong>a</strong> + <strong>b</strong>) + <strong>c</strong> = <strong>a</strong> + (<strong>b</strong> + <strong>c</strong>)</li>
                    <li>Distributive: k(<strong>a</strong> + <strong>b</strong>) = k<strong>a</strong> + k<strong>b</strong></li>
                </ul>
                <p>Use the interactive visualization below to explore vector addition and scalar multiplication in 3D space.</p>
            `,
                sliders: [
                    {
                        id: 'x1',
                        label: 'Vector 1 x-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 2,
                        explanation: "Adjust the x-component of the first vector"
                    },
                    {
                        id: 'y1',
                        label: 'Vector 1 y-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Adjust the y-component of the first vector"
                    },
                    {
                        id: 'z1',
                        label: 'Vector 1 z-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the z-component of the first vector"
                    },
                    {
                        id: 'x2',
                        label: 'Vector 2 x-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: -1,
                        explanation: "Adjust the x-component of the second vector"
                    },
                    {
                        id: 'y2',
                        label: 'Vector 2 y-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 2,
                        explanation: "Adjust the y-component of the second vector"
                    },
                    {
                        id: 'z2',
                        label: 'Vector 2 z-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: -2,
                        explanation: "Adjust the z-component of the second vector"
                    },
                    {
                        id: 'scalar',
                        label: 'Scalar',
                        min: -2,
                        max: 2,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the scalar for multiplication"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, x1 = 2, y1 = 3, z1 = 1, x2 = -1, y2 = 2, z2 = -2, scalar = 1 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 15
                                const angle = Math.PI / 6  // 30 degrees for isometric view

                                // Function to convert 3D to 2D coordinates
                                const to2D = (x: number, y: number, z: number) => {
                                    return {
                                        x: centerX + (x - z) * Math.cos(angle) * scale,
                                        y: centerY + (x + z) * Math.sin(angle) * scale - y * scale
                                    }
                                }

                                // Draw axes
                                const origin = to2D(0, 0, 0)
                                const xAxis = to2D(6, 0, 0)
                                const yAxis = to2D(0, 6, 0)
                                const zAxis = to2D(0, 0, 6)
                                drawLine(ctx, origin.x, origin.y, xAxis.x, xAxis.y)
                                drawLine(ctx, origin.x, origin.y, yAxis.x, yAxis.y)
                                drawLine(ctx, origin.x, origin.y, zAxis.x, zAxis.y)

                                // Label axes
                                drawText(ctx, 'x', xAxis.x + 10, xAxis.y, Math.max(12, height / 30))
                                drawText(ctx, 'y', yAxis.x - 20, yAxis.y - 10, Math.max(12, height / 30))
                                drawText(ctx, 'z', zAxis.x - 20, zAxis.y, Math.max(12, height / 30))

                                // Draw and label vectors
                                const end1 = to2D(x1, y1, z1)
                                const end2 = to2D(x2, y2, z2)
                                drawArrow(ctx, origin.x, origin.y, end1.x, end1.y, '#FF0000')
                                drawArrow(ctx, origin.x, origin.y, end2.x, end2.y, '#00FF00')
                                drawText(ctx, 'v₁', end1.x + 10, end1.y - 10, Math.max(12, height / 30))
                                drawText(ctx, 'v₂', end2.x + 10, end2.y - 10, Math.max(12, height / 30))

                                // Calculate and draw vector sum
                                const sumX = x1 + x2
                                const sumY = y1 + y2
                                const sumZ = z1 + z2
                                const sumEnd = to2D(sumX, sumY, sumZ)
                                drawArrow(ctx, origin.x, origin.y, sumEnd.x, sumEnd.y, '#FFFF00')
                                drawText(ctx, 'v₁ + v₂', sumEnd.x + 10, sumEnd.y - 10, Math.max(12, height / 30))

                                // Calculate and draw scalar multiple of v₁
                                const scalarX = x1 * scalar
                                const scalarY = y1 * scalar
                                const scalarZ = z1 * scalar
                                const scalarEnd = to2D(scalarX, scalarY, scalarZ)
                                drawArrow(ctx, origin.x, origin.y, scalarEnd.x, scalarEnd.y, '#FF00FF')
                                drawText(ctx, `${scalar}v₁`, scalarEnd.x + 10, scalarEnd.y - 10, Math.max(12, height / 30))

                                // Display vector information
                                drawText(ctx, `v₁ = (${x1}, ${y1}, ${z1})`, 10, 30, Math.max(14, height / 25))
                                drawText(ctx, `v₂ = (${x2}, ${y2}, ${z2})`, 10, 60, Math.max(14, height / 25))
                                drawText(ctx, `v₁ + v₂ = (${sumX}, ${sumY}, ${sumZ})`, 10, 90, Math.max(14, height / 25))
                                drawText(ctx, `${scalar}v₁ = (${scalarX}, ${scalarY}, ${scalarZ})`, 10, 120, Math.max(14, height / 25))

                                // Display magnitudes
                                const mag1 = Math.sqrt(x1*x1 + y1*y1 + z1*z1)
                                const mag2 = Math.sqrt(x2*x2 + y2*y2 + z2*z2)
                                const magSum = Math.sqrt(sumX*sumX + sumY*sumY + sumZ*sumZ)
                                drawText(ctx, `|v₁| = ${mag1.toFixed(2)}`, 10, height - 90, Math.max(14, height / 25))
                                drawText(ctx, `|v₂| = ${mag2.toFixed(2)}`, 10, height - 60, Math.max(14, height / 25))
                                drawText(ctx, `|v₁ + v₂| = ${magSum.toFixed(2)}`, 10, height - 30, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '10.4',
                title: 'Dot Product and Vector Projections',
                content: `
                <h2>Understanding and Calculating Dot Products</h2>
                <p>The dot product is a fundamental operation in vector algebra that results in a scalar value. It has numerous applications in physics and engineering, including work calculations and vector projections.</p>
                <h3>Dot Product Definition:</h3>
                <p>For two vectors <strong>a</strong> = (a₁, a₂, a₃) and <strong>b</strong> = (b₁, b₂, b₃), the dot product is defined as:</p>
                <p style="text-align: center;"><strong>a</strong> · <strong>b</strong> = a₁b₁ + a₂b₂ + a₃b₃</p>
                <h3>Geometric Interpretation:</h3>
                <p>The dot product can also be expressed as:</p>
                <p style="text-align: center;"><strong>a</strong> · <strong>b</strong> = |<strong>a</strong>| |<strong>b</strong>| cos θ</p>
                <p>Where θ is the angle between the vectors.</p>
                <h3>Properties of Dot Product:</h3>
                <ul>
                    <li>Commutative: <strong>a</strong> · <strong>b</strong> = <strong>b</strong> · <strong>a</strong></li>
                    <li>Distributive: <strong>a</strong> · (<strong>b</strong> + <strong>c</strong>) = <strong>a</strong> · <strong>b</strong> + <strong>a</strong> · <strong>c</strong></li>
                    <li>Scalar Multiple: (k<strong>a</strong>) · <strong>b</strong> = k(<strong>a</strong> · <strong>b</strong>)</li>
                </ul>
                <h3>Applications of Dot Product:</h3>
                <ol>
                    <li><strong>Work in Physics:</strong> Work = Force · Displacement</li>
                    <li><strong>Finding Angles:</strong> cos θ = (<strong>a</strong> · <strong>b</strong>) / (|<strong>a</strong>| |<strong>b</strong>|)</li>
                    <li><strong>Vector Projections:</strong> proj<sub><strong>b</strong></sub><strong>a</strong> = ((<strong>a</strong> · <strong>b</strong>) / |<strong>b</strong>|²) <strong>b</strong></li>
                    <li><strong>Testing Perpendicularity:</strong> If <strong>a</strong> · <strong>b</strong> = 0, then <strong>a</strong> ⊥ <strong>b</strong></li>
                </ol>
                <h3>Vector Projections:</h3>
                <p>The vector projection of <strong>a</strong> onto <strong>b</strong> is the vector component of <strong>a</strong> in the direction of <strong>b</strong>. It's calculated using the dot product:</p>
                <p style="text-align: center;">proj<sub><strong>b</strong></sub><strong>a</strong> = ((<strong>a</strong> · <strong>b</strong>) / |<strong>b</strong>|²) <strong>b</strong></p>
                <p>Use the interactive visualization below to explore dot products and vector projections in 3D space.</p>
            `,
                sliders: [
                    {
                        id: 'x1',
                        label: 'Vector a x-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Adjust the x-component of vector a"
                    },
                    {
                        id: 'y1',
                        label: 'Vector a y-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 2,
                        explanation: "Adjust the y-component of vector a"
                    },
                    {
                        id: 'z1',
                        label: 'Vector a z-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the z-component of vector a"
                    },
                    {
                        id: 'x2',
                        label: 'Vector b x-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the x-component of vector b"
                    },
                    {
                        id: 'y2',
                        label: 'Vector b y-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 4,
                        explanation: "Adjust the y-component of vector b"
                    },
                    {
                        id: 'z2',
                        label: 'Vector b z-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: -2,
                        explanation: "Adjust the z-component of vector b"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, x1 = 3, y1 = 2, z1 = 1, x2 = 1, y2 = 4, z2 = -2 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 15
                                const angle = Math.PI / 6  // 30 degrees for isometric view

                                // Function to convert 3D to 2D coordinates
                                const to2D = (x: number, y: number, z: number) => {
                                    return {
                                        x: centerX + (x - z) * Math.cos(angle) * scale,
                                        y: centerY + (x + z) * Math.sin(angle) * scale - y * scale
                                    }
                                }

                                // Draw axes
                                const origin = to2D(0, 0, 0)
                                const xAxis = to2D(6, 0, 0)
                                const yAxis = to2D(0, 6, 0)
                                const zAxis = to2D(0, 0, 6)
                                drawLine(ctx, origin.x, origin.y, xAxis.x, xAxis.y)
                                drawLine(ctx, origin.x, origin.y, yAxis.x, yAxis.y)
                                drawLine(ctx, origin.x, origin.y, zAxis.x, zAxis.y)

                                // Label axes
                                drawText(ctx, 'x', xAxis.x + 10, xAxis.y, Math.max(12, height / 30))
                                drawText(ctx, 'y', yAxis.x - 20, yAxis.y - 10, Math.max(12, height / 30))
                                drawText(ctx, 'z', zAxis.x - 20, zAxis.y, Math.max(12, height / 30))

                                // Draw and label vectors
                                const endA = to2D(x1, y1, z1)
                                const endB = to2D(x2, y2, z2)
                                drawArrow(ctx, origin.x, origin.y, endA.x, endA.y, '#FF0000')
                                drawArrow(ctx, origin.x, origin.y, endB.x, endB.y, '#00FF00')
                                drawText(ctx, 'a', endA.x + 10, endA.y - 10, Math.max(12, height / 30))
                                drawText(ctx, 'b', endB.x + 10, endB.y - 10, Math.max(12, height / 30))

                                // Calculate dot product
                                const dotProduct = x1*x2 + y1*y2 + z1*z2

                                // Calculate vector magnitudes
                                const magA = Math.sqrt(x1*x1 + y1*y1 + z1*z1)
                                const magB = Math.sqrt(x2*x2 + y2*y2 + z2*z2)

                                // Calculate angle between vectors
                                const angleBetween = Math.acos(dotProduct / (magA * magB))

                                // Calculate vector projection
                                const scalar = dotProduct / (magB * magB)
                                const projX = scalar * x2
                                const projY = scalar * y2
                                const projZ = scalar * z2
                                const projEnd = to2D(projX, projY, projZ)

                                // Draw projection
                                ctx.strokeStyle = '#FFFF00'
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, origin.x, origin.y, projEnd.x, projEnd.y)
                                ctx.setLineDash([])
                                drawArrow(ctx, origin.x, origin.y, projEnd.x, projEnd.y, '#FFFF00')
                                drawText(ctx, 'proj_b a', projEnd.x + 10, projEnd.y - 10, Math.max(12, height / 30))

                                // Display calculations
                                drawText(ctx, `a = (${x1}, ${y1}, ${z1})`, 10, 30, Math.max(14, height / 25))
                                drawText(ctx, `b = (${x2}, ${y2}, ${z2})`, 10, 60, Math.max(14, height / 25))
                                drawText(ctx, `a · b = ${dotProduct.toFixed(2)}`, 10, 90, Math.max(14, height / 25))
                                drawText(ctx, `|a| = ${magA.toFixed(2)}, |b| = ${magB.toFixed(2)}`, 10, 120, Math.max(14, height / 25))
                                drawText(ctx, `Angle between a and b: ${(angleBetween * 180 / Math.PI).toFixed(2)}°`, 10, 150, Math.max(14, height / 25))
                                drawText(ctx, `proj_b a = (${projX.toFixed(2)}, ${projY.toFixed(2)}, ${projZ.toFixed(2)})`, 10, 180, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '10.5',
                title: 'Cross Product',
                content: `
                <h2>Understanding and Calculating Cross Products</h2>
                <p>The cross product is a binary operation on two vectors in three-dimensional space that results in another vector perpendicular to both input vectors. It has numerous applications in physics, engineering, and computer graphics.</p>
                <h3>Cross Product Definition:</h3>
                <p>For two vectors <strong>a</strong> = (a₁, a₂, a₃) and <strong>b</strong> = (b₁, b₂, b₃), the cross product <strong>a</strong> × <strong>b</strong> is defined as:</p>
                <p style="text-align: center;"><strong>a</strong> × <strong>b</strong> = (a₂b₃ - a₃b₂, a₃b₁ - a₁b₃, a₁b₂ - a₂b₁)</p>
                <h3>Geometric Interpretation:</h3>
                <p>The magnitude of the cross product is equal to the area of the parallelogram spanned by the two vectors:</p>
                <p style="text-align: center;">|<strong>a</strong> × <strong>b</strong>| = |<strong>a</strong>| |<strong>b</strong>| sin θ</p>
                <p>Where θ is the angle between the vectors.</p>
                <h3>Properties of Cross Product:</h3>
                <ul>
                    <li>Anti-commutative: <strong>a</strong> × <strong>b</strong> = -(<strong>b</strong> × <strong>a</strong>)</li>
                    <li>Distributive: <strong>a</strong> × (<strong>b</strong> + <strong>c</strong>) = <strong>a</strong> × <strong>b</strong> + <strong>a</strong> × <strong>c</strong></li>
                    <li>Scalar Multiple: (k<strong>a</strong>) × <strong>b</strong> = k(<strong>a</strong> × <strong>b</strong>) = <strong>a</strong> × (k<strong>b</strong>)</li>
                    <li><strong>a</strong> × <strong>a</strong> = <strong>0</strong> (zero vector)</li>
                </ul>
                <h3>Applications of Cross Product:</h3>
                <ol>
                    <li><strong>Torque in Physics:</strong> τ = r × F</li>
                    <li><strong>Angular Momentum:</strong> L = r × p</li>
                    <li><strong>Area Calculation:</strong> Area of parallelogram = |<strong>a</strong> × <strong>b</strong>|</li>
                    <li><strong>Normal Vectors:</strong> Finding a vector perpendicular to a plane</li>
                    <li><strong>Computer Graphics:</strong> Determining the outward normal of a surface</li>
                </ol>
                <h3>Right-Hand Rule:</h3>
                <p>The direction of the cross product follows the right-hand rule: if you curl the fingers of your right hand from the first vector towards the second vector, your thumb points in the direction of the cross product.</p>
                <p>Use the interactive visualization below to explore cross products in 3D space.</p>
            `,
                sliders: [
                    {
                        id: 'x1',
                        label: 'Vector a x-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 3,
                        explanation: "Adjust the x-component of vector a"
                    },
                    {
                        id: 'y1',
                        label: 'Vector a y-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 2,
                        explanation: "Adjust the y-component of vector a"
                    },
                    {
                        id: 'z1',
                        label: 'Vector a z-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the z-component of vector a"
                    },
                    {
                        id: 'x2',
                        label: 'Vector b x-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the x-component of vector b"
                    },
                    {
                        id: 'y2',
                        label: 'Vector b y-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 4,
                        explanation: "Adjust the y-component of vector b"
                    },
                    {
                        id: 'z2',
                        label: 'Vector b z-component',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: -2,
                        explanation: "Adjust the z-component of vector b"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, x1 = 3, y1 = 2, z1 = 1, x2 = 1, y2 = 4, z2 = -2 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 15
                                const angle = Math.PI / 6  // 30 degrees for isometric view

                                // Function to convert 3D to 2D coordinates
                                const to2D = (x: number, y: number, z: number) => {
                                    return {
                                        x: centerX + (x - z) * Math.cos(angle) * scale,
                                        y: centerY + (x + z) * Math.sin(angle) * scale - y * scale
                                    }
                                }

                                // Draw axes
                                const origin = to2D(0, 0, 0)
                                const xAxis = to2D(6, 0, 0)
                                const yAxis = to2D(0, 6, 0)
                                const zAxis = to2D(0, 0, 6)
                                drawLine(ctx, origin.x, origin.y, xAxis.x, xAxis.y)
                                drawLine(ctx, origin.x, origin.y, yAxis.x, yAxis.y)
                                drawLine(ctx, origin.x, origin.y, zAxis.x, zAxis.y)

                                // Label axes
                                drawText(ctx, 'x', xAxis.x + 10, xAxis.y, Math.max(12, height / 30))
                                drawText(ctx, 'y', yAxis.x - 20, yAxis.y - 10, Math.max(12, height / 30))
                                drawText(ctx, 'z', zAxis.x - 20, zAxis.y, Math.max(12, height / 30))

                                // Draw and label vectors
                                const endA = to2D(x1, y1, z1)
                                const endB = to2D(x2, y2, z2)
                                drawArrow(ctx, origin.x, origin.y, endA.x, endA.y, '#FF0000')
                                drawArrow(ctx, origin.x, origin.y, endB.x, endB.y, '#00FF00')
                                drawText(ctx, 'a', endA.x + 10, endA.y - 10, Math.max(12, height / 30))
                                drawText(ctx, 'b', endB.x + 10, endB.y - 10, Math.max(12, height / 30))

                                // Calculate cross product
                                const crossX = y1 * z2 - z1 * y2
                                const crossY = z1 * x2 - x1 * z2
                                const crossZ = x1 * y2 - y1 * x2
                                const endCross = to2D(crossX, crossY, crossZ)

                                // Draw cross product vector
                                drawArrow(ctx, origin.x, origin.y, endCross.x, endCross.y, '#FFFF00')
                                drawText(ctx, 'a × b', endCross.x + 10, endCross.y - 10, Math.max(12, height / 30))

                                // Calculate magnitudes
                                const magA = Math.sqrt(x1*x1 + y1*y1 + z1*z1)
                                const magB = Math.sqrt(x2*x2 + y2*y2 + z2*z2)
                                const magCross = Math.sqrt(crossX*crossX + crossY*crossY + crossZ*crossZ)

                                // Calculate angle between vectors
                                const dotProduct = x1*x2 + y1*y2 + z1*z2
                                const angleBetween = Math.acos(dotProduct / (magA * magB))

                                // Display calculations
                                drawText(ctx, `a = (${x1}, ${y1}, ${z1})`, 10, 30, Math.max(14, height / 25))
                                drawText(ctx, `b = (${x2}, ${y2}, ${z2})`, 10, 60, Math.max(14, height / 25))
                                drawText(ctx, `a × b = (${crossX.toFixed(2)}, ${crossY.toFixed(2)}, ${crossZ.toFixed(2)})`, 10, 90, Math.max(14, height / 25))
                                drawText(ctx, `|a × b| = ${magCross.toFixed(2)}`, 10, 120, Math.max(14, height / 25))
                                drawText(ctx, `|a| = ${magA.toFixed(2)}, |b| = ${magB.toFixed(2)}`, 10, 150, Math.max(14, height / 25))
                                drawText(ctx, `Angle between a and b: ${(angleBetween * 180 / Math.PI).toFixed(2)}°`, 10, 180, Math.max(14, height / 25))
                                drawText(ctx, `Area of parallelogram: ${magCross.toFixed(2)}`, 10, 210, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '10.6',
                title: 'Applications in Physics and Engineering',
                content: `
                <h2>Using 3D Trigonometry and Vectors in Real-World Problems</h2>
                <p>3D trigonometry and vector operations are fundamental in solving various real-world problems in physics and engineering. Let's explore some key applications:</p>
                <h3>1. Force Analysis in Mechanics</h3>
                <ul>
                    <li><strong>Free Body Diagrams:</strong> Representing forces acting on an object in 3D space.</li>
                    <li><strong>Resultant Force:</strong> Using vector addition to find the net force on an object.</li>
                    <li><strong>Equilibrium:</strong> Solving for forces that balance each other in 3D structures.</li>
                </ul>
                <h3>2. Motion in 3D Space</h3>
                <ul>
                    <li><strong>Projectile Motion:</strong> Analyzing the path of objects launched in 3D.</li>
                    <li><strong>Orbital Mechanics:</strong> Describing the motion of satellites and celestial bodies.</li>
                    <li><strong>Robotic Arm Movement:</strong> Calculating joint angles for desired end-effector positions.</li>
                </ul>
                <h3>3. Electromagnetic Fields</h3>
                <ul>
                    <li><strong>Field Vectors:</strong> Representing electric and magnetic fields in 3D space.</li>
                    <li><strong>Lorentz Force:</strong> Calculating the force on charged particles in electromagnetic fields.</li>
                    <li><strong>Antenna Design:</strong> Optimizing radiation patterns using 3D vector analysis.</li>
                </ul>
                <h3>4. Fluid Dynamics</h3>
                <ul>
                    <li><strong>Flow Fields:</strong> Describing fluid velocity and pressure in 3D space.</li>
                    <li><strong>Lift and Drag:</strong> Analyzing forces on aircraft wings or underwater structures.</li>
                    <li><strong>Turbulence Modeling:</strong> Using vector calculus to model complex fluid behaviors.</li>
                </ul>
                <h3>5. Computer Graphics and Animation</h3>
                <ul>
                    <li><strong>3D Transformations:</strong> Rotating, scaling, and translating objects in virtual 3D space.</li>
                    <li><strong>Lighting and Shading:</strong> Calculating light reflection and surface normals.</li>
                    <li><strong>Camera Positioning:</strong> Determining view angles and perspectives in 3D scenes.</li>
                </ul>
                <h3>6. Structural Engineering</h3>
                <ul>
                    <li><strong>Truss Analysis:</strong> Calculating forces in 3D structural members.</li>
                    <li><strong>Stress and Strain Tensors:</strong> Analyzing material deformation in 3D.</li>
                    <li><strong>Earthquake Engineering:</strong> Modeling 3D ground motion and structural responses.</li>
                </ul>
                <p>Let's explore a practical example: analyzing the forces on a suspended bridge cable.</p>
            `,
                sliders: [
                    {
                        id: 'cableLength',
                        label: 'Cable Length (m)',
                        min: 10,
                        max: 100,
                        step: 1,
                        defaultValue: 50,
                        explanation: "Adjust the length of the bridge cable"
                    },
                    {
                        id: 'cableAngle',
                        label: 'Cable Angle (degrees)',
                        min: 0,
                        max: 90,
                        step: 1,
                        defaultValue: 30,
                        explanation: "Adjust the angle of the cable with respect to the horizontal"
                    },
                    {
                        id: 'loadWeight',
                        label: 'Load Weight (kN)',
                        min: 0,
                        max: 1000,
                        step: 10,
                        defaultValue: 500,
                        explanation: "Adjust the weight of the load on the cable"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, cableLength = 50, cableAngle = 30, loadWeight = 500 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const scale = Math.min(width, height) / 150
                                const groundY = height - 50

                                // Calculate cable end points
                                const startX = width / 4
                                const startY = groundY - cableLength * Math.sin(cableAngle * Math.PI / 180) * scale
                                const endX = startX + cableLength * Math.cos(cableAngle * Math.PI / 180) * scale
                                const endY = groundY

                                // Draw ground
                                ctx.beginPath()
                                ctx.moveTo(0, groundY)
                                ctx.lineTo(width, groundY)
                                ctx.stroke()

                                // Draw cable
                                ctx.strokeStyle = '#FFFF00'
                                drawLine(ctx, startX, startY, endX, endY)
                                ctx.strokeStyle = '#00ffff'

                                // Draw load
                                const loadX = (startX + endX) / 2
                                const loadY = (startY + endY) / 2
                                drawPoint(ctx, loadX, loadY, 5)
                                drawArrow(ctx, loadX, loadY, loadX, loadY + 50, '#FF0000')

                                // Calculate forces
                                const radians = cableAngle * Math.PI / 180
                                const tension = loadWeight / (2 * Math.sin(radians))
                                const horizontalForce = tension * Math.cos(radians)
                                const verticalForce = tension * Math.sin(radians)

                                // Draw force vectors
                                const forceScale = 0.1
                                drawArrow(ctx, startX, startY, startX - horizontalForce * forceScale, startY, '#00FF00')
                                drawArrow(ctx, startX, startY, startX, startY + verticalForce * forceScale, '#0000FF')

                                // Labels
                                drawText(ctx, 'Cable', (startX + endX) / 2 + 10, (startY + endY) / 2 - 10, Math.max(12, height / 30))
                                drawText(ctx, 'Load', loadX + 10, loadY + 30, Math.max(12, height / 30))
                                drawText(ctx, 'Tension', startX - 60, startY - 10, Math.max(12, height / 30))
                                drawText(ctx, 'Horizontal', startX - horizontalForce * forceScale - 40, startY + 20, Math.max(12, height / 30))
                                drawText(ctx, 'Vertical', startX - 70, startY + verticalForce * forceScale / 2, Math.max(12, height / 30))

                                // Display calculations
                                drawText(ctx, `Cable Length: ${cableLength} m`, 10, 30, Math.max(14, height / 25))
                                drawText(ctx, `Cable Angle: ${cableAngle}°`, 10, 60, Math.max(14, height / 25))
                                drawText(ctx, `Load Weight: ${loadWeight} kN`, 10, 90, Math.max(14, height / 25))
                                drawText(ctx, `Tension: ${tension.toFixed(2)} kN`, 10, 120, Math.max(14, height / 25))
                                drawText(ctx, `Horizontal Force: ${horizontalForce.toFixed(2)} kN`, 10, 150, Math.max(14, height / 25))
                                drawText(ctx, `Vertical Force: ${verticalForce.toFixed(2)} kN`, 10, 180, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            }
        ]
    }

    const parametricEquationsLesson: Lesson = {
        id: 11,
        title: 'Parametric Equations and Curves',
        introduction: `
        <p>Welcome to our lesson on Parametric Equations and Curves! In this lesson, we'll explore a powerful way to describe curves and motions in mathematics and physics.</p>
        <p>Parametric equations allow us to express the coordinates of a point on a curve as functions of a parameter, typically denoted as t. This approach provides a dynamic way to represent curves and is particularly useful in describing motion and complex shapes.</p>
    `,
        prerequisites: [2, 3, 5, 9],
        sublessons: [
            {
                id: '11.1',
                title: 'Introduction to Parametric Equations',
                content: `
                <h2>Understanding the Concept of Parameter</h2>
                <p>Parametric equations describe a set of quantities as functions of one or more independent variables called parameters. In the context of curves, we often use a single parameter, usually denoted as t.</p>
                <h3>Key Concepts:</h3>
                <ul>
                    <li><strong>Parameter:</strong> An independent variable that determines the values of other variables.</li>
                    <li><strong>Parametric Form:</strong> A way to express the coordinates of a point on a curve as functions of a parameter.</li>
                    <li><strong>General Form:</strong> For a curve in 2D space: x = f(t), y = g(t), where t is the parameter.</li>
                </ul>
                <h3>Advantages of Parametric Equations:</h3>
                <ol>
                    <li><strong>Describing Motion:</strong> Easily represent position as a function of time.</li>
                    <li><strong>Complex Shapes:</strong> Represent curves that are not functions in Cartesian coordinates.</li>
                    <li><strong>Multiple Traversals:</strong> Describe curves that cross over themselves.</li>
                    <li><strong>Direction:</strong> Indicate the direction of motion along a curve.</li>
                </ol>
                <h3>Example: Circle as Parametric Equations</h3>
                <p>A circle with radius r centered at the origin can be described parametrically as:</p>
                <p>x = r cos(t), y = r sin(t), where 0 ≤ t < 2π</p>
                <p>Here, t represents the angle from the positive x-axis.</p>
                <p>Use the slider below to explore how the parameter t determines a point's position on a circle.</p>
            `,
                sliders: [
                    {
                        id: 'parameter',
                        label: 'Parameter t',
                        min: 0,
                        max: 2 * Math.PI,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the parameter t to move the point along the circle"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return {canvas, ctx}
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const {canvas, ctx, parameter = 0} = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const radius = Math.min(width, height) * 0.4

                                // Draw coordinate axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)
                                drawText(ctx, 'x', width - 20, centerY + 20, Math.max(12, height / 30))
                                drawText(ctx, 'y', centerX + 10, 20, Math.max(12, height / 30))

                                // Draw circle
                                ctx.beginPath()
                                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
                                ctx.stroke()

                                // Calculate point position
                                const x = centerX + radius * Math.cos(parameter)
                                const y = centerY - radius * Math.sin(parameter)

                                // Draw point
                                drawPoint(ctx, x, y, 5)

                                // Draw radial line
                                ctx.setLineDash([5, 5])
                                drawLine(ctx, centerX, centerY, x, y)
                                ctx.setLineDash([])

                                // Labels
                                drawText(ctx, `t = ${parameter.toFixed(2)}`, 10, 30, Math.max(14, height / 25))
                                drawText(ctx, `x = ${((x - centerX) / radius).toFixed(2)}`, 10, 60, Math.max(14, height / 25))
                                drawText(ctx, `y = ${((centerY - y) / radius).toFixed(2)}`, 10, 90, Math.max(14, height / 25))
                                drawText(ctx, `x = cos(t)`, width - 150, 30, Math.max(14, height / 25))
                                drawText(ctx, `y = sin(t)`, width - 150, 60, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            },
            {
                id: '11.2',
                title: 'Parametric Forms of Lines and Circles',
                content: `
                <h2>Converting Standard Equations to Parametric Form</h2>
                <p>Many geometric shapes that we're familiar with in standard form can be expressed parametrically. Let's look at how to convert lines and circles to parametric form.</p>
                <h3>Lines in Parametric Form:</h3>
                <p>For a line with slope m and y-intercept b (y = mx + b), we can use the parametric form:</p>
                <ul>
                    <li>x = t</li>
                    <li>y = mt + b</li>
                </ul>
                <p>Where t is any real number. This form allows us to generate any point on the line by choosing a value for t.</p>
                <h3>Circles in Parametric Form:</h3>
                <p>For a circle with center (h, k) and radius r, we can use the parametric form:</p>
                <ul>
                    <li>x = h + r cos(t)</li>
                    <li>y = k + r sin(t)</li>
                </ul>
                <p>Where 0 ≤ t < 2π. This form generates points on the circle as t varies from 0 to 2π.</p>
                <h3>Advantages of Parametric Form:</h3>
                <ul>
                    <li>Easier to represent motion along the curve</li>
                    <li>Can represent curves that are not functions in Cartesian coordinates</li>
                    <li>Simplifies certain calculations in physics and engineering</li>
                </ul>
                <p>Use the sliders below to explore parametric forms of lines and circles.</p>
            `,
                sliders: [
                    {
                        id: 'shapeType',
                        label: 'Shape Type',
                        min: 0,
                        max: 1,
                        step: 1,
                        defaultValue: 0,
                        explanation: "Toggle between line (0) and circle (1)"
                    },
                    {
                        id: 'parameter',
                        label: 'Parameter t',
                        min: -5,
                        max: 5,
                        step: 0.1,
                        defaultValue: 0,
                        explanation: "Adjust the parameter t to move along the shape"
                    },
                    {
                        id: 'slope',
                        label: 'Slope (for line)',
                        min: -2,
                        max: 2,
                        step: 0.1,
                        defaultValue: 1,
                        explanation: "Adjust the slope of the line"
                    }
                ],
                visualizations: [
                    {
                        type: 'canvas',
                        setup: (sliderValues) => {
                            const canvas = document.createElement('canvas')
                            const ctx = canvas.getContext('2d')
                            return { canvas, ctx }
                        },
                        update: (props: VisualizationProps & Record<string, number>) => {
                            const { canvas, ctx, shapeType = 0, parameter = 0, slope = 1 } = props
                            if (ctx && canvas) {
                                // Set canvas size to match container
                                const container = canvas.parentElement
                                if (container) {
                                    canvas.width = container.clientWidth
                                    canvas.height = container.clientHeight
                                }

                                const width = canvas.width
                                const height = canvas.height
                                ctx.clearRect(0, 0, width, height)

                                // Set up styles
                                ctx.strokeStyle = '#00ffff'
                                ctx.fillStyle = '#00ffff'
                                ctx.lineWidth = 2
                                ctx.font = `${Math.max(12, height / 30)}px Arial`

                                // Constants
                                const centerX = width / 2
                                const centerY = height / 2
                                const scale = Math.min(width, height) / 12

                                // Draw coordinate axes
                                drawLine(ctx, 0, centerY, width, centerY)
                                drawLine(ctx, centerX, 0, centerX, height)
                                drawText(ctx, 'x', width - 20, centerY + 20, Math.max(12, height / 30))
                                drawText(ctx, 'y', centerX + 10, 20, Math.max(12, height / 30))

                                let x, y
                                if (shapeType === 0) {  // Line
                                    // Draw line
                                    const y1 = centerY - slope * 5 * scale
                                    const y2 = centerY + slope * 5 * scale
                                    drawLine(ctx, 0, y1, width, y2)

                                    // Calculate point position
                                    x = centerX + parameter * scale
                                    y = centerY - (slope * parameter) * scale

                                    // Labels
                                    drawText(ctx, `Line: x = t, y = ${slope}t`, 10, 30, Math.max(14, height / 25))
                                } else {  // Circle
                                    const radius = 3 * scale

                                    // Draw circle
                                    ctx.beginPath()
                                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
                                    ctx.stroke()

                                    // Calculate point position
                                    x = centerX + radius * Math.cos(parameter)
                                    y = centerY - radius * Math.sin(parameter)

                                    // Labels
                                    drawText(ctx, `Circle: x = 3cos(t), y = 3sin(t)`, 10, 30, Math.max(14, height / 25))
                                }

                                // Draw point
                                drawPoint(ctx, x, y, 5)

                                // Labels
                                drawText(ctx, `t = ${parameter.toFixed(2)}`, 10, 60, Math.max(14, height / 25))
                                drawText(ctx, `x = ${((x - centerX) / scale).toFixed(2)}`, 10, 90, Math.max(14, height / 25))
                                drawText(ctx, `y = ${((centerY - y) / scale).toFixed(2)}`, 10, 120, Math.max(14, height / 25))
                            }
                        }
                    }
                ]
            }
        ]
    }


    lessonStore.addLesson(triangleLesson)
    lessonStore.addLesson(unitCircleLesson)
    lessonStore.addLesson(trigRatiosLesson)
    lessonStore.addLesson(anglesMeasureLesson)
    lessonStore.addLesson(trigGraphsLesson)
    lessonStore.addLesson(trigIdentitiesLesson)
    lessonStore.addLesson(trigEquationsLesson)
    lessonStore.addLesson(trigApplicationsLesson)
    lessonStore.addLesson(polarComplexLesson)
    lessonStore.addLesson(threeDTrigVectorsLesson)
    lessonStore.addLesson(parametricEquationsLesson)
}
