<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useLessonsStore } from '@/stores/lessons'
import { ref, computed } from 'vue'

const lessonStore = useLessonsStore()
const lessons = computed(() => lessonStore.lessons)

const expandedLessons = ref<number[]>([])

function toggleLesson(lessonId: number) {
  const index = expandedLessons.value.indexOf(lessonId)
  if (index === -1) {
    expandedLessons.value.push(lessonId)
  } else {
    expandedLessons.value.splice(index, 1)
  }
}

function isLessonExpanded(lessonId: number) {
  return expandedLessons.value.includes(lessonId)
}
</script>

<template>
  <nav>
    <div v-for="lesson in lessons" :key="lesson.id" class="lesson-group">
      <div @click="toggleLesson(lesson.id)" class="lesson-header">
        <RouterLink :to="{ name: 'lesson', params: { id: lesson.id } }">
          Lesson {{ lesson.id }}: {{ lesson.title }}
        </RouterLink>
        <span class="expand-icon">{{ isLessonExpanded(lesson.id) ? '▼' : '▶' }}</span>
      </div>
      <div v-if="isLessonExpanded(lesson.id)" class="sublesson-group">
        <RouterLink
            v-for="sublesson in lesson.sublessons"
            :key="sublesson.id"
            :to="{ name: 'lesson', params: { id: lesson.id, sublessonId: sublesson.id } }"
            class="sublesson-link"
        >
          {{ lesson.id }}.{{ sublesson.id }}: {{ sublesson.title }}
        </RouterLink>
      </div>
    </div>
  </nav>

  <RouterView />
</template>

<style scoped>
nav {
  height: 100%;
  padding: 0;
  background-color: var(--color-background-soft);
  display: flex;
  flex-flow: column;
}

.lesson-group {
  display: flex;
  flex-direction: column;
}

.lesson-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid var(--color-border);
}

.lesson-header a {
  flex-grow: 1;
  text-decoration: none;
  color: var(--color-text);
}

.expand-icon {
  font-size: 0.8rem;
  margin-left: 0.5rem;
}

.sublesson-group {
  display: flex;
  flex-direction: column;
  background-color: var(--color-background-mute);
}

.sublesson-link {
  padding: 0.5rem 1rem 0.5rem 2rem;
  text-decoration: none;
  color: var(--color-text);
  border-bottom: 1px solid var(--color-border);
}

.lesson-header a.router-link-active,
.sublesson-link.router-link-active {
  font-weight: bold;
  color: #59e8ed;
}

@media (max-width: 1024px) {
  nav {
    text-align: left;
    height: auto;
    font-size: 1rem;
  }
}
</style>