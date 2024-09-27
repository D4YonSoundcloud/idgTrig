import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Slider {
    id: string
    label: string
    min: number
    max: number
    step: number
    defaultValue: number
    explanation: string
}

export interface Visualization {
    type: 'canvas' | 'svg'
    setup: (sliderValues: Record<string, number>) => VisualizationProps
    update: (props: VisualizationProps & Record<string, number>) => void
}

export interface VisualizationProps {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D | null
    [key: string]: any
}

export interface Sublesson {
    id: string
    title: string
    content: string
    sliders: Slider[]
    visualizations: Visualization[]
}

export interface Lesson {
    id: number
    title: string
    introduction: string
    sublessons: Sublesson[]
    prerequisites: number[]
}

export const useLessonsStore = defineStore('lessons', () => {
    const lessons = ref<Lesson[]>([])
    const currentLessonId = ref<number | null>(null)
    const currentSublessonId = ref<string | null>(null)

    const currentLesson = computed(() =>
        lessons.value.find(lesson => lesson.id === currentLessonId.value)
    )

    const currentSublesson = computed(() =>
        currentLesson.value?.sublessons.find(sublesson => sublesson.id === currentSublessonId.value)
    )

    function setCurrentLesson(id: number) {
        currentLessonId.value = id
        currentSublessonId.value = currentLesson.value?.sublessons[0].id || null
    }

    function setCurrentSublesson(id: string) {
        currentSublessonId.value = id
    }

    function addLesson(lesson: Lesson) {
        lessons.value.push(lesson)
    }

    return {
        lessons,
        currentLessonId,
        currentSublessonId,
        currentLesson,
        currentSublesson,
        setCurrentLesson,
        setCurrentSublesson,
        addLesson
    }
})