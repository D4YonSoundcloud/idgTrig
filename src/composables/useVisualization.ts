import { onMounted, onUnmounted, ref } from 'vue'
import gsap from 'gsap'

export function useVisualization(setup: () => void, update: () => void) {
    const containerRef = ref<HTMLElement | null>(null)

    let animationFrame: number

    const animate = () => {
        update()
        animationFrame = requestAnimationFrame(animate)
    }

    onMounted(() => {
        if (containerRef.value) {
            setup()
            animationFrame = requestAnimationFrame(animate)
        }
    })

    onUnmounted(() => {
        if (animationFrame) {
            cancelAnimationFrame(animationFrame)
        }
    })

    return {
        containerRef
    }
}