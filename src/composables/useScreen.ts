import { ref, onMounted, onUnmounted } from 'vue'

export function useScreen() {
  const isMobile = ref(window.innerWidth < 768)

  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768
  }

  onMounted(() => {
    window.addEventListener('resize', checkScreenSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreenSize)
  })

  return { isMobile }
}
