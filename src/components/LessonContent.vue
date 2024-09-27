<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps<{
  lessonId: string
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

onMounted(() => {
  if (canvasRef.value) {
    const ctx = canvasRef.value.getContext('2d')
    if (ctx) {
      drawTriangle(ctx)
      animateTriangle(ctx)
    }
  }
})

function drawTriangle(ctx: CanvasRenderingContext2D) {
  ctx.beginPath()
  ctx.moveTo(50, 200)
  ctx.lineTo(200, 200)
  ctx.lineTo(125, 50)
  ctx.closePath()
  ctx.strokeStyle = '#00ffff'
  ctx.lineWidth = 2
  ctx.stroke()
}

function animateTriangle(ctx: CanvasRenderingContext2D) {
  gsap.to({}, {
    duration: 2,
    repeat: -1,
    onUpdate: () => {
      ctx.clearRect(0, 0, 300, 300)
      ctx.save()
      ctx.translate(150, 125)
      ctx.rotate(gsap.utils.wrapYoyo(0, Math.PI * 2)(gsap.ticker.time))
      ctx.translate(-150, -125)
      drawTriangle(ctx)
      ctx.restore()
    }
  })
}
</script>

<template>
  <div class="lesson-content">
    <p>Welcome to our first lesson on triangles! A triangle is a simple shape with three sides and three angles.</p>
    <canvas ref="canvasRef" width="300" height="300" class="demo-canvas"></canvas>
    <p>Look at how our triangle rotates! This demonstrates that no matter how we turn it, a triangle always has the same fundamental properties.</p>
  </div>
</template>

<style scoped>
.lesson-content {
  color: var(--color-text);
  line-height: 1.6;
}

p {
  margin-bottom: 1rem;
}

.demo-canvas {
  display: block;
  margin: 2rem auto;
  background-color: var(--color-background-soft);
  border-radius: 8px;
}
</style>