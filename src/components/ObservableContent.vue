<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  content: string
}>()

const emit = defineEmits(['scrollToSliders'])

const processedContent = computed(() => {
  console.log("Original content:", props.content)

  // Check for individual components
  const observeWords = ['Observe', 'observe', 'Watch', 'watch', 'Notice', 'notice', 'See how']
  const sliderWords = ['slider', 'sliders', 'control', 'controls']

  observeWords.forEach(word => {
    console.log(`Contains "${word}":`, props.content.includes(word))
  })

  sliderWords.forEach(word => {
    console.log(`Contains "${word}":`, props.content.includes(word))
  })

  // Try different regex patterns
  const patterns = [
    /(Observe|observe|Watch|watch|Notice|notice|See how)/,
    /(sliders?|controls?)/,
    /(Observe|observe|Watch|watch|Notice|notice|See how)[\s\S]*?(sliders?|controls?)/
  ]

  patterns.forEach((pattern, index) => {
    const matches = props.content.match(pattern)
    console.log(`Regex ${index + 1} matches:`, matches)
  })

  // If matches are found with the third pattern, proceed with replacement
  const finalPattern = /(Observe|observe|Watch|watch|Notice|notice|See how)[\s\S]*?(sliders?|controls?)/g
  const matches = props.content.match(finalPattern)

  let result = props.content

  if (matches) {
    matches.forEach(match => {
      console.log("Processing match:", match)
      result = result.replace(match, `<span class="observe-link" data-action="scroll">${match}</span>`)
    })
  }

  console.log("Final result:", result)
  return result
})

function handleClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (target.classList.contains('observe-link') && target.dataset.action === 'scroll') {
    console.log("Observe link clicked")
    emit('scrollToSliders')
  }
}
</script>

<template>
  <div @click="handleClick" v-html="processedContent"></div>
</template>

<style scoped>
.observe-link {
  color: #59e8ed;
  text-decoration: underline;
  cursor: pointer;
}

.observe-link:hover {
  text-decoration: none;
}
</style>