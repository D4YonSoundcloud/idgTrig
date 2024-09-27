<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useLessonsStore } from '@/stores/lessons'
import type { Lesson, Sublesson, VisualizationProps } from '@/stores/lessons'

const route = useRoute()
const router = useRouter()
const lessonStore = useLessonsStore()

const sliderValues = ref<Record<string, number>>({})

const lessonId = computed(() => parseInt(route.params.id as string))
const sublessonId = computed(() => route.params.sublessonId as string)

const lesson = computed(() => {
  lessonStore.setCurrentLesson(lessonId.value)
  return lessonStore.currentLesson as Lesson | undefined
})

const sublesson = computed(() => {
  if (lesson.value && sublessonId.value) {
    lessonStore.setCurrentSublesson(sublessonId.value)
    return lessonStore.currentSublesson as Sublesson | undefined
  }
  return undefined
})



const containerRef = ref<HTMLElement | null>(null)
const slidersRef = ref<HTMLElement | null>(null)

let animationFrameId: number | null = null
let visualizationProps: VisualizationProps | null = null


function scrollToSliders(event: Event) {
  event.preventDefault()
  if (slidersRef.value) {
    slidersRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

function replaceObserveText(content: string): string {
  const observeRegex = /(Observe|observe|Watch|watch|Notice|notice|See how)(.+?)(sliders?|controls?)/g
  return content.replace(observeRegex, (match, p1, p2, p3) => {
    return `<a href="#" class="observe-link" @click="scrollToSliders">${p1}${p2}${p3}</a>`
  })
}

function setupVisualization() {
  if (sublesson.value && containerRef.value) {
    if (containerRef.value.firstChild) {
      containerRef.value.removeChild(containerRef.value.firstChild)
    }

    const visualization = sublesson.value.visualizations[0]
    visualizationProps = visualization.setup(sliderValues.value)
    containerRef.value.appendChild(visualizationProps.canvas)

    const animate = () => {
      if (visualizationProps) {
        visualization.update({ ...visualizationProps, ...sliderValues.value })
      }
      animationFrameId = requestAnimationFrame(animate)
    }
    animate()
  }
}

function cleanupVisualization() {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  if (containerRef.value && containerRef.value.firstChild) {
    containerRef.value.removeChild(containerRef.value.firstChild)
  }
}

watch([lesson, sublesson], ([newLesson, newSublesson], [oldLesson, oldSublesson]) => {
  if (newLesson !== oldLesson || newSublesson !== oldSublesson) {
    cleanupVisualization()
    sliderValues.value = {}
    if (newSublesson?.sliders) {
      newSublesson.sliders.forEach(slider => {
        sliderValues.value[slider.id] = slider.defaultValue
      })
    }
    nextTick(() => {
      setupVisualization()
    })
  }
}, { immediate: true })

onMounted(() => {
  if (!sublessonId.value && lesson.value?.sublessons.length > 0) {
    router.replace({ params: { ...route.params, sublessonId: lesson.value.sublessons[0].id } })
  }
  if (sublesson.value?.sliders) {
    sublesson.value.sliders.forEach(slider => {
      sliderValues.value[slider.id] = slider.defaultValue
    })
  }
  nextTick(() => {
    setupVisualization()
  })
})

onUnmounted(() => {
  cleanupVisualization()
})

function navigateToSublesson(id: string) {
  router.push({ params: { ...route.params, sublessonId: id } })
}
</script>

<template>
  <div v-if="lesson" class="lesson-view">
    <h1>{{ lesson.title }}</h1>
    <div v-html="lesson.introduction" class="lesson-introduction"></div>

    <nav class="sublesson-nav">
      <button
          v-for="sub in lesson.sublessons"
          :key="sub.id"
          @click="navigateToSublesson(sub.id)"
          :class="{ active: sub.id === sublessonId }"
      >
        {{ sub.title }}
      </button>
    </nav>

    <div v-if="sublesson" class="sublesson-content">
      <h2>{{ sublesson.title }}</h2>
      <div v-html="sublesson.content" class="lesson-content"></div>
      <div class="visualization-wrapper">
        <div ref="containerRef" class="visualization-container"></div>
      </div>
      <div v-if="sublesson.sliders" ref="slidersRef" class="sliders-container">
        <div v-for="slider in sublesson.sliders" :key="slider.id" class="slider-item">
          <label :for="slider.id">{{ slider.label }}</label>
          <input
              :id="slider.id"
              type="range"
              :min="slider.min"
              :max="slider.max"
              :step="slider.step"
              v-model.number="sliderValues[slider.id]"
              class="slider-input"
          />
          <span class="slider-value">{{ sliderValues[slider.id] }}</span>
          <p class="slider-explanation">{{ slider.explanation }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.lesson-view {
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem;
  color: var(--color-text);
}

h1 {
  color: var(--color-h1-text);
  font-size: 2rem;
  margin-bottom: 1rem;
  letter-spacing: -1px;
}

h2 {
  color: var(--color-heading);
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  letter-spacing: -0.5px;
}

.lesson-introduction {
  margin-bottom: 1.5rem;
}

.sublesson-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.sublesson-nav button {
  padding: 0.5rem 1rem;
  background-color: var(--color-background-soft);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  color: var(--color-text);
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;
  font-size: 0.9rem;
}

.sublesson-nav button.active,
.sublesson-nav button:hover {
  background-color: var(--color-border);
  border-color: var(--color-border-hover);
}

.visualization-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;
}

.visualization-container {
  width: 100%;
  max-width: 600px;
  height: 500px;
  background-color: var(--color-background-soft);
  border-radius: 8px;
}

.sliders-container {
  background-color: var(--color-background-soft);
  border-radius: 8px;
  padding: 1rem;
  margin-top: 1rem;
}

.slider-item {
  margin-bottom: 1rem;
}

.slider-item label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.slider-input {
  width: 100%;
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  background: #4a4a4a;
  outline: none;
  border-radius: 5px;
}

.slider-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: var(--color-heading);
  cursor: pointer;
  border-radius: 50%;
}

.slider-input::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--color-heading);
  cursor: pointer;
  border-radius: 50%;
}

.slider-value {
  display: inline-block;
  margin-left: 1rem;
  font-weight: bold;
}

.slider-explanation {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--color-text-light);
}

@media (max-width: 768px) {
  .lesson-view {
    max-width: 95%;
  }

  h1 {
    font-size: 1.5rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  .sublesson-nav button {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }

  .visualization-container {
    height: 600px;
    width: 300px;
  }

  .slider-item label {
    font-size: 0.9rem;
  }

  .slider-explanation {
    font-size: 0.8rem;
  }
}
</style>